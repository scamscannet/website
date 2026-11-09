import type { MetadataRoute } from 'next';
import { articles } from '@/lib/blog';
import { takedownsMock } from '@/lib/mocks';
import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const paths = [
        '/',
        '/about-us',
        '/blog',
        '/privacy-policy',
        '/terms-and-conditions',
        ...articles.map(({ id }) => `/blog/${id}`),
        '/app/check',
        '/app/takedown',
        ...takedownsMock.map(({ domain }) => `/app/takedown/${domain}`),
        '/app/tools',
        '/app/whois-query',
        '/app/domain-zone',
    ];

    return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
