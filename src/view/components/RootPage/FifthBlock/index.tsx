/* eslint-disable @typescript-eslint/indent */
// Core
import React, { FC, useState, useRef } from 'react';
import Slider, { Settings } from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { BLOG } from '@/view/routes/book';

// Bus
// import {} from '../../../bus/'

import { Arrow } from '@/assets/images/icons';

// Styles
import * as S from './styles';
import { Button, SectionSubtitle, SectionTitle } from '@/view/elements';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { breakpoints } from '@/assets';
import { Card } from '../../Card';

// Types
type PropTypes = {
    /* type props here */
}

const cards = [
        {
            date:        '20 March 2023',
            title:       'Enhancing Security with FIDO Keys in 2FA Protocols',
            description: 'Understand the robust security benefits that FIDO keys bring to two-factor authentication (2FA) systems. Explore the technology behind...',
            link:        '#',
            image:       '#',
        },
        {
            date:        '20 March 2023',
            title:       'Emerging Trends in Phishing: A Snapshot of Current Cyber Threats',
            description: 'Stay informed about the latest developments in phishing attacks. This article provides an objective overview of new trends...',
            link:        '#',
            image:       '#',
        },
        {
            date:        '20 March 2023',
            title:       'Practical Measures: 5 Tips to Prevent Online Scams',
            description: 'Take proactive steps to safeguard yourself from online scams with these five practical tips. Backed by security principles, this article provides...',
            link:        '#',
            image:       '#',
        },
        {
            date:        '20 March 2023',
            title:       'Recovering from a Scam: Practical Steps to Take After Falling Victim',
            description: ' If you’ve been scammed, don’t panic— take control. This article guides you through the immediate actions to mitigate damage, report...',
            link:        '#',
            image:       '#',
        },
        {
            date:        '20 March 2023',
            title:       'Enhancing Security with FIDO Keys in 2FA Protocols',
            description: 'Understand the robust security benefits that FIDO keys bring to two-factor authentication (2FA) systems. Explore the technology behind...',
            link:        '#',
            image:       '#',
        },
        {
            date:        '20 March 2023',
            title:       'Practical Measures: 5 Tips to Prevent Online Scams',
            description: 'Take proactive steps to safeguard yourself from online scams with these five practical tips. Backed by security principles, this article provides...',
            link:        '#',
            image:       '#',
        },
    ];

export const FifthBlock: FC<PropTypes> = () => {
    const [ currentSlide, setCurrentSlide ] = useState(0);
    const navigate = useNavigate();
    const ref = useRef<Slider>(null);
    const settings: Settings = {
        dots:           false,
        infinite:       true,
        speed:          500,
        arrows:         false,
        slidesToShow:   4,
        slidesToScroll: 1,
        initialSlide:   0,
        beforeChange:   (_, next) => setCurrentSlide(next),
        responsive:     [
            {
                breakpoint: breakpoints.sm,
                settings:   {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: breakpoints.md,
                settings:   {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 1020,
                settings:   {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 1440,
                settings:   {
                    slidesToShow: 3,
                },
            },
        ],
    };

    return (
        <S.Container>
            <SectionTitle $styles = { S.Title }>Insights and Updates</SectionTitle>
            <SectionSubtitle $styles = { S.Subtitle }>
                Stay informed with our latest articles and helpful tips
            </SectionSubtitle>
            <S.Slider>
                <Slider
                    ref = { ref }
                    { ...settings }>
                    {
                        cards.map((card, idx) => {
                            return (
                                <S.CardWrapper
                                    key = { card.title + idx }>
                                    <Card
                                        card = { card }
                                    />
                                </S.CardWrapper>
                            );
                        })
                    }
                </Slider>
            </S.Slider>
            <S.Navigation>
                <Arrow
                    style = {{ cursor: 'pointer' }}
                    onClick = { () => ref.current?.slickPrev() }
                />
                <S.ProgressButtonContainer>
                    {
                        cards.map((card, idx) => (
                            <S.ProgressButton
                                $isActive = { currentSlide === idx }
                                key = { idx }
                                onClick = { () => ref.current?.slickGoTo(idx) }
                            />
                        ))
                    }
                </S.ProgressButtonContainer>
                <Arrow
                    style = {{ transform: 'rotate(180deg)', cursor: 'pointer' }}
                    onClick = { () => ref.current?.slickNext() }
                />
            </S.Navigation>
            <Button
                $styles = { S.Button }
                onClick = { () => navigate(BLOG) } >Read More on Our Blog
            </Button>
        </S.Container>
    );
};
