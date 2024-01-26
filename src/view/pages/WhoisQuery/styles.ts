// Core
import { SectionContainer } from '@/assets/styles/styles';
import styled, { css } from 'styled-components';

export const Container = styled.section`
    ${SectionContainer}
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

export const InfoContainer = styled.div`
`;

export const ErrorMesage = css`
    color: ${({ theme }) => theme.palette.error};
    ${({ theme }) => theme.media('min').xs} {
        font-size: 14px;
        line-height: 24px;
        text-align: left;
    }
`;
