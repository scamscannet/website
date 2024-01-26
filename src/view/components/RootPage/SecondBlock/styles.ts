// Core
import { MyFonts } from '@/assets/fonts';
import styled, { css } from 'styled-components';

export const Container = styled.section`
    max-height: 624px;
    height: 100%;
    display: flex;
    align-items: center;
    ${({ theme }) => theme.media('min').xs} {
        padding: 24px;
        max-height: none;
    }
    ${({ theme }) => theme.media('min').lg} {
        padding: 200px 0 200px 0;
        max-height: 624px;
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
        justify-content: center;
        padding: 0;
    }
    ${({ theme }) => theme.media('min').lg} {
        flex-direction: row;
        justify-content: space-between;
        padding: 0 80px;
    }
`;

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 48px;
    ${({ theme }) => theme.media('min').xs} {
        margin-right: 0;
    }
    ${({ theme }) => theme.media('min').lg} {
        margin-right: 48px;
    }
`;

export const Title = styled.h3`
    color: ${({ theme }) => theme.text.black.main};
    font-family: ${MyFonts.THICCCBOI.bold};
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: 56px;
    ${({ theme }) => theme.media('min').xs} {
        font-size: 30px;
        line-height: 40px;
        text-align: center;
    }
    ${({ theme }) => theme.media('min').lg} {
        font-size: 48px;
        line-height: 56px;
        text-align: left;
    }
`;

export const Subtitle = css`
     ${({ theme }) => theme.media('min').xs} {
        text-align: center;
    }
    ${({ theme }) => theme.media('min').md} {
        font-size: 18px;
        line-height: 24px;
        margin-top: 14px;
        text-align: center;
    }
     ${({ theme }) => theme.media('min').lg} {
        font-size: 20px;
        line-height: 28px;
        margin-top: 16px;
        text-align: center;
    }
`;

export const MetricWrapper = styled.div`
    display: grid;
    max-width: 606px;
    width: 100%;
    grid-template: 1fr 1fr / 1fr 1fr;
    grid-row-gap: 64px;
    ${({ theme }) => theme.media('min').xs} {
        padding: 50px 0 50px 0;
        grid-template: 1fr 1fr 1fr 1fr / 1fr;
        grid-row-gap: 44px;
        place-items: center;
    }
    ${({ theme }) => theme.media('min').sm} {
        margin: 0 auto;
        margin-top: 48px;
        grid-template: 1fr 1fr / 1fr 1fr;
        place-items: baseline;
        width: fit-content;
        grid-gap: 48px;
    }
    ${({ theme }) => theme.media('min').lg} {
        margin: 0;
        grid-template: 1fr 1fr / 1fr 1fr;
        place-items: unset;
        width: 100%;
        grid-gap: 0px;
        grid-row-gap: 64px;
    }
`;

export const MetricCard = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 24px;
    max-width: 280px;
    width: 100%;
    max-height: 80px;
    height: 100%;
    border-left: 2px solid;
    border-image: ${({ theme }) => `linear-gradient(180deg, ${theme.palette.purple.violet} 0%, ${theme.palette.purple.main} 100%)`} 1;
    ${({ theme }) => theme.media('min').xs} {
        max-height: 110px;
        justify-content: center;
    }
    ${({ theme }) => theme.media('min').sm} {
        max-width: fit-content
    }
    ${({ theme }) => theme.media('min').lg} {
        max-width: 280px;
        justify-content: unset;
    }
`;
export const MetricTitle = styled.p`
    font-family: ${MyFonts.THICCCBOI.bold};
    color: ${({ theme }) => theme.text.black};
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: 56px;
    ${({ theme }) => theme.media('min').xs} {
        font-size: 38px;
        line-height: 46px;
    }
    ${({ theme }) => theme.media('min').lg} {
        font-size: 48px;
        line-height: 56px;
    }
    ${({ theme }) => theme.media('min').lg} {
        font-size: 48px;
        line-height: 56px;
    }
`;

export const MetricLabel = styled.p`
    font-family: ${MyFonts.THICCCBOI.regular};
    color: ${({ theme }) => theme.text.gray.main};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
`;
