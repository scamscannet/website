'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ChevronIcon, LinkIcon } from './icons';
import styles from './InfoTable.module.css';

const LocationMap = dynamic(() => import('./LocationMap'), { ssr: false });

type Row = { key: string, value: unknown };

type InfoTableProps = {
    title: string
    rows: Row[]
    /** Collapsible tables (whois results) show a chevron instead of a "details" link. */
    collapsible?: boolean
    defaultOpen?: boolean
    detailsLink?: string
    location?: [number, number]
};

const formatValue = (value: unknown) => (Array.isArray(value) ? value.join(', ') : String(value ?? '-'));

export const InfoTable = ({ title, rows, collapsible = false, defaultOpen = true, detailsLink, location }: InfoTableProps) => {
    const [open, setOpen] = useState(defaultOpen);
    const rowsVisible = open || !collapsible;

    return (
        <div className={styles.container}>
            <div className={styles.head} onClick={() => setOpen(!open)}>
                {title}
                <div className={styles.chevron} style={{ transform: open ? '' : 'rotate(180deg)' }}>
                    {collapsible && <ChevronIcon />}
                </div>
            </div>
            <div className={styles.body}>
                <table className={`${styles.table} ${location ? styles.withMap : ''}`}>
                    {rowsVisible && (
                        <tbody className={styles.rows}>
                            {rows.map(({ key, value }, index) => (
                                <tr className={styles.row} key={index}>
                                    <td className={`${styles.cell} ${collapsible ? styles.keyCompact : styles.half}`}>{key}</td>
                                    <td className={`${styles.cell} ${styles.value} ${collapsible ? '' : styles.half}`}>{formatValue(value)}</td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                    {detailsLink && (
                        <tfoot className={styles.foot}>
                            <tr>
                                <th>
                                    <Link href={detailsLink} className={styles.detailsLink}>
                                        <LinkIcon /> {title} details
                                    </Link>
                                </th>
                            </tr>
                        </tfoot>
                    )}
                </table>
                {location && open && (
                    <div className={styles.map}>
                        <LocationMap location={location} />
                    </div>
                )}
            </div>
        </div>
    );
};
