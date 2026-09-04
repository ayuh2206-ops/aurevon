'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Heart, Search } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { useAuth } from '@/context/AuthContext';
import { getProperties } from '@/lib/firebaseUtils';
import { isPublicProperty, normalizeProperty } from '@/lib/realEstate';

export default function SavedPropertiesPage() {
    const { user, userProfile, loading, openAuthModal, toggleSaved } = useAuth();
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        getProperties().then((items) => {
            if (!cancelled) setProperties(items.map(normalizeProperty));
        }).catch(console.error).finally(() => {
            if (!cancelled) setIsLoading(false);
        });
        return () => {
            cancelled = true;
        };
    }, []);

    const savedIds = useMemo(() => userProfile?.savedProperties || [], [userProfile?.savedProperties]);
    const savedProperties = useMemo(() => {
        return properties.filter((property) => savedIds.includes(property.id) && isPublicProperty(property));
    }, [properties, savedIds]);
    const unavailableCount = Math.max(0, savedIds.length - savedProperties.length);

    const handleUnsave = (property) => {
        openAuthModal('save', async () => {
            try {
                await toggleSaved(property.id, false);
            } catch (error) {
                alert(error.message || 'Could not remove saved property.');
            }
        });
    };

    const handleShare = async (property) => {
        const url = `${window.location.origin}/property/${property.listingId || property.id}`;
        if (navigator.share) {
            await navigator.share({ title: property.title, text: property.shortDescription, url }).catch(() => {});
        } else {
            await navigator.clipboard.writeText(url);
            alert('Property link copied.');
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F0E8]">
            <Navbar />
            <main className="pt-32">
                <section className="border-b border-[#2E2A25] bg-[#0D0B09]">
                    <div className="mx-auto max-w-7xl px-6 py-14">
                        <p className="mb-4 font-sans text-xs uppercase tracking-[0.2em] text-[#C9A96E]">Saved Portfolio</p>
                        <h1 className="font-serif text-4xl text-[#F5F0E8] md:text-6xl">Saved Properties</h1>
                        <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-[#9E968E]">
                            Keep your shortlist available across devices after sign-in.
                        </p>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 py-12">
                    {loading || isLoading ? (
                        <div className="flex h-64 items-center justify-center">
                            <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#C9A96E] border-t-transparent" />
                        </div>
                    ) : !user ? (
                        <div className="border border-[#D9D0C0] bg-white px-6 py-20 text-center">
                            <Heart className="mx-auto mb-6 h-14 w-14 text-[#D9D0C0]" />
                            <h2 className="mb-4 font-serif text-3xl text-[#1A1714]">Sign In to Save Properties</h2>
                            <p className="mx-auto mb-8 max-w-md font-sans text-sm leading-relaxed text-[#7A7268]">
                                Saved properties require sign-in so your shortlist can follow you across devices.
                            </p>
                            <div className="flex flex-col justify-center gap-3 sm:flex-row">
                                <button onClick={() => openAuthModal('save')} className="rounded bg-[#C9A96E] px-6 py-3 font-sans text-xs uppercase tracking-widest text-[#0D0B09] transition-colors hover:bg-[#0D0B09] hover:text-[#C9A96E]">
                                    Sign In
                                </button>
                                <Link href="/listings" className="rounded border border-[#D9D0C0] px-6 py-3 font-sans text-xs uppercase tracking-widest text-[#7A7268] transition-colors hover:border-[#C9A96E] hover:text-[#1A1714]">
                                    Browse Properties
                                </Link>
                            </div>
                        </div>
                    ) : savedProperties.length > 0 ? (
                        <>
                            {unavailableCount > 0 && (
                                <div className="mb-8 border border-[#D9D0C0] bg-white p-4 font-sans text-sm text-[#7A7268]">
                                    {unavailableCount} saved {unavailableCount === 1 ? 'property is' : 'properties are'} no longer published or available.
                                </div>
                            )}
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {savedProperties.map((property) => (
                                    <PropertyCard
                                        key={property.id}
                                        property={property}
                                        isSaved
                                        onSave={handleUnsave}
                                        onCompare={(item) => openAuthModal('compare', () => window.location.assign(`/listings?compare=${encodeURIComponent(item.id)}`))}
                                        onShare={handleShare}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="border border-[#D9D0C0] bg-white px-6 py-20 text-center">
                            <Search className="mx-auto mb-6 h-14 w-14 text-[#D9D0C0]" />
                            <h2 className="mb-4 font-serif text-3xl text-[#1A1714]">No Saved Properties Yet</h2>
                            <p className="mx-auto mb-8 max-w-md font-sans text-sm leading-relaxed text-[#7A7268]">
                                Browse the live portfolio and save properties you want to revisit.
                            </p>
                            <Link href="/listings" className="rounded bg-[#C9A96E] px-6 py-3 font-sans text-xs uppercase tracking-widest text-[#0D0B09] transition-colors hover:bg-[#0D0B09] hover:text-[#C9A96E]">
                                Browse Properties
                            </Link>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
            <WhatsAppCTA />
        </div>
    );
}
