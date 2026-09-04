import { Suspense } from 'react';
import JournalClient from '@/components/JournalClient';

export const metadata = {
    title: 'Journal - Aurevon Realty',
    description: 'Read Aurevon Realty market updates, buyer guides, seller tips, RERA explainers, locality guides, and real estate investment articles.',
};

export default function JournalPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0D0B09] flex items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-[#C9A96E] border-t-transparent" /></div>}>
            <JournalClient />
        </Suspense>
    );
}
