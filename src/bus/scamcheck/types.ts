// Core
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';


export type ChartInfo = {
    domain: {
        protocol?: string,
        subdomain?: string,
        domain: string,
        tld: string,
        path?: string,
        query: any,
        fragment: string,
        parameters: any[]
    },
    scamScore: number,
    category: [
        {
            name: string,
            confidence: number
        }
    ]
}
interface IDomain {
    protocol?: string,
    subdomain?: string,
    domain: string,
    tld: string,
    path?: string,
    query: anyObject,
    fragment?: string,
    parameters: any[]
}

type anyObject = {
    [key: string]: any;
}

export type ScamCheckResponse = {
    status: 'online' | 'offline' | 'error' | 'redirect',
    domain: IDomain,
    code: {
        title: string,
        text: string,
        html: string,
        javascript: {
            internal: any[],
            external: any[],
            local: any[]
        }
    },
    links: {
        internal: any[],
        external: any[]
    },
    server: {
        ip: string,
        whois: anyObject
    },
    headers: anyObject,
    whois: anyObject,
    node: {
        ip: string,
        node_id: string
    },
    modules?: anyObject,
    redirect: IDomain | null,
    timestamp: Date | string
}

// State
export type ScamCheck = ScamCheckResponse
export type ScamCheckState = {
    isLoading: boolean
    scamCheck: {
        domain: string | null
        lastUpdate: string | null
        name: string | null
        status: 'allowlist' | 'blocklist' | 'watchlist' | 'scamscanlist' | 'trusted' | null
        screenshots: {
            screenshot: {
                isLoading: boolean,
                screenshot: any,
                error: any
            }
            screenshot_fullsize: {
                isLoading: boolean,
                screenshot: any,
                error: any
            }
        }
        websiteText: string | null
        Domain: {
            registrar: string | null
            registrationDate: string | null
            ownerName: string | null
        }
        Ip: {
            ip: string | null
            country: string | null
            registrant: string | null
        }
    }
    chart: {
        domain: {
            isLoading: boolean
            error: boolean
            data: null | number
        }
        website: {
            isLoading: boolean
            error: boolean
            data: null | number
        }
    }
    error: any
}

// Contracts
export type BaseContact<T = any> = CaseReducer<ScamCheckState, PayloadAction<T>>
