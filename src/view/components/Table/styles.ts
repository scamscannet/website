/* eslint-disable no-nested-ternary */
// Core
import { MyFonts } from '@/assets/fonts';
import styled, { keyframes } from 'styled-components';

export const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    border: 1px solid #F5F5F5;
    box-shadow: 0px 2px 12px 0px rgba(101, 101, 101, 0.03);
    width: 100%;
    transition: all .3s ease;
`;

export const TableWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    ${({ theme }) => theme.media('max').lg} {
        flex-direction: column;
    }
`;

export const Table = styled.table<{$withMap?:boolean}>`
    max-width: ${({ $withMap }) => $withMap ? '698px' : '100%'};
    width: ${({ $withMap }) => $withMap ? 'calc(100% - 342px)' : '100%'};
    ${({ theme }) => theme.media('max').lg} {
        width: 100%;
    }
`;

const TbodyAnimation = keyframes`
    0% {
        opacity: 0;
    }
    10% {
        opacity: 0.3;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
`;

export const Thead = styled.div`
    padding: 12px 24px;
    font-family: ${MyFonts.THICCCBOI.semiBold};
    color: ${({ theme }) => theme.text.gray.main};
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 17px;
    background: #F9FAFB;
    border-bottom: 1px solid #F5F5F5;
    height: 44px;
    display: flex;
    align-items: center;
`;

export const Tbody = styled.tbody`
    animation-name: ${TbodyAnimation};
    transition: all.3s ease;
    animation-duration: .3s;
`;

export const Tr = styled.tr`
    display: flex;
    border-bottom: 1px solid #F5F5F5;
    height: fit-content;
`;

export const Tdkey = styled.td<{$alignValues?: 'close' | 'far'}>`
    max-width: ${({ $alignValues }) => !$alignValues ? '50%' : $alignValues === 'close' ? '150px;' : '318px'};
    width: 100%;
    min-height: 64px;
    height: fit-content;
    padding: 12px 24px;
    font-family: ${MyFonts.THICCCBOI.regular};
    color: ${({ theme }) => theme.text.gray.main};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    display: flex;
    align-items: center;
    overflow-wrap: anywhere;
`;

export const TdValue = styled(Tdkey)`
    max-width: ${({ $alignValues }) => !$alignValues ? '50%' : $alignValues === 'close' ? '100%' : '100%'};
    width: 100%;
    display: flex;
    align-items: center;
    ${({ theme }) => theme.media('max').lg} {
        max-width: unset;
        overflow-wrap: anywhere;
    }
`;

export const Tfoot = styled.tfoot`
    display: flex;
    padding: 12px 24px;
    cursor: pointer;
`;

export const Link = styled.div`
    display: flex;
    gap: 4px;
    font-family: ${MyFonts.THICCCBOI.regular};
    color: ${({ theme }) => theme.palette.purple.main};
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    cursor: pointer;
`;

export const MapWrapper = styled.div`
    padding: 8px;
    display: flex;
    width: 342px;
    height: 256px;
`;


export const OpenstreetMapLink = 'padding: 4px 8px; background: rgba(0, 0, 0, 0.75); borderRadius: 2px; color: #fff; font-family: THICCCBOI REGULAR; text-decoration: underline; font-size: 12px;';
