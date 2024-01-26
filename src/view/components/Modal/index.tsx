/* eslint-disable no-nested-ternary */
// Core
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEventHandler } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// Bus
// import {} from '../../../bus/'

// Components
import Portal, { createContainer } from '../Portal';

// Styles
import * as S from './styles';
import { CloseIcon, SuccessIcon, WarningIcon } from '@/assets/images/icons';
import { Step1 } from './step1';
import { Step2 } from './step2';
import { IFormState, inithialState, schema } from './static';
import { Button } from '@/view/elements';
import { useReportForDomain } from '@/bus/reportForDomain';

// Types
type PropTypes = {
    /* type props here */
    onClose?: () => void;
}

const MODAL_CONTAINER_ID = 'modal-container-id';

export const Modal: FC<PropTypes> = ({ onClose }) => {
    const [ isMounted, setMounted ] = useState(false);
    const [ step, setStep ] = useState(0);
    const [ failedRequest, setFailedRequest ] = useState(false);
    const { fetchReportForDomain, reportForDomain: { error, ok, isLoading }} = useReportForDomain();

    const {  control, handleSubmit, formState: { errors }, trigger, setValue } = useForm({ values: inithialState, resolver: yupResolver(schema), mode: 'onBlur' });
    const onSubmit = ({ checkbox, description, url, email }: IFormState) => {
        const result = {
            url:             url,
            comment:         description,
            email:           email ? email : '',
            source:          '',
            contact_allowed: checkbox,
            tags:            null,
        };
        const checkValue = async () => {
            const areFieldsValid = await trigger([ 'email', 'checkbox', 'description', 'recieveUpdates', 'url'  ]);
            if (areFieldsValid) {
                fetchReportForDomain(result);
            }
        };
        checkValue();
    };

    useEffect(() => {
        if (!isLoading) {
            if (error) {
                setFailedRequest(true);
                setStep(2);
            }
            if (ok) {
                setStep(2);
            }
        }
    }, [ isLoading ]);

    const formTitles = [ 'Report a Scam', 'Report a Scam', 'Report Submitted' ];
    const formTexts = [
        'Help keep the web safe by reporting scams. Share the details below, and let\'s work together for a secure online space!',
        'Would you like to receive updates on the resolution of this report?',
        'Your report has been successfully submitted. Thank you for taking the initiative to make the web safer!',
    ];

    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        createContainer({ id: MODAL_CONTAINER_ID });
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleWrapperClick = (event: MouseEvent) => {
            const { target } = event;

            if (target instanceof Node && rootRef.current === target) {
                onClose?.();
                setStep(0);
            }
        };
        const handleEscapePress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose?.();
                setStep(0);
            }
        };

        window.addEventListener('click', handleWrapperClick);
        window.addEventListener('keydown', handleEscapePress);

        return () => {
            window.removeEventListener('click', handleWrapperClick);
            window.removeEventListener('keydown', handleEscapePress);
        };
    }, [ onClose ]);


    const handleClose: MouseEventHandler<HTMLButtonElement>
    = useCallback(() => {
        onClose?.();
        setStep(0);
    }, [ onClose ]);

    useEffect(() => {
        if (step !== 2) {
            return;
        }
        let timerId = setTimeout(() => {
            onClose?.();
            setStep(0);
        }, 5000);

        return () => {
            clearTimeout(timerId);
        };
    }, [ step ]);

    return (
        isMounted
            ? (
                <Portal id = { MODAL_CONTAINER_ID }>
                    <S.Overlay
                        ref = { rootRef }>
                        <S.FormWrapper>
                            <S.CloseBtn
                                type = 'button'
                                onClick = { handleClose }>
                                <CloseIcon />
                            </S.CloseBtn>

                            <S.Form onSubmit = { (event) => {
                                event.preventDefault();
                                handleSubmit(onSubmit)();
                            }
                            }>
                                {step < 2 ? <WarningIcon /> : failedRequest ? <WarningIcon /> : <SuccessIcon />}
                                <S.Title>{failedRequest ? 'Report Not Submitted' : formTitles[ step ]}</S.Title>
                                <S.Text>{ failedRequest ? 'Your report hasn\'t been successfully submitted' : formTexts[ step ]}</S.Text>
                                {step < 2 && <S.Divider />}
                                <S.StepWrapper $display = { step === 0 }>
                                    <Step1
                                        control = { control }
                                        errors = { errors }
                                        setStep = { setStep }
                                        trigger = { trigger }
                                    />
                                </S.StepWrapper>
                                <S.StepWrapper $display = { step === 1 }>
                                    <Step2
                                        control = { control }
                                        errors = { errors }
                                        setValue = { setValue }
                                    />
                                </S.StepWrapper>
                                {
                                    step === 2
                                    && (
                                        <Button
                                            $styles = { S.Button }
                                            type = 'button'
                                            onClick = { () => {
                                                onClose?.();
                                                setStep(0);
                                            } }>Close
                                        </Button>
                                    )
                                }
                            </S.Form>
                        </S.FormWrapper>
                    </S.Overlay>
                </Portal>
            )
            : null
    );
};

