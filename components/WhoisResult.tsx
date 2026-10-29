'use client';

import { useEffect, useState } from 'react';
import { InfoTable } from './InfoTable';
import { AngleBracketsIcon, LocationIcon, TableIcon } from './icons';
import { getWhoisDomainRaw } from '@/lib/api';
import type { DomainWhois, IpWhois, WhoisContact, WhoisLookup } from '@/lib/types';
import styles from './WhoisResult.module.css';

const LINK_PATTERN = /(\(?https?:\/\/[^\s)"]+\)?|[\w.-]+@[\w.-]+\.[a-zA-Z]{2,4})/;

const linkify = (text: string) => text.split(LINK_PATTERN).map((part, index) => {
    if (index % 2 === 0) return part;
    const href = part.replace(/^\(|\)$|\.$/g, '');

    return (
        <a key={index} className={styles.rawLink} href={href.includes('@') ? `mailto:${href}` : href} target="_blank" rel="noreferrer">
            {part}
        </a>
    );
});

/** Splits a raw whois line into the two grid columns: label and value. */
const splitLine = (line: string) => {
    const link = line.match(LINK_PATTERN);
    if (link?.index && line.slice(0, link.index).trim()) {
        return [line.slice(0, link.index), line.slice(link.index)];
    }
    const colon = line.indexOf(':');
    if (!link && colon > 0) {
        return [line.slice(0, colon + 1), line.slice(colon + 1)];
    }
    return [line, ''];
};

const RawText = ({ text }: { text: string }) => (
    <div>
        {text.split('\n').map((line, index) => {
            if (!line) return <div className={styles.blankRow} key={index} />;
            const [label, value] = splitLine(line);
            const isField = /^\S+:/.test(line);

            return (
                <div className={`${styles.rawRow} ${isField ? '' : styles.rawText}`} key={index}>
                    <div>{linkify(label)}</div>
                    <div>{linkify(value)}</div>
                </div>
            );
        })}
    </div>
);

const DomainRawText = ({ domain }: { domain: string }) => {
    const [text, setText] = useState('Loading...');

    useEffect(() => {
        getWhoisDomainRaw(domain).then(setText).catch(() => setText('No raw data available.'));
    }, [domain]);

    if (text.startsWith('{')) {
        return <pre className={styles.rawJson}>{linkify(text)}</pre>;
    }
    return <RawText text={text} />;
};

const ResultHeader = ({ title, location, isRaw, setIsRaw }: { title: string, location?: string, isRaw: boolean, setIsRaw: (raw: boolean) => void }) => (
    <div className={styles.header}>
        <div className={styles.headerText}>
            <h3 className={styles.title}>{title}</h3>
            {location && (
                <div className={styles.location}>
                    <div className={styles.locationIcon}><LocationIcon purple /></div>
                    {location}
                </div>
            )}
        </div>
        <div className={styles.switch}>
            <button className={`${styles.switchButton} ${isRaw ? '' : styles.active}`} onClick={() => setIsRaw(false)}>
                <TableIcon active={!isRaw} /> Table
            </button>
            <button className={`${styles.switchButton} ${isRaw ? styles.active : ''}`} onClick={() => setIsRaw(true)}>
                <AngleBracketsIcon active={isRaw} /> Raw
            </button>
        </div>
    </div>
);

const orDash = (value: unknown) => value || '-';

const toDay = (date: string | null) => date?.slice(0, 10) || '-';

const contactRows = (contact: WhoisContact) => [
    { key: 'Name', value: orDash(contact?.name) },
    { key: 'Organization', value: orDash(contact?.organization) },
    { key: 'Email', value: orDash(contact?.email) },
    { key: 'Phone', value: orDash(contact?.phone) },
    { key: 'Street', value: orDash(contact?.address.street) },
    { key: 'City', value: orDash(contact?.address.city) },
    { key: 'State', value: orDash(contact?.address.state) },
    { key: 'Postal Code', value: orDash(contact?.address.postalCode) },
    { key: 'Country', value: orDash(contact?.address.country) },
];

const DomainTables = ({ whois }: { whois: DomainWhois }) => {
    const { registrar, dates, contacts } = whois;
    const nameservers = whois.nameservers.length ? whois.nameservers : [{ name: '-', ipv4: [], ipv6: [] }];

    return (
        <>
            <InfoTable collapsible title="Registrar info" rows={[
                { key: 'Name', value: orDash(registrar.name) },
                { key: 'IANA id', value: orDash(registrar.ianaId) },
                { key: 'Registrar URL', value: orDash(registrar.url) },
                { key: 'Abuse Mail', value: orDash(registrar.abuseEmail) },
                { key: 'Abuse Phone', value: orDash(registrar.abusePhone?.replace(/^tel:/, '')) },
                { key: 'Status', value: orDash(whois.status.join(', ')) },
            ]} />
            <InfoTable collapsible title="Important dates" rows={[
                { key: 'Expires on', value: toDay(dates.expires) },
                { key: 'Registered on', value: toDay(dates.created) },
                { key: 'Updated on', value: toDay(dates.updated) },
            ]} />
            <InfoTable
                collapsible
                title="Name servers"
                rows={nameservers.map((server) => ({ key: server.name, value: orDash([...server.ipv4, ...server.ipv6].join(', ')) }))}
            />
            <InfoTable collapsible title="Contact Registrant" rows={contactRows(contacts.registrant)} />
            <InfoTable collapsible defaultOpen={false} title="Contact Admin" rows={contactRows(contacts.admin)} />
            <InfoTable collapsible defaultOpen={false} title="Contact Billing" rows={contactRows(contacts.billing)} />
            <InfoTable collapsible defaultOpen={false} title="Contact Tech" rows={contactRows(contacts.tech)} />
        </>
    );
};

const IpTables = ({ whois }: { whois: IpWhois }) => {
    const { location, network } = whois;

    return (
        <>
            <InfoTable
                collapsible
                title="Geolocation"
                location={[location.latitude, location.longitude]}
                rows={[
                    { key: 'Country', value: location.country },
                    { key: 'Address', value: location.address },
                    { key: 'Longitude', value: location.longitude },
                    { key: 'Latitude', value: location.latitude },
                ]}
            />
            <InfoTable collapsible title="Summary" rows={[
                { key: 'Whois Server', value: whois.whoisServer },
                { key: 'ASN', value: whois.asn },
                { key: 'Company', value: whois.organization },
                { key: 'Route', value: network.cidr },
                { key: 'Abuse Contact', value: whois.abuseEmail },
            ]} />
            <InfoTable collapsible title="IP Net" rows={[
                { key: 'Net Name', value: network.name },
                { key: 'First IP', value: network.firstIp },
                { key: 'Last IP', value: network.lastIp },
            ]} />
        </>
    );
};

export const WhoisResult = ({ lookup }: { lookup: WhoisLookup }) => {
    const [isRaw, setIsRaw] = useState(false);

    if (lookup.type === 'ip') {
        const { data } = lookup;

        return (
            <div className={styles.container}>
                <ResultHeader title={data.ip} location={`${data.location.country}, ${data.location.city}`} isRaw={isRaw} setIsRaw={setIsRaw} />
                {isRaw ? <RawText text={data.raw} /> : <IpTables whois={data} />}
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <ResultHeader title={lookup.data.domain} isRaw={isRaw} setIsRaw={setIsRaw} />
            {isRaw ? <DomainRawText domain={lookup.data.domain} /> : <DomainTables whois={lookup.data} />}
        </div>
    );
};
