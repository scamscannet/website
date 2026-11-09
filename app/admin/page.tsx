import Link from 'next/link';
import { noIndex } from '@/lib/seo';
import { texts } from '@/lib/texts';
import styles from './admin.module.css';

export const metadata = noIndex(texts.meta.admin);

const cards = [
    { ...texts.admin.nodesCard, href: '/admin/nodes' },
];

export default function AdminPage() {
    return (
        <div className={styles.grid}>
            {cards.map(({ title, text, href }) => (
                <Link href={href} className={styles.card} key={href}>
                    <h2 className={styles.cardTitle}>{title}</h2>
                    <p className={styles.text}>{text}</p>
                </Link>
            ))}
        </div>
    );
}
