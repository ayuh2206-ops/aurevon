'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Building2, FileText, MessageCircle, Plus, Settings } from 'lucide-react';
import { getArticles, getLeads, getProperties } from '@/lib/firebaseUtils';

export default function AdminDashboardPage() {
    const [properties, setProperties] = useState([]);
    const [leads, setLeads] = useState([]);
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            getProperties({ includeSample: false }),
            getLeads(),
            getArticles({ includeSamples: false }),
        ]).then(([propertyData, leadData, articleData]) => {
            setProperties(propertyData);
            setLeads(leadData);
            setArticles(articleData);
        }).catch(console.error).finally(() => setIsLoading(false));
    }, []);

    const cards = useMemo(() => [
        { label: 'Total Properties', value: properties.length, icon: Building2, color: '#C9A96E' },
        { label: 'Published Listings', value: properties.filter((property) => property.status === 'Published').length, icon: ArrowUpRight, color: '#25D366' },
        { label: 'New Leads', value: leads.filter((lead) => (lead.status || 'New') === 'New').length, icon: MessageCircle, color: '#8B4A2F' },
        { label: 'Journal Articles', value: articles.length, icon: FileText, color: '#C9A96E' },
    ], [articles, leads, properties]);

    const recentLeads = leads.slice(0, 5);

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#C9A96E] border-t-transparent" />
            </div>
        );
    }

    return (
        <div>
            <h2 className="mb-8 font-serif text-3xl text-[#1A1714]">Dashboard Overview</h2>

            <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map((card) => (
                    <div key={card.label} className="rounded border border-[#D9D0C0] bg-white p-6">
                        <div className="mb-4 flex items-start justify-between">
                            <card.icon className="h-6 w-6" style={{ color: card.color }} />
                        </div>
                        <p className="mb-1 font-serif text-3xl text-[#1A1714]">{card.value}</p>
                        <p className="font-sans text-xs uppercase tracking-wider text-[#7A7268]">{card.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_360px]">
                <div className="rounded border border-[#D9D0C0] bg-white p-6 md:p-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="font-serif text-xl text-[#1A1714]">Recent Leads</h3>
                        <Link href="/admin/dashboard/enquiries" className="font-sans text-xs uppercase tracking-wider text-[#8B4A2F] hover:text-[#C9A96E]">Review Leads</Link>
                    </div>
                    {recentLeads.length ? (
                        <div className="space-y-3">
                            {recentLeads.map((lead) => (
                                <div key={lead.id} className="flex flex-col gap-2 border-b border-[#D9D0C0] pb-3 last:border-b-0 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <p className="font-sans text-sm font-medium text-[#1A1714]">{lead.name || 'Unnamed Lead'}</p>
                                        <p className="font-sans text-xs text-[#7A7268]">{lead.propertyTitle || lead.source} - {lead.phone || 'No phone'}</p>
                                    </div>
                                    <div className="text-left md:text-right">
                                        <span className="rounded-full bg-[#C9A96E]/10 px-2 py-1 font-sans text-[10px] uppercase tracking-wider text-[#8B4A2F]">{lead.status || 'New'}</span>
                                        <p className="mt-1 font-sans text-[11px] text-[#7A7268]">{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('en-IN') : ''}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="font-sans text-sm text-[#7A7268]">No leads yet.</p>
                    )}
                </div>

                <div className="rounded border border-[#D9D0C0] bg-white p-6 md:p-8">
                    <h3 className="mb-4 font-serif text-xl text-[#1A1714]">Quick Actions</h3>
                    <div className="space-y-3">
                        {[
                            { href: '/admin/dashboard/properties/new', label: 'Add New Property', icon: Plus },
                            { href: '/admin/dashboard/blogs', label: 'Write Journal Article', icon: FileText },
                            { href: '/admin/dashboard/enquiries', label: 'Review Leads', icon: MessageCircle },
                            { href: '/admin/dashboard/settings', label: 'Edit Site Content', icon: Settings },
                        ].map((action) => (
                            <Link key={action.href} href={action.href} className="flex items-center justify-between rounded border border-[#D9D0C0] px-4 py-3 font-sans text-sm text-[#1A1714] transition-colors hover:border-[#C9A96E]">
                                <span className="flex items-center gap-3"><action.icon className="h-4 w-4 text-[#C9A96E]" /> {action.label}</span>
                                <ArrowUpRight className="h-4 w-4 text-[#7A7268]" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
