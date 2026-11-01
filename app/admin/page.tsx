import Link from 'next/link';
import styles from './admin.module.css';

const cards = [
    { title: 'Scraping Nodes', text: 'View your nodes and create new ones.', href: '/admin/nodes' },
];

export default function AdminPage() {
    return (
        <div className={styles.grid}>
            {cards.map(({ title, text, href }) => (
                <Link href={href} className={styles.card} key={href}>
                    <h3 className={styles.cardTitle}>{title}</h3>
                    <p className={styles.text}>{text}</p>
                </Link>
            ))}
        </div>
    );
}
