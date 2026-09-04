'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { useAuth } from '@/context/AuthContext';
import { normalizeProperty, trackConversion } from '@/lib/realEstate';

export default function Featured({ properties, categoryLabel, title, linkTo, bgClass }) {
    const router = useRouter();
    const { userProfile, openAuthModal, toggleSaved } = useAuth();

    if (!properties || properties.length === 0) return null;

    const handleSave = (property) => {
        openAuthModal('save', async () => {
            await toggleSaved(property.id);
        });
    };

    const handleCompare = (property) => {
        openAuthModal('compare', () => {
            router.push(`/listings?compare=${encodeURIComponent(property.id)}`);
        });
    };

    const handleShare = async (property) => {
        const p = normalizeProperty(property);
        const url = `${window.location.origin}/property/${p.listingId || p.id}`;
        trackConversion('property_shared', { propertyId: p.id, source: 'Featured' });
        if (navigator.share) {
            await navigator.share({ title: p.title, text: p.shortDescription, url }).catch(() => {});
        } else {
            await navigator.clipboard.writeText(url);
            alert('Property link copied.');
        }
    };

    return (
        <section id="properties" className={`py-24 ${bgClass || 'bg-[#F5F0E8]'}`}>
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <span className="mb-4 block font-sans text-xs uppercase tracking-[0.2em] text-[#C9A96E]">{categoryLabel || 'Featured Portfolio'}</span>
                        <h2 className="whitespace-pre-line font-serif text-4xl text-[#1A1714] md:text-5xl lg:text-6xl">{title || 'Spaces That\nDrive Business'}</h2>
                    </div>
                    <Link href={linkTo || '/listings'} className="flex items-center font-sans text-[13px] uppercase tracking-wider text-[#8B4A2F] transition-colors hover:text-[#C9A96E]">
                        View All Properties <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {properties.slice(0, 6).map((property) => {
                        const p = normalizeProperty(property);
                        return (
                            <PropertyCard
                                key={p.id}
                                property={p}
                                isSaved={userProfile?.savedProperties?.includes(p.id)}
                                onSave={handleSave}
                                onCompare={handleCompare}
                                onShare={handleShare}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
