/* eslint-disable no-undefined */
// Core
import React, { FC } from 'react';

// Bus
// import {} from '../../../bus/'

// Styles
import * as S from './styles';
import { TopRow } from '../TopRow';
import { Table } from '../../Table';
import { useWhoisquery } from '@/bus/whoisquery';
import { Parser } from '../ResultDomain/parse-text';

// Types
type PropTypes = {
    /* type props here */
    isRaw: boolean
    setIsRaw: React.Dispatch<React.SetStateAction<boolean>>
}

export const ResultIP: FC<PropTypes> = ({ isRaw, setIsRaw }) => {
    const { whoisquery: { whoisQuery }} = useWhoisquery();

    const geoData = [
        { key: 'Country', value: whoisQuery?.parsed?.addresses[ 0 ]?.country || '-' },
        { key: 'Address', value: whoisQuery?.parsed?.addresses[ 0 ]?.address || '-' },
        { key: 'Longitude', value: whoisQuery?.parsed?.addresses[ 0 ]?.longitude || '-' },
        { key: 'Latitude', value: whoisQuery?.parsed?.addresses[ 0 ]?.latitude || '-' },
    ];
    const summary = [
        { key: 'Whois Server', value: whoisQuery?.parsed?.whois || '-' },
        { key: 'ASN', value: whoisQuery?.json_format?.OriginAS || whoisQuery?.json_format?.origin || '-' },
        { key: 'Company', value: whoisQuery?.json_format?.OrgName || whoisQuery?.json_format?.descr || '-' },
        { key: 'Route', value: whoisQuery?.json_format?.CIDR || whoisQuery?.json_format?.route || '-' },
        { key: 'Abuse Contact', value: whoisQuery?.json_format?.OrgAbuseEmail || whoisQuery?.json_format[ 'abuse-mailbox' ] || '-' },
    ];
    const ipNet = [
        { key: 'Net Name', value: whoisQuery?.json_format?.NetName || whoisQuery?.json_format?.netname || '-' },
        { key: 'First IP', value: whoisQuery?.parsed?.ipnet?.first_ip || '-' },
        { key: 'Last Ip', value: whoisQuery?.parsed?.ipnet?.last_ip || '-' },
        { key: 'All IPs', value: whoisQuery?.parsed?.ipnet?.all_ips || '-' },
    ];

    return (
        <S.Container>
            <TopRow
                isRaw = { isRaw }
                location = { `${whoisQuery?.parsed?.addresses[ 0 ]?.country}, ${whoisQuery?.parsed?.addresses[ 0 ]?.address.split(',')[ 1 ]}` }
                setIsRaw = { setIsRaw }
                title = { `${whoisQuery?.parsed?.ip}` }
            />
            {
                !isRaw ? (
                    <>
                        <Table
                            withMap
                            alignValues = 'close'
                            data = { geoData }
                            location = { geoData[ 3 ].value && geoData[ 3 ].value !== '-' ? [ Number(geoData[ 3 ].value), Number(geoData[ 2 ].value) ] : undefined }
                            title = 'Geolocation'
                            variant = '2'
                        />
                        <Table
                            alignValues = 'close'
                            data = { summary }
                            title = 'Summary'
                            variant = '2'
                        />
                        <Table
                            alignValues = 'close'
                            data = { ipNet }
                            title = 'IP Net'
                            variant = '2'
                        />
                    </>
                ) : (
                    <Parser rawData = { whoisQuery?.raw } />
                )
            }
        </S.Container>
    );
};
