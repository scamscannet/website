import { articles } from '@/lib/blog';
import { SITE_URL } from '@/lib/seo';
import { texts } from '@/lib/texts';

export const dynamic = 'force-static';

const { meta } = texts;
const link = (path: string, { title, description }: { title: string, description: string }) => `- [${title}](${SITE_URL}${path}): ${description}`;

export const GET = () => new Response([
    `# ${texts.site.name}`,
    '',
    `> ${texts.site.description}`,
    '',
    'Tool pages take their input from the URL hash, e.g. /app/check#example.com.',
    '',
    '## Tools',
    '',
    link('/app/check', meta.check),
    link('/app/whois-query', meta.whois),
    link('/app/domain-zone', meta.domainZone),
    link('/app/takedown', meta.takedown),
    '',
    '## About',
    '',
    link('/about-us', meta.about),
    link('/blog', meta.blog),
    '',
    '## Articles',
    '',
    ...articles.map((article) => link(`/blog/${article.id}`, { title: article.title, description: article.subtitle })),
    '',
].join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
