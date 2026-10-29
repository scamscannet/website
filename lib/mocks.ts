import type { IpWhois } from './types';

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
