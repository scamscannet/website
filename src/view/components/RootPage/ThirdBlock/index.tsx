// Core
import React, { FC } from 'react';

// Bus
// import {} from '../../../bus/'


// Styles
import * as S from './styles';
import { DownloadIcon, IpIcon, LocationIcon, SearchIcon } from '@/assets/images/icons';
import { SectionSubtitle, SectionTitle } from '@/view/elements';

// Types
type PropTypes = {
    /* type props here */
}

export const ThirdBlock: FC<PropTypes> = () => {
    return (
        <S.Container id = '#tools'>
            <S.Wrapper>
                <SectionTitle $styles = { S.Title }>Empowering You with Tools</SectionTitle>
                <SectionSubtitle $styles = { S.Subtitle }>
                    Explore our suite of tools for a comprehensive online experience
                </SectionSubtitle>
                <S.CardsWrapper>
                    <S.Card>
                        <S.IconWrapper>
                            <SearchIcon />
                        </S.IconWrapper>
                        <S.CardTitle>Domain Whois</S.CardTitle>
                        <S.CardDescription>
                            Uncover ownership and registration details seamlessly,
                            making sure your online activities rely on trustworthy information
                        </S.CardDescription>
                    </S.Card>
                    <S.Card>
                        <S.IconWrapper>
                            <IpIcon />
                        </S.IconWrapper>
                        <S.CardTitle>IP Whois</S.CardTitle>
                        <S.CardDescription>
                            Discover ownership and location details for any IP address,
                            ensuring a safer online experience with valuable insights
                        </S.CardDescription>
                    </S.Card>
                    <S.Card>
                        <S.IconWrapper>
                            <DownloadIcon />
                        </S.IconWrapper>
                        <S.CardTitle>Domain zone downloads</S.CardTitle>
                        <S.CardDescription>
                            Access and download essential domain zone data,
                            strengthening your online presence with valuable information
                        </S.CardDescription>
                    </S.Card>
                    <S.Card>
                        <S.IconWrapper>
                            <LocationIcon />
                        </S.IconWrapper>
                        <S.CardTitle>Geolocation</S.CardTitle>
                        <S.CardDescription>
                            Explore precise location data, enriching your online encounters
                            with insights that enhance awareness and contribute to a safer digital environment
                        </S.CardDescription>
                    </S.Card>
                </S.CardsWrapper>
            </S.Wrapper>
        </S.Container>
    );
};
