// Core
import React, { FC } from 'react';

// Bus
// import {} from '../../../bus/'

// Styles
import * as S from './styles';
import { AngleBracketsIcon, LocationIcon, TableIcon } from '@/assets/images/icons';

// Types
type PropTypes = {
    /* type props here */
    isRaw: boolean
    setIsRaw: React.Dispatch<React.SetStateAction<boolean>>
    title: string
    location?: string
}

export const TopRow: FC<PropTypes> = ({ isRaw, setIsRaw, title, location }) => {
    const switchHandler = () => {
        setIsRaw(!isRaw);
    };

    return (
        <S.Container>
            <S.TextWrapper>
                <S.Title>{title}</S.Title>
                {location && (
                    <S.Location>
                        <S.IconWrapper>
                            <LocationIcon ispurple = 'true' />
                        </S.IconWrapper>
                        {location}
                    </S.Location>
                )}
            </S.TextWrapper>
            <S.ButtonsWrapper>
                <S.Button
                    $active = { !isRaw }
                    onClick = { switchHandler }>
                    <TableIcon active = { isRaw ? '' : 'true' } />
                    Table
                </S.Button>
                <S.Button
                    $active = { isRaw }
                    onClick = { switchHandler }>
                    <AngleBracketsIcon active = { isRaw ? 'true' : '' } />
                    Raw
                </S.Button>
            </S.ButtonsWrapper>
        </S.Container>
    );
};
