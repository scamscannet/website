/* eslint-disable no-nested-ternary */
import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import * as S from './styles';

interface IProps {
    rawData: string,
}

export const Parser = (props: IProps): React.ReactNode => {
    const { rawData } = props;
    const resultArray: string[] = [];
    let positionStart = 0;
    let positionEnd = 0;
    while (positionStart <= rawData.length - 1) {
        positionEnd = rawData.indexOf('\n', positionStart);
        if (positionEnd >= 0) {
            resultArray.push(rawData.slice(positionStart, positionEnd));
            positionStart = positionEnd + 1;
        } else {
            positionStart = rawData.length - 1;
        }
    }
    const isColumn = (row: string): string | null => {
        return row.match(/^\S+:/) as string | null;
    };
    const isLink = (test: string): string[] => {
        const resultTest = test.match(/https?:\/\/\S+/g) || test.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
        const result = resultTest?.map((i) => {
            return i.endsWith('.') ? i.slice(0, -1) : i;
        });

        return result || [];
    };

    const replaceLink = (textRow: string): React.ReactNode => {
        const test = isLink(textRow);
        const startEndLink: number[][] = [];
        if (test.length) {
            test.forEach((item) => {
                startEndLink.push([ textRow.indexOf(item), textRow.indexOf(item) + item.length ]);
            });
        }

        const splitString = (str: string) => {
            if (textRow.match(/(\w+):\s*([^;]*)/)) {
                const splitted = str.split(':');

                return (
                    <>
                        <span>{splitted[ 0 ] + ':'}</span>
                        <span>{splitted[ 1 ]}</span>
                    </>
                );
            }

            return str;
        };

        const hrefHandler = (str: string) => {
            if (str.match(/\)$/)) {
                return str.replace(')', '');
            }

            return str;
        };

        const InsertLink = (str: string, link?: string) => {
            const Handler = ({ start, end, link }: {start: string, end: string, link: string}) => {
                const isEmail = link.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
                console.log(start, end, link);
                if (start.trim().match(/\($/) && end.trim().match(/\)$/)) {
                    return (
                        <S.LinkWrapper>
                            {start.trim().replace('(', '')}
                            <div>

                                {'('}
                                <S.Link
                                    href = { isEmail ? `mailto:${link}` : link }
                                    rel = 'noreferrer'
                                    target = '_blank'>{link}
                                </S.Link>
                                {end}
                            </div>
                        </S.LinkWrapper>
                    );
                }

                return (
                    <S.LinkWrapper>
                        {start}
                        <S.Link
                            href = { isEmail ? `mailto:${link}` : link }
                            rel = 'noreferrer'
                            target = '_blank'>{link}
                        </S.Link>
                        {end}
                    </S.LinkWrapper>
                );
            };

            if (link && str.includes(link)) {
                const splitted = str.split(link);

                return (
                    <Handler
                        end = { splitted[ 1 ] }
                        link = { hrefHandler(link) }
                        start = { splitted[ 0 ] }
                    />
                );
            }

            return str;
        };


        return (
            !test.length
                ? (
                    <S.ResultWrapper
                        key = { uuidv4() }>{splitString(textRow.trim())}
                    </S.ResultWrapper>
                )
                : test.map((item, index: number) => {
                    return (
                        <div
                            key = { uuidv4() }>
                            {InsertLink(textRow, hrefHandler(item))}
                            {
                                index + 1 === test.length
                                    ? textRow.slice(startEndLink[ index ][ 1 ])
                                    : textRow.slice(startEndLink[ index ][ 1 ], startEndLink[ index + 0 ][ 0 ])
                            }
                        </div>
                    );
                })
        );
    };

    return (
        <div >
            {resultArray.map((i: string) => {
                return i.length === 0
                    ? (
                        <S.BlankRow
                            key = { uuidv4() }
                        />
                    )
                    : isColumn(i)
                        ? (
                            <S.WithColumnRow
                                key = { uuidv4() }>
                                <div>{isColumn(i)}</div>
                                <div>{replaceLink(i.replace(isColumn(i) as string, '').trim())}</div>
                            </S.WithColumnRow>
                        )
                        : (
                            <S.Row
                                key = { uuidv4() } >{replaceLink(i)}
                            </S.Row>
                        );
            })}
        </div >
    );
};
