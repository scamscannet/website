// Core
import React, { FC } from 'react';

// Bus
// import {} from '../../../bus/'

// Components
import { ErrorBoundary } from '../../components';

// Styles
import * as S from './styles';
import { SectionSubtitle, SectionTitle } from '@/view/elements';

// Types
type PropTypes = {
    /* type props here */
}

const AboutUs: FC<PropTypes> = () => {
    return (
        <S.Container>
            <SectionTitle $styles = { S.Title }>About ScamScan</SectionTitle>
            <S.ContentWrapper>
                <S.Column>
                    <SectionSubtitle>Introduction</SectionSubtitle>
                    <S.Text>
                        At ScamScan, our mission is to empower individuals and businesses
                        by providing a reliable and efficient platform for scam detection and online safety.
                        We are committed to
                        creating a secure digital environment where users can navigate the internet with confidence.
                    </S.Text>
                </S.Column>
                <S.Column>
                    <SectionSubtitle>Our mission</SectionSubtitle>
                    <S.Text>
                        At ScamScan, we are driven by a singular mission — to combat online scams
                        and foster a safer online experience. We believe in the power of
                        information and technology to protect users from digital threats.
                    </S.Text>
                </S.Column>
                <S.Column>
                    <SectionSubtitle>What we offer</SectionSubtitle>
                    <S.Text>
                        ScamScan offers a robust and user-friendly platform
                        for scanning websites, checking their legitimacy,
                        and raising awareness about potential scams.
                        Our tools are designed to provide real-time insights,
                        enabling users to make informed decisions about their online activities.
                    </S.Text>
                </S.Column>
            </S.ContentWrapper>
        </S.Container>
    );
};

export default () => (
    <ErrorBoundary>
        <AboutUs />
    </ErrorBoundary>
);
