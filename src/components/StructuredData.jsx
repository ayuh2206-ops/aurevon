import { BUSINESS } from '@/lib/config';

export default function StructuredData() {
    const baseUrl = BUSINESS.websiteBaseUrl.replace(/\/$/, '');
    const data = [
        {
            '@context': 'https://schema.org',
            '@type': ['RealEstateAgent', 'LocalBusiness'],
            name: BUSINESS.businessName,
            url: baseUrl,
            telephone: BUSINESS.officePhone,
            email: BUSINESS.email,
            foundingDate: String(BUSINESS.establishedYear),
            founder: {
                '@type': 'Person',
                name: BUSINESS.founderName,
            },
            address: {
                '@type': 'PostalAddress',
                streetAddress: BUSINESS.officeAddress,
                addressLocality: BUSINESS.city,
                addressRegion: BUSINESS.stateOrRegion,
                postalCode: BUSINESS.postalCode,
                addressCountry: BUSINESS.country,
            },
            geo: {
                '@type': 'GeoCoordinates',
                latitude: BUSINESS.geoLatitude,
                longitude: BUSINESS.geoLongitude,
            },
            areaServed: BUSINESS.primaryServiceAreas,
            sameAs: Object.values(BUSINESS.socialLinks).filter(Boolean),
            priceRange: 'Rs.',
        },
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: BUSINESS.businessName,
            url: baseUrl,
            potentialAction: {
                '@type': 'SearchAction',
                target: `${baseUrl}/listings?search={search_term_string}`,
                'query-input': 'required name=search_term_string',
            },
        },
    ];

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
