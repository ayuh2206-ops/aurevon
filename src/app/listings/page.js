import { Suspense } from 'react';
import ListingsClient from '@/components/ListingsClient';

export const metadata = {
    title: 'Listings - Aurevon Realty',
    description: 'Search, filter, save, compare, and share verified Aurevon Realty listings across residential, rental, and commercial property categories.',
};

export default function ListingsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0D0B09] flex items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-[#C9A96E] border-t-transparent" /></div>}>
            <ListingsClient />
        </Suspense>
    );
}
