import React from 'react';

export const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        fill = 'none'
        height = { 24 }
        viewBox = '0 0 24 24'
        width = { 24 }
        xmlns = 'http://www.w3.org/2000/svg'
        { ...props }>
        <path
            d = 'M18 6 6 18M6 6l12 12'
            stroke = '#B8B8B8'
            strokeLinecap = 'round'
            strokeLinejoin = 'round'
            strokeWidth = { 2 }
        />
    </svg>
);
