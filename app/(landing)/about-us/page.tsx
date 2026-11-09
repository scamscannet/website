import { SectionSubtitle, SectionTitle } from '@/components/ui';
import { pageMetadata } from '@/lib/seo';
import { texts } from '@/lib/texts';
import styles from './page.module.css';

export const metadata = pageMetadata('/about-us', texts.meta.about);

export default function AboutUsPage() {
    return (
        <section className={styles.container}>
            <SectionTitle as="h1" className={styles.title}>{texts.about.title}</SectionTitle>
            <div className={styles.columns}>
                {texts.about.columns.map(({ title, text }) => (
                    <div className={styles.column} key={title}>
                        <SectionSubtitle>{title}</SectionSubtitle>
                        <p className={styles.text}>{text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
