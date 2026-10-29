import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

// Each weight is its own family (no font-weight declared), exactly like the original
// @font-face setup, so headings with font-weight 700 still get the same synthetic bolding.
const regular = localFont({ src: './fonts/THICCCBOI-Regular.ttf', variable: '--font-regular', adjustFontFallback: false });
const medium = localFont({ src: './fonts/THICCCBOI-Medium.ttf', variable: '--font-medium', adjustFontFallback: false });
const semiBold = localFont({ src: './fonts/THICCCBOI-SemiBold.ttf', variable: '--font-semibold', adjustFontFallback: false });
const bold = localFont({ src: './fonts/THICCCBOI-Bold.ttf', variable: '--font-bold', adjustFontFallback: false });

export const metadata: Metadata = {
    title: 'ScamScan',
    description: 'Check if a website is safe, look up whois data and download domain zones.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={[regular, medium, semiBold, bold].map((font) => font.variable).join(' ')}>
            <body>
                <div className="app-root">{children}</div>
            </body>
        </html>
    );
}
