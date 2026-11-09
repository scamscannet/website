'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { Button, SectionSubtitle, SectionTitle } from '@/components/ui';
import { SearchBar } from '@/components/SearchBar';
import { StatusChip } from '@/components/ScamCheckWidgets';
import { TakedownIcon } from '@/components/icons';
import { getReport, getVerdict, requestScan } from '@/lib/api';
import { useGoToTool, useHash, useOpenReportModal, useReportToolStatus } from '@/lib/hooks';
import { texts } from '@/lib/texts';
import type { DomainReport, ScamStatus, Verdict } from '@/lib/types';
import tools from '../tools.module.css';
import styles from './page.module.css';

const t = texts.check;

const VERDICT_CHIP: Record<Verdict, ScamStatus> = { trusted: 'Safe', blocked: 'Scam', unknown: 'Unclassified' };

/** "https://shop.example.com/path" -> "shop.example.com" */
const toDomain = (url: string) => {
    try {
        return new URL(url.includes('://') ? url : `https://${url}`).hostname;
    } catch {
        return url;
    }
};

type Loaded<T> = { key: string, data?: T, failed?: boolean };

/** Runs `load` whenever `key` changes; returns undefined while loading. */
const useLoad = <T,>(key: string, load: () => Promise<T>) => {
    const [state, setState] = useState<Loaded<T>>();

    useEffect(() => {
        let active = true;
        load()
            .then((data) => active && setState({ key, data }))
            .catch(() => active && setState({ key, failed: true }));

        return () => {
            active = false;
        };
    }, [key]);

    return state?.key === key ? state : undefined;
};

const Card = ({ title, className, children }: { title: string, className?: string, children: ReactNode }) => (
    <div className={`${styles.card} ${className ?? ''}`}>
        <div className={styles.cardHead}>{title}</div>
        <div className={styles.cardBody}>{children}</div>
    </div>
);

const CardState = <T,>({ state, children }: { state?: Loaded<T>, children: (data: T) => ReactNode }) => {
    if (!state) return <p className={styles.text}>{t.loading}</p>;
    if (state.failed) return <p className={styles.text}>{t.failed}</p>;

    return children(state.data as T);
};

const Placeholder = ({ title, text }: { title: string, text: string }) => (
    <Card title={title}>
        <div className={styles.placeholder}>{text}</div>
    </Card>
);

const ScanRequest = ({ url }: { url: string }) => {
    const [result, setResult] = useState<'requested' | 'failed'>();

    useEffect(() => setResult(undefined), [url]);

    const request = () => requestScan(url).then(() => setResult('requested')).catch(() => setResult('failed'));

    return (
        <Card title={t.scrape.title}>
            <div className={styles.placeholder}>
                <p className={styles.placeholderTitle}>{t.scrape.noData}</p>
                <p>{t.scrape.text}</p>
                <Button type="button" className={styles.scanButton} onClick={request} disabled={result === 'requested'}>{t.scrape.button}</Button>
                <p className={styles.note}>{result ? t.scrape[result] : t.scrape.limit}</p>
            </div>
        </Card>
    );
};

const ReportSummary = ({ report }: { report: DomainReport['report'] }) => (
    <div className={styles.summary}>
        <div className={`${styles.iconBox} ${report ? styles.iconBoxWarning : ''}`}>
            <TakedownIcon />
        </div>
        <div className={styles.summaryText}>
            <p className={styles.summaryTitle}>{report ? t.reports.count(Math.max(report.report_count, 1)) : t.reports.noneTitle}</p>
            <p className={styles.text}>
                {report ? t.reports.since(new Date(report.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })) : t.reports.none}
            </p>
        </div>
        {report && <span className={styles.reportStatus}>{report.status}</span>}
    </div>
);

/** Easter egg for people who check scamscan.net itself. */
const SelfCheck = () => {
    const goToTool = useGoToTool();

    return (
        <div className={styles.self}>
            <div className={styles.stage} aria-hidden>
                <img src="/images/logo.png" alt="" width={72} height={48} className={styles.selfLogo} />
                <svg className={styles.magnifier} width={72} height={72} viewBox="0 0 72 72" fill="none">
                    <circle cx={28} cy={28} r={20} stroke="#6023FA" strokeWidth={4} fill="rgba(96, 35, 250, 0.06)" />
                    <path d="M43 43l20 20" stroke="#6023FA" strokeWidth={6} strokeLinecap="round" />
                </svg>
            </div>
            <SectionTitle as="h1" className={tools.title}>{t.self.title}</SectionTitle>
            <SectionSubtitle className={styles.selfText}>{t.self.text}</SectionSubtitle>
            <StatusChip status="Safe" />
            <dl className={styles.facts}>
                {t.self.facts.map(({ key, value }) => (
                    <div className={styles.fact} key={key}>
                        <dt>{key}</dt>
                        <dd>{value}</dd>
                    </div>
                ))}
            </dl>
            <Button type="button" onClick={() => goToTool('/app/check', '')}>{t.self.button}</Button>
        </div>
    );
};

const WebsiteResult = ({ url }: { url: string }) => {
    const openReportModal = useOpenReportModal();
    const domain = toDomain(url);

    if (domain === 'scamscan.net' || domain.endsWith('.scamscan.net')) {
        return <SelfCheck />;
    }

    const verdict = useLoad(url, () => getVerdict(url));
    const report = useLoad(domain, () => getReport(domain));

    return (
        <div className={styles.result}>
            <div>
                <h1 className={styles.domain}>{domain}</h1>
                {domain !== url && <p className={styles.url}>{url}</p>}
            </div>

            <div className={styles.cards}>
                <Card title={t.verdict.title} className={styles.verdictCard}>
                    <div className={styles.verdicts}>
                        <div className={styles.verdict}>
                            <h2 className={styles.subTitle}>{t.verdict.scamscan}</h2>
                            <CardState state={verdict}>
                                {(data) => (
                                    <>
                                        <StatusChip status={VERDICT_CHIP[data]} />
                                        <p className={styles.text}>{t.verdict[data]}</p>
                                    </>
                                )}
                            </CardState>
                        </div>
                        <div className={styles.verdict}>
                            <h2 className={styles.subTitle}>{t.verdict.external}</h2>
                            <div className={styles.placeholder}>{t.verdict.externalText}</div>
                        </div>
                    </div>
                </Card>
                <Card title={t.reports.title}>
                    <CardState state={report}>
                        {(data) => <ReportSummary report={data.report} />}
                    </CardState>
                    <Button type="button" variant="outlined" className={styles.reportButton} onClick={openReportModal}>{t.report.button}</Button>
                </Card>
            </div>

            <Placeholder {...t.takedown} />
            <ScanRequest url={url} />
            <Placeholder {...t.geolocation} />
        </div>
    );
};

export default function WebsiteCheckPage() {
    const hash = useHash();
    const goToTool = useGoToTool();

    useReportToolStatus({ hasResult: hash !== '', failed: false });

    return (
        <section className={tools.section}>
            {hash ? <WebsiteResult url={hash} /> : (
                <>
                    <div className={tools.intro}>
                        <SectionTitle as="h1" className={tools.title}>{t.title}</SectionTitle>
                        <SectionSubtitle className={tools.subtitle}>{t.subtitle}</SectionSubtitle>
                    </div>
                    <SearchBar onSubmit={(value) => goToTool('/app/check', value)} />
                </>
            )}
        </section>
    );
}
