// Core
import React, { FC } from 'react';

// Bus
// import {} from '../../../bus/'

// Styles
import * as S from './styles';
import { CustomLink } from '@/view/elements';
import { CircleRightIcon } from '@/assets/images/icons';

// Images
import CardImage from '@/assets/images/RootPage/Card.png';

// Types
type PropTypes = {
    /* type props here */
    card: {
        date: string;
        title: string;
        description: string;
        link: string;
        image: string;
    },
}

export const Card: FC<PropTypes> = ({ card }) => {
    return (
        <S.Card >
            <S.ImageContainer>
                <img
                    alt = 'card_image'
                    draggable = { false }
                    loading = 'lazy'
                    src = { CardImage }
                    style = {{ transition: '.3s ease' }}
                />
            </S.ImageContainer>
            <S.CardDate>{card.date}</S.CardDate>
            <S.CardTitle>{card.title}</S.CardTitle>
            <S.CardDescription>
                {card.description}
            </S.CardDescription>
            <CustomLink
                $styles = { S.LinkStyles }
                to = { card.link }>
                <S.LinkWrapper>
                    <CircleRightIcon />
                    <span style = {{ marginLeft: '4px' }}>Find Out More</span>
                </S.LinkWrapper>
            </CustomLink>
        </S.Card>
    );
};
