'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui';
import { HeaderSearchBar } from '@/components/SearchBar';
import { ReportModal } from '@/components/ReportModal';
import { DomainZoneIcon, LogoutIcon, MenuIcon, ScamCheckIcon, WhoisQueryIcon } from '@/components/icons';
import { isMobileWidth, ReportModalContext, ToolStatusContext, useBodyScrollLock, useHash } from '@/lib/hooks';
import type { ToolStatus } from '@/lib/types';
import styles from './tools.module.css';

const toolLinks = [
    { label: 'Scam Check', Icon: ScamCheckIcon, href: '/scam-check' },
    { label: 'Whois Query', Icon: WhoisQueryIcon, href: '/whois-query' },
    { label: 'Domain Zone', Icon: DomainZoneIcon, href: '/domain-zone' },
];

const footerLinks = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'About us', href: '/about-us' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
];

const headerErrors: Record<string, string> = {
    '/scam-check': 'No scrape available for this url.',
    '/whois-query': 'No scrape available for this domain/ip.',
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hash = useHash();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toolStatus, setToolStatus] = useState<ToolStatus>({ hasResult: false, failed: false });
    const openReportModal = useCallback(() => setIsModalOpen(true), []);
    const closeReportModal = useCallback(() => setIsModalOpen(false), []);
    const closeMenu = () => setIsMenuOpen(false);
    const tool = pathname === '/whois-query' ? '/whois-query' : '/scam-check';

    useBodyScrollLock(isMenuOpen || isModalOpen);

    useEffect(() => {
        const onResize = () => !isMobileWidth() && setIsMenuOpen(false);
        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <ReportModalContext.Provider value={openReportModal}>
            <ToolStatusContext.Provider value={setToolStatus}>
                <main className={styles.container}>
                    <aside className={`${styles.sidebar} ${isMenuOpen ? styles.open : ''}`}>
                        <div className={styles.sidebarContent}>
                            <div className={styles.logo}>
                                <Link href="/" className="link">
                                    <img src="/images/logo-sidebar.png" alt="ScamScan" width={72} height={48} />
                                </Link>
                            </div>
                            <nav className={styles.menu}>
                                <ul className={styles.menuItems}>
                                    {toolLinks.map(({ label, Icon, href }) => (
                                        <li className={`${styles.menuItem} ${pathname === href ? styles.active : ''}`} key={href}>
                                            <div className={styles.activeMarker} />
                                            <Icon />
                                            <Link href={href} className={`link ${styles.menuLink}`} onClick={closeMenu}>{label}</Link>
                                        </li>
                                    ))}
                                </ul>
                                <div className={styles.menuItem}>
                                    <div className={styles.activeMarker} />
                                    <LogoutIcon />
                                    <a href="#" className={`link ${styles.menuLink}`}>Log out</a>
                                </div>
                            </nav>
                        </div>
                    </aside>
                    <div className={`${styles.overlay} ${isMenuOpen ? styles.open : ''}`} onClick={closeMenu} />
                    <div className={styles.content}>
                        <header className={styles.header}>
                            <div className={styles.menuIcon} onClick={() => setIsMenuOpen(true)}>
                                <MenuIcon />
                            </div>
                            {hash && toolStatus.hasResult && (
                                <HeaderSearchBar
                                    tool={tool}
                                    placeholder="Type a new website to check"
                                    errorText={toolStatus.failed ? headerErrors[tool] : undefined}
                                />
                            )}
                            <Link href="/" className={`link ${styles.returnLink}`}>
                                <Button>Return to site</Button>
                            </Link>
                        </header>
                        <div className={styles.page}>{children}</div>
                        <footer className={styles.footer}>
                            <p className={styles.footerText}>© 2023 ScamScan. All Rights Reserved.</p>
                            <ul className={styles.footerLinks}>
                                {footerLinks.map(({ label, href }) => (
                                    <li className={styles.footerLinkItem} key={href}>
                                        <Link href={href} className={`link ${styles.footerLink}`}>{label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </footer>
                    </div>
                    {isModalOpen && <ReportModal onClose={closeReportModal} />}
                </main>
            </ToolStatusContext.Provider>
        </ReportModalContext.Provider>
    );
}
