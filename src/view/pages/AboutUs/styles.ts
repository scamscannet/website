// Core
import { MyFonts } from '@/assets/fonts';
import styled, { css } from 'styled-components';

export const Container = styled.section`
    width: 100%;
    height: 100%;
    padding: 0 80px;
`;

export const Title = css`
    margin-top: 156px;
    ${({ theme }) => theme.media('max').lg} {
        margin-top: 60px;
    }
    ${({ theme }) => theme.media('min').lg} {
        text-align: start;
    }
`;

export const ContentWrapper = styled.div`
    margin-top: 48px;
    display: flex;
    gap: 48px;
    height: calc(100vh - 367px);
    ${({ theme }) => theme.media('max').lg} {
        height: unset;
        flex-direction: column;
        align-items: center;
        margin-bottom: 48px;
    }
`;

export const Column = styled.div`
    max-width: 395px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const Text = styled.p`
    font-family: ${MyFonts.THICCCBOI.regular};
    color: ${({ theme }) => theme.text.gray.main};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
`;
