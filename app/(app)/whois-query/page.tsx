'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SectionSubtitle, SectionTitle, Spinner } from '@/components/ui';
import { SearchBar } from '@/components/SearchBar';
import { WhoisResult } from '@/components/WhoisResult';
import { getWhoisDomain, getWhoisIp } from '@/lib/api';
import { useGoToTool, useHash, useReportToolStatus } from '@/lib/hooks';
import { domainRegex, ipv4Regex } from '@/lib/validation';
import type { WhoisLookup } from '@/lib/types';
import tools from '../tools.module.css';

const lookup = async (value: string): Promise<WhoisLookup> => {
    if (ipv4Regex.test(value)) {
        return { type: 'ip', data: await getWhoisIp(value) };
    }
    return { type: 'domain', data: await getWhoisDomain(value) };
};

export default function WhoisQueryPage() {
    const hash = useHash();
    const router = useRouter();
    const goToTool = useGoToTool();
    const [whois, setWhois] = useState<WhoisLookup | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [failed, setFailed] = useState(false);

    useReportToolStatus({ hasResult: whois !== null, failed });

    useEffect(() => {
        if (!hash) {
            setWhois(null);
            setFailed(false);
            return;
        }

        if (!domainRegex.test(hash) && !ipv4Regex.test(hash)) {
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
            {hash && whois ? <WhoisResult lookup={whois} /> : (
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
