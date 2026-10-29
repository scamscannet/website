'use client';

import { useState } from 'react';
import { ArcElement, Chart as ChartJS, Legend, Tooltip, type Plugin } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { Button, SectionSubtitle } from './ui';
import { LinkIcon, ScamStatusSafeIcon, ScamStatusScamIcon, ScamStatusUnclassifiedIcon, WarningIcon } from './icons';
import { useBodyScrollLock } from '@/lib/hooks';
import type { ScamStatus } from '@/lib/types';
import styles from './ScamCheckWidgets.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const STATUS_ICONS = { Safe: ScamStatusSafeIcon, Scam: ScamStatusScamIcon, Unclassified: ScamStatusUnclassifiedIcon };

export const StatusChip = ({ status }: { status: ScamStatus }) => {
    const Icon = STATUS_ICONS[status];

    return (
        <div className={`${styles.chip} ${styles[`chip${status}`]}`}>
            <Icon />
            <span className={styles.chipText}>{status}</span>
        </div>
    );
};

const RISK_COLORS = {
    low: { color: '#067647', background: '#ECFDF3' },
    moderate: { color: '#DF9300', background: '#FFFBF1' },
    high: { color: '#B42318', background: '#FEF3F2' },
};

const riskOf = (score: number) => {
    if (score <= 33) return RISK_COLORS.low;
    if (score <= 66) return RISK_COLORS.moderate;
    return RISK_COLORS.high;
};

export const ScoreChart = ({ score, isLoading, label }: { score: number | null, isLoading: boolean, label: string }) => {
    let chart = <div className={styles.noData}><p className={styles.chartLabel}>No Data</p></div>;

    if (isLoading) {
        chart = <div className={styles.skeleton} />;
    } else if (score) {
        const { color, background } = riskOf(score);

        // Paints the inner circle and the percentage, which Chart.js has no option for.
        const centerPlugin: Plugin<'doughnut'> = {
            id: 'center',
            beforeDraw: ({ ctx, chartArea }) => {
                ctx.save();
                ctx.beginPath();
                ctx.arc((chartArea.left + chartArea.right) / 2, chartArea.top - 5 + chartArea.bottom / 2, 58, 0, 2 * Math.PI);
                ctx.fillStyle = background;
                ctx.fill();
                ctx.restore();
            },
            beforeDatasetDraw: (instance) => {
                const { x, y } = instance.getDatasetMeta(0).data[0];
                const { ctx } = instance;
                ctx.save();
                ctx.font = `normal 20px ${getComputedStyle(document.body).getPropertyValue('--font-regular')}, sans-serif`;
                ctx.fillStyle = '#344054';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(`${score}%`, x, y);
            },
        };

        chart = (
            <Doughnut
                data={{ datasets: [{ data: [score, 100 - score], backgroundColor: [color, 'transparent'], borderWidth: 1, borderColor: background, borderRadius: 10 }] }}
                options={{ cutout: '88%', events: [], plugins: { tooltip: { enabled: false } } }}
                plugins={[centerPlugin]}
            />
        );
    }

    return (
        <div className={styles.chartWrapper}>
            <div className={styles.chart}>{chart}</div>
            <p className={styles.chartLabel}>{label}</p>
        </div>
    );
};

type ScreenshotsProps = {
    screenshot: string | null
    fullSizeScreenshot: string | null
    websiteText: string | null
};

export const Screenshots = ({ screenshot, fullSizeScreenshot, websiteText }: ScreenshotsProps) => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isTextOpen, setIsTextOpen] = useState(false);
    const hasText = websiteText && websiteText !== '-';

    useBodyScrollLock(isTextOpen);

    return (
        <div className={styles.screenshots}>
            <div className={styles.screenshotsHead}>Screenshots</div>
            <div className={styles.screenshotsDescription}>
                {screenshot && 'Explore visual snapshots to preview the appearance of the website. Click on an image to open the full-size version.'}
                {hasText && (
                    <div className={styles.textLink} onClick={() => setIsTextOpen(true)}>
                        <LinkIcon /> View website text
                    </div>
                )}
            </div>
            {screenshot ? (
                <div className={styles.screenshot}>
                    <img src={screenshot} alt="Website screenshot" onClick={() => setIsLightboxOpen(true)} />
                    <div className={styles.screenshotOverlay}>
                        <Button variant="outlined" className={styles.fullSizeButton} onClick={() => setIsLightboxOpen(true)}>
                            Open full-size image
                        </Button>
                    </div>
                </div>
            ) : (
                <div className={styles.noImage}>
                    <WarningIcon size={130} />
                    <SectionSubtitle className={styles.noImageText}>No image</SectionSubtitle>
                </div>
            )}
            {fullSizeScreenshot && (
                <Lightbox
                    open={isLightboxOpen}
                    close={() => setIsLightboxOpen(false)}
                    slides={[{ src: fullSizeScreenshot }]}
                    plugins={[Zoom]}
                    carousel={{ finite: true }}
                    render={{ buttonPrev: () => null, buttonNext: () => null }}
                    styles={{ container: { backgroundColor: 'rgba(0, 0, 0, .8)' } }}
                />
            )}
            {isTextOpen && hasText && (
                <div className={styles.textModal} onClick={(event) => event.target === event.currentTarget && setIsTextOpen(false)}>
                    <span className={styles.closeText} onClick={() => setIsTextOpen(false)}>&times;</span>
                    <div className={styles.textWrapper}>
                        <pre className={styles.text}>{websiteText.replace(/(?<=[.!?])/g, '\n')}</pre>
                    </div>
                </div>
            )}
        </div>
    );
};
