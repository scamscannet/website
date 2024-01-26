import React from 'react';

interface IProps extends React.SVGProps<SVGSVGElement> {
    active?: '' | 'true'
}

export const ChevronIcon = (props: IProps) => (
    <svg
        fill = 'none'
        height = { 24 }
        style = {{ cursor: 'pointer' }}
        width = { 24 }
        xmlns = 'http://www.w3.org/2000/svg'
        { ...props }>
        <path
            d = 'm12 10.439-4.073 4.073a.724.724 0 0 1-.522.212.707.707 0 0 1-.532-.212.717.717 0 0 1-.217-.527c0-.207.072-.382.217-.527l4.494-4.494A.829.829 0 0 1 12 8.708a.829.829 0 0 1 .633.256l4.494 4.494c.138.138.21.313.212.522a.707.707 0 0 1-.212.532.717.717 0 0 1-.527.217.717.717 0 0 1-.527-.217L12 10.439Z'
            fill = '#344054'
        />
    </svg>
);
