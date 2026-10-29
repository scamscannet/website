'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SectionSubtitle, SectionTitle, Spinner } from '@/components/ui';
import { SearchBar } from '@/components/SearchBar';
import { WhoisResult } from '@/components/WhoisResult';
import { getWhoisDomain, getWhoisIp } from '@/lib/api';
import { useGoToTool, useHash, useReportToolStatus } from '@/lib/hooks';
import { domainRegex, ipv4Regex } from '@/lib/validation';
import type { Whois } from '@/lib/types';
import tools from '../tools.module.css';

const lookupFor = (value: string) => {
    if (domainRegex.test(value)) return getWhoisDomain;
    if (ipv4Regex.test(value)) return getWhoisIp;
    return null;
};

export default function WhoisQueryPage() {
    const hash = useHash();
    const router = useRouter();
    const goToTool = useGoToTool();
    const [whois, setWhois] = useState<Whois | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [failed, setFailed] = useState(false);

    useReportToolStatus({ hasResult: whois !== null, failed });

    useEffect(() => {
        if (!hash) {
            setWhois(null);
            setFailed(false);
            return;
        }

        const lookup = lookupFor(hash);
        if (!lookup) {
            router.replace('/whois-query');
            return;
        }

        setIsLoading(true);
        setFailed(false);
        lookup(hash)
            .then(setWhois)
            .catch(() => setFailed(true))
            .finally(() => setIsLoading(false));
    }, [hash, router]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <section className={tools.section}>
            {hash && whois ? <WhoisResult whois={whois} /> : (
                <>
                    <div className={tools.intro}>
                        <SectionTitle className={tools.title}>Whois Query</SectionTitle>
                        <SectionSubtitle className={tools.subtitle}>
                            Search for detailed information about IP addresses and domains,
                            including registration information, ownership, and more
                        </SectionSubtitle>
                    </div>
                    <SearchBar whois placeholder="Enter a domain or IP address" onSubmit={(value) => goToTool('/whois-query', value)} />
                    {failed && <SectionSubtitle className={tools.errorMessage}>No data available for {hash}.</SectionSubtitle>}
                </>
            )}
        </section>
    );
}
