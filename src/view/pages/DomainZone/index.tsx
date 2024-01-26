// Core
import React, { FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from 'styled-components';

// Bus
// import {} from '../../../bus/'
import { useTld } from '@/bus/tld';

// Components
import { ErrorBoundary } from '../../components';
import { CustomSelect, SectionSubtitle, SectionTitle, Spinner } from '@/view/elements';
import { ChevronIcon, DownloadIcon, SearchIcon } from '@/assets/images/icons';

// Constants
import { API_SCAM_SCAN_URL } from '@/init';

// Styles
import * as S from './styles';

// Types
type PropTypes = {
    /* type props here */
}

const DomainZone: FC<PropTypes> = () => {
    const theme = useTheme();
    const [ isActive, setIsActive ] = useState(false);
    const [ searchVal, setSearchVal ] = useState('');
    const [ rowsPerPage, setRowsPerPage ] = useState(6);
    const [ currentPage, setCurrentPage ] = useState(1);

    const { fetchTld, tld: { data: tldData, isLoading }} = useTld();

    useEffect(() => {
        fetchTld({ page: currentPage, per_page: rowsPerPage, q: '' });
    }, []);

    useEffect(() => {
        fetchTld({ page: currentPage, per_page: rowsPerPage, q: '' });
    }, [ currentPage, rowsPerPage ]);

    const formatDate = (date: string | Date) => {
        const dateObject = new Date(date);

        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObject.getDate().toString()
            .padStart(2, '0');

        return  year + '-' + month + '-' + day;
    };

    const setCurrentPageHandler = (direction: 'forward' | 'backward') => {
        if (direction === 'forward' && tldData?.pagination.last_page && currentPage < tldData?.pagination.last_page) {
            setCurrentPage((prevState) => prevState + 1);
        }
        if (direction === 'backward' && currentPage > 1) {
            setCurrentPage((prevState) => prevState - 1);
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchVal(event.target.value);
    };

    useEffect(() => {
        setTimeout(() => {
            fetchTld({ page: currentPage, per_page: rowsPerPage, q: searchVal });
        }, 2000);
    }, [ searchVal ]);

    if (isLoading) {
        return (
            <S.Container>
                <Spinner loading = { isLoading } />
            </S.Container>
        );
    }

    return (
        <S.Container>
            <S.TextWrapper>
                <SectionTitle $styles = { S.TitleStyles }>
                    Domain Zone
                </SectionTitle>
                <SectionSubtitle $styles = { S.SubtitleStyles }>
                    Explore all available domain zones in a searchable list.
                    Request a CSV download for each zone with comprehensive information.
                </SectionSubtitle>
            </S.TextWrapper>
            <S.SearchBar $active = { isActive }>
                <S.SvgWrapper>
                    <SearchIcon color = { isActive ? theme.palette.purple.main : theme.palette.gray.lightGrey } />
                </S.SvgWrapper>
                <S.Input
                    placeholder = 'Search for domain zone...'
                    value = { searchVal }
                    onBlur = { () => setIsActive(false) }
                    onChange = { handleSearch }
                    onFocus = { () => setIsActive(true) }
                />
            </S.SearchBar>
            <S.TableContainer>
                <S.TableWrapper>
                    <S.Table>
                        <S.Thead>
                            <S.Tr>
                                <S.Td>Domain zone name</S.Td>
                                <S.Td>Number of domains</S.Td>
                                <S.Td>Registrar</S.Td>
                                <S.Td>Last update</S.Td>
                                <S.Td></S.Td>
                            </S.Tr>
                        </S.Thead>
                        <S.Tbody>
                            {
                                tldData && tldData.tlds.map((item) => {
                                    return (
                                        <S.Tr key = { uuidv4() }>
                                            <S.Td>{item.tld}</S.Td>
                                            <S.Td>{item.count}</S.Td>
                                            <S.Td>{item.registrar}</S.Td>
                                            <S.Td>{`${formatDate(item.last_update)}`}</S.Td>
                                            <S.Td>
                                                {
                                                    item.tld && item.tld.trim()
                                                        ? (
                                                            <S.Link
                                                                download = 'example.csv'
                                                                href = { `${API_SCAM_SCAN_URL}/kdb/tlds/download?tld=${item.tld}` }>
                                                                <S.SvgWrapper>
                                                                    <DownloadIcon
                                                                        color = { theme.palette.purple.main }
                                                                    />
                                                                </S.SvgWrapper>
                                                                Download
                                                            </S.Link>
                                                        )
                                                        : <span>No data</span>
                                                }
                                            </S.Td>
                                        </S.Tr>
                                    );
                                })
                            }
                        </S.Tbody>
                    </S.Table>
                </S.TableWrapper>
            </S.TableContainer>
            <S.Pagination>
                <S.RowsPerPageWrapper>
                    Rows per page:
                    <CustomSelect
                        rowsPerPage = { rowsPerPage }
                        setRowsPerPage = { setRowsPerPage }
                    />
                </S.RowsPerPageWrapper>
                <S.PageCountWrapper>{currentPage} of {tldData?.pagination.last_page}</S.PageCountWrapper>
                <S.ChevronWrappers>
                    <S.SvgWrapper
                        $rotate = '-90'
                        onClick = { () => setCurrentPageHandler('backward') }>
                        <ChevronIcon />
                    </S.SvgWrapper>
                    <S.SvgWrapper
                        $rotate = '90'
                        onClick = { () => setCurrentPageHandler('forward') }>
                        <ChevronIcon />
                    </S.SvgWrapper>
                </S.ChevronWrappers>
            </S.Pagination>
        </S.Container>
    );
};

export default () => (
    <ErrorBoundary>
        <DomainZone />
    </ErrorBoundary>
);
