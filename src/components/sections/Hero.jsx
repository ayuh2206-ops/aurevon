'use client';
import { useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import { getContentSettings } from '@/lib/firebaseUtils';
import { DEFAULT_CONTENT_SETTINGS } from '@/lib/realEstate';

export default function Hero({ isLoaded }) {
    const [settings, setSettings] = useState(DEFAULT_CONTENT_SETTINGS);
    const t = `transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`;

    useEffect(() => {
        getContentSettings().then(setSettings).catch(() => {});
    }, []);

    return (
        <section className="relative z-50 min-h-screen w-full flex flex-col pt-32 pb-8 bg-[#0D0B09]">
            {/* Background Image */}
            <img
                src={settings.heroImage || DEFAULT_CONTENT_SETTINGS.heroImage}
                alt=""
                role="presentation"
                fetchPriority="high"
                className="absolute inset-0 w-full h-full object-cover opacity-[0.65] mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B09] via-[#0D0B09]/50 to-transparent" />

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full flex-1 flex flex-col justify-center pb-8">
                <div className="max-w-3xl">
                    <span className={`block font-sans text-xs md:text-sm text-[#C9A96E] uppercase tracking-[0.2em] mb-4 ${t} delay-100`}>
                        Pune&apos;s Most Trusted Real Estate Partner Since 2001
                    </span>
                    <h1 className={`font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[110px] leading-[1.05] text-[#F5F0E8] font-light mb-6 ${t} delay-200`}>
                        {settings.heroTitle || DEFAULT_CONTENT_SETTINGS.heroTitle}
                    </h1>
                    <p className={`font-sans text-[#F5F0E8]/80 max-w-lg text-sm md:text-base leading-relaxed mb-10 ${t} delay-300`}>
                        {settings.heroSubtitle || DEFAULT_CONTENT_SETTINGS.heroSubtitle}
                    </p>
                    <div className={`flex flex-col sm:flex-row gap-4 mb-8 ${t} delay-[400ms]`}>
                        <a href="/listings" className="bg-[#C9A96E] text-[#0D0B09] px-8 py-3.5 font-sans text-xs uppercase tracking-widest hover:bg-[#F5F0E8] transition-colors shadow-lg shadow-[#C9A96E]/20 text-center">
                            Explore Properties
                        </a>
                        <a href="#nri-desk" className="border border-[#C9A96E] text-[#C9A96E] px-8 py-3.5 font-sans text-xs uppercase tracking-widest hover:bg-[#C9A96E] hover:text-[#0D0B09] transition-colors text-center">
                            NRI Investment Desk
                        </a>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div id="home-search" className={`relative z-20 w-full mb-8 ${t} delay-[500ms]`}>
                <SearchBar />
            </div>

            {/* EST. 2001 */}
            <div className={`absolute top-[40%] right-8 transform rotate-90 origin-right hidden xl:block ${t} delay-[600ms]`}>
                <span className="font-sans text-[10px] text-[#C9A96E] uppercase tracking-[0.3em]">EST. 2001</span>
            </div>

            {/* Scroll Indicator */}
            <div className={`relative z-10 flex flex-col items-center mt-auto pb-4 ${t} delay-[700ms]`}>
                <div className="w-[1px] h-12 md:h-16 bg-[#2E2A25] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-[#C9A96E] animate-scroll-down"></div>
                </div>
                <span className="font-sans text-[9px] text-[#C9A96E] uppercase tracking-widest mt-3">Scroll</span>
            </div>
        </section>
    );
}
