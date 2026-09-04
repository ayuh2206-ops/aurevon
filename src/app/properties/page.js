import { Suspense } from 'react';
import ListingsClient from '@/components/ListingsClient';

export const metadata = {
    title: 'Properties - Aurevon Realty',
    description: 'Browse verified residential and commercial properties across Pune with search, filters, saved listings, comparison, and direct enquiry actions.',
};

export default function PropertiesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0D0B09] flex items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-[#C9A96E] border-t-transparent" /></div>}>
            <ListingsClient />
        </Suspense>
    );
}
