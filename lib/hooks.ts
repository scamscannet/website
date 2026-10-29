'use client';

import { createContext, useContext, useEffect, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import type { ToolStatus } from './types';

const HASH_EVENT = 'scamscan:hashchange';

// Next.js navigates with history.pushState, which fires no hashchange event,
// so clicking e.g. the sidebar link from /scam-check#site.com to /scam-check would go unnoticed.
if (typeof window !== 'undefined' && !('hashPatched' in window.history)) {
    for (const method of ['pushState', 'replaceState'] as const) {
        const original = window.history[method].bind(window.history);
        window.history[method] = (...args) => {
            original(...args);
            queueMicrotask(() => window.dispatchEvent(new Event(HASH_EVENT)));
        };
    }
    Object.assign(window.history, { hashPatched: true });
}

const subscribeToHash = (onChange: () => void) => {
    window.addEventListener('hashchange', onChange);
    window.addEventListener(HASH_EVENT, onChange);

    return () => {
        window.removeEventListener('hashchange', onChange);
        window.removeEventListener(HASH_EVENT, onChange);
    };
};

/** The URL hash without "#", e.g. "example.com" for /scam-check#example.com */
export const useHash = () => useSyncExternalStore(
    subscribeToHash,
    () => decodeURIComponent(window.location.hash.slice(1)).trim(),
    () => '',
);

export const useGoToTool = () => {
    const router = useRouter();

    return (path: string, value: string) => {
        if (window.location.pathname === path) {
            window.location.hash = value;
        } else {
            router.push(`${path}#${value}`);
        }
    };
};

export const useBodyScrollLock = (locked: boolean) => {
    useEffect(() => {
        document.body.style.overflow = locked ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [locked]);
};

export const isMobileWidth = () => document.documentElement.clientWidth < 960;

/** Smooth-scrolls to an element, leaving room for the fixed landing header. */
export const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 0;
    if (section) {
        window.scrollTo({ behavior: 'smooth', top: section.getBoundingClientRect().top + window.scrollY - headerHeight });
    }
};

export const ReportModalContext = createContext<() => void>(() => {});
export const useOpenReportModal = () => useContext(ReportModalContext);

/** Lets a tool page tell the app layout whether to show the header search bar and its error. */
export const ToolStatusContext = createContext<(status: ToolStatus) => void>(() => {});
export const useReportToolStatus = (status: ToolStatus) => {
    const report = useContext(ToolStatusContext);
    useEffect(() => report(status), [report, status.hasResult, status.failed]);
};
