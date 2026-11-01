'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getMe } from '@/lib/api';
import styles from './admin.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        getMe()
            .then((user) => user.is_admin ? setIsAdmin(true) : router.replace('/'))
            .catch(() => router.replace('/'));
    }, [router]);

    if (!isAdmin) {
        return null;
    }

    return (
        <main className={styles.page}>
            <Link href="/admin" className={styles.title}>Admin</Link>
            {children}
        </main>
    );
}
