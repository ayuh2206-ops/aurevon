'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, Clock, MessageCircle, Search, User } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { getArticles, getContentSettings } from '@/lib/firebaseUtils';
import {
    DEFAULT_CONTENT_SETTINGS,
    createWhatsAppUrl,
    getPrimaryWhatsapp,
    getSampleArticles,
    trackConversion,
} from '@/lib/realEstate';

function formatDate(dateStr) {
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function ArticleCard({ article, featured = false }) {
    return (
        <Link
            href={`/journal/${article.slug}`}
            className={`group flex overflow-hidden border border-[#D9D0C0] bg-white transition-colors hover:border-[#C9A96E] ${featured ? 'flex-col lg:grid lg:grid-cols-2' : 'flex-col'}`}
        >
            {article.image && (
                <div className={`relative overflow-hidden ${featured ? 'aspect-[16/10] lg:aspect-auto' : 'aspect-[16/9]'}`}>
                    <img
                        src={article.image}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-[#8B4A2F] px-3 py-1 font-sans text-[10px] uppercase tracking-wider text-[#F5F0E8]">
                        {article.category}
                    </span>
                </div>
            )}
            <div className={`${featured ? 'p-8 md:p-10' : 'p-6'} flex flex-1 flex-col`}>
                <h3 className={`${featured ? 'text-3xl md:text-4xl' : 'text-lg md:text-xl'} mb-3 font-serif leading-snug text-[#1A1714] transition-colors group-hover:text-[#8B4A2F]`}>
                    {article.title}
                </h3>
                <p className="mb-6 flex-1 font-sans text-sm leading-relaxed text-[#7A7268]">
                    {article.excerpt}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#D9D0C0] pt-4 font-sans text-xs text-[#7A7268]">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {article.author}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readTime}</span>
                    <span className="flex items-center gap-1 text-[#C9A96E] transition-transform group-hover:translate-x-1">
                        Read <ArrowRight className="h-3 w-3" />
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default function JournalClient() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category') || 'All';
    const [articles, setArticles] = useState(getSampleArticles());
    const [settings, setSettings] = useState(DEFAULT_CONTENT_SETTINGS);
    const [category, setCategory] = useState(initialCategory);
    const [searchText, setSearchText] = useState(searchParams.get('search') || '');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        Promise.all([getArticles(), getContentSettings()]).then(([articleData, contentSettings]) => {
            if (cancelled) return;
            setArticles(articleData.filter((article) => article.status === 'Published'));
            setSettings(contentSettings);
        }).catch(console.error).finally(() => {
            if (!cancelled) setIsLoading(false);
        });
        return () => {
            cancelled = true;
        };
    }, []);

    const categories = useMemo(() => ['All', ...new Set(articles.map((article) => article.category).filter(Boolean))], [articles]);
    const filtered = useMemo(() => {
        const terms = searchText.toLowerCase().split(/\s+/).filter(Boolean);
        return articles.filter((article) => {
            if (category !== 'All' && article.category !== category) return false;
            if (!terms.length) return true;
            const haystack = [article.title, article.excerpt, article.category, ...(article.tags || [])].join(' ').toLowerCase();
            return terms.every((term) => haystack.includes(term));
        });
    }, [articles, category, searchText]);

    const featured = category === 'All' && !searchText
        ? filtered.find((article) => article.featured) || filtered[0]
        : null;
    const remaining = featured ? filtered.filter((article) => article.slug !== featured.slug) : filtered;
    const whatsapp = getPrimaryWhatsapp(settings);

    return (
        <div className="min-h-screen bg-[#F5F0E8]">
            <Navbar />
            <main className="pt-32">
                <section className="border-b border-[#2E2A25] bg-[#0D0B09]">
                    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
                        <p className="mb-4 font-sans text-xs uppercase tracking-[0.2em] text-[#C9A96E]">Journal</p>
                        <h1 className="mb-4 font-serif text-5xl text-[#F5F0E8] md:text-7xl">Real Estate Intelligence</h1>
                        <p className="max-w-2xl font-sans text-lg text-[#9E968E]">
                            Market updates, buyer guides, seller strategy, RERA explainers, locality intelligence, and investment notes from Aurevon Realty.
                        </p>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 py-12">
                    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            {categories.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setCategory(item)}
                                    className={`whitespace-nowrap rounded-full border px-4 py-2 font-sans text-xs uppercase tracking-wider transition-colors ${category === item ? 'border-[#0D0B09] bg-[#0D0B09] text-[#C9A96E]' : 'border-[#D9D0C0] bg-white text-[#7A7268] hover:border-[#C9A96E]'}`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-[#C9A96E]" />
                            <input
                                value={searchText}
                                onChange={(event) => setSearchText(event.target.value)}
                                placeholder="Search articles or tags"
                                className="w-full rounded border border-[#D9D0C0] bg-white py-2.5 pl-9 pr-3 font-sans text-sm text-[#1A1714] outline-none focus:border-[#C9A96E]"
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex h-60 items-center justify-center">
                            <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#C9A96E] border-t-transparent" />
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="border border-[#D9D0C0] bg-white px-6 py-20 text-center">
                            <h2 className="mb-3 font-serif text-3xl text-[#1A1714]">No Articles Found</h2>
                            <p className="font-sans text-sm text-[#7A7268]">Try another category or search term.</p>
                        </div>
                    ) : (
                        <>
                            {featured && (
                                <section className="mb-16">
                                    <p className="mb-6 font-sans text-xs uppercase tracking-[0.2em] text-[#C9A96E]">Featured Article</p>
                                    <ArticleCard article={featured} featured />
                                </section>
                            )}
                            <section>
                                <p className="mb-6 font-sans text-xs uppercase tracking-[0.2em] text-[#C9A96E]">{featured ? 'Latest Articles' : 'Articles'}</p>
                                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                    {remaining.map((article) => <ArticleCard key={article.slug} article={article} />)}
                                </div>
                            </section>
                        </>
                    )}

                    <section className="mt-20 rounded border border-[#2E2A25] bg-[#0D0B09] p-8 text-center md:p-12">
                        <h2 className="mb-4 font-serif text-3xl text-[#F5F0E8] md:text-4xl">Get Market Updates on WhatsApp</h2>
                        <p className="mx-auto mb-8 max-w-xl font-sans text-sm leading-relaxed text-[#9E968E]">
                            Receive curated locality notes, new listing alerts, and buyer guidance from Aurevon Realty.
                        </p>
                        <a
                            onClick={() => trackConversion('journal_whatsapp_subscribe_clicked')}
                            href={createWhatsAppUrl({ phone: whatsapp, message: 'Please subscribe me to Aurevon Realty market updates on WhatsApp.' })}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 bg-[#25D366] px-8 py-3.5 font-sans text-xs uppercase tracking-widest text-white transition-colors hover:bg-[#20bd5a]"
                        >
                            <MessageCircle className="h-4 w-4" /> Subscribe via WhatsApp
                        </a>
                    </section>
                </section>
            </main>
            <Footer />
            <WhatsAppCTA />
        </div>
    );
}
