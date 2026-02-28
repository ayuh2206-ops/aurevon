'use client';
import { useState, useEffect, use } from 'react';
import { getProperty } from '@/lib/firebaseUtils';
import {
    MapPin, Expand, Building2, TrendingUp, CheckCircle2,
    ArrowLeft, Calendar, Share2, Heart, Check, Phone, ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';

// Verified Contact Details
const WHATSAPP_NUMBER = "+918180993030";
const DISPLAY_NUMBER = "+919767446655";

export default function PropertyDetailsPage({ params }) {
    // Unwrap params in Next.js 15+ (if applicable, but generally safe to use React.use)
    const unwrappedParams = use(params);
    const id = unwrappedParams.id;

    const [property, setProperty] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            if (!id) return;
            setIsLoading(true);
            try {
                const data = await getProperty(id);
                if (data) {
                    setProperty(data);
                } else {
                    setNotFound(true);
                }
            } catch (error) {
                console.error("Error fetching property:", error);
                setNotFound(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPropertyDetails();
    }, [id]);

    const handleWhatsAppClick = () => {
        if (!property) return;
        const message = `Hello Aurevon Realty, I am interested in property [ID: ${property.id}] - "${property.name}" located in ${property.locality}, ${property.city}. Could you share more details?`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodedMessage}`, '_blank');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0D0B09] pt-32 pb-20 flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (notFound || !property) {
        return (
            <div className="min-h-screen bg-[#0D0B09] pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
                <Building2 className="w-16 h-16 text-[#2E2A25] mb-6" />
                <h1 className="text-3xl font-serif text-[#F5F0E8] mb-4">Property Not Found</h1>
                <p className="text-[#7A7268] max-w-md font-sans mb-8">
                    The property you are looking for does not exist or has been removed from our listings.
                </p>
                <Link href="/properties" className="bg-[#C9A96E] text-[#0D0B09] px-6 py-3 rounded text-sm font-medium uppercase tracking-wider hover:bg-[#F5F0E8] transition-colors">
                    Back to Properties
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0D0B09] pt-24 pb-20 font-sans text-[#F5F0E8]">
            {/* Navigation Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <Link href="/properties" className="inline-flex items-center text-[#7A7268] hover:text-[#C9A96E] transition-colors text-sm font-medium">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Listings
                </Link>
            </div>

            {/* Hero Image Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
                <div className="relative h-[40vh] md:h-[60vh] rounded-2xl md:rounded-3xl overflow-hidden border border-[#2E2A25]">
                    <img
                        src={property.image}
                        alt={property.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Badges on Hero */}
                    <div className="absolute top-6 left-6 z-10 flex flex-wrap gap-2">
                        {property.featured && (
                            <span className="bg-[#C9A96E] text-[#0D0B09] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                                Featured
                            </span>
                        )}
                        <span className="bg-[#0D0B09]/80 text-[#F5F0E8] backdrop-blur-md text-xs font-medium px-3 py-1.5 rounded-full border border-[#2E2A25]">
                            {property.status}
                        </span>
                    </div>

                    {/* Actions on Hero */}
                    <div className="absolute top-6 right-6 z-10 flex gap-3">
                        <button className="w-10 h-10 rounded-full bg-[#0D0B09]/80 backdrop-blur-md border border-[#2E2A25] flex items-center justify-center text-[#F5F0E8] hover:text-[#C9A96E] transition-colors">
                            <Share2 className="w-4 h-4" />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-[#0D0B09]/80 backdrop-blur-md border border-[#2E2A25] flex items-center justify-center text-[#F5F0E8] hover:text-red-500 transition-colors">
                            <Heart className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Title overlay */}
                    <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                            <div>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-2">{property.name}</h1>
                                <div className="flex items-center text-[#D9D0C0] text-sm sm:text-base">
                                    <MapPin className="w-4 h-4 mr-1.5" />
                                    {property.locality}, {property.city}
                                </div>
                            </div>
                            <div className="text-left md:text-right">
                                <p className="text-[#A39B8F] text-sm uppercase tracking-wider mb-1">Asking Price</p>
                                <div className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#C9A96E]">{property.priceDisplay}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Left Column - Details */}
                    <div className="w-full lg:w-[65%] xl:w-[70%] order-2 lg:order-1">

                        {/* Quick Metrics Bar */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12">
                            <div className="bg-[#1A1714] p-4 rounded-xl border border-[#2E2A25]">
                                <Building2 className="w-6 h-6 text-[#C9A96E] mb-3" />
                                <p className="text-[#7A7268] text-xs uppercase tracking-wider mb-1">Property Type</p>
                                <p className="text-[#F5F0E8] font-medium">{property.subtype || property.type}</p>
                            </div>
                            <div className="bg-[#1A1714] p-4 rounded-xl border border-[#2E2A25]">
                                <Expand className="w-6 h-6 text-[#C9A96E] mb-3" />
                                <p className="text-[#7A7268] text-xs uppercase tracking-wider mb-1">Total Built-Up Area</p>
                                <p className="text-[#F5F0E8] font-medium">{Number(property.sqft).toLocaleString('en-IN')} sqft</p>
                            </div>
                            <div className="bg-[#1A1714] p-4 rounded-xl border border-[#2E2A25]">
                                <TrendingUp className="w-6 h-6 text-[#C9A96E] mb-3" />
                                <p className="text-[#7A7268] text-xs uppercase tracking-wider mb-1">Expected Yield</p>
                                <p className="text-[#F5F0E8] font-medium">{property.yield}% p.a.</p>
                            </div>
                            <div className="bg-[#1A1714] p-4 rounded-xl border border-[#2E2A25]">
                                <Calendar className="w-6 h-6 text-[#C9A96E] mb-3" />
                                <p className="text-[#7A7268] text-xs uppercase tracking-wider mb-1">Status</p>
                                <p className="text-[#F5F0E8] font-medium">{property.constructionStatus || 'Ready to Move'}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-serif text-[#C9A96E] mb-6 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-[#C9A96E]"></span> Description
                            </h2>
                            <div className="prose prose-invert prose-p:text-[#A39B8F] prose-h3:text-[#F5F0E8] max-w-none">
                                <p className="text-lg leading-relaxed whitespace-pre-line">
                                    {property.shortDescription}
                                </p>
                                <div className="mt-8 p-6 bg-[#1A1714] rounded-xl border border-[#2E2A25] flex items-start gap-4">
                                    <div className="bg-[#C9A96E]/10 p-2 rounded text-[#C9A96E] shrink-0">
                                        <Building2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-[#F5F0E8] font-medium mb-1">Aurevon Realty Insight</h4>
                                        <p className="text-[#8B847A] text-sm leading-relaxed">
                                            This {property.subtype?.toLowerCase() || 'property'} located in {property.locality} boasts a competitive {property.yield}% average yield historically for this micro-market. Ideal for {property.type === 'Commercial' ? 'HNI investors looking for capital appreciation and steady rental income.' : 'families looking for premium living spaces.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Property Features (Mocked for layout if real data isn't extensive) */}
                        {property.features && property.features.length > 0 && (
                            <div className="mb-12">
                                <h2 className="text-2xl font-serif text-[#C9A96E] mb-6 flex items-center gap-3">
                                    <span className="w-8 h-[1px] bg-[#C9A96E]"></span> Amenities & Features
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {property.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center text-[#A39B8F] bg-[#1A1714] px-4 py-3 rounded-lg border border-[#2E2A25]">
                                            <Check className="w-5 h-5 text-[#C9A96E] mr-3 shrink-0" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Fast Facts / Details */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-serif text-[#C9A96E] mb-6 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-[#C9A96E]"></span> Property Details
                            </h2>
                            <div className="bg-[#1A1714] border border-[#2E2A25] rounded-xl overflow-hidden">
                                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#2E2A25]">
                                    <div className="p-5 flex justify-between items-center bg-[#0D0B09]/50">
                                        <span className="text-[#7A7268] text-sm">Property ID</span>
                                        <span className="text-[#F5F0E8] font-medium text-sm">{property.id.slice(-6).toUpperCase()}</span>
                                    </div>
                                    <div className="p-5 flex justify-between items-center">
                                        <span className="text-[#7A7268] text-sm">Location</span>
                                        <span className="text-[#F5F0E8] font-medium text-sm">{property.locality}</span>
                                    </div>
                                    <div className="p-5 flex justify-between items-center">
                                        <span className="text-[#7A7268] text-sm">City</span>
                                        <span className="text-[#F5F0E8] font-medium text-sm">{property.city}</span>
                                    </div>
                                    <div className="p-5 flex justify-between items-center bg-[#0D0B09]/50">
                                        <span className="text-[#7A7268] text-sm">Category</span>
                                        <span className="text-[#F5F0E8] font-medium text-sm">{property.type}</span>
                                    </div>
                                    {property.nriFriendly && (
                                        <div className="p-5 sm:col-span-2 flex justify-between items-center sm:border-t border-[#2E2A25]">
                                            <span className="text-[#7A7268] text-sm">Special Considerations</span>
                                            <span className="text-[#10B981] font-medium text-sm flex items-center gap-1.5 bg-[#10B981]/10 px-2.5 py-1 rounded">
                                                <CheckCircle2 className="w-4 h-4" /> NRI Compliant
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column - Sticky Contact Card */}
                    <div className="w-full lg:w-[35%] xl:w-[30%] order-1 lg:order-2">
                        <div className="sticky top-32">
                            <div className="bg-[#1A1714] border border-[#C9A96E]/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                                {/* Decor */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A96E]/5 rounded-bl-full -mr-10 -mt-10 pointer-events-none"></div>

                                <div className="mb-6">
                                    <h3 className="text-xl font-serif text-[#F5F0E8] mb-1">Interested in this property?</h3>
                                    <p className="text-[#8B847A] text-sm">Connect with our advisory team directly.</p>
                                </div>

                                <div className="text-3xl font-serif text-[#C9A96E] mb-6">
                                    {property.priceDisplay}
                                </div>

                                <div className="space-y-4">
                                    {/* Primary CTA - WhatsApp */}
                                    <button
                                        onClick={handleWhatsAppClick}
                                        className="w-full relative overflow-hidden group bg-[#25D366] text-[#FFFFFF] py-4 rounded-xl flex items-center justify-center font-bold text-sm uppercase tracking-wider transition-all hover:bg-[#1EBE5A] hover:shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                                    >
                                        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none"></span>
                                        {/* Simple WhatsApp core icon SVG */}
                                        <svg className="w-5 h-5 mr-3 shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        WhatsApp Enquiry
                                        <ArrowUpRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                                    </button>

                                    {/* Secondary CTA */}
                                    <a href={`tel:${DISPLAY_NUMBER}`} className="w-full relative group border border-[#C9A96E] text-[#C9A96E] py-4 rounded-xl flex items-center justify-center font-bold text-sm uppercase tracking-wider transition-colors hover:bg-[#C9A96E] hover:text-[#0D0B09]">
                                        <Phone className="w-4 h-4 mr-3 shrink-0" />
                                        Request Callback
                                    </a>
                                </div>

                                <div className="mt-8 pt-6 border-t border-[#2E2A25]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full border border-[#C9A96E] flex items-center justify-center shrink-0">
                                            <span className="font-serif text-xl text-[#C9A96E]">AR</span>
                                        </div>
                                        <div>
                                            <p className="font-serif text-[#F5F0E8] leading-tight">Aurevon Advisors</p>
                                            <p className="text-[#8B847A] text-xs mt-0.5">RERA Reg: P52100000000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
