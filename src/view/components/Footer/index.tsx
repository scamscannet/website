// Core
import React, { FC } from 'react';

// Bus
// import {} from '../../../bus/'

import Logo from '@/assets/images/icons/logoTransparent.png';

// Styles
import * as S from './styles';
import { CustomLink } from '@/view/elements';
import { TelegramIcon, LinkedInIcon, XTwitter } from '@/assets/images/icons';

// Types
type PropTypes = {
    /* type props here */
}

export const Footer: FC<PropTypes> = () => {
    return (
        <S.Container id = '#contacts'>
            <S.Wrapper>
                <img
                    src = { Logo }
                    style = {{ width: '102px', height: '68px' }}
                />
                <S.Links>
                    <CustomLink
                        $styles = { S.EmailLinkStyles }
                        label = 'email_example@gmail.com'
                        to = 'mailto:email_example@gmail.com'
                    />
                    <S.Link>Im Staderfeld 63a, Neu Eliah, BW 96929</S.Link>
                    <S.Link>Schedule a virtual meeting:
                        <CustomLink
                            $styles = { S.BookAMeetingStyles }
                            label = 'Book a Meeting'
                            to = '#'
                        />
                    </S.Link>
                </S.Links>
                <S.Links>
                    <CustomLink
                        label = 'Privacy Policy'
                        to = '#'
                    />
                    <CustomLink
                        label = 'Terms & Conditions'
                        to = '#'
                    />
                    <S.SocialLinks>
                        <CustomLink to = '#'>
                            <TelegramIcon />
                        </CustomLink>
                        <CustomLink to = '#'>
                            <LinkedInIcon />
                        </CustomLink>
                        <CustomLink to = '#'>
                            <XTwitter />
                        </CustomLink>
                    </S.SocialLinks>
                </S.Links>
            </S.Wrapper>
            <S.Divider />
            <S.CopyRight>© 2023 ScamScan</S.CopyRight>
        </S.Container>
    );
};
