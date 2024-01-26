import React from 'react';

export const Arrow = (props?: React.SVGProps<SVGSVGElement>) => (
    <svg
        fill = 'none'
        height = { 24 }
        viewBox = '0 0 24 24'
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
                d = 'm9.45 12.495 8.117 8.007c.276.272.417.614.423 1.026a1.38 1.38 0 0 1-.423 1.045 1.44 1.44 0 0 1-1.05.427 1.44 1.44 0 0 1-1.05-.427L6.51 13.739a1.628 1.628 0 0 1-.395-.582A1.866 1.866 0 0 1 6 12.495c0-.236.038-.457.115-.661.077-.204.208-.398.395-.582l8.957-8.834c.276-.272.622-.412 1.04-.418.418-.006.771.133 1.06.418A1.4 1.4 0 0 1 18 3.454a1.4 1.4 0 0 1-.433 1.035l-8.118 8.006Z'
                fill = '#6023FA'
            />
        </g>
    </svg>
);
