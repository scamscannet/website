import Link from 'next/link';
import { CircleRightIcon } from './icons';
import { texts } from '@/lib/texts';
import type { BlogCardData } from '@/lib/types';
import styles from './BlogCard.module.css';

export const BlogCard = ({ card }: { card: BlogCardData }) => (
    <div className={styles.card}>
        <div className={styles.imageContainer}>
            <img src="/images/card.png" alt="" width={278} height={302} draggable={false} loading="lazy" />
        </div>
        <span className={styles.date}>{card.date}</span>
        <h3 className={styles.title}>{card.title}</h3>
        <p className={styles.description}>{card.description}</p>
        <Link href={card.link} className={`link ${styles.link}`}>
            <div className={styles.linkContent}>
                <CircleRightIcon />
                <span style={{ marginLeft: 4 }}>{texts.blog.readMore}</span>
            </div>
        </Link>
    </div>
);
