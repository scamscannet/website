import { pageMetadata } from '@/lib/seo';
import { texts } from '@/lib/texts';

export const metadata = pageMetadata('/app/domain-zone', texts.meta.domainZone);

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
