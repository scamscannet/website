// Core
import { MyFonts } from '@/assets/fonts';
import { SectionContainer } from '@/assets/styles/styles';
import styled, { css } from 'styled-components';

export const Container = styled.section`
    ${SectionContainer}
`;


export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const TitleStyles = css`
    ${({ theme }) => theme.media('min').lg} {
        font-size: 28px;
        line-height: 32px;
        text-align: left;
    }
`;

export const SubtitleStyles = css`
    ${({ theme }) => theme.media('min').lg} {
        font-size: 16px;
        line-height: 24px;
        text-align: left;
    }
`;

export const TableContainer = styled.div`
    display: flex;
    max-width: 1064px;
    width: 100%;
    flex-direction: column;
    gap: 16px;
    ${({ theme }) => theme.media('max').lg} {
        overflow-x: scroll;
    }
`;

export const SearchBar = styled.div<{$active: boolean}>`
    display: flex;
    align-items: center;
    padding: 12px;
    height: 48px;
    max-width: 256px;
    width: 100%;
    gap: 8px;
    border-radius: 2px;
    transition: all .3s ease;
    border: 1px solid ${({ theme, $active }) => $active ? theme.palette.purple.main : theme.palette.gray.lightGrey};
`;

export const SvgWrapper = styled.div<{$rotate?: string}>`
    width: 24px;
    height: 24px;
    ${({ $rotate }) => $rotate ? `transform: rotate(${$rotate}deg)` : ''}
`;

export const Input = styled.input`
    color: ${({ theme }) => theme.text.gray.main};
    font-family: ${MyFonts.THICCCBOI.regular};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    width: 100%;
    height: 100%;
    border: 0;
    outline: 0;
    &::placeholder {
        color: ${({ theme }) => theme.text.gray.secondary};
    }
`;

export const TableWrapper = styled.div`
    display: flex;
    border-radius: 4px;
    border: 1px solid #F5F5F5;
    box-shadow: 0px 2px 12px 0px rgba(101, 101, 101, 0.03);
    ${({ theme }) => theme.media('max').lg} {
        width: 636px;
    }
`;

export const Table = styled.table`
    width: 100%;
    height: 100%;
`;

export const Thead = styled.thead`
    background: #F5F5F5;
    width: 100%;
    display: block;
    border-radius: 4px;
    & tr {
        border-top: 0;
        & td {
            font-weight: 600;
            height: 44px;
            font-family: ${MyFonts.THICCCBOI.semiBold};
        }
    }
`;

const Text = css`
    color: ${({ theme }) => theme.text.gray.main};
    font-family: ${MyFonts.THICCCBOI.regular};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
`;

export const Tbody = styled.tbody`

`;

export const Tr = styled.tr`
    display: grid;
    border-top: 1px solid #F5F5F5;
    grid-template-columns: repeat(5, 1fr);
`;

export const Td = styled.td`
    display: flex;
    align-items: center;
    height: 64px;
    padding: 12px 24px;
    ${Text}
`;

export const Link = styled.a`
    display: flex;
    align-items: center;
    gap: 4px;
    width: 100%;
    height: 100%;
    ${Text}
    font-weight: 500;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

export const Pagination = styled.div`
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
    ${({ theme }) => theme.media('max').lg} {
        max-width: 636px;
    }
`;

export const RowsPerPageWrapper = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    //text
    ${Text}
`;

export const PageCountWrapper = styled.div`
    ${Text}
`;

export const ChevronWrappers = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
`;
