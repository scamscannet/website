import LandingLayout from './(landing)/layout';
import { ErrorView } from '@/components/ui';
import { noIndex } from '@/lib/seo';
import { texts } from '@/lib/texts';

export const metadata = noIndex(texts.meta.notFound);

export default function NotFound() {
    return (
        <LandingLayout>
            <ErrorView notFound />
        </LandingLayout>
    );
}
