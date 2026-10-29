'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useEmblaCarousel from 'embla-carousel-react';
import { Button, SectionSubtitle, SectionTitle } from '@/components/ui';
import { SearchBar } from '@/components/SearchBar';
import { BlogCard } from '@/components/BlogCard';
import { Arrow, CardImage, DownloadIcon, IpIcon, LocationIcon, SearchIcon } from '@/components/icons';
import { blogCards } from '@/lib/blog';
import { scrollToSection, useHash, useOpenReportModal } from '@/lib/hooks';
import styles from './page.module.css';

const metrics = [
    { value: '400+', label: 'Sites Blocked' },
    { value: '500', label: 'Users Protected' },
    { value: '230', label: 'Achievements Unlocked' },
    { value: '87', label: 'Other relevant stats' },
];

const tools = [
    { Icon: SearchIcon, title: 'Domain Whois', text: 'Uncover ownership and registration details seamlessly, making sure your online activities rely on trustworthy information' },
    { Icon: IpIcon, title: 'IP Whois', text: 'Discover ownership and location details for any IP address, ensuring a safer online experience with valuable insights' },
    { Icon: DownloadIcon, title: 'Domain zone downloads', text: 'Access and download essential domain zone data, strengthening your online presence with valuable information' },
    { Icon: LocationIcon, title: 'Geolocation', text: 'Explore precise location data, enriching your online encounters with insights that enhance awareness and contribute to a safer digital environment' },
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
            <SectionTitle className={styles.insightsTitle}>Insights and Updates</SectionTitle>
            <SectionSubtitle className={styles.insightsSubtitle}>
                Stay informed with our latest articles and helpful tips
            </SectionSubtitle>
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
            <Button className={styles.blogButton} onClick={() => router.push('/blog')}>Read More on Our Blog</Button>
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
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Secure Your Browsing:
                        Instant <span className={styles.gradientText}>Scam Check</span>
                    </h1>
                    <SectionSubtitle>Enter the domain or URL below to ensure a scam-free experience</SectionSubtitle>
                    <SearchBar onSubmit={(value) => router.push(`/scam-check#${value}`)} />
                </div>
            </section>

            <div className={styles.reportBanner}>
                <div className={styles.reportBannerContent}>
                    <h3 className={styles.reportBannerText}>Keep the web safe – report suspicious activity</h3>
                    <Button variant="white-outlined" className={styles.reportBannerButton} onClick={openReportModal}>Report a Scam</Button>
                </div>
            </div>

            <section className={styles.impact}>
                <div className={styles.impactContent}>
                    <div className={styles.impactText}>
                        <SectionTitle>Our Impact in Numbers</SectionTitle>
                        <SectionSubtitle className={styles.impactSubtitle}>
                            See the results of our relentless efforts to protect users online
                        </SectionSubtitle>
                    </div>
                    <div className={styles.metrics}>
                        {metrics.map(({ value, label }) => (
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
                    <SectionTitle className={styles.white}>Empowering You with Tools</SectionTitle>
                    <SectionSubtitle className={styles.toolsSubtitle}>
                        Explore our suite of tools for a comprehensive online experience
                    </SectionSubtitle>
                    <div className={styles.toolCards}>
                        {tools.map(({ Icon, title, text }) => (
                            <div className={styles.toolCard} key={title}>
                                <div className={styles.toolIcon}><Icon /></div>
                                <h5 className={styles.toolTitle}>{title}</h5>
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
                        <SectionTitle className={styles.partnersTitle}>Proudly Trusted by Leading Partners</SectionTitle>
                        <SectionSubtitle className={styles.partnersSubtitle}>
                            Explore our rich tapestry of partnerships with industry leaders,
                            each logo representing a chapter of collaboration,
                            trust, and shared success.
                            Together, we build a legacy of excellence and innovation
                        </SectionSubtitle>
                    </div>
                </div>
            </section>

            <InsightsCarousel />
        </main>
    );
}
