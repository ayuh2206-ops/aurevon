'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Calendar, Tag, Share2, MessageCircle } from 'lucide-react';
import { blogArticles } from '@/lib/data';
import { SITE_CONFIG } from '@/lib/config';

export default function BlogDetailPage() {
    const { slug } = useParams();

    // Check localStorage for admin-added blogs, then fall back to initial data
    let allBlogs = blogArticles;
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('aurevon_blogs');
        if (stored) allBlogs = JSON.parse(stored);
    }

    const article = allBlogs.find(b => b.slug === slug);

    if (!article) {
        return (
            <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-serif text-4xl text-[#1A1714] mb-4">Article Not Found</h1>
                    <p className="font-sans text-sm text-[#7A7268] mb-8">The article you&apos;re looking for doesn&apos;t exist.</p>
                    <Link href="/blog" className="bg-[#C9A96E] text-[#0D0B09] px-6 py-3 font-sans text-xs uppercase tracking-widest hover:bg-[#F5F0E8] transition-colors">
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    // Related articles
    const related = allBlogs.filter(b => b.slug !== slug).slice(0, 3);

    // WhatsApp share
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const whatsappShare = `https://wa.me/?text=${encodeURIComponent(`${article.title} — Read on Aurevon Realty Blog: ${shareUrl}`)}`;

    // JSON-LD structured data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": article.title,
        "description": article.metaDescription || article.excerpt,
        "image": article.image,
        "author": {
            "@type": "Person",
            "name": article.author,
            "jobTitle": article.authorRole,
        },
        "publisher": {
            "@type": "Organization",
            "name": "Aurevon Realty Pvt. Ltd.",
            "url": "https://aurevonrealty.in",
        },
        "datePublished": article.date,
        "dateModified": article.date,
        "mainEntityOfPage": {
            "@type": "WebPage",
        },
        "keywords": article.tags?.join(', '),
        "articleSection": article.category,
    };

    return (
        <>
            {/* JSON-LD for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="min-h-screen bg-[#F5F0E8]">
                {/* Hero */}
                <div className="relative bg-[#0D0B09] overflow-hidden">
                    {article.image && (
                        <img
                            src={article.image}
                            alt={article.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-30"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B09] via-[#0D0B09]/70 to-[#0D0B09]/40" />
                    <div className="relative z-10 max-w-4xl mx-auto px-6 pt-16 pb-20">
                        <Link href="/blog" className="text-[#C9A96E] font-sans text-sm hover:text-[#F5F0E8] transition-colors mb-8 inline-flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> All Articles
                        </Link>
                        <div className="mt-8">
                            <span className="inline-block bg-[#8B4A2F] text-[#F5F0E8] font-sans text-[10px] uppercase px-3 py-1 rounded-full tracking-wider mb-6">
                                {article.category}
                            </span>
                            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F5F0E8] leading-tight mb-6">
                                {article.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm font-sans text-[#9E968E]">
                                <span className="flex items-center gap-2"><User className="w-4 h-4" /> {article.author}</span>
                                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {formatDate(article.date)}</span>
                                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {article.readTime}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Article Body */}
                <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
                        {/* Content */}
                        <article className="min-w-0">
                            {article.content?.map((block, i) => {
                                if (block.type === 'heading') {
                                    return (
                                        <h2 key={i} className="font-serif text-2xl md:text-3xl text-[#1A1714] mt-10 mb-4 leading-snug">
                                            {block.text}
                                        </h2>
                                    );
                                }
                                return (
                                    <p key={i} className="font-sans text-[15px] text-[#3D3830] leading-[1.85] mb-5">
                                        {block.text}
                                    </p>
                                );
                            })}

                            {/* Tags */}
                            {article.tags && (
                                <div className="mt-12 pt-8 border-t border-[#D9D0C0]">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Tag className="w-4 h-4 text-[#C9A96E]" />
                                        <span className="font-sans text-xs uppercase tracking-wider text-[#7A7268]">Tags</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {article.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-white border border-[#D9D0C0] rounded-full font-sans text-xs text-[#7A7268]">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Share */}
                            <div className="mt-8 pt-8 border-t border-[#D9D0C0] flex items-center gap-4">
                                <span className="font-sans text-xs uppercase tracking-wider text-[#7A7268] flex items-center gap-2"><Share2 className="w-4 h-4" /> Share</span>
                                <a href={whatsappShare} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded font-sans text-xs uppercase tracking-wider hover:bg-[#20bd5a] transition-colors">
                                    <MessageCircle className="w-4 h-4" fill="currentColor" /> WhatsApp
                                </a>
                            </div>
                        </article>

                        {/* Sidebar */}
                        <aside className="hidden lg:block">
                            <div className="sticky top-32 space-y-8">
                                {/* Author */}
                                <div className="bg-white border border-[#D9D0C0] rounded p-6">
                                    <p className="font-sans text-xs uppercase tracking-wider text-[#C9A96E] mb-3">About the Author</p>
                                    <p className="font-serif text-lg text-[#1A1714] mb-1">{article.author}</p>
                                    <p className="font-sans text-xs text-[#7A7268] mb-4">{article.authorRole}</p>
                                    <p className="font-sans text-xs text-[#7A7268] leading-relaxed">25+ years of expertise in commercial real estate advisory across India. RERA registered. 1,000+ successful deals.</p>
                                </div>

                                {/* CTA */}
                                <div className="bg-[#0D0B09] border border-[#2E2A25] rounded p-6 text-center">
                                    <p className="font-serif text-xl text-[#F5F0E8] mb-3">Need Expert Advice?</p>
                                    <p className="font-sans text-xs text-[#9E968E] mb-6">Get personalised commercial property recommendations.</p>
                                    <a
                                        href={`https://wa.me/${SITE_CONFIG.ARUN_PHONE}?text=${encodeURIComponent('Hi Arun, I just read your article "' + article.title + '" and would like to discuss commercial property investment opportunities.')}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="block w-full bg-[#25D366] text-white py-3 rounded font-sans text-xs uppercase tracking-wider hover:bg-[#20bd5a] transition-colors"
                                    >
                                        Chat with Arun
                                    </a>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>

                {/* Related Articles */}
                {related.length > 0 && (
                    <div className="bg-[#0D0B09] border-t border-[#2E2A25] py-16">
                        <div className="max-w-7xl mx-auto px-6">
                            <h2 className="font-sans text-xs uppercase tracking-[0.2em] text-[#C9A96E] mb-8">Continue Reading</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {related.map(r => (
                                    <Link
                                        key={r.slug}
                                        href={`/blog/${r.slug}`}
                                        className="group border border-[#2E2A25] rounded overflow-hidden hover:border-[#C9A96E] transition-colors"
                                    >
                                        <div className="relative aspect-[16/9] overflow-hidden">
                                            <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                        </div>
                                        <div className="p-5">
                                            <span className="font-sans text-[10px] uppercase tracking-wider text-[#C9A96E]">{r.category}</span>
                                            <h3 className="font-serif text-lg text-[#F5F0E8] mt-2 leading-snug group-hover:text-[#C9A96E] transition-colors line-clamp-2">{r.title}</h3>
                                            <p className="font-sans text-xs text-[#7A7268] mt-2">{r.readTime}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="bg-[#0D0B09] border-t border-[#2E2A25] py-8">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-[#7A7268] text-xs font-sans">© {new Date().getFullYear()} Aurevon Realty Pvt. Ltd. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link href="/privacy-policy" className="text-[#7A7268] text-xs font-sans hover:text-[#C9A96E] transition-colors">Privacy Policy</Link>
                            <Link href="/terms-of-service" className="text-[#7A7268] text-xs font-sans hover:text-[#C9A96E] transition-colors">Terms</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
