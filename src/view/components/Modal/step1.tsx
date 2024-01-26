import React, { FC } from 'react';

import * as S from './styles';
import { Control, Controller, FieldErrors, UseFormTrigger } from 'react-hook-form';
import { IFormState } from './static';
import { Button } from '@/view/elements';

type PropTypes = {
    setStep: React.Dispatch<React.SetStateAction<number>>
    control: Control<IFormState, any>
    errors: FieldErrors<IFormState>
    trigger: UseFormTrigger<IFormState>
}

export const Step1: FC<PropTypes> = ({ setStep, control, errors, trigger }) => {
    return (
        <>
            <S.IputsContainer>
                <S.InputWrapper>
                    <S.TextLabel>Scam URL or domain</S.TextLabel>
                    <Controller
                        control = { control }
                        name = 'url'
                        render = { ({ field: { onChange, onBlur }}) => (
                            <S.Input
                                $error = { !!errors.url?.message }
                                placeholder = 'www.example-scam.com'
                                onBlur = { onBlur }
                                onChange = { onChange }
                            />
                        ) }
                    />
                </S.InputWrapper>
                <S.InputWrapper>
                    <S.TextLabel>Scam description</S.TextLabel>
                    <Controller
                        control = { control }
                        name = 'description'
                        render = { ({ field: { onChange, onBlur }}) => (
                            <S.TextArea
                                $error = { !!errors.description?.message }
                                placeholder = 'Provide details such as the nature of the scam, suspicious activities, or any relevant information that can help us understand and address the issue'
                                onBlur = { onBlur }
                                onChange = { onChange }
                            />
                        ) }
                    />
                </S.InputWrapper>
            </S.IputsContainer>
            <Button
                $styles = { S.Button }
                type = 'button'
                onClick = { async () => {
                    const areFieldsValid = await trigger([ 'url', 'description' ]);
                    if (areFieldsValid) {
                        setStep(1);
                    }
                } }>Continue
            </Button>
        </>
    );
};
