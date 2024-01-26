// Core
import React, { FC, useEffect, useState } from 'react';

// Bus
// import {} from '../../../bus/'

// Components
import { ErrorBoundary, ResultDomain, ResultIP, SearchBar } from '../../components';

// Styles
import * as S from './styles';
import { SectionSubtitle, SectionTitle, Spinner } from '@/view/elements';
import { useWhoisquery } from '@/bus/whoisquery';
import { domainRegex } from '@/view/components/SearchBar/static';
import { useLocation, useNavigate } from 'react-router-dom';
import { ipv4Regex } from '@/view/components/SearchBar/ipOrDomain';

// Types
type PropTypes = {
    /* type props here */
}

const WhoisQuery: FC<PropTypes> = () => {
    const [ isRaw, setIsRaw ] = useState(false);
    const { whoisquery: { whoisQuery, isLoading, error }, fetchWhoisqueryDomain, fetchWhoisqueryIp } = useWhoisquery();
    const { hash, pathname } = useLocation();
    const navigate = useNavigate();


    const submitFunction = (ipOrUrl: string) => {
        if (ipOrUrl) {
            if (ipOrUrl.match(domainRegex)) {
                fetchWhoisqueryDomain(ipOrUrl);
            }
            if (ipOrUrl.match(ipv4Regex)) {
                fetchWhoisqueryIp(ipOrUrl);
            }
            if (!ipOrUrl.match(domainRegex) && !ipOrUrl.match(ipv4Regex)) {
                navigate(pathname);
            }
        }
    };

    useEffect(() => {
        if (hash) {
            submitFunction(hash.replace('#', '').trim());
        }
    }, [ hash ]);

    if (isLoading) {
        return <Spinner loading = { isLoading } />;
    }

    return (
        <S.Container>
            {
                !hash || (!hash && !whoisQuery) ? (
                    <>
                        <S.TextWrapper>
                            <SectionTitle $styles = { S.TitleStyles }>
                                Whois Query
                            </SectionTitle>
                            <SectionSubtitle $styles = { S.SubtitleStyles }>
                                Search for detailed information about IP addresses and domains,
                                including registration information, ownership, and more
                            </SectionSubtitle>
                        </S.TextWrapper>
                        <SearchBar
                            whois
                            placeholder = 'Enter a domain or IP address'
                            submitFunction = { (ipOrUrl) => navigate(`${pathname}#${ipOrUrl}`) }
                        />
                        {error && (
                            <SectionSubtitle $styles = { S.ErrorMesage }>
                                No data available for {hash ? hash.slice(1) : `${hash.slice(1).match(ipv4Regex) ? hash.slice(1) : 'url'}`}.
                            </SectionSubtitle>
                        )
                        }
                    </>
                ) : (
                    <>
                        {
                            whoisQuery && !whoisQuery?.parsed?.ip && (
                                <ResultDomain
                                    isRaw = { isRaw }
                                    setIsRaw = { setIsRaw }
                                />
                            )
                        }
                        {
                            whoisQuery && whoisQuery?.parsed?.ip && (
                                <ResultIP
                                    isRaw = { isRaw }
                                    setIsRaw = { setIsRaw }
                                />
                            )
                        }
                    </>
                )
            }
        </S.Container>
    );
};

export default () => (
    <ErrorBoundary>
        <WhoisQuery />
    </ErrorBoundary>
);
