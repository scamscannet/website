import type { Metadata } from 'next';
import type { Article } from './types';
import { texts } from './texts';

export const SITE_URL = 'https://scamscan.net';

export const pageMetadata = (path: string, { title, description }: { title: string, description: string }): Metadata => ({
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: texts.site.name, type: 'website', locale: 'en_US' },
    twitter: { card: 'summary_large_image', title, description },
});

export const noIndex = (meta: { title: string, description: string }): Metadata => ({ ...meta, robots: { index: false, follow: false } });

export const siteJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: texts.site.name,
            url: SITE_URL,
            logo: `${SITE_URL}/images/logo.png`,
            email: texts.site.email,
        },
        {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            name: texts.site.name,
            url: SITE_URL,
            description: texts.site.description,
            publisher: { '@id': `${SITE_URL}/#organization` },
        },
    ],
};

export const articleJsonLd = (article: Article) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.subtitle,
    image: `${SITE_URL}${article.image}`,
    datePublished: article.date,
    url: `${SITE_URL}/blog/${article.id}`,
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
});

export const JsonLd = ({ data }: { data: object }) => (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);
