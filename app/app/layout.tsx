'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeaderSearchBar } from '@/components/SearchBar';
import { ReportModal } from '@/components/ReportModal';
import { LogoutIcon, MenuIcon, ScamCheckIcon, TakedownIcon, ToolsIcon } from '@/components/icons';
import { isMobileWidth, ReportModalContext, ToolStatusContext, useBodyScrollLock, useHash } from '@/lib/hooks';
import type { ToolStatus } from '@/lib/types';
import { texts } from '@/lib/texts';
import styles from './tools.module.css';

const { menu } = texts.app;

const toolLinks = [
    { label: menu.check, Icon: ScamCheckIcon, href: '/app/check', paths: ['/app/check'] },
    { label: menu.takedown, Icon: TakedownIcon, href: '/app/takedown', paths: ['/app/takedown'] },
    { label: menu.tools, Icon: ToolsIcon, href: '/app/tools', paths: ['/app/tools', '/app/whois-query', '/app/domain-zone'] },
];

const footerLinks = [
    { label: texts.footer.home, href: '/' },
    { label: texts.nav.blog, href: '/blog' },
    { label: texts.nav.about, href: '/about-us' },
    { label: texts.footer.privacy, href: '/privacy-policy' },
    { label: texts.footer.terms, href: '/terms-and-conditions' },
];

const headerErrors: Record<string, string> = {
    '/app/whois-query': texts.app.headerErrors.whois,
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
    const tool = pathname === '/app/whois-query' ? '/app/whois-query' : '/app/check';

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
                                    <img src="/images/logo-sidebar.png" alt={texts.site.name} width={72} height={48} />
                                </Link>
                            </div>
                            <nav className={styles.menu}>
                                <ul className={styles.menuItems}>
                                    {toolLinks.map(({ label, Icon, href, paths }) => (
                                        <li key={href}>
                                            <Link href={href} className={`${styles.menuItem} ${paths.some((path) => pathname.startsWith(path)) ? styles.active : ''}`} onClick={closeMenu}>
                                                <div className={styles.activeMarker} />
                                                <Icon />
                                                <span className={`link ${styles.menuLink}`}>{label}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/" className={styles.menuItem}>
                                    <div className={styles.activeMarker} />
                                    <LogoutIcon />
                                    <span className={`link ${styles.menuLink}`}>{menu.back}</span>
                                </Link>
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
                                    placeholder={texts.app.headerPlaceholder}
                                    errorText={toolStatus.failed ? headerErrors[tool] : undefined}
                                />
                            )}
                        </header>
                        <div className={styles.page}>{children}</div>
                        <footer className={styles.footer}>
                            <p className={styles.footerText}>{texts.site.copyright(new Date().getFullYear())}. {texts.footer.rightsReserved}</p>
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
