/* eslint-disable no-nested-ternary */
// Core
import React, { FC, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
// Bus
// import {} from '../../../bus/'
import { useScamCheck } from '@/bus/scamcheck';

// Hooks
import { useOverflowHidden } from '@/tools/hooks';

// Components
import { ErrorBoundary, Screenshot, SearchBar, Table } from '../../components';
import { Button, ChipScamStatus, DoughnutChart, SectionSubtitle, SectionTitle, Spinner } from '@/view/elements';
import { ModalContext } from '@/layouts';
import { InfoIcon } from '@/assets/images/icons';

// Styles
import * as S from './styles';

// Helpers
import { returnStatusText } from './returnStatusText';
import { formatDate } from './formatDate';

// Types
type PropTypes = {
    /* type props here */
}

const ScamCheck: FC<PropTypes> = () => {
    // const data = false;
    const { fetchScamCheck, setScamCheckToInitial, scamchek: { scamCheck, isLoading, error, chart }} = useScamCheck();
    const context = useContext(ModalContext);
    const overflowHandler = useOverflowHidden();
    const { pathname, hash } = useLocation();
    const navigate = useNavigate();

    const domainData = [
        { key: 'Registrar', value: `${scamCheck.Domain.registrar || '-'}` },
        { key: 'Registration date', value: `${scamCheck.Domain.registrationDate || '-'}` },
        { key: 'Owner name', value: `${scamCheck.Domain.ownerName || '-'}` },

    ];
    const ipData = [
        { key: 'IP', value: `${scamCheck.Ip.ip || '-'}` },
        { key: 'Country', value: `${scamCheck.Ip.country || '-'}` },
        { key: 'Registrant', value: `${scamCheck.Ip.registrant || '-'}` },
    ];
    useEffect(() => {
        if (hash && hash.replace('#', '').trim() !== scamCheck.domain) {
            fetchScamCheck(hash.replace('#', '').trim());
        }
    }, [ hash ]);

    useEffect(() => {
        if (!hash) {
            setScamCheckToInitial();
        }
    }, [ hash ]);

    if (isLoading) {
        return (
            <Spinner loading = { isLoading } />
        );
    }

    return (
        <S.Container>
            {
                !hash || (!hash && !scamCheck.domain) || (hash && !scamCheck.domain && error)
                    ? (
                        <>
                            <S.TextWrapper>
                                <SectionTitle $styles = { S.TitleStyles }>
                                    Welcome to ScamScan!
                                </SectionTitle>
                                <SectionSubtitle $styles = { S.SubtitleStyles }>
                                    Enter a website URL to check if it's safe
                                </SectionSubtitle>
                            </S.TextWrapper>
                            <SearchBar submitFunction = { (url) => navigate(`${pathname}#${url}`) } />
                            {error && (
                                <SectionSubtitle $styles = { S.ErrorMesage }>
                                    No scrape available for {hash ? hash.slice(1) : 'this url'}.
                                </SectionSubtitle>
                            )
                            }
                        </>
                    )
                    : (
                        <S.DataContainer>
                            <S.SiteInfo>
                                <S.DomainTimeWrapper>
                                    <S.Domain>{`${scamCheck.domain || '-'}`}</S.Domain>
                                    <S.Time>{'Last Update: ' + formatDate(scamCheck.lastUpdate?.split('<<<')[ 0 ] || '')}</S.Time>
                                </S.DomainTimeWrapper>
                                <S.SiteName>{`${scamCheck.name || '-'}`}</S.SiteName>
                                <S.SiteDescription>
                                    Search the world's information, including webpages, images, videos, and more
                                </S.SiteDescription>
                            </S.SiteInfo>
                            <S.ScamInfoWrapper>
                                <S.ScamInfo>
                                    <S.ScamInfoHeader>Status</S.ScamInfoHeader>
                                    <S.ScamInfoDescription>
                                        <ChipScamStatus $status = { scamCheck.status === 'allowlist' ? 'Safe' : scamCheck.status === 'blocklist' ? 'Scam' : 'Unclassified' } />
                                        <S.ScamInfoText>
                                            {
                                                returnStatusText(scamCheck.status)
                                            }
                                        </S.ScamInfoText>
                                    </S.ScamInfoDescription>
                                </S.ScamInfo>
                                <S.ScamInfo $wide>
                                    <S.ScamInfoHeader>AI Scam Score
                                        <a
                                            id = 'chart_tooltip'
                                            style = {{ display: 'flex', alignItems: 'center' }}
                                            onClick = { (event) => { event.preventDefault(); } }>
                                            <InfoIcon />
                                        </a>
                                    </S.ScamInfoHeader>
                                    <S.DoughnutChartsBlock>
                                        <S.DoughnutChartsContainer>
                                            <DoughnutChart
                                                data = { chart.domain }
                                                text = 'Domain name based'
                                            />
                                            <DoughnutChart
                                                data = { chart.website }
                                                text = 'Website data based'
                                            />
                                        </S.DoughnutChartsContainer>
                                        <S.Statuses>
                                            <S.StatusText $status = 'low'>Low risk</S.StatusText>
                                            <S.StatusText $status = 'moderate'>Moderate risk</S.StatusText>
                                            <S.StatusText $status = 'high'>High risk</S.StatusText>
                                        </S.Statuses>
                                    </S.DoughnutChartsBlock>
                                    <Tooltip
                                        anchorSelect = '#chart_tooltip'
                                        place = 'bottom'>
                                        <S.Info>Indicates the likelihood of scams based on AI analysis</S.Info>
                                    </Tooltip>
                                </S.ScamInfo>
                            </S.ScamInfoWrapper>
                            <Screenshot
                                screenshots = { scamCheck.screenshots }
                                websiteText = { scamCheck.websiteText }
                            />
                            <S.Whois>
                                <S.WhoisTitle>Whois information</S.WhoisTitle>
                                <S.TablesContainer>
                                    <Table
                                        data = { domainData }
                                        footerLink = { `/whois-query#${scamCheck.domain}` }
                                        title = 'Domain'
                                    />
                                    <Table
                                        data = { ipData }
                                        footerLink = { `/whois-query#${scamCheck.Ip.ip}` }
                                        title = 'IP'
                                    />
                                </S.TablesContainer>
                            </S.Whois>
                            <S.ReportScamWrapper>
                                <S.ReportTitle>Report scam</S.ReportTitle>
                                <S.ReportSubtitle>
                                    Report any issues or concerns about this website.
                                    Your feedback helps improve our scam-checking service.
                                </S.ReportSubtitle>
                                <Button onClick = { () => {
                                    context?.setModalActive(!context.isModalActive);
                                    overflowHandler(false);
                                } }>
                                    Submit Report
                                </Button>
                            </S.ReportScamWrapper>
                        </S.DataContainer>
                    )
            }
        </S.Container>
    );
};

export default () => (
    <ErrorBoundary>
        <ScamCheck />
    </ErrorBoundary>
);
