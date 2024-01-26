// Core
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyles = createGlobalStyle`
    ${reset};

    * {
        box-sizing: border-box;
    }
    html, body, #app {
        width: 100%;
    }

    .leaflet-control-attribution.leaflet-control {
        margin: 0;
        padding: 0;
        background: transparent;
        &:first-child {
            span {
                display: none;
            }
            a:first-child {
                display: none;
            }
        }
    }
`;
