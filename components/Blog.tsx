'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { BlogCard } from './BlogCard';
import { Button, SectionSubtitle, SectionTitle } from './ui';
import { blogCards, featuredArticles, slugify } from '@/lib/blog';
import { scrollToSection, useHash } from '@/lib/hooks';
import type { Article } from '@/lib/types';
import styles from './Blog.module.css';

export const FeaturedArticles = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className={styles.featured}>
            <div className={styles.featuredText}>
                <SectionTitle className={styles.featuredTitle}>
                    Explore Our Featured Insights on Online Safety
                </SectionTitle>
                <SectionSubtitle>
                    Dive into our curated selection of articles focusing on online safety and scam awareness.
                    Stay informed, stay secure.
                </SectionSubtitle>
            </div>
            <div className={styles.featuredCards}>
                {featuredArticles.map((article, index) => (
                    <div
                        key={article.id}
                        className={`${styles.featuredCard} ${index === activeIndex ? styles.active : ''}`}
                        onMouseEnter={() => setActiveIndex(index)}
                    >
                        <img src={article.image} alt="" />
                        <div className={styles.featuredDescription}>
                            <p className={styles.featuredLabel}>{article.label}</p>
                            <Link href={`/blog/${article.id}`} className="link">
                                <Button>Read More</Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export const ArticleView = ({ article }: { article: Article }) => {
    const hash = useHash();
    const anchors = [...article.sections.map((section) => section.title), 'Conclusion'];

    useEffect(() => {
        if (hash && window.innerWidth >= 960) {
            scrollToSection(hash);
        }
    }, []);

    const onAnchorClick = (event: MouseEvent, slug: string) => {
        event.preventDefault();
        window.history.pushState(null, '', `#${slug}`);
        scrollToSection(slug);
    };

    return (
        <section className={styles.article}>
            <ul className={styles.breadcrumbs}>
                <li><Link href="/" className={`link ${styles.breadcrumbLink}`}>ScamScan</Link></li>
                <span className={styles.dot} />
                <li><Link href="/blog" className={`link ${styles.breadcrumbLink}`}>Blog</Link></li>
                <span className={styles.dot} />
                <li>{article.title}</li>
            </ul>
            <SectionTitle className={styles.articleTitle}>{article.title}</SectionTitle>
            <div className={styles.articleBody}>
                <div className={styles.articleContent}>
                    <div className={styles.articleImage}>
                        <img src={article.image} alt="" />
                    </div>
                    <SectionSubtitle className={styles.articleText}>{article.subtitle}</SectionSubtitle>
                    {article.sections.map((section) => (
                        <div id={slugify(section.title)} key={section.title}>
                            <SectionTitle className={styles.articleTitle}>{section.title}</SectionTitle>
                            <ul className={styles.points}>
                                {section.points.map((point) => (
                                    <li className={styles.point} key={point.heading}>
                                        <SectionSubtitle className={styles.articleText}>
                                            <span style={{ fontWeight: 'bold' }}>{point.heading}</span>{point.text}
                                        </SectionSubtitle>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div id="conclusion">
                        <SectionTitle className={styles.articleTitle}>Conclusion</SectionTitle>
                    </div>
                    <SectionSubtitle className={styles.articleText}>{article.conclusion}</SectionSubtitle>
                </div>
                <aside className={styles.tableOfContents}>
                    <div>
                        <SectionSubtitle className={styles.articleText}>{article.date}</SectionSubtitle>
                        <div className={styles.hashtags}>
                            {article.hashtags.map((hashtag) => (
                                <SectionSubtitle className={styles.articleText} key={hashtag}>{hashtag}</SectionSubtitle>
                            ))}
                        </div>
                    </div>
                    <h3 className={styles.tableOfContentsTitle}>Table of Contents</h3>
                    <div className={styles.anchors}>
                        {anchors.map((anchor) => {
                            const slug = slugify(anchor);

                            return (
                                <a
                                    key={anchor}
                                    href={`#${slug}`}
                                    className={`link ${styles.anchor} ${hash === slug ? styles.active : ''}`}
                                    onClick={(event) => onAnchorClick(event, slug)}
                                >
                                    {anchor}
                                </a>
                            );
                        })}
                    </div>
                </aside>
            </div>
        </section>
    );
};

export const RecentPosts = () => (
    <section className={styles.recent}>
        <h3 className={styles.recentTitle}>Recent blog posts</h3>
        <div className={styles.recentCards}>
            {blogCards.map((card, index) => <BlogCard card={card} key={index} />)}
        </div>
        <Button className={styles.loadMore}>Load More</Button>
    </section>
);
