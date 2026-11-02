import Link from 'next/link';
import { notFound } from 'next/navigation';
import { InfoTable } from '@/components/InfoTable';
import { takedownsMock } from '@/lib/mocks';
import type { TakedownStatus } from '@/lib/types';
import tools from '../../tools.module.css';
import styles from '../page.module.css';

const STEPS: TakedownStatus[] = ['Reported', 'Verified', 'Abuse reports sent', 'Taken down'];

export const dynamicParams = false;

export const generateStaticParams = () => takedownsMock.map(({ domain }) => ({ domain }));

export default async function TakedownDetailPage({ params }: { params: Promise<{ domain: string }> }) {
    const { domain } = await params;
    const takedown = takedownsMock.find((item) => item.domain === domain);
    if (!takedown) {
        notFound();
    }

    return (
        <section className={tools.section}>
            <Link href="/app/takedown" className={styles.backLink}>← All takedowns</Link>
            <div>
                <div className={styles.domainRow}>
                    <h3 className={styles.domain}>{takedown.domain}</h3>
                    <p className={styles.lastUpdate}>Last Update: {takedown.lastUpdate}</p>
                </div>
                <p className={styles.description}>{takedown.description}</p>
            </div>
            <div className={styles.details}>
                <InfoTable
                    title="Website"
                    rows={[
                        { key: 'Domain', value: takedown.domain },
                        { key: 'Category', value: takedown.category },
                        { key: 'Registrar', value: takedown.registrar },
                        { key: 'Hosting provider', value: takedown.hostingProvider },
                        { key: 'IP', value: takedown.ip },
                        { key: 'Country', value: takedown.country },
                        { key: 'Created', value: takedown.created },
                    ]}
                />
                <div className={styles.tracker}>
                    <div className={styles.trackerHead}>Takedown progress</div>
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
