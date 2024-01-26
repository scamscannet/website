import { MyFonts } from '@/assets/fonts';
import styled, { css } from 'styled-components';

export const Container = styled.section`
    padding: 0 80px;
    margin-top: 48px;
    width: 100%;
    gap: 48px;
    display: flex;
    flex-direction: column;
`;

export const Navigation = styled.ul`
    display: flex;
    gap: 16px;
    align-items: center;
`;

export const NavigationItem = styled.li`

`;

export const NavigationLink = css`
    color: ${({ theme }) => theme.palette.purple.main};
    font-weight: 500;
`;

export const Circle = styled.span`
    display: block;
    background-color: ${({ theme }) => theme.text.gray.secondary};
    width: 8px;
    height: 8px;
    border-radius: 50%;
`;

export const Title = css`
    ${({ theme }) => theme.media('min').xs} {
        text-align: left;
    }
`;

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 344px;
    gap: 32px;
     ${({ theme }) => theme.media('max').lg} {
        display: grid;
        gap: 0;
        grid-template-columns: 1fr;
    }
`;

export const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    gap: 48px;
`;

export const ImageWrapper = styled.div`
    max-width: 900px;
    max-height: 480px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    & img {
        width: 100%;
    }
`;

export const ParagraphList = styled.ul`
    display: flex;
    flex-direction: column;
    /* list-style: disc;
    list-style-position: inside; */
`;

export const ParagraphListItem = styled.li`
    margin-top: 12px;
    position: relative;
    padding-left: 16px;
    &::before {
        content: '';
        color: #000;
        background-color: ${({ theme }) => theme.palette.purple.main};
        width: 8px;
        height: 8px;
        border-radius: 50%;
        font-size: 1.2em;
        position: absolute;
        left: 0px;
        top: 10px;
        transform: translateY(-50%);
    }
`;

export const RightSide = styled.aside<{$mt?: number}>`
    display: flex;
    flex-direction: column;
    max-width: 424px;
    width: 100%;
    height: fit-content;
    padding-top: 8px;
    gap: 32px;
    position: sticky;
    top: 0;
    ${({ theme }) => theme.media('max').lg} {
        display: none
    }
    ${({ $mt }) => $mt && `top: ${$mt}px`}
`;

export const DateHashtagsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const HashtagsWrapper = styled.div`
    display: flex;
    gap: 8px;    
`;

export const Subtitle = css`
    max-width: 100% !important;
    color: ${({ theme }) => theme.text.gray.main};
    ${({ theme }) => theme.media('min').lg} {
        font-size: 16px;
    }
    ${({ theme }) => theme.media('min').xs} {
        font-size: 16px;
    }
    ${({ theme }) => theme.media('min').md} {
        font-size: 16px;
    }
`;

export const TablesOfContent = styled.h3`
    color: ${({ theme }) => theme.text.gray.main};
    font-family: ${MyFonts.THICCCBOI.regular};
    font-size: 28px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px; 
`;

export const AnchorsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-left: 8px;
    padding-left: 24px;
    border-left: 1px solid ${({ theme }) => theme.text.gray.secondary};
`;

export const Ancor = (active?: boolean) => css`
    color: ${({ theme }) => active ? theme.palette.purple.main : theme.text.gray.secondary};
`;
