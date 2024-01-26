/* eslint-disable no-nested-ternary */
// Core
import { MyFonts } from '@/assets/fonts';
import { SectionContainer } from '@/assets/styles/styles';
import styled, { css } from 'styled-components';

export const Container = styled.section`
    ${SectionContainer}
`;

export const DataContainer = styled.div`
    gap: 32px;
    height: 100%;
    display: flex;
    flex-direction: column;
    ${({ theme }) => theme.media('max').lg} {
        align-items: center;
    }
`;

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const TitleStyles = css`
    ${({ theme }) => theme.media('min').lg} {
        font-size: 28px;
        line-height: 32px;
        text-align: left;
    }
`;

export const SubtitleStyles = css`
    ${({ theme }) => theme.media('min').lg} {
        font-size: 16px;
        line-height: 24px;
        text-align: left;
    }
`;

export const SiteInfo = styled.div``;

export const DomainTimeWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 24px;
    ${({ theme }) => theme.media('max').md} {
        flex-direction: column;
        gap: 16px;
    }
`;

export const Domain = styled.h3`
    font-family: ${MyFonts.THICCCBOI.regular};
    color: ${({ theme }) => theme.text.black.main};
    font-size: 28px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
`;

export const Time = styled.p`
    font-family: ${MyFonts.THICCCBOI.regular};
    color: ${({ theme }) => theme.palette.gray.info};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
`;

export const SiteName = styled.p`
    font-family: ${MyFonts.THICCCBOI.semiBold};
    color: ${({ theme }) => theme.text.gray.main};
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    margin-bottom: 12px;
`;

export const SiteDescription = styled.p`
    font-weight: 400;
    font-family: ${MyFonts.THICCCBOI.regular};
`;

export const ScamInfoWrapper = styled.div`
    display: flex;
    gap: 48px;
    ${({ theme }) => theme.media('max').lg} {
        flex-direction: column;
    }
`;

export const ScamInfo = styled.div<{$wide?: boolean}>`
    border: 1px solid #F5F5F5;
    border-radius: 4px;
    box-shadow: 0px 2px 12px 0px rgba(101, 101, 101, 0.03);
    max-width: ${({ $wide }) => $wide ? '530px' : '486px'};
    padding-bottom: 10px;
    width: 100%;
    min-height: 254px;
`;

const Text = css`
    color: ${({ theme }) => theme.text.gray.main};
    font-family: ${MyFonts.THICCCBOI.semiBold};
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 17px;
`;


export const ScamInfoHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    height: 44px;
    padding: 12px 24px;
    border-bottom: 1px solid #F5F5F5;
    background: #F9FAFB;
    ${Text}
`;

export const ScamInfoDescription = styled.div`
    padding: 36px 24px 0px;
    background: #fff;
`;

export const ScamInfoText = styled.p`
    ${Text}
    font-family: ${MyFonts.THICCCBOI.regular};
    margin-top: 16px;
    font-weight: 400;
`;

export const DoughnutChartsBlock = styled.div`
    display: flex;
    padding: 36px 24px 0px;
    gap: 48px;
    align-items: center;
    @media (max-width: 690px) {
        flex-direction: column;
    }
`;

export const DoughnutChartsContainer = styled.div`
    display: flex;
    gap: 28px;
`;

export const DoughnutChartWrapper = styled.div`
    width: 126px;
    height: 126px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Statuses = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const StatusText = styled.p<{$status: 'low' | 'high' | 'moderate'}>`
    display: flex;
    font-family: ${MyFonts.THICCCBOI.regular};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    position: relative;
    padding-left: 22px;
    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 14px;
        height: 14px;
        transform: translateY(-50%);
        background-color: ${({ $status }) => $status === 'low' ? '#067647' : $status === 'moderate' ? '#DF9300' : '#B42318'};
        border-radius: 50%;
    }
`;

export const Info = styled.div`
    font-family: ${MyFonts.THICCCBOI.regular};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
`;


export const Whois = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 24px;
`;

export const WhoisTitle = styled.h3`
    font-family: ${MyFonts.THICCCBOI.semiBold};
    color: ${({ theme }) => theme.text.black.main};
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;

export const TablesContainer = styled.div`
    display: flex;
    gap: 48px;
    ${({ theme }) => theme.media('max').lg} {
        flex-direction: column;
    }
`;

export const ReportScamWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 410px;
    width: 100%;
`;

export const ReportTitle = styled.h5`
    ${Text};
`;

export const ReportSubtitle = styled.h5`
    ${Text};
    margin-top: 12px;
    margin-bottom: 24px;
    font-family: ${MyFonts.THICCCBOI.regular};
    font-weight: 400;
`;

export const ErrorMesage = css`
    color: ${({ theme }) => theme.palette.error};
    ${({ theme }) => theme.media('min').xs} {
        font-size: 14px;
        line-height: 24px;
        text-align: left;
    }
`;
