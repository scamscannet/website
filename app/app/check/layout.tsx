import { pageMetadata } from '@/lib/seo';
import { texts } from '@/lib/texts';

export const metadata = pageMetadata('/app/check', texts.meta.check);

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
