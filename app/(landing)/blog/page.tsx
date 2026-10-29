import { FeaturedArticles, RecentPosts } from '@/components/Blog';

export default function BlogPage() {
    return (
        <main className="blog-page">
            <FeaturedArticles />
            <RecentPosts />
        </main>
    );
}
