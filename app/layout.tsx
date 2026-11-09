import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { texts } from '@/lib/texts';
import { JsonLd, SITE_URL, siteJsonLd } from '@/lib/seo';
import './globals.css';

// Each weight is its own family (no font-weight declared), exactly like the original
// @font-face setup, so headings with font-weight 700 still get the same synthetic bolding.
const regular = localFont({ src: './fonts/THICCCBOI-Regular.ttf', variable: '--font-regular', adjustFontFallback: false });
const medium = localFont({ src: './fonts/THICCCBOI-Medium.ttf', variable: '--font-medium', adjustFontFallback: false });
const semiBold = localFont({ src: './fonts/THICCCBOI-SemiBold.ttf', variable: '--font-semibold', adjustFontFallback: false });
const bold = localFont({ src: './fonts/THICCCBOI-Bold.ttf', variable: '--font-bold', adjustFontFallback: false });

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: { default: texts.meta.home.title, template: `%s | ${texts.site.name}` },
    description: texts.meta.home.description,
    applicationName: texts.site.name,
    openGraph: { siteName: texts.site.name, type: 'website', locale: 'en_US', url: '/' },
    twitter: { card: 'summary_large_image' },
    icons: {
        icon: [
            { url: '/images/favicon/favicon.ico', sizes: 'any' },
            { url: '/images/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/images/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: '/images/favicon/apple-touch-icon.png',
    },
    manifest: '/images/favicon/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={[regular, medium, semiBold, bold].map((font) => font.variable).join(' ')}>
            <body>
                <JsonLd data={siteJsonLd} />
                <div className="app-root">{children}</div>
            </body>
        </html>
    );
}
