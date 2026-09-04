import PropertyDetailClient from '@/components/PropertyDetailClient';
import { getProperty } from '@/lib/firebaseUtils';
import { BUSINESS } from '@/lib/config';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const property = await getProperty(id).catch(() => null);
    if (!property) {
        return {
            title: 'Property Not Found - Aurevon Realty',
        };
    }
    return {
        title: `${property.title || property.name} - Aurevon Realty`,
        description: property.shortDescription || property.description || 'Verified Aurevon Realty property listing.',
        alternates: {
            canonical: `/property/${property.listingId || property.id || id}`,
        },
        openGraph: {
            title: property.title || property.name,
            description: property.shortDescription || property.description,
            url: `${BUSINESS.websiteBaseUrl}/property/${property.listingId || property.id || id}`,
            images: property.thumbnail ? [property.thumbnail] : [],
            type: 'website',
        },
    };
}

export default async function PropertyPage({ params }) {
    const { id } = await params;
    return <PropertyDetailClient id={id} />;
}
