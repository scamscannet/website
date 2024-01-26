// Core
import styled from 'styled-components';

// Images
import Background from '../../../../assets/images/RootPage/Background.png';
import { MyFonts } from '@/assets/fonts';

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 837px;
    height: 100%;
    background: center no-repeat url(${Background});
    background-size: contain;

    /* background-image: url(${Background}); */
    ${({ theme }) => theme.media('min').xs} {
        background: center no-repeat url(${Background});
        padding: 24px;
    }
    ${({ theme }) => theme.media('min').lg} {
        background: center no-repeat url(${Background});
        padding: 0px;
    }
`;

export const Block = styled.div`
    display: flex;
    margin: auto;
    margin-top: 350px;
    max-width: 793px;
    width: 100%;
    max-height: 464px;
    height: 100%;
    flex-direction: column;
    align-items: center;
    gap: 48px;
    text-align: center;
    /* background: red; */
    ${({ theme }) => theme.media('min').xs} {
        margin-top: 170px;
        gap: 24px;
    }

    ${({ theme }) => theme.media('min').md} {
        margin-top: 250px;
        gap: 48px;
    }
    ${({ theme }) => theme.media('min').lg} {
        margin-top: 350px;
    }
`;

export const Title = styled.h1`
    max-width: 793px;
    width: 100%;
    white-space: pre-wrap;
    color: ${({ theme }) => theme.text.black.main};
    text-align: center;
    font-family: ${MyFonts.THICCCBOI.bold};
    font-size: 60px;
    font-style: normal;
    font-weight: 800;
    line-height: 72px;
    ${({ theme }) => theme.media('min').xs} {
        font-size: 30px;
        line-height: 42px;
        max-width: 400px;
    }
    ${({ theme }) => theme.media('min').md} {
        font-size: 48px;
        line-height: 58px;
    }
    ${({ theme }) => theme.media('min').lg} {
        font-size: 60px;
        line-height: 72px;
        max-width: 793px;
    }
`;

export const TitleGradient = styled.span`
    background: ${({ theme }) => `linear-gradient(180deg, ${theme.palette.purple.violet} 0%, ${theme.palette.purple.main} 100%)`};
    background: ${({ theme }) => `-webkit-linear-gradient(180deg, ${theme.palette.purple.violet} 0%, ${theme.palette.purple.main} 100%)`};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;
