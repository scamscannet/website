// Core
import React, { FC } from 'react';

// Bus
// import {} from '../../../bus/'

// Components
import { FirstBlock, SecondBlock } from '@/view/components/BlogPage';
import { ErrorBoundary } from '../../components';

// Styles
import * as S from './styles';
import { Article } from '@/view/components/BlogPage/Article';
import { useParams } from 'react-router-dom';

// Types
type PropTypes = {
    /* type props here */
}

const Blog: FC<PropTypes> = () => {
    const { id } = useParams();

    return (
        <S.Container>
            {!id && <FirstBlock />}
            {id && <Article />}
            <SecondBlock />
        </S.Container>
    );
};

export default () => (
    <ErrorBoundary>
        <Blog />
    </ErrorBoundary>
);
