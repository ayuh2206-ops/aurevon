'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft, MessageCircle, MapPin, Building2, Maximize2, TrendingUp,
    Calendar, Shield, Car, Layers, Compass, CheckCircle2, Globe, Share2, Heart
} from 'lucide-react';
import { initialProperties } from '@/lib/data';
import { SITE_CONFIG } from '@/lib/config';

export default function PropertyDetailPage() {
    const params = useParams();
    const [property, setProperty] = useState(null);
    const [activeImage, setActiveImage] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check localStorage first (for admin-added properties), then fall back to initialProperties
        const stored = typeof window !== 'undefined' ? localStorage.getItem('aurevon_properties') : null;
        const allProperties = stored ? [...JSON.parse(stored), ...initialProperties] : initialProperties;
        const found = allProperties.find(p => p.id === params.id);
        setProperty(found || null);
        setLoading(false);
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0D0B09] flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-[#0D0B09] flex flex-col items-center justify-center text-center px-6">
                <h1 className="font-serif text-4xl text-[#F5F0E8] mb-4">Property Not Found</h1>
                <p className="font-sans text-[#7A7268] mb-8">The listing you're looking for doesn't exist or has been removed.</p>
                <Link href="/#properties" className="bg-[#C9A96E] text-[#0D0B09] px-8 py-3 font-sans text-xs uppercase tracking-widest hover:bg-[#F5F0E8] transition-colors">
                    Browse All Properties
                </Link>
            </div>
        );
    }

    const whatsappMessage = `Hi Arun, I'm interested in the following commercial property listed on Aurevon Realty:\n\n🏢 *${property.name}*\n📍 ${property.locality}, ${property.city}\n📐 ${property.sqft} sqft\n💰 ${property.priceDisplay}\n📈 Yield: ${property.yield || 'N/A'}\n✅ ${property.status}\n🔖 Listing ID: ${property.id}\n\nI found this listing on your website and would like to know more. Could you please share:\n— Floor plans & specifications\n— Payment schedule\n— Site visit availability\n\nThank you!`;

    const whatsappUrl = `https://wa.me/${SITE_CONFIG.ARUN_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

    const gallery = property.gallery || [property.image];
    const amenities = property.amenities || [];
    const highlights = property.highlights || [];

    return (
        <div className="min-h-screen bg-[#F5F0E8]">
            {/* Sticky Header */}
            <div className="sticky top-0 z-50 bg-[#0D0B09]/95 backdrop-blur-lg border-b border-[#2E2A25]">
                <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">
                    <Link href="/#properties" className="flex items-center text-[#C9A96E] hover:text-[#F5F0E8] transition-colors text-sm font-sans">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Listings
                    </Link>
                    <div className="hidden md:block text-center">
                        <span className="font-serif text-[#F5F0E8] text-sm">{property.name}</span>
                        <span className="text-[#7A7268] mx-2">·</span>
                        <span className="text-[#C9A96E] text-sm font-sans">{property.id}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="w-9 h-9 rounded-full bg-[#2E2A25] flex items-center justify-center text-[#7A7268] hover:text-[#C9A96E] transition-colors cursor-pointer" title="Share">
                            <Share2 className="w-4 h-4" />
                        </button>
                        <button className="w-9 h-9 rounded-full bg-[#2E2A25] flex items-center justify-center text-[#7A7268] hover:text-red-400 transition-colors cursor-pointer" title="Save">
                            <Heart className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Hero Image Gallery */}
            <div className="bg-[#0D0B09]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
                        {/* Main Image */}
                        <div className="md:col-span-3 relative aspect-[16/9] md:aspect-[16/10] overflow-hidden cursor-pointer" onClick={() => setActiveImage(0)}>
                            <img
                                src={gallery[activeImage]}
                                alt={property.name}
                                className="w-full h-full object-cover transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6">
                                <span className="bg-[#8B4A2F] text-[#F5F0E8] font-sans text-[10px] uppercase px-3 py-1 rounded-full tracking-wider">
                                    {property.subtype}
                                </span>
                                {property.nriFriendly && (
                                    <span className="ml-2 bg-[#0D0B09]/80 backdrop-blur text-[#C9A96E] border border-[#C9A96E] font-sans text-[10px] uppercase px-3 py-1 rounded-full tracking-wider">
                                        <Globe className="w-3 h-3 inline mr-1" /> NRI Pick
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* Thumbnails */}
                        <div className="hidden md:flex md:flex-col gap-1">
                            {gallery.slice(1, 4).map((img, i) => (
                                <div
                                    key={i}
                                    className={`relative aspect-[4/3] overflow-hidden cursor-pointer group ${activeImage === i + 1 ? 'ring-2 ring-[#C9A96E]' : ''}`}
                                    onClick={() => setActiveImage(i + 1)}
                                >
                                    <img src={img} alt={`View ${i + 2}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                    {i === 2 && gallery.length > 4 && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <span className="text-white font-sans text-sm">+{gallery.length - 4} more</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Mobile thumbnail strip */}
                    <div className="flex md:hidden gap-2 p-3 overflow-x-auto">
                        {gallery.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveImage(i)}
                                className={`shrink-0 w-16 h-12 rounded overflow-hidden border-2 cursor-pointer ${activeImage === i ? 'border-[#C9A96E]' : 'border-transparent opacity-60'}`}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column — Property Details */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Title Block */}
                        <div>
                            <div className="flex items-center gap-2 text-[#7A7268] font-sans text-sm mb-3">
                                <MapPin className="w-4 h-4 text-[#C9A96E]" />
                                {property.locality}, {property.city}
                                <span className="mx-1">·</span>
                                <span className="text-[#C9A96E]">{property.status}</span>
                            </div>
                            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1714] leading-tight mb-4">{property.name}</h1>
                            <p className="font-sans text-lg text-[#7A7268] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                                {property.shortDescription}
                            </p>
                        </div>

                        {/* Key Metrics Strip */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: Building2, label: 'Type', value: property.subtype },
                                { icon: Maximize2, label: 'Area', value: `${property.sqft} sqft` },
                                { icon: TrendingUp, label: 'Yield', value: property.yield || 'N/A' },
                                { icon: Calendar, label: 'Possession', value: property.possession || property.status },
                            ].map((m, i) => (
                                <div key={i} className="bg-white p-5 border border-[#D9D0C0] text-center">
                                    <m.icon className="w-5 h-5 text-[#C9A96E] mx-auto mb-2" strokeWidth={1.5} />
                                    <p className="font-sans text-[10px] uppercase tracking-wider text-[#7A7268] mb-1">{m.label}</p>
                                    <p className="font-serif text-lg text-[#1A1714]">{m.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Highlights */}
                        {highlights.length > 0 && (
                            <div className="flex flex-wrap gap-3">
                                {highlights.map((h, i) => (
                                    <span key={i} className="flex items-center gap-1.5 bg-[#C9A96E]/10 border border-[#C9A96E]/30 px-4 py-2 rounded-full font-sans text-sm text-[#1A1714]">
                                        <CheckCircle2 className="w-4 h-4 text-[#C9A96E]" /> {h}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Full Description */}
                        <div>
                            <h2 className="font-serif text-2xl text-[#1A1714] mb-4">About This Property</h2>
                            <p className="font-sans text-base text-[#7A7268] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                                {property.fullDescription || property.shortDescription}
                            </p>
                        </div>

                        {/* Specifications Table */}
                        <div>
                            <h2 className="font-serif text-2xl text-[#1A1714] mb-4">Specifications</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#D9D0C0] border border-[#D9D0C0] overflow-hidden rounded">
                                {[
                                    { label: 'Property Type', value: property.subtype, icon: Building2 },
                                    { label: 'Area Range', value: `${property.sqft} sqft`, icon: Maximize2 },
                                    { label: 'Price Range', value: property.priceDisplay, icon: TrendingUp },
                                    { label: 'Price per sqft', value: property.pricePerSqft || '—', icon: Layers },
                                    { label: 'Floors', value: property.floor || '—', icon: Building2 },
                                    { label: 'Facing', value: property.facing || '—', icon: Compass },
                                    { label: 'Parking', value: property.parking || '—', icon: Car },
                                    { label: 'Furnishing', value: property.furnishing || '—', icon: Layers },
                                    { label: 'Construction', value: property.constructionStatus || property.status, icon: Calendar },
                                    { label: 'Possession', value: property.possession || '—', icon: Calendar },
                                    { label: 'Maintenance', value: property.maintenanceCharge || '—', icon: Shield },
                                    { label: 'RERA ID', value: property.reraId || '—', icon: Shield },
                                ].map((spec, i) => (
                                    <div key={i} className="bg-white p-4 flex items-center gap-3">
                                        <spec.icon className="w-4 h-4 text-[#C9A96E] shrink-0" strokeWidth={1.5} />
                                        <div>
                                            <p className="font-sans text-[10px] uppercase tracking-wider text-[#7A7268]">{spec.label}</p>
                                            <p className="font-sans text-sm text-[#1A1714] font-medium">{spec.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Amenities */}
                        {amenities.length > 0 && (
                            <div>
                                <h2 className="font-serif text-2xl text-[#1A1714] mb-4">Amenities & Features</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {amenities.map((a, i) => (
                                        <div key={i} className="flex items-center gap-2 bg-white p-3 border border-[#D9D0C0] rounded">
                                            <CheckCircle2 className="w-4 h-4 text-[#C9A96E] shrink-0" />
                                            <span className="font-sans text-sm text-[#1A1714]">{a}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column — Sticky CTA Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Price Card */}
                            <div className="bg-white border border-[#D9D0C0] p-8 rounded shadow-sm">
                                <p className="font-sans text-[10px] uppercase tracking-wider text-[#7A7268] mb-1">Starting From</p>
                                <p className="font-serif text-4xl text-[#1A1714] mb-1">{property.priceDisplay}</p>
                                {property.pricePerSqft && (
                                    <p className="font-sans text-sm text-[#C9A96E] mb-6">{property.pricePerSqft}</p>
                                )}

                                {property.yield && (
                                    <div className="flex items-center gap-2 bg-[#C9A96E]/10 border border-[#C9A96E]/30 rounded p-3 mb-6">
                                        <TrendingUp className="w-5 h-5 text-[#C9A96E]" />
                                        <div>
                                            <p className="font-sans text-xs text-[#7A7268]">Expected Yield</p>
                                            <p className="font-serif text-xl text-[#1A1714]">{property.yield}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Primary CTA — WhatsApp Enquiry */}
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded font-sans text-sm uppercase tracking-wider hover:bg-[#20bd5a] transition-colors shadow-lg shadow-[#25D366]/20"
                                >
                                    <MessageCircle className="w-5 h-5" fill="currentColor" />
                                    Enquire Now on WhatsApp
                                </a>

                                <p className="text-center font-sans text-[10px] text-[#7A7268] mt-3">
                                    Pre-filled message • Instant reply within 2 hours
                                </p>

                                {/* Secondary CTA */}
                                <a
                                    href="tel:+919767446655"
                                    className="w-full flex items-center justify-center gap-2 border border-[#D9D0C0] text-[#1A1714] py-3 rounded font-sans text-sm uppercase tracking-wider hover:border-[#C9A96E] transition-colors mt-4"
                                >
                                    Call +91 9767 446 655
                                </a>
                            </div>

                            {/* Trust Badges */}
                            <div className="bg-[#0D0B09] p-6 rounded border border-[#2E2A25]">
                                <div className="space-y-4">
                                    {[
                                        { label: 'RERA Registered', sub: property.reraId || 'Verified' },
                                        { label: '25+ Years Experience', sub: 'Since 2001' },
                                        { label: '1,000+ Deals Closed', sub: 'Pan-India' },
                                    ].map((badge, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <Shield className="w-5 h-5 text-[#C9A96E] shrink-0" />
                                            <div>
                                                <p className="font-sans text-sm text-[#F5F0E8]">{badge.label}</p>
                                                <p className="font-sans text-[10px] text-[#7A7268]">{badge.sub}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Listing ID */}
                            <p className="text-center font-sans text-[10px] text-[#7A7268] uppercase tracking-wider">
                                Listing ID: {property.id}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Sticky CTA (Mobile) */}
            <div className="fixed bottom-0 left-0 right-0 bg-[#0D0B09]/95 backdrop-blur-lg border-t border-[#2E2A25] p-4 flex items-center justify-between gap-4 lg:hidden z-50">
                <div>
                    <p className="font-serif text-xl text-[#F5F0E8]">{property.priceDisplay}</p>
                    <p className="font-sans text-[10px] text-[#7A7268]">{property.sqft} sqft · {property.yield || 'N/A'} yield</p>
                </div>
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded font-sans text-sm uppercase tracking-wider hover:bg-[#20bd5a] transition-colors shrink-0"
                >
                    <MessageCircle className="w-4 h-4" fill="currentColor" />
                    Enquire Now
                </a>
            </div>
        </div>
    );
}
