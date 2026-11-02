import type { IpWhois, Takedown } from './types';

// Static stand-in for the takedown API until it exists.
export const takedownsMock: Takedown[] = [
    {
        domain: 'secure-paypa1-login.com',
        category: 'Phishing',
        created: '2026-10-28',
        lastUpdate: '2026-11-01',
        status: 'Taken down',
        registrar: 'NameSilo, LLC',
        hostingProvider: 'Cloudflare, Inc.',
        ip: '104.21.48.12',
        country: 'United States',
        description: 'Fake PayPal login page collecting credentials and card details.',
        events: [
            { status: 'Reported', date: '2026-10-28', note: 'Reported by a user through the scam check.' },
            { status: 'Verified', date: '2026-10-28', note: 'Phishing kit confirmed by our team.' },
            { status: 'Abuse reports sent', date: '2026-10-29', note: 'Reports sent to the registrar and hosting provider.' },
            { status: 'Taken down', date: '2026-11-01', note: 'Domain suspended by the registrar.' },
        ],
    },
    {
        domain: 'dhl-parcel-redelivery.net',
        category: 'Parcel scam',
        created: '2026-10-30',
        lastUpdate: '2026-11-01',
        status: 'Abuse reports sent',
        registrar: 'Hostinger Operations, UAB',
        hostingProvider: 'Hostinger International Limited',
        ip: '185.224.137.40',
        country: 'Lithuania',
        description: 'Asks for a small redelivery fee to steal card details.',
        events: [
            { status: 'Reported', date: '2026-10-30', note: 'Found through an SMS campaign report.' },
            { status: 'Verified', date: '2026-10-31', note: 'Payment form confirmed as fraudulent.' },
            { status: 'Abuse reports sent', date: '2026-11-01', note: 'Waiting for a response from the hosting provider.' },
        ],
    },
    {
        domain: 'bitcoin-doubler.io',
        category: 'Crypto scam',
        created: '2026-10-31',
        lastUpdate: '2026-10-31',
        status: 'Verified',
        registrar: 'Namecheap, Inc.',
        hostingProvider: 'DigitalOcean, LLC',
        ip: '159.89.102.7',
        country: 'Germany',
        description: 'Promises to double any crypto deposit within 24 hours.',
        events: [
            { status: 'Reported', date: '2026-10-31', note: 'Reported by a user.' },
            { status: 'Verified', date: '2026-10-31', note: 'Wallet addresses linked to known scam reports.' },
        ],
    },
    {
        domain: 'amaz0n-giftcard-winner.shop',
        category: 'Fake giveaway',
        created: '2026-11-01',
        lastUpdate: '2026-11-01',
        status: 'Reported',
        registrar: 'GoDaddy.com, LLC',
        hostingProvider: 'OVH SAS',
        ip: '51.75.144.201',
        country: 'France',
        description: 'Fake Amazon giveaway asking for a shipping fee.',
        events: [
            { status: 'Reported', date: '2026-11-01', note: 'Reported by a user, waiting for review.' },
        ],
    },
    {
        domain: 'luxury-watches-outlet.store',
        category: 'Fake shop',
        created: '2026-10-20',
        lastUpdate: '2026-10-27',
        status: 'Taken down',
        registrar: 'Alibaba Cloud Computing Ltd.',
        hostingProvider: 'Alibaba Cloud',
        ip: '47.88.21.163',
        country: 'Singapore',
        description: 'Online shop taking payments for branded watches that are never shipped.',
        events: [
            { status: 'Reported', date: '2026-10-20', note: 'Reported by multiple users.' },
            { status: 'Verified', date: '2026-10-21', note: 'No company details, copied product photos.' },
            { status: 'Abuse reports sent', date: '2026-10-22', note: 'Reports sent to the registrar and payment provider.' },
            { status: 'Taken down', date: '2026-10-27', note: 'Site removed by the hosting provider.' },
        ],
    },
];

// Static stand-in for the IP whois endpoint until a real IP-capable API exists.
export const ipWhoisMock: Omit<IpWhois, 'ip'> = {
    whoisServer: 'whois.arin.net',
    asn: 'AS15169',
    organization: 'Google LLC',
    abuseEmail: 'network-abuse@google.com',
    network: {
        name: 'GOOGLE',
        cidr: '172.217.0.0/16',
        firstIp: '172.217.0.0',
        lastIp: '172.217.255.255',
    },
    location: {
        country: 'USA',
        city: 'Mountain View',
        address: '1600 Amphitheatre Pkwy, Mountain View, CA 94043-1351, United States',
        latitude: 37.42249,
        longitude: -122.08473,
    },
    raw: `NetRange:       172.217.0.0 - 172.217.255.255
CIDR:           172.217.0.0/16
NetName:        GOOGLE
NetHandle:      NET-172-217-0-0-1
Parent:         NET172 (NET-172-0-0-0-0)
NetType:        Direct Allocation
OriginAS:       AS15169
Organization:   Google LLC (GOGL)
RegDate:        2012-04-16
Updated:        2012-04-16
Ref:            https://rdap.arin.net/registry/ip/172.217.0.0

OrgName:        Google LLC
OrgId:          GOGL
Address:        1600 Amphitheatre Parkway
City:           Mountain View
StateProv:      CA
PostalCode:     94043
Country:        US
RegDate:        2000-03-30
Updated:        2019-10-31
Ref:            https://rdap.arin.net/registry/entity/GOGL

OrgAbuseHandle: ABUSE5250-ARIN
OrgAbuseName:   Abuse
OrgAbusePhone:  +1-650-253-0000
OrgAbuseEmail:  network-abuse@google.com
OrgAbuseRef:    https://rdap.arin.net/registry/entity/ABUSE5250-ARIN`,
};
