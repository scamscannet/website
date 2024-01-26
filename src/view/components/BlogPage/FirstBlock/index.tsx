// Core
import React, { useState } from 'react';

// Elements
import { Button, CustomLink, SectionSubtitle, SectionTitle } from '@/view/elements';

// Images
import BlogCardImg1 from '../../../../assets/images/BlogPage/blog_page_img1.jpg';
import BlogCardImg2 from '../../../../assets/images/BlogPage/blog_page_img2.jpg';
import BlogCardImg3 from '../../../../assets/images/BlogPage/blog_page_img3.jpg';

// Styles
import * as S from './styles';

const cards = [
    {
        id:      1,
        label:   'Enhancing Security with FIDO Keys in 2FA Protocols',
        img_url: BlogCardImg1,
        link:    '/blog/1',
    },
    {
        id:      2,
        label:   'Enhancing Security with FIDO Keys in 2FA Protocols',
        img_url: BlogCardImg2,
        link:    '/blog/2',
    },
    {
        id:      3,
        label:   'Enhancing Security with FIDO Keys in 2FA Protocols',
        img_url: BlogCardImg3,
        link:    '/blog/3',
    },
];

export const FirstBlock = () => {
    const [ activeCard, setActiveCard ] = useState(0);

    return (
        <S.Container>
            <S.LeftSide>
                <SectionTitle $styles = { S.Title }>
                    Explore Our Featured Insights on Online Safety
                </SectionTitle>
                <SectionSubtitle>
                    Dive into our curated selection of articles focusing on online safety and scam awareness.
                    Stay informed, stay secure.
                </SectionSubtitle>
            </S.LeftSide>
            <S.RightSide>
                <S.CardsWrapper>
                    {
                        cards.map((card, idx) => {
                            return (
                                <S.Card
                                    $active = { idx === activeCard }
                                    key = { card.id }
                                    onMouseEnter = { () => {
                                        setActiveCard(idx);
                                    } }>
                                    <img
                                        alt = 'blog_card_img'
                                        src = { card.img_url }
                                    />
                                    <S.DescriptionBlock $active = { idx === activeCard }>
                                        <S.DescriptionText>{card.label}</S.DescriptionText>
                                        <CustomLink to = { card.link }>
                                            <Button>Read More</Button>
                                        </CustomLink>
                                    </S.DescriptionBlock>
                                </S.Card>
                            );
                        })
                    }
                </S.CardsWrapper>
            </S.RightSide>
        </S.Container>
    );
};
