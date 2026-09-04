'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ChevronDown, MapPin, Search, Send } from 'lucide-react';
import { addLead, getSiteOptions } from '@/lib/firebaseUtils';
import {
    DEFAULT_SITE_OPTIONS,
    RENT_BUDGET_RANGES,
    SALE_BUDGET_RANGES,
    formatBhkOption,
    trackConversion,
} from '@/lib/realEstate';
import { useTypewriter } from '@/hooks/useTypewriter';

const placeholders = [
    "Search 'Office space in Kharadi'",
    "Search '3 BHK in Baner'",
    "Search 'Retail shop in Balewadi'",
    "Search 'Pre-leased office 9% yield'",
];

const searchModes = [
    { id: 'buy', label: 'Buy', category: 'Residential', listingType: 'Sell' },
    { id: 'rent', label: 'Rent', category: 'Residential', listingType: 'Rent/Lease' },
    { id: 'sell', label: 'Sell', category: 'Residential', listingType: 'Sell', isSell: true },
    { id: 'commercial-buy', label: 'Commercial Buy', category: 'Commercial', listingType: 'Sell' },
    { id: 'commercial-rent', label: 'Commercial Rent', category: 'Commercial', listingType: 'Rent/Lease' },
    { id: 'commercial-sell', label: 'Commercial Sell', category: 'Commercial', listingType: 'Sell', isSell: true },
];

