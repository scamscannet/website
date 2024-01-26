// Core
import styled, { css } from 'styled-components';

export const LinkStyles = css`
    padding:  0;
`;

export const Container = styled.section`
    width: 100%;
    padding: 200px 80px;
    text-align: center;
     ${({ theme }) => theme.media('max').lg} {
        padding: 48px 24px;
    };
`;

export const Title = css`
    ${({ theme }) => theme.media('max').sm} {
        font-size: 24px;
        line-height: 34px;
    };
`;

export const Subtitle = css`
    margin: 0 auto;
    margin-top: 16px;
    ${({ theme }) => theme.media('max').sm} {
        font-size: 16px;
    };
`;

export const Slider = styled.div`
    margin-top: 48px;
`;

export const Track = styled.div<{$translate: number}>`
    display: flex;
    width: fit-content;
    justify-content: space-between;
    flex-wrap: nowrap;
    transform: translateX(${({ $translate }) => -$translate + 'px'});
    transition: all.3s ease;
`;

export const Navigation = styled.div`
    display: flex;
    bottom: 0;
    margin: 0 auto;
    width: fit-content;
    user-select: none;
    margin-top: 32px;
`;

export const ProgressButtonContainer = styled.div`
    padding: 10px;
    display: flex;
    `;

export const ProgressButton = styled.div<{$isActive?: boolean}>`
    margin-right: 18px;
    width: ${({ $isActive }) => $isActive ? '48px' : '24px'};
    height: 4px;
    border-radius: 10px;
    background: ${({ theme, $isActive }) => $isActive ? theme.palette.purple.main : theme.palette.gray.lightGrey};
    transition: all .3s ease;
    cursor: pointer;
    &:last-child {
        margin-right: 0px;
    }
`;

export const Button = css`
    max-height: 48px;
    margin: 0 auto;
    margin-top: 48px;
`;


export const CardWrapper = styled.div`
    width: 100%;
    display: flex !important;
    justify-content: center;
    align-items: center;
`;
