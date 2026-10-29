import { notFound } from 'next/navigation';
import { ArticleView, RecentPosts } from '@/components/Blog';
import { articles } from '@/lib/blog';

export const generateStaticParams = () => articles.map((article) => ({ id: String(article.id) }));

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const article = articles.find((item) => String(item.id) === id);
    if (!article) {
        notFound();
    }

    return (
        <main className="blog-page">
            <ArticleView article={article} />
            <RecentPosts />
        </main>
    );
}
