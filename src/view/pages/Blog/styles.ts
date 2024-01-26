// Core
import styled from 'styled-components';

export const Container = styled.main`
    margin-top: 156px;
    margin-bottom: 100px;
    ${({ theme }) => theme.media('min').xs} {
       margin-top: 100px;
    }
    ${({ theme }) => theme.media('min').lg} {
       margin-top: 156px;
    }
`;
