// Core
import React, { FC } from 'react';
import { TopRow } from '../TopRow';
import { Table } from '../../Table';

// Bus
// import {} from '../../../bus/'
import { useWhoisquery } from '@/bus/whoisquery';

// Styles
import * as S from './styles';
import { Parser } from './parse-text';

// Types
type PropTypes = {
    /* type props here */
    isRaw: boolean
    setIsRaw: React.Dispatch<React.SetStateAction<boolean>>
}
// const rawString = 'Domain Name: google.com\nRegistry Domain ID: 2138514_DOMAIN_COM-VRSN\nRegistrar WHOIS Server: whois.markmonitor.com\nRegistrar URL: http://www.markmonitor.com\nUpdated Date: 2019-09-09T15:39:04+0000\nCreation Date: 1997-09-15T07:00:00+0000\nRegistrar Registration Expiration Date: 2028-09-13T07:00:00+0000\nRegistrar: MarkMonitor, Inc.\nRegistrar IANA ID: 292\nRegistrar Abuse Contact Email: abusecomplaints@markmonitor.com\nRegistrar Abuse Contact Phone: +1.2086851750\nDomain Status: clientUpdateProhibited (https://www.icann.org/epp#clientUpdateProhibited)\nDomain Status: clientTransferProhibited (https://www.icann.org/epp#clientTransferProhibited)\nDomain Status: clientDeleteProhibited (https://www.icann.org/epp#clientDeleteProhibited)\nDomain Status: serverUpdateProhibited (https://www.icann.org/epp#serverUpdateProhibited)\nDomain Status: serverTransferProhibited (https://www.icann.org/epp#serverTransferProhibited)\nDomain Status: serverDeleteProhibited (https://www.icann.org/epp#serverDeleteProhibited)\nRegistrant Organization: Google LLC\nRegistrant State/Province: CA\nRegistrant Country: US\nRegistrant Email: Select Request Email Form at https://domains.markmonitor.com/whois/google.com\nAdmin Organization: Google LLC\nAdmin State/Province: CA\nAdmin Country: US\nAdmin Email: Select Request Email Form at https://domains.markmonitor.com/whois/google.com\nTech Organization: Google LLC\nTech State/Province: CA\nTech Country: US\nTech Email: Select Request Email Form at https://domains.markmonitor.com/whois/google.com\nName Server: ns3.google.com\nName Server: ns4.google.com\nName Server: ns2.google.com\nName Server: ns1.google.com\nDNSSEC: unsigned\nURL of the ICANN WHOIS Data Problem Reporting System: http://wdprs.internic.net/\n>>> Last update of WHOIS database: 2023-10-19T20:40:02+0000 <<<\n\nFor more information on WHOIS status codes, please visit:\n  https://www.icann.org/resources/pages/epp-status-codes\n\nIf you wish to contact this domainâs Registrant, Administrative, or Technical\ncontact, and such email address is not visible above, you may do so via our web\nform, pursuant to ICANNâs Temporary Specification. To verify that you are not a\nrobot, please enter your email address to receive a link to a page that\nfacilitates email communication with the relevant contact(s).\n\nWeb-based WHOIS:\n  https://domains.markmonitor.com/whois\n\nIf you have a legitimate interest in viewing the non-public WHOIS details, send\nyour request and the reasons for your request to whoisrequest@markmonitor.com\nand specify the domain name in the subject line. We will review that request and\nmay ask for supporting documentation and explanation.\n\nThe data in MarkMonitorâs WHOIS database is provided for information purposes,\nand to assist persons in obtaining information about or related to a domain\nnameâs registration record. While MarkMonitor believes the data to be accurate,\nthe data is provided "as is" with no guarantee or warranties regarding its\naccuracy.\n\nBy submitting a WHOIS query, you agree that you will use this data only for\nlawful purposes and that, under no circumstances will you use this data to:\n  (1) allow, enable, or otherwise support the transmission by email, telephone,\nor facsimile of mass, unsolicited, commercial advertising, or spam; or\n  (2) enable high volume, automated, or electronic processes that send queries,\ndata, or email to MarkMonitor (or its systems) or the domain name contacts (or\nits systems).\n\nMarkMonitor reserves the right to modify these terms at any time.\n\nBy submitting this query, you agree to abide by this policy.\n\nMarkMonitor Domain Management(TM)\nProtecting companies and consumers in a digital world.\n\nVisit MarkMonitor at https://www.markmonitor.com\nContact us at +1.8007459229\nIn Europe, at +44.02032062220\n--\n';

