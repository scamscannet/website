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

// The whois API returns loosely structured data that differs between registries.
export type Whois = any;

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
