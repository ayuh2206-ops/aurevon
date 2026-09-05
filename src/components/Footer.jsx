'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { BUSINESS } from '@/lib/config';
import { getContentSettings } from '@/lib/firebaseUtils';
import { createWhatsAppUrl, getPrimaryWhatsapp } from '@/lib/realEstate';

const legalText = {
    privacy: {
        title: 'Privacy Policy',
        body: [
            'Aurevon Realty collects contact details, property preferences, enquiry context, authentication profile details, and website usage data only to respond to enquiries, manage saved properties, improve service quality, and comply with Indian real estate and data protection obligations.',
            'Form submissions may result in phone, email, SMS, or WhatsApp follow-up from the advisory team. Property details, pricing, images, and availability are subject to independent verification before transaction decisions.',
            'Data is retained only for the period needed for enquiry handling, transaction support, regulatory compliance, and legitimate business records. You may request correction, withdrawal, or deletion where applicable by contacting the office.',
        ],
    },
    terms: {
        title: 'Terms of Service',
        body: [
            'The website provides real estate discovery, advisory, and enquiry services. Listings are informational and do not constitute financial, legal, tax, or investment advice.',
            'Visitors must independently verify RERA registrations, title documents, pricing, availability, taxes, fees, and possession timelines before making commitments.',
            'By submitting a form, saving a listing, or contacting Aurevon through the website, you agree to provide accurate information and allow the team to contact you about the requested real estate service.',
        ],
    },
};

