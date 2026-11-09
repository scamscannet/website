'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useEmblaCarousel from 'embla-carousel-react';
import { Button, SectionSubtitle, SectionTitle } from '@/components/ui';
import { SearchBar } from '@/components/SearchBar';
import { BlogCard } from '@/components/BlogCard';
import { Arrow, CardImage, DownloadIcon, IpIcon, LocationIcon, SearchIcon } from '@/components/icons';
import { scrollToSection, useHash, useOpenReportModal } from '@/lib/hooks';
import { SITE_URL } from '@/lib/seo';
import { texts } from '@/lib/texts';
import styles from './page.module.css';

const t = texts.home;
const blogCards = texts.blog.cards;

const tools = [
    { Icon: SearchIcon, ...t.tools.domainWhois },
    { Icon: IpIcon, ...t.tools.ipWhois },
    { Icon: DownloadIcon, ...t.tools.domainZones },
    { Icon: LocationIcon, ...t.tools.geolocation },
];

const InsightsCarousel = () => {
    const router = useRouter();
    const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start' });
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        embla?.on('select', () => setCurrentSlide(embla.selectedScrollSnap()));
    }, [embla]);

    return (
        <section className={styles.insights}>
            <SectionTitle className={styles.insightsTitle}>{t.articlesTitle}</SectionTitle>
            <SectionSubtitle className={styles.insightsSubtitle}>{t.articlesSubtitle}</SectionSubtitle>
            <div className={styles.carousel} ref={emblaRef}>
                <div className={styles.carouselTrack}>
                    {blogCards.map((card, index) => (
                        <div className={styles.carouselSlide} key={index}>
                            <BlogCard card={card} />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.carouselNavigation}>
                <Arrow style={{ cursor: 'pointer' }} onClick={() => embla?.scrollPrev()} />
                <div className={styles.progress}>
                    {blogCards.map((_, index) => (
                        <div
                            key={index}
                            className={`${styles.progressButton} ${currentSlide === index ? styles.progressButtonActive : ''}`}
                            onClick={() => embla?.scrollTo(index)}
                        />
                    ))}
                </div>
                <Arrow style={{ transform: 'rotate(180deg)', cursor: 'pointer' }} onClick={() => embla?.scrollNext()} />
            </div>
            <Button type="button" className={styles.blogButton} onClick={() => router.push('/blog')}>{t.articlesButton}</Button>
        </section>
    );
};

export default function HomePage() {
    const router = useRouter();
    const hash = useHash();
    const openReportModal = useOpenReportModal();

    useEffect(() => {
        if (hash === 'tools') {
            scrollToSection('tools');
        }
    }, [hash]);

    return (
        <main className={styles.container}>
            <link rel="canonical" href={`${SITE_URL}/`} />
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        {t.heroTitle.before}<span className={styles.gradientText}>{t.heroTitle.highlight}</span>
                        <br />
                        {t.heroTitle.after}
                    </h1>
                    <SectionSubtitle>{t.heroSubtitle}</SectionSubtitle>
                    <SearchBar onSubmit={(value) => router.push(`/app/check#${value}`)} />
                </div>
            </section>

            <div className={styles.reportBanner}>
                <div className={styles.reportBannerContent}>
                    <h2 className={styles.reportBannerText}>{t.reportBanner}</h2>
                    <Button type="button" variant="white-outlined" className={styles.reportBannerButton} onClick={openReportModal}>{t.reportBannerButton}</Button>
                </div>
            </div>

            <section className={styles.impact}>
                <div className={styles.impactContent}>
                    <div className={styles.impactText}>
                        <SectionTitle>{t.impactTitle}</SectionTitle>
                        <SectionSubtitle className={styles.impactSubtitle}>{t.impactSubtitle}</SectionSubtitle>
                    </div>
                    <div className={styles.metrics}>
                        {t.metrics.map(({ value, label }) => (
                            <div className={styles.metric} key={label}>
                                <p className={styles.metricValue}>{value}</p>
                                <p className={styles.metricLabel}>{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="tools" className={styles.tools}>
                <div className={styles.toolsContent}>
                    <SectionTitle className={styles.white}>{t.toolsTitle}</SectionTitle>
                    <SectionSubtitle className={styles.toolsSubtitle}>{t.toolsSubtitle}</SectionSubtitle>
                    <div className={styles.toolCards}>
                        {tools.map(({ Icon, title, text }) => (
                            <div className={styles.toolCard} key={title}>
                                <div className={styles.toolIcon}><Icon /></div>
                                <h3 className={styles.toolTitle}>{title}</h3>
                                <p className={styles.toolText}>{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.partners}>
                <div className={styles.partnersContent}>
                    <div className={styles.partnerLogos}>
                        {Array.from({ length: 6 }, (_, index) => <CardImage key={index} />)}
                    </div>
                    <div className={styles.partnersText}>
                        <SectionTitle className={styles.partnersTitle}>{t.partnersTitle}</SectionTitle>
                        <SectionSubtitle className={styles.partnersSubtitle}>{t.partnersSubtitle}</SectionSubtitle>
                    </div>
                </div>
            </section>

            <InsightsCarousel />
        </main>
    );
}
