/* eslint-disable no-nested-ternary */
// Core
import { MyFonts } from '@/assets/fonts';
import React, { FC } from 'react';
import styled, { RuleSet } from 'styled-components';

// Types
type PropTypes = {
    children: React.ReactNode
    $variant?: 'contained' | 'outlined' | 'white_outlined'
    $styles?: RuleSet<object>
    onClick?: () => void
    type?: 'button' | 'submit'
}

// Syles
export const ButtonStyles = styled.button<PropTypes>`
    width: fit-content;
    max-height: 48px;
    height: 100%;
    display: flex;
    padding: 12px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 0px 2px 2px 0px;
    background: ${({ theme, $variant }) => $variant === 'contained' ? theme.button.primary : 'transparent'};
    border: ${({ theme, $variant }) => $variant === 'contained'
        ? 0
        : $variant === 'outlined'
            ? `1px solid ${theme.button.primary}`
            : '1px solid #fff'};
    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.04);

    /* Button text */
    font-family: ${MyFonts.THICCCBOI.regular};
    color: ${({ theme, $variant }) => $variant === 'outlined' ? theme.button.primary : '#fff'};
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    transition: all .3s ease;
    cursor: pointer;
    user-select: none;
    &:active {
        background-color: ${({ theme, $variant }) => $variant === 'outlined' ? 'transparent' : theme.button.dark};
        color: ${({ theme, $variant }) => $variant === 'outlined' ? theme.button.dark : '#fff'};
        border-color: ${({ theme, $variant }) => $variant === 'contained' ? '' : theme.button.dark};
    }
    ${({ $styles }) => $styles}
`;

export const Button: FC<PropTypes> = ({ children, $variant = 'contained', $styles, onClick, type = 'submit' }) => {
    return (
        <ButtonStyles
            $styles = { $styles }
            $variant = { $variant }
            type = { type }
            onClick = { onClick }>
            {children}
        </ButtonStyles>
    );
};
