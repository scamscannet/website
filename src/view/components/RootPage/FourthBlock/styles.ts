// Core
import { MyFonts } from '@/assets/fonts';
import styled, { css } from 'styled-components';

export const Container = styled.section`
    max-height: 624px;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 200px 0 200px 0;
    ${({ theme }) => theme.media('min').xs} {
        padding: 24px;
    }
    ${({ theme }) => theme.media('min').lg} {
        padding: 200px 0 200px 0;
    }
`;

export const Wrapper = styled.div`
    width: 100%;
    padding: 0 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${({ theme }) => theme.media('min').xs} {
        flex-direction: column;
        align-items: center;
        padding: 0;
    }
    ${({ theme }) => theme.media('min').lg} {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 80px;
    }
`;

export const TextWrapper = styled.div`
    display: flex;
    max-width: 580px;
    width: 100%;
    flex-direction: column;
    ${({ theme }) => theme.media('min').xs} {
        margin-top: 48px;
    }
    ${({ theme }) => theme.media('min').lg} {
        margin-top: 0px;
    }
`;

export const Title = css`
    ${({ theme }) => theme.media('min').lg} {
        font-size: 48px;
        text-align: start;
        line-height: 56px;
    }
`;

export const Subtitle = css`
    margin-top: 16px;
    ${({ theme }) => theme.media('min').xs} {
        font-size: 16px;
        text-align: start;
    }
    ${({ theme }) => theme.media('min').lg} {
        font-size: 20px;
        text-align: start;
    }
`;

export const CardWrapper = styled.div`
    max-width: 580px;
    width: 100%;
    display: grid;
    grid-template: 1fr 1fr / 1fr 1fr 1fr;
    justify-items: center;
    grid-row-gap: 24px;
    ${({ theme }) => theme.media('min').xs} {
        font-size: 16px;
        grid-template: 1fr 1fr 1fr / 1fr 1fr;
        grid-column-gap: 24px;
    };
    ${({ theme }) => theme.media('min').xs} {
        font-size: 16px;
        grid-template: 1fr 1fr 1fr / 1fr 1fr;
        grid-column-gap: 24px;
    };
    ${({ theme }) => theme.media('min').md} {
        grid-template: 1fr 1fr / 1fr 1fr 1fr;
    };
`;

export const MetricLabel = styled.p`
    font-family: ${MyFonts.THICCCBOI.regular};
    color: ${({ theme }) => theme.text.gray.main};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
`;
