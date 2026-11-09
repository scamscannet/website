'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { BlogCard } from './BlogCard';
import { Button, SectionSubtitle, SectionTitle } from './ui';
import { articles, formatArticleDate, slugify } from '@/lib/blog';
import { scrollToSection, useHash } from '@/lib/hooks';
import { texts } from '@/lib/texts';
import type { Article } from '@/lib/types';
import styles from './Blog.module.css';

const t = texts.blog;

export const FeaturedArticles = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className={styles.featured}>
            <div className={styles.featuredText}>
                <SectionTitle as="h1" className={styles.featuredTitle}>{t.title}</SectionTitle>
                <SectionSubtitle>{t.subtitle}</SectionSubtitle>
            </div>
            <div className={styles.featuredCards}>
                {articles.map((article, index) => (
                    <div
                        key={article.id}
                        className={`${styles.featuredCard} ${index === activeIndex ? styles.active : ''}`}
                        onMouseEnter={() => setActiveIndex(index)}
                    >
                        <img src={article.image} alt={article.title} />
                        <div className={styles.featuredDescription}>
                            <p className={styles.featuredLabel}>{article.title}</p>
                            <Link href={`/blog/${article.id}`} className="link">
                                <Button type="button">{t.readArticle}</Button>
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
    const anchors = [...article.sections.map((section) => section.title), t.conclusion];

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
        <article className={styles.article}>
            <ul className={styles.breadcrumbs}>
                <li><Link href="/" className={`link ${styles.breadcrumbLink}`}>{texts.site.name}</Link></li>
                <span className={styles.dot} />
                <li><Link href="/blog" className={`link ${styles.breadcrumbLink}`}>{t.breadcrumbBlog}</Link></li>
                <span className={styles.dot} />
                <li>{article.title}</li>
            </ul>
            <SectionTitle as="h1" className={styles.articleTitle}>{article.title}</SectionTitle>
            <div className={styles.articleBody}>
                <div className={styles.articleContent}>
                    <div className={styles.articleImage}>
                        <img src={article.image} alt={article.title} />
                    </div>
                    <SectionSubtitle className={styles.articleText}>{article.subtitle}</SectionSubtitle>
                    {article.sections.map((section) => (
                        <div id={slugify(section.title)} key={section.title}>
                            <SectionTitle className={styles.articleTitle}>{section.title}</SectionTitle>
                            <ul className={styles.points}>
                                {section.points.map((point) => (
                                    <li className={styles.point} key={point.heading}>
                                        <SectionSubtitle className={styles.articleText}>
                                            <strong>{point.heading}:</strong> {point.text}
                                        </SectionSubtitle>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div id={slugify(t.conclusion)}>
                        <SectionTitle className={styles.articleTitle}>{t.conclusion}</SectionTitle>
                    </div>
                    <SectionSubtitle className={styles.articleText}>{article.conclusion}</SectionSubtitle>
                </div>
                <aside className={styles.tableOfContents}>
                    <div>
                        <time dateTime={article.date} className={`section-subtitle ${styles.articleText}`} style={{ display: 'block' }}>{formatArticleDate(article.date)}</time>
                        <div className={styles.hashtags}>
                            {article.hashtags.map((hashtag) => (
                                <SectionSubtitle className={styles.articleText} key={hashtag}>{hashtag}</SectionSubtitle>
                            ))}
                        </div>
                    </div>
                    <h2 className={styles.tableOfContentsTitle}>{t.contents}</h2>
                    <nav className={styles.anchors}>
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
                    </nav>
                </aside>
            </div>
        </article>
    );
};

export const RecentPosts = () => (
    <section className={styles.recent}>
        <h2 className={styles.recentTitle}>{t.recentTitle}</h2>
        <div className={styles.recentCards}>
            {t.cards.map((card, index) => <BlogCard card={card} key={index} />)}
        </div>
        <Button type="button" className={styles.loadMore}>{t.loadMore}</Button>
    </section>
);
