import React from 'react';

export const IpIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        fill = 'none'
        height = { '100%' }
        viewBox = '0 0 24 24'
        width = { '100%' }
        xmlns = 'http://www.w3.org/2000/svg'
        { ...props }>
        <path
            d = 'M18.75 8.25a3.756 3.756 0 0 0-3.674 3h-6.15a3.75 3.75 0 1 0 0 1.5h6.15a3.75 3.75 0 1 0 3.674-4.5Zm0 6a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Z'
            fill = '#fff'
        />
    </svg>
);
