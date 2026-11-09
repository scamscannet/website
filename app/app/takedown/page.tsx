'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SectionSubtitle, SectionTitle } from '@/components/ui';
import { takedownsMock } from '@/lib/mocks';
import { texts } from '@/lib/texts';
import tools from '../tools.module.css';
import styles from './page.module.css';

const t = texts.takedown;

const StatusChip = ({ status }: { status: string }) => (
    <span className={`${styles.chip} ${styles[status.replaceAll(' ', '')]}`}>{status}</span>
);

export default function TakedownPage() {
    const router = useRouter();

    return (
        <section className={tools.section}>
            <div className={tools.intro}>
                <SectionTitle as="h1" className={tools.title}>{t.title}</SectionTitle>
                <SectionSubtitle className={tools.subtitle}>{t.subtitle}</SectionSubtitle>
            </div>
            <div className={styles.tableContainer}>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr className={styles.tr}>
                                <td className={styles.td}>{t.columns.domain}</td>
                                <td className={styles.td}>{t.columns.reported}</td>
                                <td className={styles.td}>{t.columns.lastUpdate}</td>
                                <td className={styles.td}>{t.columns.category}</td>
                                <td className={styles.td}>{t.columns.status}</td>
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
