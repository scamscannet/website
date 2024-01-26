// Core
import { MyFonts } from '@/assets/fonts';
import { ChevronIcon } from '@/assets/images/icons';
import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';

// Types
type PropTypes = {
    /* type props here */
    rowsPerPage?: number
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
}

const Text = css`
    color: ${({ theme }) => theme.text.gray.main};
    font-family: ${MyFonts.THICCCBOI.regular};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
`;

// Styles
const Container = styled.div<{$open?: boolean}>`
    /* styles here */
    display: flex;
    align-items: center;
    gap: 4px;
    width: 57px;
    height: 32px;
    padding: 4px 8px 4px 12px;
    position: relative;
    border: 1px solid ${({ $open, theme }) => $open ? theme.palette.purple.main : '#F5F5F5'};
    border-radius: 8px;
    cursor: pointer;
    user-select: none;
    // text
    ${Text}
`;

const ChevronWrapper = styled.div<{$open?: boolean}>`
    transform: rotate(${({ $open }) => $open ? 0 : 180}deg);
    width: 24px;
    height: 24px;
    transition: all .3s ease;
`;

const OptionsWrapper = styled.ul<{$open?: boolean}>`
    position: absolute;
    bottom: calc(100% + 12px);
    height: 132px;
    overflow-y: scroll;
    left: 0;
    display: ${({ $open }) => $open ? 'flex' : 'none'};
    flex-direction: column;
    list-style: none;
    width: 100%;
    border: 1px solid ${({ $open, theme }) => $open ? theme.palette.purple.main : '#F5F5F5'};
    border-radius: 8px;
    background: #fff;
    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.palette.purple.main};
        border-radius: 8px;
    }

    &::-webkit-scrollbar-track {
        background-color: #f1f1f1;
        margin: 4px 0px;
    }

    scrollbar-color: ${({ theme }) => theme.palette.purple.main} #f1f1f1;
    scrollbar-width: thin;
`;

const Option = styled.li`
    ${Text};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-bottom: 1px solid #F5F5F5;;
    padding: 4px;
    transition: .1s ease;
    &:hover {
        font-family: ${MyFonts.THICCCBOI.semiBold};
        background-color: ${({ theme }) => theme.text.purple.main};
        color: #fff;
    }
    &:active {
        font-family: ${MyFonts.THICCCBOI.semiBold};
        background-color: ${({ theme }) => theme.text.purple.main};
        color: #fff;
    }
    &:last-child {
        border: 0
    }
`;

export const CustomSelect: FC<PropTypes> = ({ rowsPerPage = 6, setRowsPerPage }) => {
    const [ isOpen, setIsOen ] = useState(false);

    return (
        <Container
            $open = { isOpen }
            onClick = { () => setIsOen(!isOpen) }>
            {rowsPerPage}
            <ChevronWrapper
                $open = { isOpen }>
                <ChevronIcon />
            </ChevronWrapper>
            <OptionsWrapper $open = { isOpen }>
                {
                    Array(10).fill(' ')
                        .map((_: string, idx) => {
                            return (
                                <Option
                                    key = { idx }
                                    onClick = { () => setRowsPerPage(idx + 1) }>{idx + 1}
                                </Option>
                            );
                        })
                }
            </OptionsWrapper>
        </Container>
    );
};
