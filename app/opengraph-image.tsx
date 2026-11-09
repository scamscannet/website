import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { texts } from '@/lib/texts';

export const dynamic = 'force-static';
export const alt = texts.meta.home.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
    const font = await readFile(join(process.cwd(), 'app/fonts/THICCCBOI-Bold.ttf'));
    const logo = await readFile(join(process.cwd(), 'public/images/logo-footer.png'));
    const { before, highlight, after } = texts.home.heroTitle;

    return new ImageResponse(
        (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 48,
                padding: 80,
                background: 'linear-gradient(89deg, #1F0D4C 0.16%, #070410 15.46%, #070411 77.6%, #27115E 99.28%)',
                fontFamily: 'THICCCBOI',
            }}>
                <img src={`data:image/png;base64,${logo.toString('base64')}`} width={153} height={102} alt="" />
                <div style={{ display: 'flex', flexWrap: 'wrap', color: '#fff', fontSize: 72, lineHeight: 1.2 }}>
                    {before}
                    <span style={{ backgroundImage: 'linear-gradient(to left, #D939DE, #6023FA)', backgroundClip: 'text', color: 'transparent', marginLeft: 18 }}>
                        {highlight}
                    </span>
                    <span style={{ width: '100%' }}>{after}</span>
                </div>
            </div>
        ),
        { ...size, fonts: [{ name: 'THICCCBOI', data: font, weight: 700 }] },
    );
}
