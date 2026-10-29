'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { HeaderSearchBar } from '@/components/SearchBar';
import { ReportModal } from '@/components/ReportModal';
import { LinkedInIcon, MenuIcon, TelegramIcon, XTwitterIcon } from '@/components/icons';
import { isMobileWidth, ReportModalContext, scrollToSection, useBodyScrollLock } from '@/lib/hooks';
import styles from './layout.module.css';

const Header = ({ openReportModal }: { openReportModal: () => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const closeMenu = () => setIsOpen(false);

    useBodyScrollLock(isOpen);

    useEffect(() => {
        const onResize = () => !isMobileWidth() && setIsOpen(false);
        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, []);

    const goToTools = () => {
        closeMenu();
        if (pathname === '/') {
            scrollToSection('tools');
        } else {
            router.push('/#tools');
        }
    };

    const goToContacts = () => {
        closeMenu();
        scrollToSection('contacts');
    };

    const navLink = (href: string, label: string) => (
        <Link href={href} onClick={closeMenu} className={`link ${styles.navLink} ${pathname === href ? styles.navLinkActive : ''}`}>
            {label}
        </Link>
    );

    return (
        <header className={styles.header}>
            <div className={styles.menuIcon} onClick={() => setIsOpen(true)}>
                <MenuIcon width={24} height={24} />
            </div>
            <ul className={`${styles.headerContent} ${isOpen ? styles.open : ''}`}>
                <li className={styles.column}>
                    <Link href="/" className={`link ${styles.logoLink}`} onClick={closeMenu}>
                        <img src="/images/logo.png" alt="ScamScan" width={72} height={48} />
                    </Link>
                </li>
                <li className={`${styles.column} ${styles.searchColumn}`}>
                    <HeaderSearchBar tool="/scam-check" />
                </li>
                <li className={styles.column}>
                    <div className={styles.links}>
                        <nav className={styles.links}>
                            {navLink('/about-us', 'About Us')}
                            <span className={styles.anchorLink} onClick={goToTools}>Tools</span>
                            {navLink('/blog', 'Blog')}
                            <span className={styles.anchorLink} onClick={goToContacts}>Contacts</span>
                        </nav>
                        <Button variant="outlined" className={styles.reportButton} onClick={openReportModal}>Report a Scam</Button>
                        <Link href="/scam-check" className={`link ${styles.openAppLink}`}>
                            <Button>Open App</Button>
                        </Link>
                    </div>
                </li>
            </ul>
            <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={closeMenu} />
        </header>
    );
};

const Footer = () => (
    <footer id="contacts" className={styles.footer}>
        <ul className={styles.footerContent}>
            <img src="/images/logo-footer.png" alt="ScamScan" width={102} height={68} />
            <li className={styles.footerColumn}>
                <a href="mailto:email_example@gmail.com" className={`link ${styles.emailLink}`}>email_example@gmail.com</a>
                <p className={styles.footerText}>Im Staderfeld 63a, Neu Eliah, BW 96929</p>
                <p className={styles.footerText}>
                    Schedule a virtual meeting:
                    <a href="#" className={`link ${styles.underlined}`}>Book a Meeting</a>
                </p>
            </li>
            <li className={styles.footerColumn}>
                <a href="#" className="link">Privacy Policy</a>
                <a href="#" className="link">Terms &amp; Conditions</a>
                <div className={styles.socialLinks}>
                    <a href="#" className="link"><TelegramIcon /></a>
                    <a href="#" className="link"><LinkedInIcon /></a>
                    <a href="#" className="link"><XTwitterIcon /></a>
                </div>
            </li>
        </ul>
        <div className={styles.divider} />
        <p className={styles.copyright}>© 2023 ScamScan</p>
    </footer>
);

export default function LandingLayout({ children }: { children: React.ReactNode }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openReportModal = useCallback(() => setIsModalOpen(true), []);
    const closeReportModal = useCallback(() => setIsModalOpen(false), []);

    useBodyScrollLock(isModalOpen);

    return (
        <ReportModalContext.Provider value={openReportModal}>
            <div style={{ position: 'relative' }}>
                <Header openReportModal={openReportModal} />
                {children}
                <Footer />
                {isModalOpen && <ReportModal onClose={closeReportModal} />}
            </div>
        </ReportModalContext.Provider>
    );
}
