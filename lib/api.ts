import createClient from 'openapi-fetch';
import { ipWhoisMock, nodesMock, tldsMock } from './mocks';
import type { paths } from './schema';
import type { DomainWhois, IpWhois, ScrapingNode, TldList } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.scamscan.net';
const WHOIS_URL = process.env.NEXT_PUBLIC_WHOIS_URL || 'https://whois.backend.scamscan.net';

async function request(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
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

const simulate = <T>(value: T): Promise<T> => new Promise((resolve) => {
    setTimeout(() => resolve(value), 300);
});

export const getVerdict = (url: string) => call(client.GET('/verdicts', { params: { query: { url } } })).then((data) => data.verdict);

export const getReport = (domain: string) => call(client.GET('/report/{url}', { params: { path: { url: domain } } }));

export const sendReport = (domain: string) => call(client.POST('/report', { body: { domain } }));

export const requestScan = (url: string) => call(client.POST('/snapshots/scrape/job', { body: { url, domain: null, requested_scrapes: 1 } }));

export const getWhoisDomain = (domain: string): Promise<DomainWhois> => request(`${WHOIS_URL}/v1/whois/${domain}`).then((response) => response.json());

/** The original upstream payload: RDAP JSON (pretty-printed) or plain WHOIS text. */
export async function getWhoisDomainRaw(domain: string) {
    const text = await request(`${WHOIS_URL}/v1/whois/${domain}?raw=true`).then((response) => response.text());
    try {
        return JSON.stringify(JSON.parse(text), null, 2);
    } catch {
        return text;
    }
}

// Simulated endpoints below: the API has no IP whois, domain zone or node management (yet), so they use lib/mocks.ts.

export const getWhoisIp = (ip: string): Promise<IpWhois> => simulate({ ...ipWhoisMock, ip });

export const getTlds = (page: number, perPage: number, q: string): Promise<TldList> => {
    const tlds = tldsMock.filter((item) => item.tld.includes(q.trim().toLowerCase()));

    return simulate({
        tlds: tlds.slice((page - 1) * perPage, page * perPage),
        pagination: { current_page: page, per_page: perPage, last_page: Math.max(1, Math.ceil(tlds.length / perPage)) },
    });
};

export const tldDownloadUrl = (tld: string) => `data:text/csv;charset=utf-8,domain%0Aexample.${tld}%0A`;

let nodes = nodesMock;

export const getNodes = (): Promise<ScrapingNode[]> => simulate(nodes);

export const createNode = () => {
    const node_id = crypto.randomUUID();
    nodes = [...nodes, { name: `node-${nodes.length + 1}`, node_id, last_seen: new Date().toISOString(), completed_jobs: 0, failed_jobs: 0 }];

    return simulate(crypto.randomUUID().replaceAll('-', ''));
};

export const deleteNode = (nodeId: string) => {
    nodes = nodes.filter((node) => node.node_id !== nodeId);

    return simulate(null);
};

export const login = (email: string, password: string) => call(client.POST('/user/login', { body: { email, password }, credentials: 'include' }));

export const getMe = () => call(client.GET('/user/me', { credentials: 'include' }));
