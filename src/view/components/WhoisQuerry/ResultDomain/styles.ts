// Core
import { MyFonts } from '@/assets/fonts';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: 100%;
    ${({ theme }) => theme.media('max').md} {
        width: 100%;
    }
`;


// Parser styles

export const BlankRow = styled.div`
    height: 24px;
`;

export const WithColumnRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow-wrap: anywhere;
`;

export const LinkWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow-wrap: anywhere;
`;

export const Row = styled.div`
    width: 100%;
    color: ${({ theme }) => theme.text.gray.main};
    font-family: ${MyFonts.THICCCBOI.regular};
`;

export const Link = styled.a`
    color: ${({ theme }) => theme.text.purple.main};
    text-decoration: none;
    font-family: ${MyFonts.THICCCBOI.semiBold};
`;

export const ResultWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
`;
