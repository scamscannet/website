import React from 'react';

export const Logout = (props:  React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            fill = 'none'
            height = { 24 }
            width = { 24 }
            xmlns = 'http://www.w3.org/2000/svg'
            { ...props }>
            <path
                d = 'M5.808 21c-.505 0-.933-.175-1.283-.525A1.745 1.745 0 0 1 4 19.192V5.808c0-.505.175-.933.525-1.283.35-.35.778-.525 1.283-.525h5.952c.212 0 .39.072.534.215a.726.726 0 0 1 .216.535.726.726 0 0 1-.216.535.726.726 0 0 1-.534.215H5.808a.294.294 0 0 0-.212.096.294.294 0 0 0-.096.212v13.384c0 .077.032.148.096.212a.294.294 0 0 0 .212.096h5.952c.212 0 .39.072.534.215a.726.726 0 0 1 .216.535.726.726 0 0 1-.216.535.726.726 0 0 1-.534.215H5.808Zm12.31-7.75h-7.772a.726.726 0 0 1-.534-.215.726.726 0 0 1-.216-.535c0-.213.072-.391.216-.535a.726.726 0 0 1 .534-.215h7.771l-1.923-1.923a.707.707 0 0 1-.212-.507.74.74 0 0 1 .212-.532.72.72 0 0 1 .527-.24.716.716 0 0 1 .542.225l3.095 3.094c.18.181.27.392.27.633s-.09.452-.27.633l-3.095 3.094a.714.714 0 0 1-.53.22.752.752 0 0 1-.539-.235.732.732 0 0 1-.21-.535.737.737 0 0 1 .226-.52l1.907-1.907Z'
                fill = '#B8B8B8'
            />
        </svg>
    );
};

