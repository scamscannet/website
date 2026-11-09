import { noIndex } from '@/lib/seo';
import { texts } from '@/lib/texts';

export const metadata = noIndex(texts.meta.login);

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
