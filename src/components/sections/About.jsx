'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { BUSINESS } from '@/lib/config';
import { DEFAULT_CONTENT_SETTINGS } from '@/lib/realEstate';
import { getContentSettings } from '@/lib/firebaseUtils';

export default function About({ standalone = false }) {
    const [settings, setSettings] = useState(DEFAULT_CONTENT_SETTINGS);

    useEffect(() => {
        getContentSettings().then(setSettings).catch(() => {});
    }, []);

    const paragraphs = String(settings.aboutText || DEFAULT_CONTENT_SETTINGS.aboutText)
        .split(/\n\s*\n/)
        .filter(Boolean);

    return (
        <section id="about" className={`${standalone ? 'pt-36' : 'py-24'} bg-[#0D0B09]`}>
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
                <div className="relative">
                    <div className="relative z-10 mx-auto aspect-[3/4] max-w-md border border-[#C9A96E]/30 p-2">
                        <img
                            src={settings.founderPhoto || "/images/arun-dongare.png"}
                            alt={`${settings.founderName || BUSINESS.founderName} - Founder`}
                            className="h-full w-full object-cover object-top"
                            loading="lazy"
                        />
                    </div>
                    <div className="absolute -left-4 top-12 z-0 hidden h-[1px] w-24 bg-[#C9A96E] md:block" />
                    <div className="absolute -bottom-6 right-12 z-20 border border-[#2E2A25] bg-[#0D0B09] px-4 py-2 font-sans text-[10px] uppercase tracking-widest text-[#C9A96E]">
                        {settings.founderTitle || 'Founder & Principal Broker'}
                    </div>
                </div>

                <div>
                    <span className="mb-4 block font-sans text-xs uppercase tracking-[0.2em] text-[#C9A96E]">Meet The Principal</span>
                    <h2 className="mb-2 font-serif text-5xl text-[#F5F0E8] md:text-6xl">{settings.founderName || BUSINESS.founderName}</h2>
                    <h3 className="mb-8 font-serif text-2xl italic text-[#7A7268]">{settings.founderTitle || '25 Years of Real Estate Mastery'}</h3>

                    <div className="mb-10 space-y-6 text-base leading-relaxed text-[#F5F0E8]/70" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>

                    <div className="mb-10 flex flex-col gap-4 sm:flex-row">
                        {['RERA Registered', 'Verified Listings', 'NRI Specialist'].map((badge) => (
                            <div key={badge} className="flex items-center space-x-2 rounded border border-[#2E2A25] bg-[#1A1714] px-4 py-2">
                                <ShieldCheck className="h-4 w-4 text-[#C9A96E]" />
                                <span className="font-sans text-xs tracking-wider text-[#F5F0E8]">{badge}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-5">
                        <Link
                            href="/contact"
                            className="inline-flex items-center font-sans text-sm uppercase tracking-wider text-[#C9A96E] transition-colors hover:text-[#F5F0E8] group"
                        >
                            Begin Consultation <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                        </Link>
                        {BUSINESS.socialLinks.linkedin && (
                            <a
                                href={BUSINESS.socialLinks.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center font-sans text-sm uppercase tracking-wider text-[#7A7268] transition-colors hover:text-[#C9A96E] group"
                            >
                                LinkedIn <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                            </a>
                        )}
                        {BUSINESS.socialLinks.instagram && (
                            <a
                                href={BUSINESS.socialLinks.instagram}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center font-sans text-sm uppercase tracking-wider text-[#7A7268] transition-colors hover:text-[#C9A96E] group"
                            >
                                Instagram <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
