import { pageMetadata } from '@/lib/seo';
import { texts } from '@/lib/texts';

export const metadata = pageMetadata('/app/takedown', texts.meta.takedown);

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
