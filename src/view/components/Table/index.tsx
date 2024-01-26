// Core
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { v4 as uuidv4 } from 'uuid';

// Bus
// import {} from '../../../bus/'

// Styles
import 'leaflet/dist/leaflet.css';
import * as S from './styles';

// Icons
import { ChevronIcon, LinkIcon } from '@/assets/images/icons';

// Types
type PropTypes = {
    /* type props here */
    title: string
    data: {key: string, value: string | string[]}[]
    variant?: '1' | '2'
    alignValues?: 'close' | 'far'
    isOpen?: boolean
    footerLink?: string
    withMap?: boolean
    location?: number[]
}

export const Table: FC<PropTypes> = ({ title, data, variant = '1', alignValues, isOpen = true, footerLink, withMap, location }) => {
    const [ open, setOpen ] = useState(isOpen);

    return (
        <S.TableContainer>
            <S.Thead
                style = {{ cursor: 'pointer' }}
                onClick = { () => setOpen(!open) }>
                <div
                    style = {{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div>
                        {title}
                    </div>
                    <div
                        style = {{ transform: open ? '' : 'rotate(180deg)', transition: 'all .3s ease' }}>
                        {variant === '2' && <ChevronIcon />}
                    </div>
                </div>
            </S.Thead>
            <S.TableWrapper>
                <S.Table $withMap = { withMap }>
                    {
                        ((variant === '2' && open) || variant === '1') && (
                            <S.Tbody>
                                {
                                    data.map(({ key, value }) => {
                                        if (typeof value !== 'string') {
                                            return void 0;
                                        }
                                        let val = value ? value : '';
                                        if (Array.isArray(value)) {
                                            value.forEach((string) => {
                                                val += `\n${string}`;
                                            });
                                        }

                                        return (
                                            <S.Tr key = { uuidv4() }>
                                                <S.Tdkey $alignValues = { variant === '2' ? alignValues : void 0 }>{key}</S.Tdkey>
                                                <S.TdValue $alignValues = { variant === '2' ? alignValues : void 0 }>{val}</S.TdValue>
                                            </S.Tr>
                                        );
                                    })
                                }
                            </S.Tbody>
                        )
                    }
                    {
                        variant !== '2' && (
                            <S.Tfoot>
                                <tr>
                                    <th>
                                        <Link
                                            style = {{ textDecoration: 'none' }}
                                            to = { `${footerLink}` }>
                                            <S.Link><LinkIcon /> {title} details</S.Link>
                                        </Link>
                                    </th>
                                </tr>
                            </S.Tfoot>
                        )
                    }
                </S.Table>
                {
                    withMap && location && open && (
                        <S.MapWrapper>
                            <MapContainer
                                center = { location as LatLngExpression }
                                dragging = { false }
                                scrollWheelZoom = { false }
                                style = {{ width: '100%', height: '100%' }}
                                zoom = { 10 }
                                zoomControl = { false }>
                                <TileLayer
                                    attribution = { `<a target="_blank" style="${S.OpenstreetMapLink}" href='https://www.openstreetmap.org/?mlat=${location && location[ 0 ]}&mlon=${location && location[ 1 ]}#map=12/${location && location[ 0 ]}/${location && location[ 1 ]}'>Open in Maps</a>` }
                                    url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                                />
                            </MapContainer>
                        </S.MapWrapper>
                    )
                }
            </S.TableWrapper>
        </S.TableContainer>
    );
};
