// Core
import { MyFonts } from '@/assets/fonts';
import styled, { css } from 'styled-components';


export const Card = styled.div`
    display: flex;
    width: 302px !important;
    padding: 12px;
    flex-direction: column;
    text-align: left;
    cursor: default;
    &:hover img  {
        scale: 1.2;
        transition: all .3s ease;
    }
    ${({ theme }) => theme.media('max').sm} {
        width: 302px !important;
        align-items: center;
        & img {
            width: 100%;
            width: 270px;
            height: 270px;
        }
    }
`;

export const CardDate = styled.span`
    font-family: ${MyFonts.THICCCBOI.regular};
    color: ${({ theme }) => theme.text.gray.secondary};
    margin-top: 12px;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 14px;
`;

export const CardTitle = styled.h5`
    font-family: ${MyFonts.THICCCBOI.bold};
    margin-top: 4px;
    color: ${({ theme }) => theme.text.black.main};
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
     ${({ theme }) => theme.media('max').sm} {
        font-size: 14px;
    };
`;

export const CardDescription = styled.p`
    font-family: ${MyFonts.THICCCBOI.regular};
    margin-top: 4px;
    color: ${({ theme }) => theme.text.gray.main};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    ${({ theme }) => theme.media('max').sm} {
        font-size: 14px;
    };
`;

export const LinkWrapper = styled.div`
    font-family: ${MyFonts.THICCCBOI.medium};
    margin-top: 25px;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.palette.purple.main};
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    cursor: pointer;
    ${({ theme }) => theme.media('max').sm} {
        font-size: 16px;
    };
`;


export const ImageContainer = styled.div`
    width: '278px';
    height: '302px';
    overflow: hidden;
`;

export const LinkStyles = css`
    padding:  0;
`;
