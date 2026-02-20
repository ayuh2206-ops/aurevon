'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { initialProperties } from '@/lib/data';
import { MapPin, Expand, IndianRupee, Building2, TrendingUp, Search as SearchIcon, ChevronDown, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

function PropertiesContent() {
    const searchParams = useSearchParams();
    const [filteredProperties, setFilteredProperties] = useState(initialProperties);

    // Parse query params
    const tab = searchParams.get('tab');
    const q = searchParams.get('q');
    const filterType = searchParams.get('type');
    const filterLocation = searchParams.get('location');
    const filterBudget = searchParams.get('budget');
    const filterArea = searchParams.get('areasqft');
    const filterYield = searchParams.get('yield');
    const filterStatus = searchParams.get('constructionstatus');

    useEffect(() => {
        let results = initialProperties.filter(p => p.active);

        // Filter by tab (Buy/Lease etc)
        if (tab) {
            if (tab === 'Buy') {
                // In a real app we'd filter properties for sale vs lease. Here we'll just show all for demo.
            } else if (tab === 'New Launch') {
                results = results.filter(p => p.status === 'New Launch' || p.constructionStatus === 'New Launch');
            } else if (tab === 'Pre-Leased') {
                results = results.filter(p => parseFloat(p.yield) > 8.0); // Simple proxy for pre-leased heavily marketed on high yield
            }
        }

        // Filter by textual search
        if (q) {
            const query = q.toLowerCase();
            results = results.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.locality.toLowerCase().includes(query) ||
                p.city.toLowerCase().includes(query)
            );
        }

        // Filter by Property Type
        if (filterType) {
            results = results.filter(p => p.subtype === filterType);
        }

        // Filter by Location
        if (filterLocation) {
            results = results.filter(p => p.locality === filterLocation);
        }

        // Filter by Status
        if (filterStatus) {
            results = results.filter(p => p.status === filterStatus || p.constructionStatus === filterStatus);
        }

        // Note: Budget, Area, Yield logic can be more complex (parsing ranges), 
        // kept minimal here for UI demonstration based on standard demo data.

        setFilteredProperties(results);
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-[#0D0B09] pt-32 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl text-[#F5F0E8] font-serif mb-4">
                        {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
                    </h1>

                    {/* Active Filters Display */}
                    <div className="flex flex-wrap gap-2 text-sm font-sans">
                        <span className="text-[#7A7268] mr-2 flex items-center">Active Filters:</span>
                        {q && <span className="px-3 py-1 rounded-full bg-[#1A1714] border border-[#2E2A25] text-[#C9A96E]">Search: "{q}"</span>}
                        {filterLocation && <span className="px-3 py-1 rounded-full bg-[#1A1714] border border-[#2E2A25] text-[#C9A96E]">Location: {filterLocation}</span>}
                        {filterType && <span className="px-3 py-1 rounded-full bg-[#1A1714] border border-[#2E2A25] text-[#C9A96E]">Type: {filterType}</span>}
                        {tab && <span className="px-3 py-1 rounded-full bg-[#1A1714] border border-[#2E2A25] text-[#C9A96E]">Category: {tab}</span>}
                        {filterStatus && <span className="px-3 py-1 rounded-full bg-[#1A1714] border border-[#2E2A25] text-[#C9A96E]">Status: {filterStatus}</span>}

                        {(q || filterLocation || filterType || filterStatus || tab !== 'Buy') && (
                            <Link href="/properties" className="px-3 py-1 text-[#7A7268] hover:text-[#C9A96E] transition-colors underline decoration-[#7A7268] hover:decoration-[#C9A96E] underline-offset-4">
                                Clear All
                            </Link>
                        )}
                    </div>
                </div>

                {/* Results Grid */}
                {filteredProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProperties.map((property) => (
                            <Link href={`/properties/${property.id}`} key={property.id} className="group cursor-pointer">
                                <div className="bg-[#1A1714] rounded-2xl overflow-hidden border border-[#2E2A25] hover:border-[#C9A96E]/50 transition-colors duration-300 h-full flex flex-col">
                                    <div className="relative h-64 overflow-hidden">
                                        {/* Badges */}
                                        <div className="absolute top-4 left-4 z-10 flex gap-2">
                                            {property.featured && (
                                                <span className="bg-[#C9A96E] text-[#0D0B09] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                                    Featured
                                                </span>
                                            )}
                                            <span className="bg-[#0D0B09]/80 text-[#F5F0E8] backdrop-blur-md text-xs font-medium px-3 py-1 rounded-full border border-[#2E2A25]">
                                                {property.status}
                                            </span>
                                        </div>
                                        <div className="absolute top-4 right-4 z-10">
                                            {property.nriFriendly && (
                                                <span className="bg-[#0D0B09]/80 text-[#C9A96E] backdrop-blur-md text-xs font-semibold px-3 py-1 rounded-full border border-[#C9A96E]/50 flex items-center gap-1">
                                                    <CheckCircle2 className="w-3 h-3" /> NRI
                                                </span>
                                            )}
                                        </div>
                                        {/* Image */}
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-0"></div>
                                        <img
                                            src={property.image}
                                            alt={property.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                        />
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-xl font-serif text-[#F5F0E8] group-hover:text-[#C9A96E] transition-colors">{property.name}</h3>
                                                <div className="flex items-center text-[#7A7268] text-sm mt-1">
                                                    <MapPin className="w-3.5 h-3.5 mr-1" />
                                                    {property.locality}, {property.city}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xl font-serif text-[#C9A96E]">{property.priceDisplay}</div>
                                            </div>
                                        </div>

                                        <p className="text-[#8B847A] text-sm mb-6 flex-1 line-clamp-2 mt-2">
                                            {property.shortDescription}
                                        </p>

                                        <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-[#2E2A25] mb-6">
                                            <div className="text-center">
                                                <Building2 className="w-5 h-5 mx-auto text-[#C9A96E] mb-1" />
                                                <div className="text-[#F5F0E8] text-sm font-medium">{property.subtype}</div>
                                            </div>
                                            <div className="text-center border-x border-[#2E2A25]">
                                                <Expand className="w-5 h-5 mx-auto text-[#C9A96E] mb-1" />
                                                <div className="text-[#F5F0E8] text-sm font-medium">{property.sqft} sqft</div>
                                            </div>
                                            <div className="text-center">
                                                <TrendingUp className="w-5 h-5 mx-auto text-[#C9A96E] mb-1" />
                                                <div className="text-[#F5F0E8] text-sm font-medium">{property.yield} Yield</div>
                                            </div>
                                        </div>

                                        <button className="w-full py-3 rounded border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0D0B09] transition-colors font-sans font-medium uppercase text-sm tracking-wider">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <SearchIcon className="w-16 h-16 text-[#2E2A25] mx-auto mb-6" />
                        <h2 className="text-2xl font-serif text-[#F5F0E8] mb-4">No properties found matching your criteria</h2>
                        <p className="text-[#7A7268] max-w-md mx-auto mb-8 font-sans">
                            Try adjusting your search filters, removing a location, or searching for a different property type.
                        </p>
                        <Link href="/properties" className="inline-block bg-[#C9A96E] text-[#0D0B09] font-sans font-medium uppercase text-sm px-8 py-3 rounded hover:bg-[#F5F0E8] transition-colors">
                            Clear All Filters
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function PropertiesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0D0B09] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin"></div></div>}>
            <PropertiesContent />
        </Suspense>
    );
}
