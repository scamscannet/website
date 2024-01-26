// Core
import React, { FC } from 'react';

// Hooks
import { useBasePath, useOverflowHidden } from '@/tools/hooks';

// Elements
import { CustomLink } from '@/view/elements';

// Styles
import * as S from './styles';

// Images
import Logo from '@/assets/images/icons/logoTransparency.png';
import { DomainZone, Logout, ScamCheck, WhoisQuery } from '@/assets/images/icons';

// Types
type PropTypes = {
    isMobileOpen: boolean
    handleMobileMenu: () => void
}

export const Sidebar: FC<PropTypes> = ({ isMobileOpen, handleMobileMenu }) => {
    const pathname = useBasePath();
    const overflowHandler = useOverflowHidden();
    const links = [
        {
            id:    1,
            label: 'Scam Check',
            Icon:  ScamCheck,
            link:  '/scam-check',
        },
        {
            id:    2,
            label: 'Whois Query',
            Icon:  WhoisQuery,
            link:  '/whois-query',
        },
        {
            id:    3,
            label: 'Domain Zone',
            Icon:  DomainZone,
            link:  '/domain-zone',
        },
    ];


    return (
        <S.SideBar $open = { isMobileOpen }>
            <S.SidebarContentWrapper>

                <S.LogoContainer>
                    <CustomLink
                        to = '/'
                        onClick = { () => overflowHandler(true) }>
                        <img
                            src = { Logo }
                            style = {{ width: '72px', height: '48px' }}
                        />
                    </CustomLink>
                </S.LogoContainer>
                <S.Menu>
                    <S.MenuItemsContainer>
                        {
                            links.map(({ Icon, id, label, link }) => {
                                return (
                                    <S.MenuItem
                                        $active = { pathname === link }
                                        key = { id }>
                                        <S.MenuItemSelected $active = { pathname === link } />
                                        <Icon />
                                        <CustomLink
                                            $styles = { S.LinkStyles }
                                            label = { label }
                                            to = { link }
                                            onClick = { handleMobileMenu }
                                        />
                                    </S.MenuItem>
                                );
                            })
                        }
                    </S.MenuItemsContainer>
                    <S.MenuItem>
                        <S.MenuItemSelected />
                        <Logout />
                        <CustomLink
                            $styles = { S.LinkStyles }
                            label = { 'Log out' }
                            to = { '#' }
                        />
                    </S.MenuItem>
                </S.Menu>
            </S.SidebarContentWrapper>
        </S.SideBar>
    );
};
