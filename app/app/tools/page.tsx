import Link from 'next/link';
import { SectionSubtitle, SectionTitle } from '@/components/ui';
import { DownloadIcon, LocationIcon, SearchIcon } from '@/components/icons';
import { pageMetadata } from '@/lib/seo';
import { texts } from '@/lib/texts';
import tools from '../tools.module.css';
import styles from './page.module.css';

const t = texts.tools;

export const metadata = pageMetadata('/app/tools', texts.meta.tools);

const cards = [
    { Icon: SearchIcon, ...t.cards.whois, href: '/app/whois-query' },
    { Icon: LocationIcon, ...t.cards.geolocation, href: '/app/whois-query' },
    { Icon: DownloadIcon, ...t.cards.domainZone, href: '/app/domain-zone' },
];

export default function ToolsPage() {
    return (
        <section className={tools.section}>
            <div className={tools.intro}>
                <SectionTitle as="h1" className={tools.title}>{t.title}</SectionTitle>
                <SectionSubtitle className={tools.subtitle}>{t.subtitle}</SectionSubtitle>
            </div>
            <div className={styles.grid}>
                {cards.map(({ Icon, title, text, href }) => (
                    <Link href={href} className={styles.card} key={title}>
                        <div className={styles.icon}><Icon /></div>
                        <h2 className={styles.title}>{title}</h2>
                        <p className={styles.text}>{text}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
