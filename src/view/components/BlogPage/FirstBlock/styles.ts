import { MyFonts } from '@/assets/fonts';
import styled, { css, keyframes } from 'styled-components';

const appearance = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`;

export const Container = styled.section`
    margin-top: 60px;
    max-height: 480px;
    height: 100%;
    width: 100%;
    padding: 0 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${({ theme }) => theme.media('min').xs} {
        flex-direction: column;
        max-height: fit-content;
        align-items: flex-start;
        gap: 24px;
        padding: 0 24px;
    }
    @media (min-width: 1200px) {
        flex-direction: row;
    }
    ${({ theme }) => theme.media('min').xl} {
        padding: 0 80px;
        gap: 0;
        align-items: center;
        max-height: 480px;
        height: 100%;
    }
`;

export const LeftSide = styled.div`
    max-width: 398px;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: start;
`;

export const Title = css`
    ${({ theme }) => theme.media('min').xs} {
        text-align: start;
        margin-bottom: 16px;
    }
`;

export const RightSide = styled.div`
    max-width: 858px;
    width: 100%;
    height: fit-content;
`;

export const CardsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    ${({ theme }) => theme.media('min').xs} {
        flex-direction: column;
        width: 100%;
        gap: 24px;
    }
    ${({ theme }) => theme.media('min').md} {
        flex-direction: row;
    }
    ${({ theme }) => theme.media('min').xl} {
    }
`;

export const Card = styled.div<{$active?: boolean}>`
    width: 197px;
    height: 480px;
    position: relative;
    overflow: hidden;
    transition: .3s ease;
    border-radius: 4px;
    & img {
        position: absolute;
        top: 0;
        left: -200px;
        height: 480px;
    }
    
    ${({ $active }) => $active && 'width: 416px;'}

    ${({ theme }) => theme.media('min').xs} {
        flex-direction: column;
        width: 100%;
        height: 300px;
        ${({ $active }) => $active && 'width: 100%;'}
        & img {
            position: absolute;
            top: 0;
            left: 0px;
            height: 480px;
        }
    }
    ${({ theme }) => theme.media('min').lg} {
        width: 100%;
        height: 480px;
        width: 250px;
        ${({ $active }) => $active && 'width: 350px;'}
        & img {
            left: 0px;
            height: 480px;
        }
    }
    ${({ theme }) => theme.media('min').xl} {
        width: 197px;
        height: 480px;
        align-items: flex-start;
        ${({ $active }) => $active && 'width: 416px;'}
         & img {
            left: -200px;
            height: 480px;
        }
    }
`;

export const DescriptionBlock = styled.div<{$active?: boolean}>`
    padding: 12px 24px;
    display: ${({ $active }) => $active ? 'flex' : 'none'};
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    justify-content: space-between;
    align-items: center;
    background: rgba(9, 10, 11, 0.20);
    transition: none;
    animation: ${appearance} 1s linear;
    ${({ theme }) => theme.media('min').xs} {
        display: flex;
    }
    ${({ theme }) => theme.media('min').md} {
        flex-direction: column;
        text-align: center;
    }
    ${({ theme }) => theme.media('min').xl} {
        flex-direction: row;
        text-align: start;
        display: ${({ $active }) => $active ? 'flex' : 'none'};
    }
`;

export const DescriptionText = styled.p`
    font-family: ${MyFonts.THICCCBOI.semiBold};
    color: #fff;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    max-width: 216px;
`;