export default function SearchBar() {
    const router = useRouter();
    const placeholder = useTypewriter(placeholders);
    const [mode, setMode] = useState('buy');
    const [options, setOptions] = useState(DEFAULT_SITE_OPTIONS);
    const [searchText, setSearchText] = useState('');
    const [locality, setLocality] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [bhk, setBhk] = useState('');
    const [budget, setBudget] = useState('');
    const [sellLead, setSellLead] = useState({ name: '', phone: '', locality: '', propertyType: '', notes: '' });
    const [sellStatus, setSellStatus] = useState({ sent: false, error: '', sending: false });

    useEffect(() => {
        getSiteOptions().then(setOptions).catch(() => setOptions(DEFAULT_SITE_OPTIONS));
    }, []);

    const selectedMode = searchModes.find((item) => item.id === mode) || searchModes[0];
    const category = selectedMode.category;
    const listingType = selectedMode.listingType;
    const isSellMode = Boolean(selectedMode.isSell);
    const typeOptions = category === 'Commercial' ? options.commercialTypes : options.residentialTypes;
    const budgetOptions = listingType === 'Rent/Lease'
        ? (options.rentBudgets || RENT_BUDGET_RANGES.map((item) => item.label))
        : (options.buyBudgets || SALE_BUDGET_RANGES.map((item) => item.label));

    const localityMatches = useMemo(() => {
        const all = options.localities || options.locations || [];
        if (!locality.trim()) return all;
        return all.filter((item) => item.toLowerCase().includes(locality.toLowerCase()));
    }, [locality, options]);

    const updateSellLead = (field, value) => {
        setSellLead((prev) => ({ ...prev, [field]: value }));
    };

    const handleSearch = () => {
        const params = new URLSearchParams();
        params.set('category', category);
        params.set('listingType', listingType);
        if (searchText.trim()) {
            params.set('search', searchText.trim());
            params.set('q', searchText.trim());
        }
        if (locality.trim()) params.set('locality', locality.trim());
        if (propertyType) params.set('type', propertyType);
        if (bhk) params.set('bhk', bhk);
        if (budget) params.set('budget', budget);
        router.push(`/listings?${params.toString()}`);
    };

    const handleSellSubmit = async (event) => {
        event.preventDefault();
        if (!sellLead.name.trim() || sellLead.phone.replace(/\D/g, '').length < 8) {
            setSellStatus({ sent: false, error: 'Please enter your name and a valid phone number.', sending: false });
            return;
        }

        setSellStatus({ sent: false, error: '', sending: true });
        try {
            await addLead({
                name: sellLead.name.trim(),
                phone: sellLead.phone.trim(),
                propertyLocality: sellLead.locality.trim(),
                propertyTitle: `${category} Sell Enquiry`,
                message: sellLead.notes.trim(),
                source: `Homepage ${selectedMode.label} Tab`,
                requestType: `${category} Sell Property`,
                status: 'New',
                propertyType: sellLead.propertyType,
                propertyCategory: category,
            });
            trackConversion('sell_property_lead', { source: `Homepage ${selectedMode.label} Tab`, category });
            setSellStatus({ sent: true, error: '', sending: false });
            setSellLead({ name: '', phone: '', locality: '', propertyType: '', notes: '' });
        } catch (error) {
            console.error('Sell lead failed:', error);
            setSellStatus({ sent: false, error: 'Could not send right now. Please use WhatsApp or try again.', sending: false });
        }
    };

    return (
        <div className="relative z-50 mx-auto w-full max-w-5xl rounded-xl border-t-2 border-[#C9A96E] bg-[#0D0B09]/85 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-6">
            <div className="mb-5 flex w-full overflow-x-auto rounded-lg border border-[#2E2A25] bg-[#1A1714] p-1 scrollbar-hide md:w-fit">
                {searchModes.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                            setMode(item.id);
                            setBudget('');
                            setPropertyType('');
                            setSellLead((prev) => ({ ...prev, propertyType: '' }));
                        }}
                        className={`whitespace-nowrap rounded-md px-5 py-1.5 font-sans text-sm transition-colors ${mode === item.id ? 'bg-[#3E3A35] text-[#F5F0E8]' : 'text-[#7A7268] hover:text-[#F5F0E8]'}`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {isSellMode ? (
                <div>
                    {sellStatus.sent ? (
                        <div className="rounded-lg border border-[#2E2A25] bg-[#1A1714] p-6 text-center">
                            <CheckCircle2 className="mx-auto mb-3 h-9 w-9 text-[#C9A96E]" />
                            <h3 className="font-serif text-2xl text-[#F5F0E8]">Sell enquiry received</h3>
                            <p className="mx-auto mt-2 max-w-md font-sans text-sm text-[#9E968E]">
                                The advisory team will review your property details and call you shortly.
                            </p>
                            <button
                                type="button"
                                onClick={() => setSellStatus({ sent: false, error: '', sending: false })}
                                className="mt-5 font-sans text-xs uppercase tracking-widest text-[#C9A96E] hover:text-[#F5F0E8]"
                            >
                                Send another
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSellSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-5">
                            {sellStatus.error && (
                                <div className="md:col-span-5 rounded border border-red-700 bg-red-900/30 p-3 font-sans text-sm text-red-200">
                                    {sellStatus.error}
                                </div>
                            )}
                            <input
                                value={sellLead.name}
                                onChange={(event) => updateSellLead('name', event.target.value)}
                                placeholder="Owner name"
                                className="rounded-lg border border-[#2E2A25] bg-[#1A1714] px-3 py-3 font-sans text-sm text-[#F5F0E8] outline-none focus:border-[#C9A96E]"
                            />
                            <input
                                value={sellLead.phone}
                                onChange={(event) => updateSellLead('phone', event.target.value)}
                                placeholder="Phone / WhatsApp"
                                className="rounded-lg border border-[#2E2A25] bg-[#1A1714] px-3 py-3 font-sans text-sm text-[#F5F0E8] outline-none focus:border-[#C9A96E]"
                            />
                            <input
                                value={sellLead.locality}
                                onChange={(event) => updateSellLead('locality', event.target.value)}
                                placeholder="Locality"
                                className="rounded-lg border border-[#2E2A25] bg-[#1A1714] px-3 py-3 font-sans text-sm text-[#F5F0E8] outline-none focus:border-[#C9A96E]"
                                list="sell-localities"
                            />
                            <select
                                value={sellLead.propertyType}
                                onChange={(event) => updateSellLead('propertyType', event.target.value)}
                                className="rounded-lg border border-[#2E2A25] bg-[#1A1714] px-3 py-3 font-sans text-sm text-[#F5F0E8] outline-none focus:border-[#C9A96E]"
                                aria-label="Property type"
                            >
                                <option value="">Property type</option>
                                {typeOptions.map((item) => <option key={item}>{item}</option>)}
                            </select>
                            <button
                                type="submit"
                                disabled={sellStatus.sending}
                                className="flex items-center justify-center gap-2 rounded bg-[#C9A96E] px-5 py-3 font-sans text-xs uppercase tracking-widest text-[#0D0B09] transition-colors hover:bg-[#F5F0E8] disabled:opacity-60"
                            >
                                <Send className="h-4 w-4" /> {sellStatus.sending ? 'Sending' : 'Request Valuation'}
                            </button>
                            <textarea
                                value={sellLead.notes}
                                onChange={(event) => updateSellLead('notes', event.target.value)}
                                placeholder="Notes about your property (optional)"
                                className="md:col-span-5 rounded-lg border border-[#2E2A25] bg-[#1A1714] px-3 py-3 font-sans text-sm text-[#F5F0E8] outline-none focus:border-[#C9A96E]"
                                rows={2}
                            />
                        </form>
                    )}
                    <datalist id="sell-localities">
                        {(options.localities || []).map((item) => <option key={item} value={item} />)}
                    </datalist>
                </div>
            ) : (
                <div>
                    <div className="flex flex-col gap-4 rounded-lg border border-[#2E2A25] bg-[#1A1714] p-2 md:flex-row md:items-center">
                        <div className="flex flex-1 items-center px-2">
                            <Search className="mr-3 h-5 w-5 shrink-0 text-[#C9A96E]" />
                            <label htmlFor="property-search" className="sr-only">Search properties</label>
                            <input
                                id="property-search"
                                value={searchText}
                                onChange={(event) => setSearchText(event.target.value)}
                                onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
                                placeholder={placeholder}
                                className="w-full border-none bg-transparent font-sans text-[15px] text-[#F5F0E8] outline-none placeholder:text-[#7A7268]"
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            className="rounded bg-[#C9A96E] px-6 py-3 font-sans text-sm font-medium uppercase text-[#0D0B09] transition-colors hover:bg-[#F5F0E8]"
                        >
                            Search
                        </button>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="relative">
                            <MapPin className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-[#C9A96E]" />
                            <input
                                value={locality}
                                onChange={(event) => setLocality(event.target.value)}
                                placeholder="Locality"
                                list="home-localities"
                                className="w-full rounded-full border border-[#C9A96E] bg-transparent py-2 pl-9 pr-4 font-sans text-sm text-[#F5F0E8] outline-none placeholder:text-[#7A7268]"
                            />
                            <datalist id="home-localities">
                                {localityMatches.map((item) => <option key={item} value={item} />)}
                            </datalist>
                        </div>
                        <div className="relative">
                            <select
                                value={propertyType}
                                onChange={(event) => setPropertyType(event.target.value)}
                                className="w-full appearance-none rounded-full border border-[#C9A96E] bg-[#0D0B09] px-4 py-2 font-sans text-sm text-[#F5F0E8] outline-none"
                                aria-label="Property type"
                            >
                                <option value="">All property types</option>
                                {typeOptions.map((item) => <option key={item}>{item}</option>)}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-4 top-3 h-4 w-4 text-[#C9A96E]" />
                        </div>
                        <div className="relative">
                            <select
                                value={bhk}
                                onChange={(event) => setBhk(event.target.value)}
                                className="w-full appearance-none rounded-full border border-[#C9A96E] bg-[#0D0B09] px-4 py-2 font-sans text-sm text-[#F5F0E8] outline-none"
                                aria-label="Bedroom count"
                            >
                                <option value="">Any BHK</option>
                                {(options.bhkOptions || []).map((item) => <option key={item} value={item}>{formatBhkOption(item)}</option>)}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-4 top-3 h-4 w-4 text-[#C9A96E]" />
                        </div>
                        <div className="relative">
                            <select
                                value={budget}
                                onChange={(event) => setBudget(event.target.value)}
                                className="w-full appearance-none rounded-full border border-[#C9A96E] bg-[#0D0B09] px-4 py-2 font-sans text-sm text-[#F5F0E8] outline-none"
                                aria-label="Budget range"
                            >
                                <option value="">Any budget</option>
                                {budgetOptions.map((item) => <option key={item}>{item}</option>)}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-4 top-3 h-4 w-4 text-[#C9A96E]" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
