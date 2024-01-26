/* eslint-disable no-nested-ternary */
// Core
import React, { FC } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Fonts
import { MyFonts } from '@/assets/fonts';

//Styles
import { defaultTheme } from '@/assets';
import styled from 'styled-components';
import { SkeletonContainer } from '../pages/ScamCheck/ChartSkeleton';

// Types
type PropTypes = {
    /* type props here */
    data: {
        isLoading: boolean;
        error: boolean;
        data: number | null;
    }
    text: string
}

const Wrapper = styled.div`
    width: 136px;
    height: 132px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    /* styles here */
    width: 126px;
    height: 126px;
    border-radius: 50%;
`;

const Text = styled.p`
    color: ${({ theme }) => theme.text.gray.main};
    font-family: ${MyFonts.THICCCBOI.regular};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
`;

const NoData = styled.div`
    background-color: #fcf9f9;
    border-radius: 50%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 126px;
    width: 126px;
`;

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart: FC<PropTypes> = ({ data: dataObj, text }) => {
    const { data, isLoading } = dataObj;

    if (isLoading) {
        return (
            <Wrapper>
                <Container>
                    <SkeletonContainer />
                </Container>
                <Text>{text}</Text>
            </Wrapper>
        );
    }

    if (data) {
        const status = data <= 33 ? 'low' : data <= 66 && data > 33 ? 'moderate' : 'high';
        const color = status === 'low' ? '#067647' : status === 'moderate' ? '#DF9300' : '#B42318';
        const backgroundColor = status === 'low' ? '#ECFDF3' : status === 'moderate' ? '#FFFBF1' : '#FEF3F2';

        return (
            <Wrapper>
                <Container>
                    <Doughnut
                        data = {{ datasets: [
                            {
                                data:            [ data, 100 - data ],
                                backgroundColor: [ color, 'transparent' ],
                                borderWidth:     1,
                                borderColor:     backgroundColor,
                                borderRadius:    10,
                            },
                        ]}}
                        options = {
                            {
                                cutout:  '88%',
                                plugins: {
                                    tooltip: {
                                        enabled: false,
                                    },
                                },
                                events: [],
                            }
                        }
                        plugins = { [
                            {
                                id:         'FillWithColor',
                                beforeDraw: (chart) => {
                                    let ctx = chart.ctx;
                                    let chartArea = chart.chartArea;
                                    let cutoutRadius = 58;

                                    // Draw a circle to fill the hole background
                                    ctx.save();
                                    ctx.beginPath();
                                    ctx.arc(
                                        (chartArea.left + chartArea.right) / 2,
                                        (chartArea.top - 5) + (chartArea.bottom / 2),
                                        cutoutRadius, 0, 2 * Math.PI,
                                    );
                                    ctx.fillStyle = backgroundColor;
                                    ctx.fill();
                                    ctx.restore();
                                },
                            },
                            {
                                id: 'textCenter',
                                beforeDatasetDraw(chart) {
                                    const { ctx } = chart;
                                    ctx.save();
                                    ctx.font = `normal 20px ${MyFonts.THICCCBOI.regular}, sans-seif`;
                                    ctx.fillStyle = defaultTheme.text.gray.main;
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText(`${data}%`, chart.getDatasetMeta(0).data[ 0 ].x, chart.getDatasetMeta(0).data[ 0 ].y);
                                },
                            },
                        ] }
                    />
                </Container>
                <Text>{text}</Text>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <Container>
                <NoData>
                    <Text>No Data</Text>
                </NoData>
            </Container>
            <Text>{text}</Text>
        </Wrapper>
    );
};
