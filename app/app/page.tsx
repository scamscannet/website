'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AppPage() {
    const router = useRouter();

    useEffect(() => router.replace('/app/scam-check'), [router]);

    return null;
}
