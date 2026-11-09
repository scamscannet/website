'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { HeaderSearchBar } from '@/components/SearchBar';
import { ReportModal } from '@/components/ReportModal';
import { LinkedInIcon, MenuIcon, TelegramIcon, XTwitterIcon } from '@/components/icons';
import { isMobileWidth, ReportModalContext, scrollToSection, useBodyScrollLock } from '@/lib/hooks';
import { texts } from '@/lib/texts';
import styles from './layout.module.css';

const { nav, footer } = texts;

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
                        <img src="/images/logo.png" alt={texts.site.name} width={72} height={48} />
                    </Link>
                </li>
                <li className={`${styles.column} ${styles.searchColumn}`}>
                    <HeaderSearchBar tool="/app/check" />
                </li>
                <li className={styles.column}>
                    <div className={styles.links}>
                        <nav className={styles.links}>
                            {navLink('/about-us', nav.about)}
                            <a href="/#tools" className={styles.anchorLink} onClick={(event) => { event.preventDefault(); goToTools(); }}>{nav.tools}</a>
                            {navLink('/blog', nav.blog)}
                            <a href="#contacts" className={styles.anchorLink} onClick={(event) => { event.preventDefault(); goToContacts(); }}>{nav.contact}</a>
                        </nav>
                        <Button type="button" variant="outlined" className={styles.reportButton} onClick={openReportModal}>{nav.report}</Button>
                        <Link href="/app/check" className={`link ${styles.openAppLink}`}>
                            <Button type="button">{nav.openApp}</Button>
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
            <img src="/images/logo-footer.png" alt={texts.site.name} width={102} height={68} />
            <li className={styles.footerColumn}>
                <a href={`mailto:${texts.site.email}`} className={`link ${styles.emailLink}`}>{texts.site.email}</a>
                <address className={styles.footerText}>{texts.site.address}</address>
                <p className={styles.footerText}>
                    {footer.meeting}
                    <a href="#" className={`link ${styles.underlined}`}>{footer.bookMeeting}</a>
                </p>
            </li>
            <li className={styles.footerColumn}>
                <Link href="/privacy-policy" className="link">{footer.privacy}</Link>
                <Link href="/terms-and-conditions" className="link">{footer.terms}</Link>
                <div className={styles.socialLinks}>
                    <a href="https://www.linkedin.com/in/felixpf/" className="link"><LinkedInIcon /></a>
                    {/*
                        <a href="#" className="link"><XTwitterIcon /></a>
                        <a href="#" className="link"><TelegramIcon /></a>
                    */ }
                </div>
            </li>
        </ul>
        <div className={styles.divider} />
        <p className={styles.copyright}>{texts.site.copyright(new Date().getFullYear())}</p>
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
