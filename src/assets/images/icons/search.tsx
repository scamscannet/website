import React from 'react';

export const SearchIcon = (props:  React.SVGProps<SVGSVGElement> & {color?: string}) => {
    return (
        <svg
            fill = 'none'
            height = { '100%' }
            style = {{ cursor: 'pointer' }}
            viewBox = '0 0 24 24'
            width = { '100%' }
            xmlns = 'http://www.w3.org/2000/svg'
            { ...props }>
            <path
                d = 'm16.893 16.92 3.08 3.08m-.889-8.419c0 4.187-3.383 7.581-7.556 7.581-4.172 0-7.555-3.394-7.555-7.58C3.973 7.393 7.356 4 11.528 4c4.173 0 7.556 3.394 7.556 7.581Z'
                stroke = { props.color ? props.color : '#fff' }
                strokeLinecap = 'round'
                strokeLinejoin = 'round'
                strokeWidth = { 1.5 }
            />
        </svg>
    );
};

