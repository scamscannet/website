import React, { FC, useEffect, useState } from 'react';

import * as S from './styles';
import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { IFormState } from './static';
import { Button } from '@/view/elements';

type PropTypes = {
    control: Control<IFormState, any>
    errors: FieldErrors<IFormState>
    setValue: UseFormSetValue<IFormState>
}

export const Step2: FC<PropTypes> = ({ control, errors, setValue }) => {
    const [ recieveUpds, setRecieveUpds ] = useState(true);
    const [ email, setEmail ] = useState('');

    const radioButtonHandler = (mode: 'active' | 'disabled') => {
        if (mode === 'active') {
            setRecieveUpds(true);
        }
        if (mode === 'disabled') {
            setRecieveUpds(false);
        }
    };

    useEffect(() => {
        setValue('checkbox', false);
        setValue('recieveUpdates', false);
    }, [ recieveUpds ]);

    return (
        <>
            <S.RadioButtonsContainer>
                <Controller
                    control = { control }
                    name = 'recieveUpdates'
                    render = { ({ field: { onChange, onBlur }}) => (
                        <S.RadioButtonWrapper>
                            <S.RadioButton
                                defaultChecked = { recieveUpds }
                                name = 'radio'
                                type = 'radio'
                                onChange = { () => {
                                    radioButtonHandler('active');
                                    onChange();
                                    onBlur();
                                    setValue('email', email);
                                } }
                            />
                            <S.RadioButtonText>Yes, I'd like to receive updates</S.RadioButtonText>
                        </S.RadioButtonWrapper>
                    ) }
                />
                <Controller
                    control = { control }
                    name = 'recieveUpdates'
                    render = { ({ field: { onChange, onBlur }}) => (
                        <S.RadioButtonWrapper>
                            <S.RadioButton
                                defaultChecked = { !recieveUpds }
                                name = 'radio'
                                type = 'radio'
                                onChange = { () => {
                                    radioButtonHandler('disabled');
                                    onChange();
                                    onBlur();
                                } }
                                onClick = { () => {
                                    setValue('email', null);
                                } }
                            />
                            <S.RadioButtonText>Stay anonymous</S.RadioButtonText>
                        </S.RadioButtonWrapper>
                    ) }
                />

                {recieveUpds && <S.Divider/>}
                <S.InputWrapper style = {{ display: recieveUpds ? 'flex' : 'none' }}>
                    <S.TextLabel>Share your email for updates</S.TextLabel>
                    <Controller
                        control = { control }
                        name = 'email'
                        render = { ({ field: { onChange, onBlur, ref }}) => (
                            <S.Input
                                $error = { !!errors.email?.message }
                                placeholder = 'your.email@example.com'
                                ref = { ref }
                                onBlur = { onBlur }
                                onChange = { (event) => {
                                    setEmail(event.target.value);
                                    onChange(event);
                                } }
                            />
                        ) }
                    />
                </S.InputWrapper>
            </S.RadioButtonsContainer>
            {recieveUpds && (
                <S.CheckboxWrapper>
                    <Controller
                        control = { control }
                        name = 'checkbox'
                        render = { ({ field: { onChange, onBlur }}) => (
                            <S.CheckBox
                                type = 'checkbox'
                                onBlur = { onBlur }
                                onChange = { onChange }
                            />
                        ) }
                    />
                    <S.CheckBoxText>
                        I agree to be contacted if there are questions
                        or additional information is needed regarding my report.
                    </S.CheckBoxText>
                </S.CheckboxWrapper>
            )}
            <Button
                $styles = { S.Button }
                type = 'submit'>Submit a Report
            </Button>
        </>
    );
};
