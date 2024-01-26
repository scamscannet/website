import React from 'react';

export const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        fill = 'none'
        viewBox = '0 0 24 24'
        xmlns = 'http://www.w3.org/2000/svg'
        { ...props }>
        <path
            clipRule = 'evenodd'
            d = 'M4 5a1 1 0 0 0 0 2h16a1 1 0 1 0 0-2H4Zm-1 7a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm0 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Z'
            fill = '#000'
            fillRule = 'evenodd'
        />
    </svg>
);
