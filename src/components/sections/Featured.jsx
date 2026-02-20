'use client';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Globe } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

function PropertyCard({ property }) {
    const handleWhatsApp = (e) => {
        e.preventDefault();
        const message = `Hi Arun, I'm interested in the following commercial property listed on Aurevon Realty:\n\n🏢 *${property.name}*\n📍 ${property.locality}, ${property.city}\n📐 ${property.sqft} sqft\n💰 ${property.priceDisplay}\n📈 Yield: ${property.yield || 'N/A'}\n✅ ${property.status}\n🔖 Listing ID: ${property.id}\n\nCould you please share more details?`;
        window.open(`https://wa.me/${SITE_CONFIG.ARUN_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="group cursor-pointer bg-white rounded flex flex-col overflow-hidden border border-[#D9D0C0] hover:border-[#C9A96E] transition-colors duration-300">
            <Link href={`/properties/${property.id}`} className="relative aspect-[4/5] overflow-hidden block">
                <img src={property.image} alt={property.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 w-full">
                    <h3 className="font-serif text-2xl text-[#F5F0E8] leading-tight mb-1">{property.name}</h3>
                    <p className="font-sans text-[11px] text-[#C9A96E] uppercase tracking-wider">{property.locality}</p>
                </div>
                <div className="absolute top-4 left-4">
                    <span className="bg-[#8B4A2F] text-[#F5F0E8] font-sans text-[10px] uppercase px-3 py-1 rounded-full tracking-wider">
                        {property.subtype}
                    </span>
                </div>
                {property.nriFriendly && (
                    <div className="absolute top-4 right-4">
                        <span className="bg-[#0D0B09]/80 backdrop-blur text-[#C9A96E] border border-[#C9A96E] font-sans text-[10px] uppercase px-3 py-1 rounded-full tracking-wider flex items-center">
                            <Globe className="w-3 h-3 mr-1" /> NRI Pick
                        </span>
                    </div>
                )}
            </Link>
            <div className="p-5 flex flex-col flex-1 bg-[#F5F0E8]">
                <div className="text-2xl font-serif text-[#1A1714] mb-4">{property.priceDisplay}</div>
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="border border-[#D9D0C0] px-2 py-1 text-[11px] font-sans text-[#7A7268] rounded">{property.subtype}</span>
                    <span className="border border-[#D9D0C0] px-2 py-1 text-[11px] font-sans text-[#7A7268] rounded">{property.sqft} sqft</span>
                    <span className="border border-[#D9D0C0] px-2 py-1 text-[11px] font-sans text-[#7A7268] rounded">{property.status}</span>
                    {property.yield && <span className="border border-[#C9A96E] px-2 py-1 text-[11px] font-sans text-[#C9A96E] rounded">📈 {property.yield}</span>}
                </div>
                <div className="mt-auto pt-4 border-t border-[#D9D0C0]">
                    <button
                        onClick={handleWhatsApp}
                        className="w-full flex justify-between items-center text-sm font-sans text-[#1A1714] group-hover:text-[#C9A96E] transition-colors cursor-pointer"
                    >
                        <span className="flex items-center"><MessageCircle className="w-4 h-4 mr-2" /> Enquire on WhatsApp</span>
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Featured({ properties }) {
    return (
        <section id="properties" className="py-24 bg-[#F5F0E8]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <span className="block font-sans text-xs text-[#C9A96E] uppercase tracking-[0.2em] mb-4">Commercial Portfolio</span>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1714]">Spaces That<br />Drive Business</h2>
                    </div>
                    <a href="#" className="mt-6 md:mt-0 font-sans text-[13px] text-[#8B4A2F] uppercase tracking-wider flex items-center hover:text-[#C9A96E] transition-colors">
                        View All Properties <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.filter(p => p.featured).slice(0, 6).map((prop) => (
                        <PropertyCard key={prop.id} property={prop} />
                    ))}
                </div>
            </div>
        </section>
    );
}
