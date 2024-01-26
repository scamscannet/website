// Core
import { MyFonts } from '@/assets/fonts';
import { RuleSet, css } from 'styled-components';
import styled, { keyframes } from 'styled-components';

export const appearanceAnimation = keyframes`
 0% { opacity: 0 }
 30% { opacity: 0.5 }
 40% { opacity: 0.7; }
 100% { opacity: 1; }
`;

export const appearanceMobileHeader = keyframes`
    0% {
        left: -100%;
    }
    50% {
        left: -50%;
    }
    100% {
        left: 0;
    }
`;

export const Header = styled.header<{$scrolled: boolean}>`
    position: fixed;
    width: 100%;
    top: 0; /* required */
    padding: 24px 80px;
    transition: all 1s ease;
    z-index: 9999;
    background: ${({ $scrolled }) => $scrolled ? '#fff' : 'transparent'};
    ${({ theme }) => theme.media('max').lg} {
        padding: 0 12px;
        height: 48px;
        transition: all.3s ease;
    };
`;

export const Wrapper = styled.ul<{$isOpen: boolean}>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    margin: 0;
    list-style: none;
     ${({ theme }) => theme.media('max').lg} {
        flex-direction: column;
        position: absolute;
        top: 0;
        left: 0;
        background: #fff;
        width: 250px;
        height: 100vh;
        overflow-y: scroll;
        z-index: 9998;
        padding: 0 12px;
        gap: 24px;
        justify-content: unset;
        display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
        animation-name: ${appearanceMobileHeader};
        animation-duration: .3s;
        transition: all.3s ease;
    };
`;

export const Column = styled.li<{$styles?: RuleSet<object>, $show?: boolean, $hidelogo?: boolean}>`
    /* width: fit-content; */
    padding: 0;
    margin: 0;
    ${({ $show = true }) => $show ? 'display: flex' : 'display: none'};
    ${({ $styles }) => $styles ? $styles : ''}
    ${({ theme }) => theme.media('max').lg} {
        display: flex;
    };
`;

export const SearchBar = styled.div`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    padding: 12px;
    animation-name: ${appearanceAnimation};
    border: 1px solid transparent;
    border-bottom: 1px solid ${({ theme }) => theme.palette.gray.lightGrey};
    animation-duration: 1s;
    transition: all.3s ease;
    &:focus-within {
        border-bottom: 1px solid ${({ theme }) => theme.palette.gray.lightGrey};
        border: 1px solid ${({ theme }) =>  theme.palette.purple.main} ;
        box-shadow: 0px 0px 0px 2px rgba(151, 71, 255, 0.20);
        border-radius: 2px;
    }
    &:hover {
        border-bottom: 1px solid ${({ theme }) => theme.palette.purple.main};
    }
`;

export const Input = styled.input`
    width: 100%;
    height: 100%;
    padding: 0;
    outline: 0;
    border: 0;
    margin: 0;
    height: 100%;
    font-family: ${MyFonts.THICCCBOI.regular};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    color: ${({ theme }) => theme.text.gray.main};
    &::placeholder {
        color: ${({ theme }) => theme.text.gray.secondary};
    }
    &:focus {
        margin: 0;
        padding: 0;
        width: 100%;
        outline: 0;
        width: calc(100% - 20px);
    }
`;

export const LinksWrapper = styled.ul<{$show?: boolean, $styles?:RuleSet<object> | undefined}>`
    display: ${({ $show }) => $show ? 'flex' : 'none'};
    align-items: center;
    list-style: none;
    ${({ theme }) => theme.media('max').lg} {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;
        ${({ $styles }) => $styles}
    };
`;

export const ScamReportButton = css`
    margin-right: 16px;
    margin-left: 8px;
    white-space: nowrap;
    ${({ theme }) => theme.media('max').lg} {
        margin-left: 0;
        width: 160px;
    }
`;

export const AnchorLink = styled.span<{$styles: RuleSet<object> | undefined}>`
    ${({ $styles }) => $styles}
`;


export const Overlay = styled.div<{$isOpen?: boolean}>`
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    z-index: 9997;
    display: none;
    ${({ theme }) => theme.media('max').lg} {
        display: ${({ $isOpen }) => $isOpen ? 'block' : 'none'}
    }
`;

export const SearchBarColumnStyles = css`
    max-width: 432px;
    width: 100%;
`;

export const LinkStyles = ($active?: boolean) => css`
    color: ${({ theme }) => $active ? theme.palette.purple.main : theme.text.black.main};
    margin-right: 8px;
    white-space: nowrap;
    font-family: ${MyFonts.THICCCBOI.medium};
    animation-name: ${appearanceAnimation};
    animation-duration: 1.5s;
    transition: all.3s ease;
    &:hover {
        color: ${({ theme }) => theme.text.purple.main};
    }
    &:active {
        color: ${({ theme }) => theme.palette.purple.dark};
    }
`;

export const MenuIcon = styled.div`
    display: none;
    ${({ theme }) => theme.media('max').lg} {
        position: relative;
        background-color: yelow;
        height: 48px;
        width: 48px;
        padding: 12px;
        display: block;
    }
`;

export const linkWrapperStyles = css`
    height: 324px; 
    width: 100%;
    justify-content: space-between;
`;

export const ColumnLinkStyles = css`
    width: 100%;
    margin-top: 20px;
`;

export const OpenAppBtn = css`
    padding: 0;

    ${({ theme }) => theme.media('max').lg} {
        width: 160px;
    }

    button {
        ${({ theme }) => theme.media('max').lg} {
            width: 100%;
        }
    }
`;

export const LocalAnchorLink = styled.span`
    font-family: ${MyFonts.THICCCBOI.medium};
    color: ${({ theme }) => theme.text.gray.main};
    padding: 8px;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    cursor: pointer;
    text-decoration: none;
    margin-right: 8px;
    animation-name: ${appearanceAnimation};
    animation-duration: 1.5s;
    transition: all.3s ease;
    &:hover {
            color: ${({ theme }) => theme.text.purple.main};
    }
`;
