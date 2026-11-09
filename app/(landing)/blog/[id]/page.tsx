import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleView, RecentPosts } from '@/components/Blog';
import { articles } from '@/lib/blog';
import { articleJsonLd, JsonLd, pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ id: string }> };

const findArticle = async ({ params }: Props) => {
    const { id } = await params;

    return articles.find((item) => String(item.id) === id);
};

export const generateStaticParams = () => articles.map((article) => ({ id: String(article.id) }));

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const article = await findArticle(props);
    if (!article) {
        return {};
    }
    const meta = pageMetadata(`/blog/${article.id}`, { title: article.title, description: article.subtitle });

    return { ...meta, openGraph: { ...meta.openGraph, type: 'article', publishedTime: article.date, images: [article.image] } };
};

export default async function ArticlePage(props: Props) {
    const article = await findArticle(props);
    if (!article) {
        notFound();
    }

    return (
        <main className="blog-page">
            <JsonLd data={articleJsonLd(article)} />
            <ArticleView article={article} />
            <RecentPosts />
        </main>
    );
}
