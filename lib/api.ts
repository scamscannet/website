import type { ListStatus, ReportPayload, ScamCheckResult, TldList, Whois } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.scamscan.net';
const WHOIS_URL = process.env.NEXT_PUBLIC_WHOIS_URL || 'https://whois.scamscan.net';

async function request(url: string, init?: RequestInit, expectedStatus = 200) {
    const response = await fetch(url, init);
    if (response.status !== expectedStatus) {
        throw new Error(`Request to ${url} failed with status ${response.status}`);
    }

    return response;
}

const json = (url: string, init?: RequestInit, expectedStatus?: number) => request(url, init, expectedStatus).then((response) => response.json());

const image = (url: string) => request(url).then(async (response) => URL.createObjectURL(await response.blob()));

const toPercent = (data: { scamScore: number }) => Number(data.scamScore.toFixed(3));

export async function getScamCheck(url: string): Promise<ScamCheckResult> {
    const { domain, code, whois, server } = await json(`${API_URL}/registry?url=${url}`);
    const lastUpdate: string | undefined = whois?.json_format?.['>>> Last update of WHOIS database'];

    return {
        domain: `${domain?.subdomain && domain.subdomain + '.'}${domain?.domain && domain.domain + '.'}${domain?.tld}`,
        name: code?.title || '-',
        websiteText: code?.text || '-',
        lastUpdate: lastUpdate ? lastUpdate.split('<<<')[0].trim() : null,
        registrar: whois?.parsed?.registrar?.name || '-',
        registrationDate: whois?.parsed?.date?.registration_date || '-',
        ownerName: server?.whois?.json_format?.NetName || '-',
        ip: server?.ip || '-',
        country: server?.whois?.json_format?.Country || '-',
        registrant: server?.whois?.json_format?.OrgName || '-',
    };
}

export const getListStatus = (url: string): Promise<ListStatus> => json(`${API_URL}/lists?url=${url}`).then((data) => data.status);

export const getScreenshot = (url: string) => image(`${API_URL}/registry/image?url=${url}`);

export const getFullSizeScreenshot = (url: string) => image(`${API_URL}/registry/image?url=${url}&full_size=true`);

export const getDomainScore = (url: string): Promise<number> => json(`${API_URL}/ai/classify/domain?url=${url}`).then(toPercent);

export const getWebsiteScore = (url: string): Promise<number> => json(`${API_URL}/ai/classify/website?url=${url}`, { method: 'POST' }, 201).then(toPercent);

export const getWhoisDomain = (domain: string): Promise<Whois> => json(`${WHOIS_URL}/whois/${domain}?live=false`);

export const getWhoisIp = (ip: string): Promise<Whois> => json(`${WHOIS_URL}/ip-whois/${ip}?max_ipnet_size=64&live=false`);

export const getTlds = (page: number, perPage: number, query: string): Promise<TldList> => json(`${API_URL}/kdb/tlds/list?page=${page}&per_page=${perPage}&q=${query}`);

export const tldDownloadUrl = (tld: string) => `${API_URL}/kdb/tlds/download?tld=${tld}`;

export const sendReport = (payload: ReportPayload) => request(`${API_URL}/report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
}, 201);
