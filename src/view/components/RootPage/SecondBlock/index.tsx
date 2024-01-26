// Core
import React, { FC } from 'react';

// Bus
// import {} from '../../../bus/'

// Styles
import * as S from './styles';
import { SectionSubtitle, SectionTitle } from '@/view/elements';

// Types
type PropTypes = {
    /* type props here */
}

export const SecondBlock: FC<PropTypes> = () => {
    return (
        <S.Container>
            <S.Wrapper>
                <S.TextWrapper>
                    <SectionTitle>Our Impact in Numbers</SectionTitle>
                    <SectionSubtitle $styles = { S.Subtitle }>
                        See the results of our relentless efforts to protect users online
                    </SectionSubtitle>
                </S.TextWrapper>
                <S.MetricWrapper>
                    <S.MetricCard>
                        <S.MetricTitle>400+</S.MetricTitle>
                        <S.MetricLabel>Sites Blocked</S.MetricLabel>
                    </S.MetricCard>
                    <S.MetricCard>
                        <S.MetricTitle>500</S.MetricTitle>
                        <S.MetricLabel>Users Protected</S.MetricLabel>
                    </S.MetricCard>
                    <S.MetricCard>
                        <S.MetricTitle>230</S.MetricTitle>
                        <S.MetricLabel>Achievements Unlocked</S.MetricLabel>
                    </S.MetricCard>
                    <S.MetricCard>
                        <S.MetricTitle>87</S.MetricTitle>
                        <S.MetricLabel>Other relevant stats</S.MetricLabel>
                    </S.MetricCard>
                </S.MetricWrapper>
            </S.Wrapper>
        </S.Container>
    );
};