export const ResultDomain: FC<PropTypes> = ({ isRaw, setIsRaw }) => {
    const { whoisquery: { whoisQuery }} = useWhoisquery();

    const registrarInfo = [
        { key: 'Name', value: whoisQuery?.parsed?.registrar?.name || '-' },
        { key: 'IANA id', value: whoisQuery?.parsed?.registrar?.iana_id || '-' },
        { key: 'Registrar URL', value: whoisQuery?.json_format[ 'Registrar URL' ] || '-' },
        { key: 'Abuse Mail', value: whoisQuery?.parsed?.registrar?.abuse_mail || '-' },
        { key: 'Abuse Phone', value: whoisQuery?.parsed?.registrar?.abuse_phone || '-' },
        { key: 'Status',  value: whoisQuery?.json_format[ 'Domain Status' ] || '-' },
    ];
    const importantDates = [
        { key: 'Expires on', value: whoisQuery?.parsed?.date?.expiration_date || '-' },
        { key: 'Registred on', value: whoisQuery?.parsed?.date?.registration_date || '-' },
        { key: 'Updated on', value: whoisQuery?.parsed?.date?.updated_date || '-' },
    ];
    const NameServers = (val: string[] | any) => {
        if (!val) {
            return [{ key: '-', value: '-' }];
        }
        if (typeof val[ 0 ] === 'string') {
            return val.map((value: string) => {
                return { key: value, value };
            });
        }

        return [
            { key: '-', value: '-' },
            { key: '-', value: '-' },
            { key: '-', value: '-' },
        ];
    };

    const getContactData = (value: 'registrant' | 'admin' | 'billing' | 'tech') => {
        return [
            { key: 'Type', value: whoisQuery?.parsed?.contact[ value ]?.type || '-' },
            { key: 'Name', value: whoisQuery?.parsed?.contact[ value ]?.name || '-' },
            { key: 'Organization', value: whoisQuery?.parsed?.contact[ value ]?.organization || '-' },
            { key: 'Email', value: whoisQuery?.parsed?.contact[ value ]?.email || '-' },
            { key: 'Phone', value: whoisQuery?.parsed?.contact[ value ]?.phone || '-' },
            { key: 'Street',  value: whoisQuery?.parsed?.contact[ value ]?.street || '-' },
            { key: 'City',  value: whoisQuery?.parsed?.contact[ value ]?.city || '-' },
            { key: 'State',  value: whoisQuery?.parsed?.contact[ value ]?.state || '-' },
            { key: 'Postal Code',  value: whoisQuery?.parsed?.contact[ value ]?.postal_code || '-' },
            { key: 'Country',  value: whoisQuery?.parsed?.contact[ value ]?.country || '-' },
            { key: 'Fax',  value: whoisQuery?.parsed?.contact[ value ]?.fax || '-' },
            { key: 'Location',  value: whoisQuery?.parsed?.contact[ value ]?.location || '-' },
        ];
    };

    console.log(getContactData('registrant'));

    return (
        <S.Container>
            <TopRow
                isRaw = { isRaw }
                setIsRaw = { setIsRaw }
                title = { whoisQuery?.parsed?.domain }
            />
            {
                !isRaw ? (
                    <>
                        <Table
                            alignValues = 'close'
                            data = { registrarInfo }
                            title = 'Registrar info'
                            variant = '2'
                        />
                        <Table
                            alignValues = 'close'
                            data = { importantDates }
                            title = 'Important dates'
                            variant = '2'
                        />
                        <Table
                            alignValues = 'close'
                            data = { NameServers(whoisQuery?.json_format[ 'Name Server' ]) }
                            title = 'Name servers'
                            variant = '2'
                        />
                        <Table
                            alignValues = 'close'
                            data = { getContactData('registrant') }
                            title = 'Contact Registrant'
                            variant = '2'
                        />
                        <Table
                            alignValues = 'close'
                            data = { getContactData('admin') }
                            isOpen = { false }
                            title = 'Contact Admin'
                            variant = '2'
                        />
                        <Table
                            alignValues = 'close'
                            data = { getContactData('billing') }
                            isOpen = { false }
                            title = 'Contact Billing'
                            variant = '2'
                        />
                        <Table
                            alignValues = 'close'
                            data = { getContactData('tech') }
                            isOpen = { false }
                            title = 'Contact Tech'
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
