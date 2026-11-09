import { FeaturedArticles, RecentPosts } from '@/components/Blog';
import { pageMetadata } from '@/lib/seo';
import { texts } from '@/lib/texts';

export const metadata = pageMetadata('/blog', texts.meta.blog);

export default function BlogPage() {
    return (
        <main className="blog-page">
            <FeaturedArticles />
            <RecentPosts />
        </main>
    );
}
