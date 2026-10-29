import { SectionSubtitle, SectionTitle } from '@/components/ui';
import styles from './page.module.css';

const columns = [
    {
        title: 'Introduction',
        text: 'At ScamScan, our mission is to empower individuals and businesses by providing a reliable and efficient platform for scam detection and online safety. We are committed to creating a secure digital environment where users can navigate the internet with confidence.',
    },
    {
        title: 'Our mission',
        text: 'At ScamScan, we are driven by a singular mission — to combat online scams and foster a safer online experience. We believe in the power of information and technology to protect users from digital threats.',
    },
    {
        title: 'What we offer',
        text: 'ScamScan offers a robust and user-friendly platform for scanning websites, checking their legitimacy, and raising awareness about potential scams. Our tools are designed to provide real-time insights, enabling users to make informed decisions about their online activities.',
    },
];

export default function AboutUsPage() {
    return (
        <section className={styles.container}>
            <SectionTitle className={styles.title}>About ScamScan</SectionTitle>
            <div className={styles.columns}>
                {columns.map(({ title, text }) => (
                    <div className={styles.column} key={title}>
                        <SectionSubtitle>{title}</SectionSubtitle>
                        <p className={styles.text}>{text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
