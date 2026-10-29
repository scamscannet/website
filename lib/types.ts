export type ListStatus = 'allowlist' | 'blocklist' | 'watchlist' | 'scamscanlist' | 'trusted';

export type ScamStatus = 'Safe' | 'Scam' | 'Unclassified';

export type ScamCheckResult = {
    domain: string
    name: string
    websiteText: string
    lastUpdate: string | null
    registrar: string
    registrationDate: string
    ownerName: string
    ip: string
    country: string
    registrant: string
};

export type TldList = {
    tlds: { tld?: string, registrar?: string, last_update: string, count?: number }[]
    pagination: { current_page: number, last_page: number, per_page: number }
};

export type WhoisContact = {
    name: string | null
    organization: string | null
    email: string | null
    phone: string | null
    address: { street: string | null, city: string | null, state: string | null, postalCode: string | null, country: string | null }
    redacted: boolean
} | null;

/** Response of who-dat `GET /v1/whois/{domain}` */
export type DomainWhois = {
    domain: string
    registrar: { name: string | null, ianaId: string | null, url: string | null, abuseEmail: string | null, abusePhone: string | null }
    status: string[]
    nameservers: { name: string, ipv4: string[], ipv6: string[] }[]
    dates: { created: string | null, updated: string | null, expires: string | null }
    contacts: { registrant: WhoisContact, admin: WhoisContact, tech: WhoisContact, billing: WhoisContact }
};

export type IpWhois = {
    ip: string
    whoisServer: string
    asn: string
    organization: string
    abuseEmail: string
    network: { name: string, cidr: string, firstIp: string, lastIp: string }
    location: { country: string, city: string, address: string, latitude: number, longitude: number }
    raw: string
};

export type WhoisLookup = { type: 'domain', data: DomainWhois } | { type: 'ip', data: IpWhois };

export type BlogCardData = { date: string, title: string, description: string, link: string };

export type Article = {
    id: number
    image: string
    title: string
    subtitle: string
    sections: { title: string, points: { heading: string, text: string }[] }[]
    conclusion: string
    date: string
    hashtags: string[]
};

export type ToolStatus ={ hasResult: boolean, failed: boolean };

export type ReportPayload = {
    url: string
    comment: string
    email: string
    source: string
    contact_allowed: boolean
    tags: null
};
