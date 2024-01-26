// Core
import React, { FC } from 'react';
import { PuffLoader } from 'react-spinners';
import styled, { useTheme } from 'styled-components';

// Types
type PropTypes = {
    /* type props here */
    loading: boolean
}

// Styles
const Container = styled.div`
    /* styles here */
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Spinner: FC<PropTypes> = ({ loading }) => {
    const theme = useTheme();

    return (
        <Container>
            <PuffLoader
                color = { theme.palette.purple.main }
                loading = { loading }
            />
        </Container>
    );
};
