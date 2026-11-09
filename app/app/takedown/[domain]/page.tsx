import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { InfoTable } from '@/components/InfoTable';
import { takedownsMock } from '@/lib/mocks';
import { pageMetadata } from '@/lib/seo';
import { texts } from '@/lib/texts';
import type { TakedownStatus } from '@/lib/types';
import tools from '../../tools.module.css';
import styles from '../page.module.css';

const STEPS: TakedownStatus[] = ['Reported', 'Verified', 'Abuse reports sent', 'Taken down'];

const t = texts.takedown;

type Props = { params: Promise<{ domain: string }> };

const findTakedown = async ({ params }: Props) => {
    const { domain } = await params;

    return takedownsMock.find((item) => item.domain === domain);
};

export const dynamicParams = false;

export const generateStaticParams = () => takedownsMock.map(({ domain }) => ({ domain }));

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const takedown = await findTakedown(props);

    return takedown ? pageMetadata(`/app/takedown/${takedown.domain}`, texts.meta.takedownDetail(takedown.domain, takedown.status)) : {};
};

export default async function TakedownDetailPage(props: Props) {
    const takedown = await findTakedown(props);
    if (!takedown) {
        notFound();
    }

    return (
        <section className={tools.section}>
            <Link href="/app/takedown" className={styles.backLink}>{t.back}</Link>
            <div>
                <div className={styles.domainRow}>
                    <h1 className={styles.domain}>{takedown.domain}</h1>
                    <p className={styles.lastUpdate}>{t.lastUpdate} {takedown.lastUpdate}</p>
                </div>
                <p className={styles.description}>{takedown.description}</p>
            </div>
            <div className={styles.details}>
                <InfoTable
                    title={t.website}
                    rows={[
                        { key: t.rows.domain, value: takedown.domain },
                        { key: t.rows.category, value: takedown.category },
                        { key: t.rows.registrar, value: takedown.registrar },
                        { key: t.rows.hostingProvider, value: takedown.hostingProvider },
                        { key: t.rows.ip, value: takedown.ip },
                        { key: t.rows.country, value: takedown.country },
                        { key: t.rows.reported, value: takedown.created },
                    ]}
                />
                <div className={styles.tracker}>
                    <h2 className={styles.trackerHead}>{t.progress}</h2>
                    <ol className={styles.steps}>
                        {STEPS.map((step) => {
                            const event = takedown.events.find((item) => item.status === step);
                            const state = !event ? styles.pending : step === takedown.status ? styles.current : styles.done;

                            return (
                                <li className={`${styles.step} ${state}`} key={step}>
                                    <div className={styles.dot} />
                                    <div>
                                        <p className={styles.stepTitle}>{step}</p>
                                        {event && <p className={styles.stepText}>{event.date} · {event.note}</p>}
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </section>
    );
}
