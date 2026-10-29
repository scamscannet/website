'use client';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const linkStyle = 'padding: 4px 8px; background: rgba(0, 0, 0, 0.75); color: #fff; font-family: var(--font-regular); text-decoration: underline; font-size: 12px;';

export default function LocationMap({ location: [lat, lng] }: { location: [number, number] }) {
    const mapsUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=12/${lat}/${lng}`;

    return (
        <MapContainer center={[lat, lng]} zoom={10} zoomControl={false} dragging={false} scrollWheelZoom={false} style={{ width: '100%', height: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution={`<a target="_blank" style="${linkStyle}" href="${mapsUrl}">Open in Maps</a>`}
            />
        </MapContainer>
    );
}
