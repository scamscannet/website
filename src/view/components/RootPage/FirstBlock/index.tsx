// Core
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
// Bus
// import {} from '../../../bus/'

// Elements
import { SectionSubtitle } from '@/view/elements';

// Constants
import * as book from '@/view/routes/book';

// Styles
import * as S from './styles';

// Schema
import { SearchBar } from '../../SearchBar';

// Types
type PropTypes = {
    /* type props here */
}

export const FirstBlock: FC<PropTypes> = () => {
    const navigate = useNavigate();

    return (
        <S.Container>
            <S.Block>
                <S.Title>
                    Secure Your Browsing:
                    Instant <S.TitleGradient>Scam Check</S.TitleGradient>
                </S.Title>
                <SectionSubtitle>Enter the domain or URL below to ensure a scam-free experience</SectionSubtitle>
                <SearchBar submitFunction = { (ipOrUrl) => navigate(`${book.SCAM_CHECK}#${ipOrUrl}`) } />
            </S.Block>
        </S.Container>
    );
};
