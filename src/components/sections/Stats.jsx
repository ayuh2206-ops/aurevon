'use client';

import { useEffect, useState } from 'react';
import { getContentSettings } from '@/lib/firebaseUtils';
import { DEFAULT_CONTENT_SETTINGS } from '@/lib/realEstate';

export default function Stats() {
    const [settings, setSettings] = useState(DEFAULT_CONTENT_SETTINGS);

    useEffect(() => {
        getContentSettings().then(setSettings).catch(() => {});
    }, []);

    const stats = [
        { num: settings.statsPropertiesSold || DEFAULT_CONTENT_SETTINGS.statsPropertiesSold, label: 'Successful Deals' },
        { num: settings.statsYearsTrust || DEFAULT_CONTENT_SETTINGS.statsYearsTrust, label: 'Years Experience' },
        { num: settings.statsLitigations || DEFAULT_CONTENT_SETTINGS.statsLitigations, label: 'Disputes' },
        { num: settings.statsReraCompliant || DEFAULT_CONTENT_SETTINGS.statsReraCompliant, label: 'Compliance Status' },
    ];

    return (
        <section className="overflow-hidden border-y border-[#2E2A25] bg-[#0D0B09]">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-[1px] bg-[#2E2A25] lg:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col justify-center bg-[#0D0B09] p-6 text-center sm:p-8 md:p-12">
                        <p className="mb-2 font-serif text-3xl text-[#C9A96E] sm:text-4xl md:text-5xl lg:text-6xl">{stat.num}</p>
                        <p className="font-sans text-[10px] uppercase tracking-[0.1em] text-[#F5F0E8] sm:text-[11px] sm:tracking-[0.15em] md:text-xs">{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
