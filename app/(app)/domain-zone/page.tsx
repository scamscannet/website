'use client';

import { useEffect, useState } from 'react';
import { SectionSubtitle, SectionTitle, Spinner } from '@/components/ui';
import { ChevronIcon, DownloadIcon, SearchIcon } from '@/components/icons';
import { getTlds, tldDownloadUrl } from '@/lib/api';
import type { TldList } from '@/lib/types';
import tools from '../tools.module.css';
import styles from './page.module.css';

const SEARCH_DELAY_MS = 2000;

const formatDate = (value: string) => {
    const date = new Date(value);
    const pad = (number: number) => String(number).padStart(2, '0');

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const RowsPerPageSelect = ({ value, onChange }: { value: number, onChange: (value: number) => void }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`${styles.select} ${isOpen ? styles.open : ''}`} onClick={() => setIsOpen(!isOpen)}>
            {value}
            <div className={styles.selectChevron}>
                <ChevronIcon />
            </div>
            <ul className={styles.selectOptions}>
                {Array.from({ length: 10 }, (_, index) => (
                    <li className={styles.selectOption} key={index} onClick={() => onChange(index + 1)}>{index + 1}</li>
                ))}
            </ul>
        </div>
    );
};

export default function DomainZonePage() {
    const [data, setData] = useState<TldList | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [page, setPage] = useState(1);
    const lastPage = data?.pagination.last_page;

    useEffect(() => {
        const timer = setTimeout(() => setQuery(search), SEARCH_DELAY_MS);

        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        setIsLoading(true);
        getTlds(page, rowsPerPage, query)
            .then(setData)
            .catch(() => {})
            .finally(() => setIsLoading(false));
    }, [page, rowsPerPage, query]);

    if (isLoading && !data) {
        return (
            <section className={tools.section}>
                <Spinner />
            </section>
        );
    }

    return (
        <section className={tools.section}>
            <div className={tools.intro}>
                <SectionTitle className={tools.title}>Domain Zone</SectionTitle>
                <SectionSubtitle className={tools.subtitle}>
                    Explore all available domain zones in a searchable list.
                    Request a CSV download for each zone with comprehensive information.
                </SectionSubtitle>
            </div>
            <div className={`${styles.search} ${isSearchFocused ? styles.searchFocused : ''}`}>
                <div className={styles.icon}>
                    <SearchIcon color={isSearchFocused ? '#6023FA' : '#D9D9D9'} />
                </div>
                <input
                    className={styles.searchInput}
                    placeholder="Search for domain zone..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                />
            </div>
            <div className={styles.tableContainer}>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr className={styles.tr}>
                                <td className={styles.td}>Domain zone name</td>
                                <td className={styles.td}>Number of domains</td>
                                <td className={styles.td}>Registrar</td>
                                <td className={styles.td}>Last update</td>
                                <td className={styles.td} />
                            </tr>
                        </thead>
                        <tbody>
                            {data?.tlds.map((item, index) => (
                                <tr className={styles.tr} key={index}>
                                    <td className={styles.td}>{item.tld}</td>
                                    <td className={styles.td}>{item.count}</td>
                                    <td className={styles.td}>{item.registrar}</td>
                                    <td className={styles.td}>{formatDate(item.last_update)}</td>
                                    <td className={styles.td}>
                                        {item.tld?.trim() ? (
                                            <a className={styles.download} download href={tldDownloadUrl(item.tld)}>
                                                <div className={styles.icon}><DownloadIcon color="#6023FA" /></div>
                                                Download
                                            </a>
                                        ) : <span>No data</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={styles.pagination}>
                <div className={styles.rowsPerPage}>
                    Rows per page:
                    <RowsPerPageSelect value={rowsPerPage} onChange={setRowsPerPage} />
                </div>
                <div className={styles.text}>{page} of {lastPage}</div>
                <div className={styles.pageButtons}>
                    <div className={styles.icon} style={{ transform: 'rotate(-90deg)' }} onClick={() => page > 1 && setPage(page - 1)}>
                        <ChevronIcon />
                    </div>
                    <div className={styles.icon} style={{ transform: 'rotate(90deg)' }} onClick={() => lastPage && page < lastPage && setPage(page + 1)}>
                        <ChevronIcon />
                    </div>
                </div>
            </div>
        </section>
    );
}
