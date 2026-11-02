'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SectionSubtitle, SectionTitle } from '@/components/ui';
import { takedownsMock } from '@/lib/mocks';
import tools from '../tools.module.css';
import styles from './page.module.css';

const StatusChip = ({ status }: { status: string }) => (
    <span className={`${styles.chip} ${styles[status.replaceAll(' ', '')]}`}>{status}</span>
);

export default function TakedownPage() {
    const router = useRouter();

    return (
        <section className={tools.section}>
            <div className={tools.intro}>
                <SectionTitle className={tools.title}>Takedown Tracker</SectionTitle>
                <SectionSubtitle className={tools.subtitle}>Follow every scam site we work on taking down</SectionSubtitle>
            </div>
            <div className={styles.tableContainer}>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr className={styles.tr}>
                                <td className={styles.td}>Domain</td>
                                <td className={styles.td}>Created</td>
                                <td className={styles.td}>Last update</td>
                                <td className={styles.td}>Category</td>
                                <td className={styles.td}>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {takedownsMock.map((takedown) => (
                                <tr className={`${styles.tr} ${styles.clickable}`} key={takedown.domain} onClick={() => router.push(`/app/takedown/${takedown.domain}`)}>
                                    <td className={styles.td}>
                                        <Link href={`/app/takedown/${takedown.domain}`} className={styles.domainLink}>{takedown.domain}</Link>
                                    </td>
                                    <td className={styles.td}>{takedown.created}</td>
                                    <td className={styles.td}>{takedown.lastUpdate}</td>
                                    <td className={styles.td}>{takedown.category}</td>
                                    <td className={styles.td}><StatusChip status={takedown.status} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
