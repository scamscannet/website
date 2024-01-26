import { MyFonts } from '@/assets/fonts';
import styled, { css, keyframes } from 'styled-components';

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


export const Container = styled.main`
    display: flex;
    width: 100%;
    position: relative;
`;

export const SideBar = styled.aside<{$open?: boolean}>`
    display: flex;
    flex-direction: column;
    width: 216px;
    background: ${({ theme }) => theme.palette.black.dark};
    ${({ theme }) => theme.media('max').lg} {
        min-height: 100vh;
        display: ${({ $open }) => $open ? 'flex' : 'none'};
        position: fixed;
        top: 0;
        left: 0;
        animation-name: ${appearanceMobileHeader};
        animation-duration: .3s;
        z-index: 99999;
    }
`;

export const SidebarContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    ${({ theme }) => theme.media('max').lg} {
        overflow-y: scroll;
        height: 100svh;
    }
`;

export const Overlay = styled.div<{$isOpen?: boolean}>`
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    display: none;
    z-index: 9999;
    ${({ theme }) => theme.media('max').lg} {
        display: ${({ $isOpen }) => $isOpen ? 'block' : 'none'};
        position: fixed;
        top: 0;
        left: 0;
    }
`;

export const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 16px;
`;

export const Menu = styled.nav`
    display: flex;
    flex-direction: column;
    padding: 24px 16px;
    justify-content: space-between;
    height: 100%;
    height: calc(100% - 95px);
`;

export const MenuItemsContainer = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const MenuItem = styled.li<{$active?: boolean}>`
    list-style: none;
    display: flex;
    border-radius: 4px;
    background: ${({ $active }) => $active ? 'rgba(249, 250, 251, 0.20)' : 'transparent'};
    padding: 8px 8px 8px 0px;
    align-items: center;
    height: 40px;
    gap: 8px;
`;

export const MenuItemSelected = styled.div<{$active?: boolean}>`
    background: transparent;
    width: 18px;
    height: 22px;
    position: relative;
    &::before {
        content: '';
        position: absolute;
        display: ${({ $active }) => $active ? 'block' : 'none'};
        top: 0;
        left: 0;
        width: 3px;
        height: 100%;
        background: #fff;
        border-radius: 50px;
    }
`;

export const LinkStyles = css`
    font-family: ${MyFonts.THICCCBOI.regular};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; 
    color: white;
    text-decoration: none;
`;

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - 216px);
    /* height: fit-content; */
    min-height: 100vh;
    background: ${({ theme }) => theme.palette.gray.background};
    ${({ theme }) => theme.media('max').lg} {
        width: 100%;
    }
`;

export const Header = styled.header`
    padding: 16px 48px 16px 72px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    ${({ theme }) => theme.media('max').lg} {
        display: flex;
        align-items: center;
        padding: 4px 12px;
        height: 68px;
        justify-content: unset;
        gap: 24px;
    }
`;

export const SvgWrapper = styled.div`
    width: 24px;
    height: 24px;
    display: none;
    ${({ theme }) => theme.media('max').lg} {
        display: block;
    }
`;

export const OutletWrapper = styled.div`
    padding: 24px 48px 0px;
    min-height: 667px;
    height: 100%;
    ${({ theme }) => theme.media('max').sm} {
        padding: 0;
    }
`;

export const Footer = styled.footer`
    margin-top: auto;
    padding: 48px 48px 16px;
    display: flex;
    justify-content: space-between;
    /* ${({ theme }) => theme.media('max').lg} {
        padding: 32px;
        align-items: center;
    } */
    ${({ theme }) => theme.media('max').sm} {
        padding: 12px;
        align-items: center;
    }
`;

export const FooterText = styled.p`
    color: ${({ theme }) => theme.text.gray.main};
    font-family: ${MyFonts.THICCCBOI.regular};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; 
`;

export const LinksWrapper = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;
    gap: 4px;
    ${({ theme }) => theme.media('max').sm} {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        place-items: center;
    }
`;

export const Link = styled.li`
    ${({ theme }) => theme.media('max').md} {
        width: fit-content;
        text-wrap: nowrap;
    }
`;

export const FooterLinkStyles = css`
    padding: 8px;
    color: ${({ theme }) => theme.text.gray.main};
    font-family: ${MyFonts.THICCCBOI.regular};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
    transition: all.3s ease;
    &:hover {
        color: ${({ theme }) => theme.palette.purple.main};
    }
`;

export const CustomLink = css`
    margin-left: auto;
    ${({ theme }) => theme.media('max').lg} {
        display: none;
    }
`;
