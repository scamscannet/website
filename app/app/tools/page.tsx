import Link from 'next/link';
import { SectionSubtitle, SectionTitle } from '@/components/ui';
import { DownloadIcon, LocationIcon, SearchIcon } from '@/components/icons';
import tools from '../tools.module.css';
import styles from './page.module.css';

const cards = [
    { Icon: SearchIcon, title: 'Whois Query', text: 'Registration and ownership details for any domain.', href: '/app/whois-query' },
    { Icon: LocationIcon, title: 'IP Geolocation', text: 'Owner, network and location of any IP address.', href: '/app/whois-query' },
    { Icon: DownloadIcon, title: 'Domain Zone', text: 'Browse domain zones and download them as CSV.', href: '/app/domain-zone' },
];

export default function ToolsPage() {
    return (
        <section className={tools.section}>
            <div className={tools.intro}>
                <SectionTitle className={tools.title}>Tools</SectionTitle>
                <SectionSubtitle className={tools.subtitle}>More ways to look into domains and IP addresses</SectionSubtitle>
            </div>
            <div className={styles.grid}>
                {cards.map(({ Icon, title, text, href }) => (
                    <Link href={href} className={styles.card} key={title}>
                        <div className={styles.icon}><Icon /></div>
                        <h3 className={styles.title}>{title}</h3>
                        <p className={styles.text}>{text}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
