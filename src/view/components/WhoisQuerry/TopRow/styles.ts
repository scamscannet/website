// Core
import { MyFonts } from '@/assets/fonts';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    ${({ theme }) => theme.media('max').sm} {
        flex-direction: column;
        align-items: center;
        gap: 24px;
    }
`;

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    ${({ theme }) => theme.media('max').sm} {
        align-items: center;
    }
`;

export const Title = styled.h3`
    color: ${({ theme }) => theme.text.gray.main};
    font-family: ${MyFonts.THICCCBOI.regular};
    font-size: 28px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
`;

export const Location = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    font-family: ${MyFonts.THICCCBOI.regular};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
`;
export const IconWrapper = styled.div`
    width: 24px;
    height: 24px;
`;

export const ButtonsWrapper = styled.div`
    height: 40px;
    display: flex;
    width: fit-content;
    border-radius: 4px;
    padding: 2px;
    border: 1px solid #F5F5F5;
    background: #F5F5F5;
    transition: all 0.3s ease;
`;

export const Button = styled.button<{$active: boolean}>`
    display: flex;
    padding: 6px 12px;
    justify-content: center;
    align-items: center;
    width: 120px;
    gap: 10px;
    border: unset;
    outline: 0;
    border-radius: 2px;
    background: ${({ $active }) => $active ? '#fff' : '' };
    color: ${({ theme, $active }) => $active ? theme.text.gray.main : theme.palette.gray.info};
    font-family: ${MyFonts.THICCCBOI.regular};
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
    cursor: pointer;
    transition: all 0.3s ease;
`;
