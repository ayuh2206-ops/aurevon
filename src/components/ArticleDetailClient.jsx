'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, MessageCircle, Share2, Tag, User } from 'lucide-react';
import ArticleContent from '@/components/ArticleContent';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { getArticles, getContentSettings } from '@/lib/firebaseUtils';
import {
    DEFAULT_CONTENT_SETTINGS,
    createWhatsAppUrl,
    getPrimaryWhatsapp,
    normalizeArticle,
    trackConversion,
} from '@/lib/realEstate';
import { BUSINESS } from '@/lib/config';

function formatDate(dateStr) {
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function ArticleDetailClient({ slug }) {
    const [articles, setArticles] = useState([]);
    const [settings, setSettings] = useState(DEFAULT_CONTENT_SETTINGS);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        Promise.all([getArticles(), getContentSettings()]).then(([articleData, contentSettings]) => {
            if (cancelled) return;
            setArticles(articleData.map(normalizeArticle).filter((article) => article.status === 'Published'));
            setSettings(contentSettings);
        }).catch(console.error).finally(() => {
            if (!cancelled) setIsLoading(false);
        });
        return () => {
            cancelled = true;
        };
    }, []);

    const article = articles.find((item) => item.slug === slug);
    const related = useMemo(() => {
        if (!article) return [];
        const tagSet = new Set(article.tags || []);
        return articles
            .filter((item) => item.slug !== article.slug)
            .sort((a, b) => {
                const categoryScore = (b.category === article.category ? 2 : 0) - (a.category === article.category ? 2 : 0);
                if (categoryScore) return categoryScore;
                const aTags = (a.tags || []).filter((tag) => tagSet.has(tag)).length;
                const bTags = (b.tags || []).filter((tag) => tagSet.has(tag)).length;
                return bTags - aTags;
            })
            .slice(0, 3);
    }, [article, articles]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0D0B09] pt-32 flex items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#C9A96E] border-t-transparent" />
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-[#F5F0E8]">
                <Navbar />
                <div className="flex min-h-screen items-center justify-center px-6 pt-32 text-center">
                    <div>
                        <h1 className="mb-4 font-serif text-4xl text-[#1A1714]">Article Not Found</h1>
                        <p className="mb-8 font-sans text-sm text-[#7A7268]">The article is unavailable or unpublished.</p>
                        <Link href="/journal" className="bg-[#C9A96E] px-6 py-3 font-sans text-xs uppercase tracking-widest text-[#0D0B09] hover:bg-[#0D0B09] hover:text-[#C9A96E]">
                            Back to Journal
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const shareUrl = typeof window !== 'undefined' ? window.location.href : `${BUSINESS.websiteBaseUrl}/journal/${article.slug}`;
    const whatsapp = getPrimaryWhatsapp(settings);
    const whatsappShare = createWhatsAppUrl({
        phone: whatsapp,
        message: `${article.title} - Read on Aurevon Realty: ${shareUrl}`,
    });

    return (
        <div className="min-h-screen bg-[#F5F0E8]">
            <Navbar />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        headline: article.title,
                        description: article.excerpt,
                        image: article.image,
                        author: { '@type': 'Person', name: article.author },
                        publisher: { '@type': 'Organization', name: BUSINESS.businessName, url: BUSINESS.websiteBaseUrl },
                        datePublished: article.date,
                        dateModified: article.updatedAt,
                        keywords: article.tags?.join(', '),
                        articleSection: article.category,
                    }),
                }}
            />
            <main className="pt-24">
                <section className="relative overflow-hidden bg-[#0D0B09]">
                    {article.image && (
                        <img src={article.image} alt={article.title} className="absolute inset-0 h-full w-full object-cover opacity-30" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B09] via-[#0D0B09]/70 to-[#0D0B09]/40" />
                    <div className="relative z-10 mx-auto max-w-4xl px-6 pb-20 pt-16">
                        <Link href="/journal" className="mb-8 inline-flex items-center gap-2 font-sans text-sm text-[#C9A96E] transition-colors hover:text-[#F5F0E8]">
                            <ArrowLeft className="h-4 w-4" /> All Articles
                        </Link>
                        <div className="mt-8">
                            <span className="mb-6 inline-block rounded-full bg-[#8B4A2F] px-3 py-1 font-sans text-[10px] uppercase tracking-wider text-[#F5F0E8]">
                                {article.category}
                            </span>
                            <h1 className="mb-6 font-serif text-3xl leading-tight text-[#F5F0E8] sm:text-4xl md:text-5xl">
                                {article.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 font-sans text-sm text-[#9E968E] md:gap-6">
                                <span className="flex items-center gap-2"><User className="h-4 w-4" /> {article.author}</span>
                                <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {formatDate(article.date)}</span>
                                <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {article.readTime}</span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
                        <article className="min-w-0">
                            <ArticleContent content={article.content} />

                            {article.tags?.length > 0 && (
                                <div className="mt-12 border-t border-[#D9D0C0] pt-8">
                                    <div className="mb-4 flex items-center gap-2">
                                        <Tag className="h-4 w-4 text-[#C9A96E]" />
                                        <span className="font-sans text-xs uppercase tracking-wider text-[#7A7268]">Tags</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {article.tags.map((tag) => (
                                            <span key={tag} className="rounded-full border border-[#D9D0C0] bg-white px-3 py-1 font-sans text-xs text-[#7A7268]">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-8 flex items-center gap-4 border-t border-[#D9D0C0] pt-8">
                                <span className="flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-[#7A7268]"><Share2 className="h-4 w-4" /> Share</span>
                                <a
                                    href={whatsappShare}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() => trackConversion('article_whatsapp_share_clicked', { slug: article.slug })}
                                    className="flex items-center gap-2 rounded bg-[#25D366] px-4 py-2 font-sans text-xs uppercase tracking-wider text-white transition-colors hover:bg-[#20bd5a]"
                                >
                                    <MessageCircle className="h-4 w-4" fill="currentColor" /> WhatsApp
                                </a>
                            </div>
                        </article>

                        <aside className="hidden lg:block">
                            <div className="sticky top-32 space-y-8">
                                <div className="rounded border border-[#D9D0C0] bg-white p-6">
                                    <p className="mb-3 font-sans text-xs uppercase tracking-wider text-[#C9A96E]">About the Author</p>
                                    <p className="mb-1 font-serif text-lg text-[#1A1714]">{article.author}</p>
                                    <p className="mb-4 font-sans text-xs text-[#7A7268]">{article.authorRole}</p>
                                    <p className="font-sans text-xs leading-relaxed text-[#7A7268]">Real estate advisory, compliance, and market intelligence from Aurevon Realty.</p>
                                </div>
                                <div className="rounded border border-[#2E2A25] bg-[#0D0B09] p-6 text-center">
                                    <p className="mb-3 font-serif text-xl text-[#F5F0E8]">Need Expert Advice?</p>
                                    <p className="mb-6 font-sans text-xs text-[#9E968E]">Get personalised property recommendations.</p>
                                    <a
                                        href={createWhatsAppUrl({ phone: whatsapp, message: `I just read "${article.title}" and would like to discuss real estate opportunities.` })}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="block w-full rounded bg-[#25D366] py-3 font-sans text-xs uppercase tracking-wider text-white transition-colors hover:bg-[#20bd5a]"
                                    >
                                        Chat with Aurevon
                                    </a>
                                    <p className="mt-4 font-sans text-[10px] uppercase tracking-wider text-[#C9A96E]">{settings.contactRera || DEFAULT_CONTENT_SETTINGS.contactRera}</p>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>

                {related.length > 0 && (
                    <section className="border-t border-[#2E2A25] bg-[#0D0B09] py-16">
                        <div className="mx-auto max-w-7xl px-6">
                            <h2 className="mb-8 font-sans text-xs uppercase tracking-[0.2em] text-[#C9A96E]">Related Articles</h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                {related.map((item) => (
                                    <Link key={item.slug} href={`/journal/${item.slug}`} className="group overflow-hidden rounded border border-[#2E2A25] transition-colors hover:border-[#C9A96E]">
                                        {item.image && <img src={item.image} alt={item.title} className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />}
                                        <div className="p-5">
                                            <span className="font-sans text-[10px] uppercase tracking-wider text-[#C9A96E]">{item.category}</span>
                                            <h3 className="mt-2 line-clamp-2 font-serif text-lg leading-snug text-[#F5F0E8] transition-colors group-hover:text-[#C9A96E]">{item.title}</h3>
                                            <p className="mt-2 font-sans text-xs text-[#7A7268]">{item.readTime}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
            <WhatsAppCTA />
        </div>
    );
}
