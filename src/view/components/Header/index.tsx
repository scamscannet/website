// Core
import React, { FC, useEffect, useLayoutEffect, useState } from 'react';

// Bus
// import {} from '../../../bus/'

// Routes
import * as ROUTES from '../../routes/book';

// Images
import Logo from '@/assets/images/icons/logo.png';

// Styles
import * as S from './styles';
import { Button, CustomLink } from '@/view/elements';
import { useComponentWidth, useOverflowHidden, useScroll } from '@/tools/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuIcon } from '@/assets/images/icons/menuIcon';
import { HeaderSearchBar } from '../HeaderSearchBar';
import { breakpoints } from '@/assets';


    // Types
    type PropTypes = {
        /* type props here */
        setModalActive: React.Dispatch<React.SetStateAction<boolean>>
        isModalActive: boolean
    }


export const Header: FC<PropTypes> = ({ setModalActive, isModalActive }) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const scrolled = useScroll();
    const overflowHandler = useOverflowHidden();
    const { ref, width } = useComponentWidth();
    const navigate = useNavigate();

    const location = useLocation();

    const handleModalOpen = () => {
        setModalActive(true);
    };

    const handleMobileMenu = () => {
        setIsOpen(!isOpen);
        overflowHandler(true);
    };

    const links = [
        {
            label: 'About Us',
            link:  ROUTES.ABOUT_US,
        },
        {
            label: 'Tools',
            link:  '#tools',
        },
        {
            label: 'Blog',
            link:  ROUTES.BLOG,
        },
        {
            label: 'Contacts',
            link:  '#contacts',
        },
    ];

    const scrollToSection = (sectionId: string | number) => {
        const section = document.getElementById(`${sectionId}`);
        const headerHeight = ref.current?.getBoundingClientRect().height;
        if (section) {
            window.scrollTo({ behavior: 'smooth', top: section.getBoundingClientRect().top - document.body.getBoundingClientRect().top - (headerHeight ? headerHeight : 0) });
        }
    };

    useLayoutEffect(() => {
        if (location.hash === '#tools') {
            scrollToSection('#tools');
        }
    }, [ location.hash ]);

    useEffect(() => {
        if (width >= breakpoints.lg) {
            overflowHandler(true);
        } else {
            isOpen && overflowHandler(false);
        }
    }, [ width ]);

    return (

        <S.Header
            $scrolled = { scrolled }
            ref = { ref } >
            <S.MenuIcon onClick = { () => {
                setIsOpen(true);
                overflowHandler(isOpen);
            } }>
                <MenuIcon
                    height = { 24 }
                    width = { 24 }
                />
            </S.MenuIcon>
            <S.Wrapper
                $isOpen = { isOpen }>
                <S.Column>
                    <CustomLink
                        to = '/'
                        onClick = { handleMobileMenu }>
                        <img
                            src = { Logo }
                            style = {{ width: '72px', height: '48px' }}
                        />
                    </CustomLink>
                </S.Column>
                <S.Column
                    $show = { scrolled }
                    $styles = { S.SearchBarColumnStyles }>
                    <HeaderSearchBar scamCheck />
                </S.Column>
                <S.Column>
                    <S.LinksWrapper $show>
                        <S.LinksWrapper $show = { scrolled }>
                            {
                                links.map((link, idx) => {
                                    const styles = S.LinkStyles(link.link === location.pathname);

                                    if (idx === 1) {
                                        return (
                                            <S.LocalAnchorLink
                                                key = { link.label + idx }
                                                onClick = { () => {
                                                    if (location.pathname !== '/') {
                                                        navigate(`/${link.link}`);
                                                    }
                                                    scrollToSection(link.link);
                                                    handleMobileMenu();
                                                } }>
                                                {link.label}
                                            </S.LocalAnchorLink>
                                        );
                                    }

                                    if (idx === 3) {
                                        return (
                                            <S.LocalAnchorLink
                                                key = { link.label + idx }
                                                onClick = { () => {
                                                    scrollToSection(link.link);
                                                    handleMobileMenu();
                                                } }>
                                                {link.label}
                                            </S.LocalAnchorLink>
                                        );
                                    }

                                    return (
                                        <CustomLink
                                            $styles = { styles }
                                            key = { link.label + idx }
                                            label = { link.label }
                                            to = { link.link }
                                            onClick = { handleMobileMenu }
                                        />
                                    );
                                })
                            }
                        </S.LinksWrapper>
                        <Button
                            $styles = { S.ScamReportButton }
                            $variant = 'outlined'
                            onClick = { () => {
                                overflowHandler(isModalActive);
                                handleModalOpen();
                            } }>Report a Scam
                        </Button>
                        <CustomLink
                            $styles = { S.OpenAppBtn }
                            to = '/scam-check'
                            onClick = { () => overflowHandler(true) }>
                            <Button>Open App</Button>
                        </CustomLink>
                    </S.LinksWrapper>
                </S.Column>
            </S.Wrapper>
            <S.Overlay
                $isOpen = { isOpen }
                onClick = { handleMobileMenu }
            />
        </S.Header>
    );
};
