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
const Subtitle = styled.p<PropTypes>`
    color: ${({ theme }) => theme.text.gray.main};
    font-family: ${MyFonts.THICCCBOI.regular};
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    ${({ theme }) => theme.media('min').xs} {
        font-size: 16px;
        line-height: 24px;
        max-width: 400px;
    }
    ${({ theme }) => theme.media('min').md} {
        font-size: 18px;
    }
    ${({ theme }) => theme.media('min').lg} {
        font-size: 20px;
        line-height: 28px;
        max-width: fit-content;
    }
    ${({ $styles }) => $styles}
`;

export const SectionSubtitle: FC<PropTypes> = ({ children, $styles }) => {
    return (
        <Subtitle $styles = { $styles }>
            {children}
        </Subtitle>
    );
};
