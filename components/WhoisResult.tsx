'use client';

import { useState } from 'react';
import { InfoTable } from './InfoTable';
import { AngleBracketsIcon, LocationIcon, TableIcon } from './icons';
import type { Whois } from '@/lib/types';
import styles from './WhoisResult.module.css';

const LINK_PATTERN = /(\(?https?:\/\/[^\s)]+\)?|[\w.-]+@[\w.-]+\.[a-zA-Z]{2,4})/;

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

const RawText = ({ text = '' }: { text?: string }) => (
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

const contactRows = (contact: Whois) => [
    ['Type', 'type'], ['Name', 'name'], ['Organization', 'organization'], ['Email', 'email'], ['Phone', 'phone'], ['Street', 'street'],
    ['City', 'city'], ['State', 'state'], ['Postal Code', 'postal_code'], ['Country', 'country'], ['Fax', 'fax'], ['Location', 'location'],
].map(([key, field]) => ({ key, value: orDash(contact?.[field]) }));

const nameServerRows = (servers: unknown) => {
    if (!servers) return [{ key: '-', value: '-' }];
    if (Array.isArray(servers) && typeof servers[0] === 'string') return servers.map((server) => ({ key: server, value: server }));

    return Array.from({ length: 3 }, () => ({ key: '-', value: '-' }));
};

const DomainTables = ({ whois }: { whois: Whois }) => {
    const { parsed, json_format: fields } = whois;

    return (
        <>
            <InfoTable collapsible title="Registrar info" rows={[
                { key: 'Name', value: orDash(parsed?.registrar?.name) },
                { key: 'IANA id', value: orDash(parsed?.registrar?.iana_id) },
                { key: 'Registrar URL', value: orDash(fields?.['Registrar URL']) },
                { key: 'Abuse Mail', value: orDash(parsed?.registrar?.abuse_mail) },
                { key: 'Abuse Phone', value: orDash(parsed?.registrar?.abuse_phone) },
                { key: 'Status', value: orDash(fields?.['Domain Status']) },
            ]} />
            <InfoTable collapsible title="Important dates" rows={[
                { key: 'Expires on', value: orDash(parsed?.date?.expiration_date) },
                { key: 'Registred on', value: orDash(parsed?.date?.registration_date) },
                { key: 'Updated on', value: orDash(parsed?.date?.updated_date) },
            ]} />
            <InfoTable collapsible title="Name servers" rows={nameServerRows(fields?.['Name Server'])} />
            <InfoTable collapsible title="Contact Registrant" rows={contactRows(parsed?.contact?.registrant)} />
            <InfoTable collapsible defaultOpen={false} title="Contact Admin" rows={contactRows(parsed?.contact?.admin)} />
            <InfoTable collapsible defaultOpen={false} title="Contact Billing" rows={contactRows(parsed?.contact?.billing)} />
            <InfoTable collapsible defaultOpen={false} title="Contact Tech" rows={contactRows(parsed?.contact?.tech)} />
        </>
    );
};

const IpTables = ({ whois }: { whois: Whois }) => {
    const { parsed, json_format: fields } = whois;
    const address = parsed?.addresses?.[0];

    return (
        <>
            <InfoTable
                collapsible
                title="Geolocation"
                location={address?.latitude ? [Number(address.latitude), Number(address.longitude)] : undefined}
                rows={[
                    { key: 'Country', value: orDash(address?.country) },
                    { key: 'Address', value: orDash(address?.address) },
                    { key: 'Longitude', value: orDash(address?.longitude) },
                    { key: 'Latitude', value: orDash(address?.latitude) },
                ]}
            />
            <InfoTable collapsible title="Summary" rows={[
                { key: 'Whois Server', value: orDash(parsed?.whois) },
                { key: 'ASN', value: orDash(fields?.OriginAS || fields?.origin) },
                { key: 'Company', value: orDash(fields?.OrgName || fields?.descr) },
                { key: 'Route', value: orDash(fields?.CIDR || fields?.route) },
                { key: 'Abuse Contact', value: orDash(fields?.OrgAbuseEmail || fields?.['abuse-mailbox']) },
            ]} />
            <InfoTable collapsible title="IP Net" rows={[
                { key: 'Net Name', value: orDash(fields?.NetName || fields?.netname) },
                { key: 'First IP', value: orDash(parsed?.ipnet?.first_ip) },
                { key: 'Last Ip', value: orDash(parsed?.ipnet?.last_ip) },
                { key: 'All IPs', value: orDash(parsed?.ipnet?.all_ips) },
            ]} />
        </>
    );
};

export const WhoisResult = ({ whois }: { whois: Whois }) => {
    const [isRaw, setIsRaw] = useState(false);
    const isIp = Boolean(whois?.parsed?.ip);
    const address = whois?.parsed?.addresses?.[0];

    return (
        <div className={styles.container}>
            <ResultHeader
                title={isIp ? whois.parsed.ip : whois?.parsed?.domain}
                location={isIp ? `${address?.country}, ${address?.address?.split(',')[1]}` : undefined}
                isRaw={isRaw}
                setIsRaw={setIsRaw}
            />
            {isRaw && <RawText text={whois?.raw} />}
            {!isRaw && (isIp ? <IpTables whois={whois} /> : <DomainTables whois={whois} />)}
        </div>
    );
};
