'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { DEFAULT_SITE_OPTIONS } from '@/lib/realEstate';
import { getSiteOptions } from '@/lib/firebaseUtils';

export default function Locations() {
    const [options, setOptions] = useState(DEFAULT_SITE_OPTIONS);
    const [activeZone, setActiveZone] = useState(DEFAULT_SITE_OPTIONS.zoneOptions[0]);

    useEffect(() => {
        getSiteOptions().then((data) => {
            setOptions(data);
            setActiveZone(data.zoneOptions?.[0] || DEFAULT_SITE_OPTIONS.zoneOptions[0]);
        }).catch(() => {});
    }, []);

    const zones = options.zoneOptions || DEFAULT_SITE_OPTIONS.zoneOptions;
    const localityGroups = useMemo(() => {
        return (options.localities || []).reduce((acc, locality) => {
            const zone = options.localityZones?.[locality] || 'Other';
            acc[zone] = [...(acc[zone] || []), locality];
            return acc;
        }, {});
    }, [options]);

    const activeLocalities = localityGroups[activeZone] || options.featuredLocalities || [];

    return (
        <section className="border-t border-[#2E2A25] bg-[#0D0B09] py-24">
            <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 lg:flex-row">
                <div className="lg:w-1/3">
                    <h2 className="mb-8 font-serif text-4xl text-[#F5F0E8] sm:text-5xl md:mb-12 md:text-6xl">Our Markets</h2>
                    <div className="flex flex-row items-start gap-6 overflow-x-auto border-b border-[#2E2A25] pb-4 scrollbar-hide lg:flex-col lg:border-none lg:pb-0">
                        {zones.map((zone) => (
                            <button
                                key={zone}
                                onClick={() => setActiveZone(zone)}
                                className={`whitespace-nowrap font-serif text-2xl transition-colors duration-300 sm:text-3xl md:text-4xl lg:text-5xl ${activeZone === zone ? 'text-[#C9A96E]' : 'text-[#F5F0E8]/30 hover:text-[#F5F0E8]/60'}`}
                            >
                                {zone}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center lg:w-2/3">
                    <div className="w-full border border-[#2E2A25] bg-[#1A1714] p-10 md:p-16">
                        <h3 className="mb-6 flex items-center font-sans text-sm uppercase tracking-widest text-[#C9A96E]">
                            <MapPin className="mr-2 h-4 w-4" /> Featured localities in {activeZone}
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {activeLocalities.map((area) => (
                                <Link
                                    key={area}
                                    href={`/listings?locality=${encodeURIComponent(area)}`}
                                    className="rounded-full border border-[#2E2A25] bg-[#0D0B09]/50 px-4 py-2 font-sans text-sm text-[#F5F0E8] transition-colors hover:border-[#C9A96E] hover:text-[#C9A96E]"
                                >
                                    {area}
                                </Link>
                            ))}
                        </div>
                        <p className="mt-10 font-sans text-sm text-[#7A7268]">
                            Locality and zone lists are managed from the admin options panel and feed search, filters, property forms, and SEO discovery.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
