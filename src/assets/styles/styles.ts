import { css } from 'styled-components';
// import { MyFonts } from '../fonts';

// WebApp Common Styles

export const SectionContainer = css`
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 4px;
    padding: 32px;
    gap: 24px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 8px 16px 0px rgba(112, 115, 119, 0.12);
    ${({ theme }) => theme.media('max').lg} {
        display: flex;
        align-items: center;
    }
`;
