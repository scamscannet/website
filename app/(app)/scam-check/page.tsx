'use client';

import { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { Button, SectionSubtitle, SectionTitle, Spinner } from '@/components/ui';
import { SearchBar } from '@/components/SearchBar';
import { InfoTable } from '@/components/InfoTable';
import { Screenshots, ScoreChart, StatusChip } from '@/components/ScamCheckWidgets';
import { InfoIcon } from '@/components/icons';
import { getDomainScore, getFullSizeScreenshot, getListStatus, getScamCheck, getScreenshot, getWebsiteScore } from '@/lib/api';
import { useGoToTool, useHash, useOpenReportModal, useReportToolStatus } from '@/lib/hooks';
import type { ListStatus, ScamCheckResult, ScamStatus } from '@/lib/types';
import tools from '../tools.module.css';
import styles from './page.module.css';

const UNCLASSIFIED_TEXT = 'Description: The status of this website has not been definitively categorized as either safe or a scam. It means that there may not be sufficient information available to make a conclusive determination about its safety.';

const STATUS: Record<ListStatus, { chip: ScamStatus, text: string }> = {
    allowlist: { chip: 'Safe', text: 'This website is deemed safe for users.It has not exhibited any suspicious or harmful behavior, and interactions with the site are unlikely to pose athreat to your online safety.' },
    trusted: { chip: 'Unclassified', text: 'This website is deemed safe for users.It has not exhibited any suspicious or harmful behavior, and interactions with the site are unlikely to pose athreat to your online safety.' },
    blocklist: { chip: 'Scam', text: 'Description: This website has been identified as potentially harmful or fraudulent. Exercise caution and avoid interacting with or providing any personal information on this site.' },
    watchlist: { chip: 'Unclassified', text: UNCLASSIFIED_TEXT },
    scamscanlist: { chip: 'Unclassified', text: UNCLASSIFIED_TEXT },
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** "2023-10-19T20:40:02+0000" -> "October 19, 2023 - 20:40" */
const formatDate = (date: string | null) => {
    const parts = date?.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\+(\d{4})/);
    if (!parts) return 'No data';
    const [, year, month, day, hour, minute] = parts.map(Number);

    return `${MONTHS[month - 1]} ${day}, ${year} - ${hour}:${minute}`;
};

type Score = { isLoading: boolean, value: number | null };

const emptyScore: Score = { isLoading: false, value: null };

export default function ScamCheckPage() {
    const hash = useHash();
    const goToTool = useGoToTool();
    const openReportModal = useOpenReportModal();
    const [result, setResult] = useState<ScamCheckResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [failed, setFailed] = useState(false);
    const [status, setStatus] = useState<ListStatus | null>(null);
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [fullSizeScreenshot, setFullSizeScreenshot] = useState<string | null>(null);
    const [domainScore, setDomainScore] = useState<Score>(emptyScore);
    const [websiteScore, setWebsiteScore] = useState<Score>(emptyScore);

    useReportToolStatus({ hasResult: result !== null, failed });

    useEffect(() => {
        if (!hash) {
            setResult(null);
            setFailed(false);
            return;
        }

        // The previous result is deliberately kept: if this lookup fails, it stays on screen
        // and the header search bar shows the error instead.
        setIsLoading(true);
        setFailed(false);
        getScamCheck(hash)
            .then(setResult)
            .catch(() => setFailed(true))
            .finally(() => setIsLoading(false));

        getListStatus(hash).then(setStatus).catch(() => setStatus(null));
        getScreenshot(hash).then(setScreenshot).catch(() => setScreenshot(null));
        getFullSizeScreenshot(hash).then(setFullSizeScreenshot).catch(() => setFullSizeScreenshot(null));

        setDomainScore({ isLoading: true, value: null });
        getDomainScore(hash)
            .then((value) => setDomainScore({ isLoading: false, value }))
            .catch(() => setDomainScore(emptyScore));

        setWebsiteScore({ isLoading: true, value: null });
        getWebsiteScore(hash)
            .then((value) => setWebsiteScore({ isLoading: false, value }))
            .catch(() => setWebsiteScore(emptyScore));
    }, [hash]);

    if (isLoading) {
        return <Spinner />;
    }

    if (!hash || !result) {
        return (
            <section className={tools.section}>
                <div className={tools.intro}>
                    <SectionTitle className={tools.title}>Welcome to ScamScan!</SectionTitle>
                    <SectionSubtitle className={tools.subtitle}>Enter a website URL to check if it's safe</SectionSubtitle>
                </div>
                <SearchBar onSubmit={(value) => goToTool('/scam-check', value)} />
                {failed && (
                    <SectionSubtitle className={tools.errorMessage}>No scrape available for {hash || 'this url'}.</SectionSubtitle>
                )}
            </section>
        );
    }

    const { chip, text } = (status && STATUS[status]) || { chip: 'Unclassified', text: UNCLASSIFIED_TEXT };

    return (
        <section className={tools.section}>
            <div className={styles.result}>
                <div>
                    <div className={styles.domainRow}>
                        <h3 className={styles.domain}>{result.domain || '-'}</h3>
                        <p className={styles.lastUpdate}>Last Update: {formatDate(result.lastUpdate)}</p>
                    </div>
                    <p className={styles.siteName}>{result.name}</p>
                    <p className={styles.siteDescription}>
                        Search the world's information, including webpages, images, videos, and more
                    </p>
                </div>

                <div className={styles.cards}>
                    <div className={styles.card}>
                        <div className={styles.cardHead}>Status</div>
                        <div className={styles.cardBody}>
                            <StatusChip status={chip} />
                            <p className={styles.statusText}>{text}</p>
                        </div>
                    </div>
                    <div className={`${styles.card} ${styles.wideCard}`}>
                        <div className={styles.cardHead}>
                            AI Scam Score
                            <a id="chart-tooltip" className={styles.tooltipAnchor}>
                                <InfoIcon />
                            </a>
                        </div>
                        <div className={styles.charts}>
                            <div className={styles.chartPair}>
                                <ScoreChart label="Domain name based" score={domainScore.value} isLoading={domainScore.isLoading} />
                                <ScoreChart label="Website data based" score={websiteScore.value} isLoading={websiteScore.isLoading} />
                            </div>
                            <div className={styles.legend}>
                                <p className={`${styles.legendItem} ${styles.low}`}>Low risk</p>
                                <p className={`${styles.legendItem} ${styles.moderate}`}>Moderate risk</p>
                                <p className={`${styles.legendItem} ${styles.high}`}>High risk</p>
                            </div>
                        </div>
                        <Tooltip anchorSelect="#chart-tooltip" place="bottom">
                            <div className={styles.tooltip}>Indicates the likelihood of scams based on AI analysis</div>
                        </Tooltip>
                    </div>
                </div>

                <Screenshots screenshot={screenshot} fullSizeScreenshot={fullSizeScreenshot} websiteText={result.websiteText} />

                <div className={styles.whois}>
                    <h3 className={styles.whoisTitle}>Whois information</h3>
                    <div className={styles.tables}>
                        <InfoTable
                            title="Domain"
                            detailsLink={`/whois-query#${result.domain}`}
                            rows={[
                                { key: 'Registrar', value: result.registrar },
                                { key: 'Registration date', value: result.registrationDate },
                                { key: 'Owner name', value: result.ownerName },
                            ]}
                        />
                        <InfoTable
                            title="IP"
                            detailsLink={`/whois-query#${result.ip}`}
                            rows={[
                                { key: 'IP', value: result.ip },
                                { key: 'Country', value: result.country },
                                { key: 'Registrant', value: result.registrant },
                            ]}
                        />
                    </div>
                </div>

                <div className={styles.report}>
                    <h5 className={styles.reportTitle}>Report scam</h5>
                    <h5 className={styles.reportText}>
                        Report any issues or concerns about this website.
                        Your feedback helps improve our scam-checking service.
                    </h5>
                    <Button onClick={openReportModal}>Submit Report</Button>
                </div>
            </div>
        </section>
    );
}
