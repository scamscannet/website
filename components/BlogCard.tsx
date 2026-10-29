import Link from 'next/link';
import { CircleRightIcon } from './icons';
import type { BlogCardData } from '@/lib/types';
import styles from './BlogCard.module.css';

export const BlogCard = ({ card }: { card: BlogCardData }) => (
    <div className={styles.card}>
        <div className={styles.imageContainer}>
            <img src="/images/card.png" alt="" width={278} height={302} draggable={false} loading="lazy" />
        </div>
        <span className={styles.date}>{card.date}</span>
        <h5 className={styles.title}>{card.title}</h5>
        <p className={styles.description}>{card.description}</p>
        <Link href={card.link} className={`link ${styles.link}`}>
            <div className={styles.linkContent}>
                <CircleRightIcon />
                <span style={{ marginLeft: 4 }}>Find Out More</span>
            </div>
        </Link>
    </div>
);
