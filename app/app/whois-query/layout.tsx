import { pageMetadata } from '@/lib/seo';
import { texts } from '@/lib/texts';

export const metadata = pageMetadata('/app/whois-query', texts.meta.whois);

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
