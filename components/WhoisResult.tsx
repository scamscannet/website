'use client';

import { useEffect, useState } from 'react';
import { InfoTable } from './InfoTable';
import { AngleBracketsIcon, LocationIcon, TableIcon } from './icons';
import { getWhoisDomainRaw } from '@/lib/api';
import type { DomainWhois, IpWhois, WhoisContact, WhoisLookup } from '@/lib/types';
import { texts } from '@/lib/texts';
import styles from './WhoisResult.module.css';

const t = texts.whois;
const { tables, rows } = t;

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
    const [text, setText] = useState(t.loading);

    useEffect(() => {
        getWhoisDomainRaw(domain).then(setText).catch(() => setText(t.noRaw));
    }, [domain]);

    if (text.startsWith('{')) {
        return <pre className={styles.rawJson}>{linkify(text)}</pre>;
    }
    return <RawText text={text} />;
};

const ResultHeader = ({ title, location, isRaw, setIsRaw }: { title: string, location?: string, isRaw: boolean, setIsRaw: (raw: boolean) => void }) => (
    <div className={styles.header}>
        <div className={styles.headerText}>
            <h1 className={styles.title}>{title}</h1>
            {location && (
                <div className={styles.location}>
                    <div className={styles.locationIcon}><LocationIcon purple /></div>
                    {location}
                </div>
            )}
        </div>
        <div className={styles.switch}>
            <button className={`${styles.switchButton} ${isRaw ? '' : styles.active}`} onClick={() => setIsRaw(false)}>
                <TableIcon active={!isRaw} /> {t.table}
            </button>
            <button className={`${styles.switchButton} ${isRaw ? styles.active : ''}`} onClick={() => setIsRaw(true)}>
                <AngleBracketsIcon active={isRaw} /> {t.raw}
            </button>
        </div>
    </div>
);

const orDash = (value: unknown) => value || '-';

const toDay = (date: string | null) => date?.slice(0, 10) || '-';

const contactRows = (contact: WhoisContact) => [
    { key: rows.name, value: orDash(contact?.name) },
    { key: rows.organization, value: orDash(contact?.organization) },
    { key: rows.email, value: orDash(contact?.email) },
    { key: rows.phone, value: orDash(contact?.phone) },
    { key: rows.street, value: orDash(contact?.address.street) },
    { key: rows.city, value: orDash(contact?.address.city) },
    { key: rows.state, value: orDash(contact?.address.state) },
    { key: rows.postalCode, value: orDash(contact?.address.postalCode) },
    { key: rows.country, value: orDash(contact?.address.country) },
];

const DomainTables = ({ whois }: { whois: DomainWhois }) => {
    const { registrar, dates, contacts } = whois;
    const nameservers = whois.nameservers.length ? whois.nameservers : [{ name: '-', ipv4: [], ipv6: [] }];

    return (
        <>
            <InfoTable collapsible title={tables.registrar} rows={[
                { key: rows.name, value: orDash(registrar.name) },
                { key: rows.ianaId, value: orDash(registrar.ianaId) },
                { key: rows.url, value: orDash(registrar.url) },
                { key: rows.abuseEmail, value: orDash(registrar.abuseEmail) },
                { key: rows.abusePhone, value: orDash(registrar.abusePhone?.replace(/^tel:/, '')) },
                { key: rows.status, value: orDash(whois.status.join(', ')) },
            ]} />
            <InfoTable collapsible title={tables.dates} rows={[
                { key: rows.expires, value: toDay(dates.expires) },
                { key: rows.created, value: toDay(dates.created) },
                { key: rows.updated, value: toDay(dates.updated) },
            ]} />
            <InfoTable
                collapsible
                title={tables.nameServers}
                rows={nameservers.map((server) => ({ key: server.name, value: orDash([...server.ipv4, ...server.ipv6].join(', ')) }))}
            />
            <InfoTable collapsible title={tables.registrant} rows={contactRows(contacts.registrant)} />
            <InfoTable collapsible defaultOpen={false} title={tables.admin} rows={contactRows(contacts.admin)} />
            <InfoTable collapsible defaultOpen={false} title={tables.billing} rows={contactRows(contacts.billing)} />
            <InfoTable collapsible defaultOpen={false} title={tables.tech} rows={contactRows(contacts.tech)} />
        </>
    );
};

const IpTables = ({ whois }: { whois: IpWhois }) => {
    const { location, network } = whois;

    return (
        <>
            <InfoTable
                collapsible
                title={tables.geolocation}
                location={[location.latitude, location.longitude]}
                rows={[
                    { key: rows.country, value: location.country },
                    { key: rows.address, value: location.address },
                    { key: rows.longitude, value: location.longitude },
                    { key: rows.latitude, value: location.latitude },
                ]}
            />
            <InfoTable collapsible title={tables.summary} rows={[
                { key: rows.whoisServer, value: whois.whoisServer },
                { key: rows.asn, value: whois.asn },
                { key: rows.company, value: whois.organization },
                { key: rows.route, value: network.cidr },
                { key: rows.abuseContact, value: whois.abuseEmail },
            ]} />
            <InfoTable collapsible title={tables.network} rows={[
                { key: rows.netName, value: network.name },
                { key: rows.firstIp, value: network.firstIp },
                { key: rows.lastIp, value: network.lastIp },
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
