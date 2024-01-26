/* eslint-disable no-nested-ternary */
// Core
import { MyFonts } from '@/assets/fonts';
import { ScamStatusSafeIcon, ScamStatusScamIcon, ScamStatusUnclassifiedIcon } from '@/assets/images/icons';
import React, { FC } from 'react';
import styled from 'styled-components';

// Types
type PropTypes = {
    /* type props here */
    $status: 'Safe' | 'Scam' | 'Unclassified'
}

// Styles
const Container = styled.div<PropTypes>`
    display: flex;
    padding: 4px 12px 4px 8px;
    width: fit-content;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 4px;
    background: ${({ $status }) => $status === 'Safe' ? '#ECFDF3' : $status === 'Scam' ? '#FEF3F2' : '#F5F5F5'};
    color: ${({ $status }) => $status === 'Safe' ? '#067647' : $status === 'Scam' ? '#B42318' : '#344054'};
`;

const Text = styled.span`
    font-family: ${MyFonts.THICCCBOI.bold};
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
`;

export const ChipScamStatus: FC<PropTypes> = ({ $status }) => {
    return (
        <Container $status = { $status }>
            {$status === 'Safe' ? <ScamStatusSafeIcon /> : $status === 'Scam' ? <ScamStatusScamIcon /> : <ScamStatusUnclassifiedIcon />}
            <Text>{$status}</Text>
        </Container>
    );
};
