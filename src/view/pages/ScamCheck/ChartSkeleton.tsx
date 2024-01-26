import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

interface IProps {

}

const shimmer = keyframes`
    0% {
        transform: translateX(-50%);
    }
    50% {
        transform: translateX(50%);
    }
    100% {
      transform: translateX(100%);
    }
`;

export const SkeletonContainer = styled.div`
    display: inline-block;
    position: relative;
    overflow: hidden;
    background-color: #fcf9f9;
    border-radius: 50%;
    text-align: center;
    height: 126px;
    width: 126px;
    &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background: linear-gradient(90deg, rgba(246, 246, 248, 0.5), #D9D9D9, #D9D9D9, rgba(246, 246, 248, 0.5));
        animation: ${shimmer} 1.5s infinite;
        content: '';
    }
`;

export const ChartSkeleton:FC<IProps> = () => {
    return (
        <div>ChartSkeleton</div>
    );
};
