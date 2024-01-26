// Core
import React, { createContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

// Styles
import * as S from './styles';
import { Sidebar } from './Sidebar';
import { Button, CustomLink } from '@/view/elements';
import { HeaderSearchBar, Modal } from '@/view/components';
import { useWhoisquery } from '@/bus/whoisquery';
import { useScamCheck } from '@/bus/scamcheck';
import { MenuIcon } from '@/assets/images/icons/menuIcon';
import { useComponentWidth, useOverflowHidden } from '@/tools/hooks';
import { breakpoints } from '@/assets';

type IContext = {
    isModalActive: boolean,
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalContext = createContext<IContext | null>(null);

export const WebAppLayout = () => {
    const { whoisquery: { whoisQuery }} = useWhoisquery();
    const { scamchek: { scamCheck }} = useScamCheck();
    const { pathname, hash } = useLocation();
    const { ref, width } = useComponentWidth();
    const [ isMobileOpen, setIsMobileOpen ] = useState(false);
    const [ isModalActive, setModalActive ] = useState(false);
    const overflowHandler = useOverflowHidden();


    const links = [
        {
            id:    1,
            label: 'Home',
            link:  '/',
        },
        {
            id:    2,
            label: 'Blog',
            link:  '/blog',
        },
        {
            id:    3,
            label: 'About us',
            link:  '/about-us',
        },
        {
            id:    4,
            label: 'Privacy Policy',
            link:  '/privacy-policy',
        },
        {
            id:    5,
            label: 'Terms & Conditions',
            link:  '/terms-and-conditions',
        },
    ];

    useEffect(() => {
        if (width >= breakpoints.lg) {
            isMobileOpen && overflowHandler(true);
        } else {
            isMobileOpen && overflowHandler(false);
        }
    }, [ width ]);

    const handleMobileMenu = () => {
        // eslint-disable-next-line max-statements-per-line
        if (width >= breakpoints.lg) { return; }
        setIsMobileOpen(!isMobileOpen);
        if (isMobileOpen) {
            overflowHandler(true);
        } else {
            overflowHandler(false);
        }
    };

    return (
        <ModalContext.Provider value = {{ isModalActive, setModalActive }}>
            <S.Container ref = { ref }>
                <Sidebar
                    handleMobileMenu = { handleMobileMenu }
                    isMobileOpen = { isMobileOpen }
                />
                <S.Overlay
                    $isOpen = { isMobileOpen }
                    onClick = { handleMobileMenu }
                />
                <S.ContentWrapper>
                    <S.Header>
                        <S.SvgWrapper onClick = { handleMobileMenu }>
                            <MenuIcon />
                        </S.SvgWrapper>
                        {((whoisQuery && hash && pathname === '/whois-query') || (scamCheck.domain && hash && pathname === '/scam-check')) && (
                            <HeaderSearchBar
                                placeholder = 'Type a new website to check'
                                scamCheck = { pathname === '/scam-check' }
                            />
                        )}
                        <CustomLink
                            $styles = { S.CustomLink }
                            to = '/' >
                            <Button>
                                Return to site
                            </Button>
                        </CustomLink>
                    </S.Header>
                    <S.OutletWrapper>
                        <Outlet />
                    </S.OutletWrapper>
                    <S.Footer>
                        <S.FooterText>© 2023 ScamScan. All Rights Reserved.</S.FooterText>
                        <S.LinksWrapper>
                            {
                                links.map((link) => {
                                    return (
                                        <S.Link key = { link.id }>

                                            <CustomLink
                                                $styles = { S.FooterLinkStyles }
                                                label = { link.label }
                                                to = { link.link }
                                            />
                                        </S.Link>
                                    );
                                })
                            }
                        </S.LinksWrapper>
                    </S.Footer>
                </S.ContentWrapper>
                {isModalActive && (
                    <Modal
                        onClose = { () => {
                            overflowHandler(isModalActive);
                            setModalActive(false);
                        } }>
                    </Modal>
                )}
            </S.Container>
        </ModalContext.Provider>
    );
};
