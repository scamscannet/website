import { MyFonts } from '@/assets/fonts';
import styled, { css } from 'styled-components';

export const Container = styled.section`
    margin-top: 100px;
    padding: 0 80px;
    ${({ theme }) => theme.media('max').xl} {
        margin-top: 50px;
        padding: 0 24px;
    }
    ${({ theme }) => theme.media('max').md} {
        margin-top: 50px;
        padding: 0px;
    }
`;

export const Title = styled.h3`
    font-family: ${MyFonts.THICCCBOI.regular};
    font-size: 28px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    color: ${({ theme }) => theme.text.black.main};
    ${({ theme }) => theme.media('max').md} {
        font-size: 20px;
        margin-bottom: 24px;
        margin-left: 24px;
    }
    ${({ theme }) => theme.media('max').sm} {
        text-align: center;
    }
`;

export const CardsWrapper = styled.div`
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    place-items: center;
    ${({ theme }) => theme.media('max').xl} {
        font-size: 20px;
        margin-bottom: 24px;
        grid-template-columns: repeat(2, 1fr);
        place-items: center;
    }
    ${({ theme }) => theme.media('max').md} {
        font-size: 20px;
        margin-bottom: 24px;
        place-items: center;
        grid-template-columns: repeat(1, 1fr);
    }
`;

export const Button = css`
    margin: 0 auto;
    margin-top: 48px;
`;
