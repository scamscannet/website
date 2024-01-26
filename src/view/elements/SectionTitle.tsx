// Core
import { MyFonts } from '@/assets/fonts';
import React, { FC } from 'react';
import styled, { RuleSet } from 'styled-components';

// Types
type PropTypes = {
    /* type props here */
    children: React.ReactNode
    $styles?: RuleSet<object>
}

// Styles
const Container = styled.h3<PropTypes>`
    font-family: ${MyFonts.THICCCBOI.bold};
    color: ${({ theme }) => theme.text.black.main};
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: 56px;
    ${({ theme }) => theme.media('min').xs} {
        font-size: 28px;
        line-height: 38px;
        text-align: center;
    }
    ${({ theme }) => theme.media('min').md} {
        font-size: 38px;
        line-height: 48px;
        text-align: center;
    }
    ${({ theme }) => theme.media('min').lg} {
        font-size: 48px;
        line-height: 56px;
    }
    ${({ $styles }) => $styles}
`;

export const SectionTitle: FC<PropTypes> = ({ children, $styles }) => {
    return (
        <Container $styles = { $styles }>
            {children}
        </Container>
    );
};
