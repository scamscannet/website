// Core
import { MyFonts } from '@/assets/fonts';
import styled, { css } from 'styled-components';

export const Container = styled.section`
    width: 100%;
    padding: 0 24px;
    display: flex;
    justify-content: center;
`;

export const Wrapper = styled.div`
    display: flex;
    max-width: 1392px;
    width: 100%;
    padding: 48px;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    background: ${({ theme }) => `linear-gradient(89deg, ${theme.palette.purple.dark} 0.16%, ${theme.palette.black.dark} 15.46%, ${theme.palette.black.dark} 77.6%, ${theme.palette.purple.dark2} 99.28%)`};
    ${({ theme }) => theme.media('min').xs} {
        padding: 24px;
    }
    ${({ theme }) => theme.media('min').lg} {
        padding: 48px;
    }
`;

export const Title = css`
    color: #fff;
`;

export const Subtitle = css`
    margin-top: 16px;
    color: #fff;
    ${({ theme }) => theme.media('min').xs} {
        font-size: 16px;
        text-align: center;
    }
    ${({ theme }) => theme.media('min').md} {
        font-size: 18px;
        text-align: center;
    }
    ${({ theme }) => theme.media('min').lg} {
        font-size: 20px;
        text-align: center;
    }
`;

export const CardsWrapper = styled.div`
    margin-top: 48px;
    display: grid;
    grid-template: 1fr 1fr / 1fr 1fr;
    grid-gap: 48px;
    ${({ theme }) => theme.media('min').xs} {
        grid-template: 1fr 1fr 1fr 1fr / 1fr;
        grid-gap: 24px;
    }
    ${({ theme }) => theme.media('min').lg} {
        grid-template: 1fr 1fr / 1fr 1fr;
        grid-gap: 48px;
    }
`;

export const Card = styled.div`
    max-width: 475px;
    width: 100%;
    max-height: 220px;
    height: 100%;
    border-radius: 4px;

    display: flex;
    padding: 24px 48px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    transition: all.3s ease;
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(50px);
    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    ${({ theme }) => theme.media('min').xs} {
       padding: 12px 24px;
    }
    ${({ theme }) => theme.media('min').lg} {
        padding: 24px 48px;
    }
`;


export const IconWrapper = styled.div`
    width: 40px;
    height: 40px;
    ${({ theme }) => theme.media('min').xs} {
        width: 24px;
        height: 24px;
    }
    ${({ theme }) => theme.media('min').lg} {
        width: 40px;
        height: 40px;
    }
`;

export const CardTitle = styled.h5`
    font-family: ${MyFonts.THICCCBOI.regular};
    color: #fff;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 28px;
    ${({ theme }) => theme.media('min').xs} {
        font-size: 20px;
    }
`;

export const CardDescription = styled.p`
    font-family: ${MyFonts.THICCCBOI.regular};
    color: #fff;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px
    ${({ theme }) => theme.media('min').xs} {
        font-size: 14px;
    }
`;
