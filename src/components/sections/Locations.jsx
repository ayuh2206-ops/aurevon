'use client';
import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { cities } from '@/lib/data';

export default function Locations() {
    const [activeCity, setActiveCity] = useState('PUNE');

    return (
        <section className="py-24 bg-[#0D0B09] border-t border-[#2E2A25]">
            <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16">
                <div className="lg:w-1/3">
                    <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F5F0E8] mb-8 md:mb-12">Our Markets</h2>
                    <div className="flex flex-row overflow-x-auto lg:flex-col items-start gap-6 lg:gap-6 pb-4 lg:pb-0 scrollbar-hide border-b border-[#2E2A25] lg:border-none">
                        {Object.keys(cities).map(city => (
                            <button
                                key={city}
                                onClick={() => setActiveCity(city)}
                                className={`font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl transition-colors duration-300 whitespace-nowrap cursor-pointer ${activeCity === city ? 'text-[#C9A96E]' : 'text-[#F5F0E8]/30 hover:text-[#F5F0E8]/60'}`}
                            >
                                {city}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="lg:w-2/3 flex items-center">
                    <div className="bg-[#1A1714] border border-[#2E2A25] p-10 md:p-16 w-full">
                        <h3 className="font-sans text-[#C9A96E] uppercase tracking-widest text-sm mb-6 flex items-center">
                            <MapPin className="w-4 h-4 mr-2" /> Prime Locations in {activeCity}
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {cities[activeCity].map(area => (
                                <span key={area} className="px-4 py-2 border border-[#2E2A25] text-[#F5F0E8] font-sans text-sm rounded-full bg-[#0D0B09]/50">
                                    {area}
                                </span>
                            ))}
                        </div>
                        <p className="mt-10 font-sans text-[#7A7268] text-sm">
                            Extensive network and exclusive listings across {cities[activeCity].length}+ high-growth micro-markets.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
