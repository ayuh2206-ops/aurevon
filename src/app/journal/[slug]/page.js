import ArticleDetailClient from '@/components/ArticleDetailClient';
import { getArticleBySlug } from '@/lib/firebaseUtils';
import { BUSINESS } from '@/lib/config';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug).catch(() => null);
    if (!article) return { title: 'Article Not Found - Aurevon Realty' };
    return {
        title: `${article.title} - Aurevon Realty Journal`,
        description: article.excerpt || article.metaDescription,
        alternates: {
            canonical: `/journal/${article.slug || slug}`,
        },
        openGraph: {
            title: article.title,
            description: article.excerpt || article.metaDescription,
            url: `${BUSINESS.websiteBaseUrl}/journal/${article.slug || slug}`,
            images: article.image ? [article.image] : [],
            type: 'article',
        },
    };
}

export default async function ArticlePage({ params }) {
    const { slug } = await params;
    return <ArticleDetailClient slug={slug} />;
}
