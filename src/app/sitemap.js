import { BUSINESS } from '@/lib/config';
import { getArticles, getProperties, getSiteOptions } from '@/lib/firebaseUtils';
import { isPublicProperty } from '@/lib/realEstate';

const baseUrl = BUSINESS.websiteBaseUrl.replace(/\/$/, '');

function url(path = '/') {
    return `${baseUrl}${path === '/' ? '' : path}`;
}

function asDate(value) {
    const date = value ? new Date(value) : new Date();
    return Number.isNaN(date.getTime()) ? new Date() : date;
}

export default async function sitemap() {
    const staticPages = [
        { url: url('/'), lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
        { url: url('/listings'), lastModified: new Date(), changeFrequency: 'daily', priority: 0.95 },
        { url: url('/properties'), lastModified: new Date(), changeFrequency: 'daily', priority: 0.75 },
        { url: url('/journal'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: url('/about'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: url('/contact'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: url('/privacy-policy'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
        { url: url('/terms-of-service'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ];

    let localityPages = [];
    try {
        const options = await getSiteOptions();
        const localities = [...new Set([...(options.featuredLocalities || []), ...(options.localities || [])])];
        localityPages = localities.map((locality) => ({
            url: url(`/listings?locality=${encodeURIComponent(locality)}`),
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        }));
    } catch (error) {
        console.error('Sitemap: could not fetch localities', error);
    }

    let propertyPages = [];
    try {
        const properties = await getProperties();
        propertyPages = properties
            .filter(isPublicProperty)
            .flatMap((property) => {
                const id = property.listingId || property.id;
                if (!id) return [];
                return [
                    {
                        url: url(`/property/${id}`),
                        lastModified: asDate(property.updatedAt || property.createdAt),
                        changeFrequency: 'weekly',
                        priority: property.featured ? 0.9 : 0.8,
                    },
                    {
                        url: url(`/properties/${id}`),
                        lastModified: asDate(property.updatedAt || property.createdAt),
                        changeFrequency: 'weekly',
                        priority: 0.55,
                    },
                ];
            });
    } catch (error) {
        console.error('Sitemap: could not fetch properties', error);
    }

    let articlePages = [];
    try {
        const articles = await getArticles();
        articlePages = articles
            .filter((article) => article.status === 'Published' && article.slug)
            .map((article) => ({
                url: url(`/journal/${article.slug}`),
                lastModified: asDate(article.updatedAt || article.createdAt || article.date),
                changeFrequency: 'monthly',
                priority: article.featured ? 0.75 : 0.65,
            }));
    } catch (error) {
        console.error('Sitemap: could not fetch articles', error);
    }

    return [...staticPages, ...localityPages, ...propertyPages, ...articlePages];
}
