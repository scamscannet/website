// Core
import { MyFonts } from '@/assets/fonts';
import styled, { css } from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    box-shadow: 0px 2px 12px 0px rgba(101, 101, 101, 0.03);
    border: 1px solid #F5F5F5;
`;

export const Header = styled.div`
    padding: 12px 24px;
    font-family: ${MyFonts.THICCCBOI.semiBold};
    color: ${({ theme }) => theme.text.gray.main};
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 17px;
    background: #F9FAFB;
`;

export const Description = styled.div`
    padding: 12px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: ${MyFonts.THICCCBOI.regular};
    color: ${({ theme }) => theme.text.gray.main};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    ${({ theme }) => theme.media('max').sm} {
        flex-direction: column;
        gap: 24px;
    }
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
    text-wrap: nowrap;
`;

export const ImageWrapper = styled.div`
    padding: 24px;
    position: relative;
    cursor: pointer;
    img {
        width: 100%;
    }
`;

export const ImageOverlay = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.15);

    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    display: flex;

    transition: all.3s ease;

    &:hover {
        opacity: 1;
    }

    ${({ theme }) => theme.media('max').lg} {
        display: none;
    }
`;

export const WebModal = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 38px;
    display: flex;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 9999;
`;

export const CloseModal = styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 40px;
    font-weight: bold;
    color: ${({ theme }) => theme.palette.gray.info};
    z-index: 9999;
    &:hover {
        color: #fff;
    }
`;

export const WebTextWrapper = styled.div`
    background-color: #fff;
    width: 100%;
    max-width: 1070px;
    border-radius: 4px;
    padding: 32px;
    overflow-wrap: anywhere;
    overflow-y: scroll;
    max-height: 800px;
    margin: unset;

    ${({ theme }) => theme.media('max').sm} {
        padding: 10px;
    }


`;

export const WebText = styled.pre`
    display: flex;
    gap: 4px;
    font-family: sans-serif;
    color: ${({ theme }) => theme.palette.black.dark};
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    text-wrap: wrap;
`;


export const ButtonStyles = css`
    background-color: #fff;
    border: 0;
    margin: auto;
`;

export const NoImage = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
    justify-content: center;
`;


export const ErrorMesageStyles = css`
    color: ${({ theme }) => theme.text.gray.main};
    margin-bottom: 12px;
`;
