// Core
import { MyFonts } from '@/assets/fonts';
import styled, { css } from 'styled-components';

export const Form = styled.form`
    /* styles here */
    display: flex;
    max-width: 740px;
    width: 100%;
    height: 60px;
    background-color: aliceblue;
    ${({ theme }) => theme.media('min').xs} {
        height: 40px;
        max-width: 400px;
    }
    ${({ theme }) => theme.media('min').md} {
        height: 50px;
        max-width: 500px;
    }
    ${({ theme }) => theme.media('min').lg} {
        height: 60px;
        max-width: 740px;
    }
`;

export const Input = styled.input<{$error?: boolean}>`
    max-width: 610px;
    width: 100%;
    padding: 12px;
    border-radius: 2px;
    border: 1px solid ${({ theme }) => theme.palette.gray.lightGrey};
    outline: 0;
    font-size: 16px;
    font-family: ${MyFonts.THICCCBOI.medium};
    
    &::placeholder {
        font-family: ${MyFonts.THICCCBOI.regular};
        font-style: normal;
        font-weight: 400;
        color: ${({ theme }) => theme.text.gray.secondary};
    }
    &:focus {
        border: 1px solid ${({ theme }) => theme.palette.purple.main};
        box-shadow: 0px 0px 0px 2px rgba(96, 35, 250, 0.20);
    }
    border-color: ${({ $error, theme }) => $error ? theme.palette.error : theme.palette.gray.lightGrey};
    ${({ theme }) => theme.media('min').xs} {
        font-size: 12px;
        &::placeholder {
            font-size: 12px;
        }
    }
    ${({ theme }) => theme.media('min').md} {
        font-size: 14px;
        &::placeholder {
            font-size: 14px;
        }
    }
    ${({ theme }) => theme.media('min').lg} {
        font-size: 16px;
        &::placeholder {
            font-size: 16px;
        }
    }
`;

export const ButtonStyles = css`
    max-height: 60px;
    height: 100%;
    ${({ theme }) => theme.media('min').xs} {
        max-width: 110px;
        width: 100%;
        padding: 6px 12px;
    }
    ${({ theme }) => theme.media('min').sm} {
        max-width: 130px;
        width: 100%;
        padding: 12px 24px;
    }
`;

export const ErrorMesage = css`
    color: ${({ theme }) => theme.palette.error};
    ${({ theme }) => theme.media('min').xs} {
        font-size: 14px;
        line-height: 24px;
        text-align: left;
    }
`;
