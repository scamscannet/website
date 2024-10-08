import React from 'react';

interface IProps extends React.SVGProps<SVGSVGElement> {
    active?: '' | 'true'
}

export const AngleBracketsIcon = (props: IProps) => (
    <svg
        fill = 'none'
        height = { 24 }
        width = { 24 }
        xmlns = 'http://www.w3.org/2000/svg'
        { ...props }>
        <mask
            height = { 24 }
            id = 'a'
            maskUnits = 'userSpaceOnUse'
            style = {{
                maskType: 'alpha',
            }}
            width = { 24 }
            x = { 0 }
            y = { 0 }>
            <path
                d = 'M0 0h24v24H0z'
                fill = '#D9D9D9'
            />
        </mask>
        <g mask = 'url(#a)'>
            <path
                d = 'm3.917 11.794 4.24 4.24a.504.504 0 0 1 .15.344.467.467 0 0 1-.15.364.49.49 0 0 1-.354.16.49.49 0 0 1-.354-.16l-4.388-4.389a.786.786 0 0 1-.184-.267.819.819 0 0 1-.053-.298c0-.108.018-.207.053-.298a.786.786 0 0 1 .184-.268l4.388-4.388a.51.51 0 0 1 .347-.156.474.474 0 0 1 .367.156c.11.11.165.23.165.357a.499.499 0 0 1-.165.356l-4.246 4.247Zm15.773-.012-4.24-4.24a.503.503 0 0 1-.15-.345.467.467 0 0 1 .15-.363.49.49 0 0 1 .353-.16.49.49 0 0 1 .354.16l4.388 4.388a.784.784 0 0 1 .184.268c.035.09.053.19.053.298a.818.818 0 0 1-.053.298.784.784 0 0 1-.184.267l-4.388 4.389a.48.48 0 0 1-.708-.006.5.5 0 0 1-.165-.357.5.5 0 0 1 .165-.357l4.24-4.24Z'
                fill = { props.active ? '#344054' : '#818181' }
            />
        </g>
    </svg>
);
