import { getProperties } from '@/lib/firebaseUtils';

export default async function sitemap() {
    const baseUrl = 'https://aurevon.com';

    // Static pages
    const staticPages = [
        { url: baseUrl, lastModified: new Date(), priority: 1.0 },
        { url: `${baseUrl}/properties`, lastModified: new Date(), priority: 0.9 },
        { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.8 },
        { url: `${baseUrl}/submit-property`, lastModified: new Date(), priority: 0.7 },
        { url: `${baseUrl}/login`, lastModified: new Date(), priority: 0.5 },
        { url: `${baseUrl}/register`, lastModified: new Date(), priority: 0.5 },
    ];

    // Dynamic property pages
    let propertyPages = [];
    try {
        const properties = await getProperties();
        propertyPages = properties
            .filter(p => p.active)
            .map(p => ({
                url: `${baseUrl}/properties/${p.id}`,
                lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
                priority: p.featured ? 0.9 : 0.8,
            }));
    } catch (e) {
        console.error('Sitemap: could not fetch properties', e);
    }

    return [...staticPages, ...propertyPages];
}