export default function Footer() {
    const pathname = usePathname();
    const [settings, setSettings] = useState(null);
    const [legalModal, setLegalModal] = useState(null);

    useEffect(() => {
        if (pathname?.startsWith('/admin')) return;
        getContentSettings().then(setSettings).catch(() => {});
    }, [pathname]);

    useEffect(() => {
        if (!legalModal) return undefined;
        const onKeyDown = (event) => {
            if (event.key === 'Escape') setLegalModal(null);
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [legalModal]);

    if (pathname?.startsWith('/admin')) return null;

    const merged = settings || {};
    const whatsapp = getPrimaryWhatsapp(merged);
    const socialLinks = [
        { label: 'LinkedIn', href: merged.linkedinUrl || BUSINESS.socialLinks.linkedin },
        { label: 'Instagram', href: merged.instagramUrl || BUSINESS.socialLinks.instagram },
        { label: 'Facebook', href: merged.facebookUrl },
        { label: 'YouTube', href: merged.youtubeUrl },
    ].filter((item) => item.href);
    const columns = [
        {
            title: 'Company',
            links: [
                { label: 'About', href: '/about' },
                { label: 'Journal', href: '/journal' },
                { label: 'Contact', href: '/contact' },
                { label: 'Saved Properties', href: '/saved' },
            ],
        },
        {
            title: 'Properties',
            links: [
                { label: 'Buy', href: '/listings?listingType=Sell' },
                { label: 'Rent', href: '/listings?listingType=Rent%2FLease' },
                { label: 'Commercial', href: '/listings?category=Commercial' },
                { label: 'Residential', href: '/listings?category=Residential' },
            ],
        },
        {
            title: 'Services',
            links: [
                { label: 'NRI Desk', href: '/#nri-desk' },
                { label: 'Documentation', href: '/about' },
                { label: 'Yield Analysis', href: '/#yield-calculator' },
                { label: 'Sell Property', href: '/#home-search' },
            ],
        },
    ];

    return (
        <footer className="border-t border-[#2E2A25] bg-[#0D0B09] pb-10 pt-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-16 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4">
                    <div className="sm:col-span-2 md:col-span-1">
                        <h2 className="mb-1 font-serif text-3xl leading-none text-[#C9A96E]">AUREVON</h2>
                        <p className="mb-6 font-sans text-[10px] tracking-[0.2em] text-[#F5F0E8]">REALTY PVT. LTD.</p>
                        <p className="mb-4 font-sans text-xs leading-relaxed text-[#7A7268]">
                            {merged.footerDescription || '25 years of trusted real estate advisory across Pune and high-growth Indian markets.'}
                        </p>
                        <p className="font-sans text-xs text-[#C9A96E]">{BUSINESS.licenseName}: {merged.contactRera || BUSINESS.licenseNumber}</p>
                    </div>

                    {columns.map((column) => (
                        <div key={column.title}>
                            <h4 className="mb-6 font-sans text-xs uppercase tracking-widest text-[#F5F0E8]">{column.title}</h4>
                            <ul className="space-y-3">
                                {column.links.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="font-sans text-sm text-[#7A7268] transition-colors hover:text-[#C9A96E]">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mb-8 grid grid-cols-1 gap-4 border-y border-[#2E2A25] py-6 font-sans text-sm text-[#7A7268] md:grid-cols-3">
                    <p>{merged.contactAddress || BUSINESS.officeAddress}</p>
                    <a href={`tel:${String(merged.contactPhone || BUSINESS.officePhone).replace(/\s/g, '')}`} className="transition-colors hover:text-[#C9A96E]">
                        {merged.contactPhone || BUSINESS.officePhone}
                    </a>
                    <a href={`mailto:${merged.contactEmail || BUSINESS.email}`} className="transition-colors hover:text-[#C9A96E]">
                        {merged.contactEmail || BUSINESS.email}
                    </a>
                </div>

                <div className="flex flex-col items-center justify-between gap-4 pt-2 md:flex-row">
                    <p className="font-sans text-xs text-[#7A7268]">
                        (c) {new Date().getFullYear()} {BUSINESS.businessName}. All rights reserved.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:justify-end">
                        <button onClick={() => setLegalModal('privacy')} className="font-sans text-xs uppercase tracking-wider text-[#7A7268] transition-colors hover:text-[#C9A96E]">
                            Privacy Policy
                        </button>
                        <button onClick={() => setLegalModal('terms')} className="font-sans text-xs uppercase tracking-wider text-[#7A7268] transition-colors hover:text-[#C9A96E]">
                            Terms
                        </button>
                        {socialLinks.map((link) => (
                            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="font-sans text-xs uppercase tracking-wider text-[#7A7268] transition-colors hover:text-[#C9A96E]">
                                {link.label}
                            </a>
                        ))}
                        <a
                            href={createWhatsAppUrl({ phone: whatsapp, message: 'I would like to know more about your properties.' })}
                            target="_blank"
                            rel="noreferrer"
                            className="font-sans text-xs uppercase tracking-wider text-[#7A7268] transition-colors hover:text-[#C9A96E]"
                        >
                            WhatsApp
                        </a>
                        <Link href="/admin" className="rounded border border-[#7A7268] px-2 py-0.5 font-sans text-[10px] uppercase tracking-wider text-[#7A7268] transition-colors hover:border-[#C9A96E] hover:text-[#C9A96E]">
                            Admin Login
                        </Link>
                    </div>
                </div>
            </div>

            {legalModal && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0D0B09]/75 px-4 backdrop-blur-sm" onClick={() => setLegalModal(null)}>
                    <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-[#2E2A25] bg-[#1A1714] p-8 shadow-2xl" onClick={(event) => event.stopPropagation()}>
                        <div className="mb-6 flex items-start justify-between gap-4">
                            <h3 className="font-serif text-3xl text-[#F5F0E8]">{legalText[legalModal].title}</h3>
                            <button onClick={() => setLegalModal(null)} className="rounded-full border border-[#2E2A25] p-2 text-[#7A7268] hover:text-[#C9A96E]" aria-label="Close legal modal">
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="space-y-4 font-sans text-sm leading-relaxed text-[#9E968E]">
                            {legalText[legalModal].body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                            <p className="border-t border-[#2E2A25] pt-4 text-xs text-[#7A7268]">
                                This template is adapted for Indian real estate operations and should be reviewed for each client, region, and launch context.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
}
