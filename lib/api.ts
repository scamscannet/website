import createClient from 'openapi-fetch';
import { ipWhoisMock } from './mocks';
import type { paths } from './schema';
import type { DomainWhois, IpWhois, ReportPayload, ScamCheckResult } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.scamscan.net';
const WHOIS_URL = process.env.NEXT_PUBLIC_WHOIS_URL || 'https://whois.backend.scamscan.net';

async function request(url: string, init?: RequestInit, expectedStatus = 200) {
    const response = await fetch(url, init);
    if (response.status !== expectedStatus) {
        throw new Error(`Request to ${url} failed with status ${response.status}`);
    }

    return response;
}

const client = createClient<paths>({ baseUrl: API_URL });

async function call<T>(promise: Promise<{ data?: T, response: Response }>) {
    const { data, response } = await promise;
    if (!response.ok) {
        throw new Error(`Request to ${response.url} failed with status ${response.status}`);
    }

    return data as T;
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

export const getListStatus = (url: string) => call(client.GET('/lists', { params: { query: { url } } })).then((data) => data.status);

export const getScreenshot = (url: string) => image(`${API_URL}/registry/image?url=${url}`);

export const getFullSizeScreenshot = (url: string) => image(`${API_URL}/registry/image?url=${url}&full_size=true`);

export const getDomainScore = (url: string): Promise<number> => json(`${API_URL}/ai/classify/domain?url=${url}`).then(toPercent);

export const getWebsiteScore = (url: string): Promise<number> => json(`${API_URL}/ai/classify/website?url=${url}`, { method: 'POST' }, 201).then(toPercent);

export const getWhoisDomain = (domain: string): Promise<DomainWhois> => json(`${WHOIS_URL}/v1/whois/${domain}`);

/** The original upstream payload: RDAP JSON (pretty-printed) or plain WHOIS text. */
export async function getWhoisDomainRaw(domain: string) {
    const text = await request(`${WHOIS_URL}/v1/whois/${domain}?raw=true`).then((response) => response.text());
    try {
        return JSON.stringify(JSON.parse(text), null, 2);
    } catch {
        return text;
    }
}

// Simulated endpoint: the whois API only supports domains, so IP lookups return static data.
export const getWhoisIp = (ip: string): Promise<IpWhois> => new Promise((resolve) => {
    setTimeout(() => resolve({ ...ipWhoisMock, ip }), 300);
});

export const getTlds = (page: number, perPage: number, q: string) => call(client.GET('/kdb/tlds/list', { params: { query: { page, per_page: perPage, q } } }));

export const tldDownloadUrl = (tld: string) => `${API_URL}/kdb/tlds/download?tld=${tld}`;

export const sendReport = (payload: ReportPayload) => call(client.POST('/report', { body: payload }));

export const login = (email: string, password: string) => call(client.POST('/user/login', { body: { email, password }, credentials: 'include' }));

export const getMe = () => call(client.GET('/user/me', { credentials: 'include' }));

export const getNodes = () => call(client.GET('/dispatcher/node/list', { credentials: 'include' }));

export const createNode = () => call(client.POST('/dispatcher/node/create', { credentials: 'include' })).then((data) => data.secret);

export const deleteNode = (nodeId: string) => call(client.DELETE('/dispatcher/node/delete/{node_id}', { params: { path: { node_id: nodeId } }, credentials: 'include' }));
