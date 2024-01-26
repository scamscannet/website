// Core
import React, { FC, useContext } from 'react';

// Components
import { ErrorBoundary, FifthBlock, FirstBlock, FourthBlock, SecondBlock, ThirdBlock } from '@/view/components';

// Styles
import * as S from './styles';
import { Button } from '@/view/elements';
import { ModalLandingContext } from '@/layouts';

const Root: FC = () => {
    const context = useContext(ModalLandingContext);

    return (
        <S.Container>
            <FirstBlock />
            <S.Bottom>
                <S.BottomTextWrapper>
                    <S.Text>Keep the web safe – report suspicious activity</S.Text>
                    <Button
                        $styles = { S.Button }
                        $variant = 'white_outlined'
                        onClick = { () => context?.setModalActive(!context.isModalActive) }>Report a Scam
                    </Button>
                </S.BottomTextWrapper>
            </S.Bottom>
            <SecondBlock />
            <ThirdBlock />
            <FourthBlock />
            <FifthBlock />
        </S.Container>
    );
};

export default () => (
    <ErrorBoundary>
        <Root />
    </ErrorBoundary>
);
