import { BUSINESS } from '@/lib/config';

const baseUrl = BUSINESS.websiteBaseUrl.replace(/\/$/, '');

export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/admin',
                '/dashboard',
                '/login',
                '/register',
                '/saved',
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
