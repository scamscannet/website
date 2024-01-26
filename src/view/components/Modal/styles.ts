// Core
import { MyFonts } from '@/assets/fonts';
import styled, { css, keyframes } from 'styled-components';

export const appearanceAnimation = keyframes`
    0% { opacity: 0 }
    30% { opacity: 0.5 }
    40% { opacity: 0.7; }
    100% { opacity: 1; }
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    backdrop-filter: blur(4px);
    z-index: 999999;
`;


export const FormWrapper = styled.div`
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    border: 1px solid #E0E0E0;
    box-shadow: 0px 8px 16px 0px rgba(112, 115, 119, 0.12);
    max-width: 526px;
    width: 100%;
    max-height: fit-content;
    padding: 24px;
    background: #fff;
    z-index: 99999999;
`;

export const CloseBtn = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    width: 44px;
    height: 44px;
    margin: 0;
    padding: 10px;
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

export const Form = styled.form`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
`;

export const Title = styled.h3`
    margin: 8px 0;
    text-align: center;
    color: ${({ theme }) => theme.text.black.main};
    font-family: ${MyFonts.THICCCBOI.medium};
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
`;
export const Text = styled.p`
    text-align: center;
    color: ${({ theme }) => theme.text.black.main};
    font-family: ${MyFonts.THICCCBOI.regular};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
`;

export const StepWrapper = styled.div<{$display: boolean}>`
    display: ${({ $display }) => $display ? 'flex' : 'none'};
    flex-direction: column;
    width: 100%;
    animation-name: ${appearanceAnimation};
    animation-duration: 1s ease;
    transition: all.3s ease;
`;

export const Divider = styled.div`
    width: 478px;
    height: 1px;
    margin: 24px 0;
    background: #F5F5F5;
`;

export const IputsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 16px;
`;

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    gap: 8px;
    border-radius: 2px;
`;

export const TextLabel = styled.span`
    font-family: ${MyFonts.THICCCBOI.semiBold};
    color: ${({ theme }) => theme.text.black.main};
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
`;

const InputFields = css`
    display: flex;
    padding: 12px;
    width: 100%;
    align-items: center;
    outline: 0;
    border: 1px solid ${({ theme }) => theme.palette.gray.lightGrey};
    border-radius: 2px;
    font-family: ${MyFonts.THICCCBOI.regular};

    &::placeholder {
        font-family: ${MyFonts.THICCCBOI.regular};
        color: ${({ theme }) => theme.text.gray.secondary};
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
    }

    &:focus {
        border: 1px solid ${({ theme }) => theme.palette.purple.main};
        box-shadow: 0px 0px 0px 2px rgba(96, 35, 250, 0.20);
    }
    transition: all .3s ease;
`;

export const Input = styled.input<{$error?: boolean}>`
    ${InputFields}
    height: 48px;
    border-color: ${({ $error, theme }) => $error ? theme.palette.error : theme.palette.gray.lightGrey};
`;

export const TextArea = styled.textarea<{$error?: boolean}>`
    ${InputFields}
    height: 123px;
    resize: none;
    border-color: ${({ $error, theme }) => $error ? theme.palette.error : theme.palette.gray.lightGrey};
`;

export const Button = css`
    margin: auto;
    margin-top: 24px;
`;

export const RadioButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
`;

export const RadioButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    padding: 4px 0px;
    align-items: center;
    gap: 8px;
`;

export const RadioButton = styled.input`
    accent-color: ${({ theme }) => theme.palette.purple.main};
    width: 16px;
    height: 16px;
    margin: 0;
`;

export const RadioButtonText = styled.span`
    font-family: ${MyFonts.THICCCBOI.regular};
    color: ${({ theme }) => theme.text.black.main};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
`;

export const CheckboxWrapper = styled.div`
    display: flex;
    margin-top: 24px;
    align-items: flex-start;
    gap: 8px;
    width: auto;
`;

export const CheckBox = styled.input`
    display: flex;
    width: 18px;
    height: 18px;
    accent-color: ${({ theme }) => theme.palette.purple.main};
    border-radius: 2px;
    margin-top: 2px;
`;

export const CheckBoxText = styled.p`
    display: flex;
    font-family: ${MyFonts.THICCCBOI.regular};
    color: ${({ theme }) => theme.text.black.main};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    max-width: 400px;
    width: 100%;
`;

export const SomeComp = styled.div`
    width: 100px;
    height: 100px;
    background-color: yellow;
`;

