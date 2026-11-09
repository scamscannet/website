import type { Article } from './types';
import { texts } from './texts';

const images = ['/images/blog-1.jpg', '/images/blog-2.jpg', '/images/blog-3.jpg'];

// Placeholder content until a CMS is connected: every article is the phishing article.
export const articles: Article[] = images.map((image, index) => ({ ...texts.blog.phishing, id: index + 1, image }));

export const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

export const formatArticleDate = (date: string) => new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
