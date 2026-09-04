'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Filter,
    GitCompareArrows,
    LayoutGrid,
    List,
    Map,
    Search,
    X,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import PropertyCard from '@/components/PropertyCard';
import { getProperties, getSiteOptions } from '@/lib/firebaseUtils';
import {
    COMPARE_LIMIT,
    DEFAULT_SITE_OPTIONS,
    RENT_BUDGET_RANGES,
    SALE_BUDGET_RANGES,
    filterProperties,
    formatBhkOption,
    normalizeListingType,
    normalizeProperty,
    sortProperties,
    trackConversion,
} from '@/lib/realEstate';
import { useAuth } from '@/context/AuthContext';

const PAGE_SIZE = 9;

function getFilters(searchParams) {
    return {
        search: searchParams.get('search') || searchParams.get('q') || '',
        locality: searchParams.get('locality') || searchParams.get('location') || '',
        type: searchParams.get('type') || '',
        bhk: searchParams.get('bhk') || '',
        budget: searchParams.get('budget') || searchParams.get('price') || '',
        listingType: searchParams.get('listingType') || searchParams.get('tab') || '',
        category: searchParams.get('category') || '',
        furnishing: searchParams.get('furnishing') || '',
        verified: searchParams.get('verified') || '',
    };
}

export default function ListingsClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, userProfile, openAuthModal, toggleSaved } = useAuth();
    const [properties, setProperties] = useState([]);
    const [options, setOptions] = useState(DEFAULT_SITE_OPTIONS);
    const [isLoading, setIsLoading] = useState(true);
    const [searchDraft, setSearchDraft] = useState('');
    const [sortMode, setSortMode] = useState('newest');
    const [viewMode, setViewMode] = useState('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const [comparedIds, setComparedIds] = useState([]);
    const [compareOpen, setCompareOpen] = useState(false);

    const filters = useMemo(() => getFilters(searchParams), [searchParams]);

    useEffect(() => {
        setSearchDraft(filters.search);
        setCurrentPage(1);
    }, [filters.search, filters.locality, filters.type, filters.bhk, filters.budget, filters.listingType, filters.category, filters.furnishing, filters.verified]);

    useEffect(() => {
        let cancelled = false;
        async function loadData() {
            setIsLoading(true);
            try {
                const [propertyData, optionData] = await Promise.all([getProperties(), getSiteOptions()]);
                if (!cancelled) {
                    setProperties(propertyData.map(normalizeProperty));
                    setOptions(optionData);
                }
            } catch (error) {
                console.error('Failed to load listings:', error);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }
        loadData();
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        const initialCompare = searchParams.get('compare');
        if (!initialCompare || !user) return;
        const match = properties.find((property) => property.id === initialCompare || property.listingId === initialCompare);
        const compareId = match?.id || initialCompare;
        setComparedIds((ids) => {
            const next = ids.filter((id) => id !== initialCompare && id !== compareId);
            return [compareId, ...next].slice(0, COMPARE_LIMIT);
        });
    }, [properties, searchParams, user]);

    const filteredProperties = useMemo(() => {
        return sortProperties(filterProperties(properties, filters), sortMode);
    }, [filters, properties, sortMode]);

    const canUseMap = false;

    useEffect(() => {
        if (viewMode === 'map' && !canUseMap) setViewMode('grid');
    }, [canUseMap, viewMode]);

    const pageCount = Math.max(1, Math.ceil(filteredProperties.length / PAGE_SIZE));
    const paginated = filteredProperties.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    const comparedProperties = comparedIds
        .map((id) => properties.find((property) => property.id === id || property.listingId === id))
        .filter(Boolean)
        .map(normalizeProperty);

    const updateParam = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) params.set(key, value);
        else params.delete(key);
        if (key === 'search') params.delete('q');
        if (key === 'listingType') params.delete('tab');
        router.replace(`/listings${params.toString() ? `?${params.toString()}` : ''}`);
    };

    const clearFilters = () => {
        setSearchDraft('');
        router.replace('/listings');
    };

    const handleSearch = () => {
        updateParam('search', searchDraft.trim());
    };

    const handleSave = (property) => {
        openAuthModal('save', async () => {
            try {
                await toggleSaved(property.id);
            } catch (error) {
                alert(error.message || 'Could not update saved properties.');
            }
        });
    };

    const handleCompare = (property) => {
        openAuthModal('compare', () => {
            setComparedIds((ids) => {
                if (ids.includes(property.id) || ids.includes(property.listingId)) {
                    return ids.filter((id) => id !== property.id && id !== property.listingId);
                }
                if (ids.length >= COMPARE_LIMIT) {
                    alert(`You can compare up to ${COMPARE_LIMIT} properties.`);
                    return ids;
                }
                trackConversion('compare_property_selected', { propertyId: property.id });
                return [...ids, property.id];
            });
        });
    };

    const handleShare = async (property) => {
        const item = normalizeProperty(property);
        const url = `${window.location.origin}/property/${item.listingId || item.id}`;
        trackConversion('property_shared', { propertyId: item.id, source: 'Listings' });
        if (navigator.share) {
            await navigator.share({ title: item.title, text: item.shortDescription, url }).catch(() => {});
        } else {
            await navigator.clipboard.writeText(url);
            alert('Property link copied.');
        }
    };

    const activeFilterCount = Object.values(filters).filter(Boolean).length;
    const isCompared = (property) => comparedIds.includes(property.id) || comparedIds.includes(property.listingId);
    const typeOptions = filters.category === 'Residential'
        ? options.residentialTypes
        : filters.category === 'Commercial'
            ? options.commercialTypes
            : [...options.residentialTypes, ...options.commercialTypes];
    const budgetOptions = normalizeListingType(filters.listingType) === 'Rent/Lease'
        ? (options.rentBudgets || RENT_BUDGET_RANGES.map((item) => item.label))
        : (options.buyBudgets || SALE_BUDGET_RANGES.map((item) => item.label));

    return (
        <div className="min-h-screen bg-[#F5F0E8]">
            <Navbar />
            <main className="pt-32">
                <section className="border-b border-[#2E2A25] bg-[#0D0B09]">
                    <div className="mx-auto max-w-7xl px-6 py-14">
                        <p className="mb-4 font-sans text-xs uppercase tracking-[0.2em] text-[#C9A96E]">Property Discovery</p>
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <h1 className="font-serif text-4xl text-[#F5F0E8] md:text-6xl">Browse Verified Listings</h1>
                                <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-[#9E968E]">
                                    Search across localities, property types, RERA IDs, amenities, availability, furnishing, and investment markers.
                                </p>
                            </div>
                            <Link href="/contact" className="w-fit border border-[#C9A96E] px-6 py-3 font-sans text-xs uppercase tracking-widest text-[#C9A96E] transition-colors hover:bg-[#C9A96E] hover:text-[#0D0B09]">
                                Custom Requirement
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 py-10">
                    <div className="mb-8 border border-[#D9D0C0] bg-white p-4 md:p-6">
                        <div className="mb-5 flex flex-col gap-3 md:flex-row">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-3.5 h-4 w-4 text-[#C9A96E]" />
                                <input
                                    value={searchDraft}
                                    onChange={(event) => setSearchDraft(event.target.value)}
                                    onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
                                    placeholder="Search locality, property type, amenities, RERA ID..."
                                    className="w-full rounded border border-[#D9D0C0] py-3 pl-10 pr-3 font-sans text-sm text-[#1A1714] outline-none focus:border-[#C9A96E]"
                                />
                            </div>
                            <button onClick={handleSearch} className="rounded bg-[#0D0B09] px-6 py-3 font-sans text-xs uppercase tracking-widest text-[#C9A96E] transition-colors hover:bg-[#1A1714]">
                                Search
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            <select value={filters.category} onChange={(event) => updateParam('category', event.target.value)} className="rounded border border-[#D9D0C0] bg-white p-3 font-sans text-sm outline-none focus:border-[#C9A96E]" aria-label="Category">
                                <option value="">All categories</option>
                                <option>Residential</option>
                                <option>Commercial</option>
                            </select>
                            <select value={filters.listingType} onChange={(event) => updateParam('listingType', event.target.value)} className="rounded border border-[#D9D0C0] bg-white p-3 font-sans text-sm outline-none focus:border-[#C9A96E]" aria-label="Listing type">
                                <option value="">All listing types</option>
                                {(options.listingTypes || []).map((item) => <option key={item}>{item}</option>)}
                            </select>
                            <select value={filters.locality} onChange={(event) => updateParam('locality', event.target.value)} className="rounded border border-[#D9D0C0] bg-white p-3 font-sans text-sm outline-none focus:border-[#C9A96E]" aria-label="Locality">
                                <option value="">All localities</option>
                                {(options.localities || options.locations || []).map((item) => <option key={item}>{item}</option>)}
                            </select>
                            <select value={filters.type} onChange={(event) => updateParam('type', event.target.value)} className="rounded border border-[#D9D0C0] bg-white p-3 font-sans text-sm outline-none focus:border-[#C9A96E]" aria-label="Property type">
                                <option value="">All property types</option>
                                {typeOptions.map((item) => <option key={item}>{item}</option>)}
                            </select>
                            <select value={filters.bhk} onChange={(event) => updateParam('bhk', event.target.value)} className="rounded border border-[#D9D0C0] bg-white p-3 font-sans text-sm outline-none focus:border-[#C9A96E]" aria-label="Bedrooms">
                                <option value="">Any BHK</option>
                                {(options.bhkOptions || []).map((item) => <option key={item} value={item}>{formatBhkOption(item)}</option>)}
                            </select>
                            <select value={filters.budget} onChange={(event) => updateParam('budget', event.target.value)} className="rounded border border-[#D9D0C0] bg-white p-3 font-sans text-sm outline-none focus:border-[#C9A96E]" aria-label="Budget">
                                <option value="">Any budget</option>
                                {budgetOptions.map((item) => <option key={item}>{item}</option>)}
                            </select>
                            <select value={filters.furnishing} onChange={(event) => updateParam('furnishing', event.target.value)} className="rounded border border-[#D9D0C0] bg-white p-3 font-sans text-sm outline-none focus:border-[#C9A96E]" aria-label="Furnishing">
                                <option value="">Any furnishing</option>
                                {(options.furnishingOptions || []).map((item) => <option key={item}>{item}</option>)}
                            </select>
                            <label className="flex items-center gap-3 rounded border border-[#D9D0C0] bg-white p-3 font-sans text-sm text-[#1A1714]">
                                <input
                                    type="checkbox"
                                    checked={filters.verified === 'true'}
                                    onChange={(event) => updateParam('verified', event.target.checked ? 'true' : '')}
                                    className="accent-[#C9A96E]"
                                />
                                Verified only
                            </label>
                        </div>
                    </div>

                    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="font-serif text-3xl text-[#1A1714]">{filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found</h2>
                            <div className="mt-2 flex flex-wrap items-center gap-2 font-sans text-xs text-[#7A7268]">
                                <Filter className="h-3.5 w-3.5" /> {activeFilterCount} active filters
                                {activeFilterCount > 0 && (
                                    <button onClick={clearFilters} className="ml-2 text-[#8B4A2F] underline underline-offset-4 hover:text-[#C9A96E]">
                                        Clear filters
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <select value={sortMode} onChange={(event) => setSortMode(event.target.value)} className="rounded border border-[#D9D0C0] bg-white px-3 py-2 font-sans text-sm text-[#1A1714]" aria-label="Sort listings">
                                <option value="newest">Newest first</option>
                                <option value="price-asc">Price low to high</option>
                                <option value="price-desc">Price high to low</option>
                                <option value="popular">Most popular</option>
                            </select>
                            <div className="flex rounded border border-[#D9D0C0] bg-white p-1">
                                <button onClick={() => setViewMode('grid')} className={`flex h-9 w-9 items-center justify-center rounded ${viewMode === 'grid' ? 'bg-[#0D0B09] text-[#C9A96E]' : 'text-[#7A7268]'}`} aria-label="Grid view">
                                    <LayoutGrid className="h-4 w-4" />
                                </button>
                                <button onClick={() => setViewMode('list')} className={`flex h-9 w-9 items-center justify-center rounded ${viewMode === 'list' ? 'bg-[#0D0B09] text-[#C9A96E]' : 'text-[#7A7268]'}`} aria-label="List view">
                                    <List className="h-4 w-4" />
                                </button>
                                {canUseMap && (
                                    <button onClick={() => setViewMode('map')} className={`flex h-9 w-9 items-center justify-center rounded ${viewMode === 'map' ? 'bg-[#0D0B09] text-[#C9A96E]' : 'text-[#7A7268]'}`} aria-label="Map view">
                                        <Map className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex h-72 items-center justify-center">
                            <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#C9A96E] border-t-transparent" />
                        </div>
                    ) : paginated.length > 0 ? (
                        <>
                            {viewMode === 'map' && canUseMap ? (
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
                                    <div className="relative min-h-[520px] overflow-hidden rounded border border-[#D9D0C0] bg-[#0D0B09]">
                                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#C9A96E 1px, transparent 1px), linear-gradient(90deg, #C9A96E 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
                                        {paginated.map((property, index) => (
                                            <Link
                                                key={property.id}
                                                href={`/property/${property.listingId || property.id}`}
                                                className="absolute rounded-full border border-[#C9A96E] bg-[#C9A96E] px-3 py-1 font-sans text-xs text-[#0D0B09] shadow-lg"
                                                style={{ left: `${15 + (index * 17) % 70}%`, top: `${18 + (index * 23) % 62}%` }}
                                            >
                                                {property.priceLabel}
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="space-y-4">
                                        {paginated.map((property) => (
                                            <PropertyCard
                                                key={property.id}
                                                property={property}
                                                variant="list"
                                                isSaved={userProfile?.savedProperties?.includes(property.id)}
                                                isCompared={isCompared(property)}
                                                onSave={handleSave}
                                                onCompare={handleCompare}
                                                onShare={handleShare}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className={viewMode === 'list' ? 'space-y-6' : 'grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'}>
                                    {paginated.map((property) => (
                                        <PropertyCard
                                            key={property.id}
                                            property={property}
                                            variant={viewMode}
                                            isSaved={userProfile?.savedProperties?.includes(property.id)}
                                            isCompared={isCompared(property)}
                                            onSave={handleSave}
                                            onCompare={handleCompare}
                                            onShare={handleShare}
                                        />
                                    ))}
                                </div>
                            )}

                            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                                <button
                                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                                    disabled={currentPage === 1}
                                    className="flex h-10 items-center gap-2 rounded border border-[#D9D0C0] bg-white px-3 font-sans text-sm text-[#7A7268] disabled:opacity-40"
                                >
                                    <ChevronLeft className="h-4 w-4" /> Previous
                                </button>
                                {[...Array(pageCount)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`h-10 w-10 rounded border font-sans text-sm ${currentPage === index + 1 ? 'border-[#0D0B09] bg-[#0D0B09] text-[#C9A96E]' : 'border-[#D9D0C0] bg-white text-[#7A7268]'}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}
                                    disabled={currentPage === pageCount}
                                    className="flex h-10 items-center gap-2 rounded border border-[#D9D0C0] bg-white px-3 font-sans text-sm text-[#7A7268] disabled:opacity-40"
                                >
                                    Next <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="border border-[#D9D0C0] bg-white px-6 py-20 text-center">
                            <Search className="mx-auto mb-6 h-14 w-14 text-[#D9D0C0]" />
                            <h2 className="mb-4 font-serif text-3xl text-[#1A1714]">No Matching Properties</h2>
                            <p className="mx-auto mb-8 max-w-md font-sans text-sm leading-relaxed text-[#7A7268]">
                                Try a wider search or send your exact requirement to the advisory team.
                            </p>
                            <div className="flex flex-col justify-center gap-3 sm:flex-row">
                                <button onClick={clearFilters} className="rounded border border-[#D9D0C0] px-6 py-3 font-sans text-xs uppercase tracking-widest text-[#7A7268] transition-colors hover:border-[#C9A96E] hover:text-[#1A1714]">
                                    Clear Filters
                                </button>
                                <Link href="/contact" className="rounded bg-[#C9A96E] px-6 py-3 font-sans text-xs uppercase tracking-widest text-[#0D0B09] transition-colors hover:bg-[#0D0B09] hover:text-[#C9A96E]">
                                    Contact Advisor
                                </Link>
                            </div>
                        </div>
                    )}
                </section>
            </main>

            {comparedProperties.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#2E2A25] bg-[#0D0B09]/95 p-4 backdrop-blur">
                    <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="flex items-center font-sans text-xs uppercase tracking-widest text-[#C9A96E]">
                                <GitCompareArrows className="mr-2 h-4 w-4" /> Compare ({comparedProperties.length}/{COMPARE_LIMIT})
                            </span>
                            {comparedProperties.map((property) => (
                                <button
                                    key={property.id}
                                    onClick={() => setComparedIds((ids) => ids.filter((id) => id !== property.id && id !== property.listingId))}
                                    className="flex items-center gap-2 rounded-full border border-[#2E2A25] bg-[#1A1714] px-3 py-1 font-sans text-xs text-[#F5F0E8]"
                                >
                                    {property.title} <X className="h-3 w-3 text-[#7A7268]" />
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setComparedIds([])} className="font-sans text-xs uppercase tracking-widest text-[#7A7268] hover:text-[#F5F0E8]">
                                Clear
                            </button>
                            <button
                                onClick={() => comparedProperties.length >= 2 ? setCompareOpen(true) : alert('Select at least 2 properties to compare.')}
                                className="rounded bg-[#C9A96E] px-5 py-2 font-sans text-xs uppercase tracking-widest text-[#0D0B09] hover:bg-[#F5F0E8]"
                            >
                                Compare Now
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {compareOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0D0B09]/80 px-4 backdrop-blur-sm">
                    <div className="max-h-[90vh] w-full max-w-6xl overflow-auto rounded-xl border border-[#2E2A25] bg-[#F5F0E8] p-6 shadow-2xl">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="font-serif text-3xl text-[#1A1714]">Property Comparison</h2>
                            <button onClick={() => setCompareOpen(false)} className="rounded-full border border-[#D9D0C0] p-2 text-[#7A7268] hover:text-[#1A1714]" aria-label="Close comparison">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[760px] border-collapse font-sans text-sm">
                                <tbody>
                                    {[
                                        ['Price', 'priceLabel'],
                                        ['Locality', 'locality'],
                                        ['Type', 'type'],
                                        ['Area', (p) => p.area ? `${p.area} ${p.areaUnit}` : 'On Request'],
                                        ['BHK', 'bhk'],
                                        ['Bedrooms', 'bedrooms'],
                                        ['Bathrooms', 'bathrooms'],
                                        ['Parking', 'parking'],
                                        ['Floor', 'floor'],
                                        ['Facing', 'facing'],
                                        ['Age', 'age'],
                                        ['Verified', (p) => p.verified ? 'Yes' : 'No'],
                                        ['License/RERA', (p) => p.reraRegistered ? (p.reraId || 'Registered') : 'On Request'],
                                        ['Legal Clear', (p) => p.legalClear ? 'Yes' : 'Review Required'],
                                        ['Possession', 'possession'],
                                        ['Furnishing', 'furnishing'],
                                    ].map(([label, field]) => (
                                        <tr key={label} className="border-b border-[#D9D0C0]">
                                            <th className="sticky left-0 bg-[#F5F0E8] p-4 text-left text-[#7A7268]">{label}</th>
                                            {comparedProperties.map((property) => (
                                                <td key={property.id} className="p-4 text-[#1A1714]">
                                                    {typeof field === 'function' ? field(property) : property[field] || 'On Request'}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
            <WhatsAppCTA />
        </div>
    );
}
