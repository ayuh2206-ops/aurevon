import Link from 'next/link';
import { ArrowRight, Clock, User } from 'lucide-react';
import { blogArticles } from '@/lib/data';

export const metadata = {
    title: 'Blog — Commercial Real Estate Insights | Aurevon Realty',
    description: "Expert insights on commercial real estate investment in Pune: market analysis, NRI investment guides, RERA compliance, yield strategies, and property type comparisons from Aurevon Realty's 25+ years of experience.",
    keywords: 'commercial real estate blog, Pune property market, NRI investment India, RERA guide, office space investment, pre-leased property, commercial yields',
    openGraph: {
        title: 'Real Estate Intelligence — Aurevon Realty Blog',
        description: "Expert analysis and guides for commercial property investors from Pune's most trusted real estate advisory.",
        type: 'website',
    },
};

export default function BlogListingPage() {
    const allBlogs = typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('aurevon_blogs') || 'null') || blogArticles
        : blogArticles;

    const featured = allBlogs.filter(b => b.featured);
    const rest = allBlogs.filter(b => !b.featured);

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-[#F5F0E8]">
            {/* Hero Header */}
            <div className="bg-[#0D0B09] border-b border-[#2E2A25]">
                <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
                    <Link href="/" className="text-[#C9A96E] font-sans text-sm hover:text-[#F5F0E8] transition-colors mb-6 inline-block">← Back to Home</Link>
                    <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#F5F0E8] mb-4">Real Estate Intelligence</h1>
                    <p className="font-sans text-lg text-[#9E968E] max-w-2xl">Expert insights on commercial property investment, market trends, NRI advisory, and regulatory compliance — from Pune&apos;s most experienced team.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Featured Articles */}
                {featured.length > 0 && (
                    <section className="mb-20">
                        <h2 className="font-sans text-xs uppercase tracking-[0.2em] text-[#C9A96E] mb-8">Featured Articles</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {featured.map((article) => (
                                <Link
                                    key={article.slug}
                                    href={`/blog/${article.slug}`}
                                    className="group bg-white border border-[#D9D0C0] overflow-hidden hover:border-[#C9A96E] transition-all duration-300 flex flex-col"
                                >
                                    <div className="relative aspect-[16/9] overflow-hidden">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                        <span className="absolute top-4 left-4 bg-[#8B4A2F] text-[#F5F0E8] font-sans text-[10px] uppercase px-3 py-1 rounded-full tracking-wider">
                                            {article.category}
                                        </span>
                                    </div>
                                    <div className="p-6 md:p-8 flex flex-col flex-1">
                                        <h3 className="font-serif text-xl md:text-2xl text-[#1A1714] leading-snug mb-3 group-hover:text-[#8B4A2F] transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="font-sans text-sm text-[#7A7268] leading-relaxed mb-6 flex-1">
                                            {article.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between text-xs font-sans text-[#7A7268]">
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {article.author}</span>
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
                                            </div>
                                            <span>{formatDate(article.date)}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* All Articles */}
                <section>
                    <h2 className="font-sans text-xs uppercase tracking-[0.2em] text-[#C9A96E] mb-8">All Articles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allBlogs.map((article) => (
                            <Link
                                key={article.slug}
                                href={`/blog/${article.slug}`}
                                className="group bg-white border border-[#D9D0C0] overflow-hidden hover:border-[#C9A96E] transition-all duration-300 flex flex-col"
                            >
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                    <span className="absolute top-4 left-4 bg-[#8B4A2F] text-[#F5F0E8] font-sans text-[10px] uppercase px-3 py-1 rounded-full tracking-wider">
                                        {article.category}
                                    </span>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="font-serif text-lg text-[#1A1714] leading-snug mb-3 group-hover:text-[#8B4A2F] transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="font-sans text-sm text-[#7A7268] leading-relaxed mb-4 flex-1 line-clamp-3">
                                        {article.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-xs font-sans text-[#7A7268] pt-4 border-t border-[#D9D0C0]">
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
                                        <span className="flex items-center gap-1 text-[#C9A96E] group-hover:translate-x-1 transition-transform">
                                            Read <ArrowRight className="w-3 h-3 ml-1" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="mt-20 bg-[#0D0B09] rounded-lg p-8 md:p-12 text-center border border-[#2E2A25]">
                    <h2 className="font-serif text-3xl md:text-4xl text-[#F5F0E8] mb-4">Ready to Invest in Commercial Real Estate?</h2>
                    <p className="font-sans text-sm text-[#9E968E] max-w-xl mx-auto mb-8">Get personalised property recommendations from Pune&apos;s most experienced commercial real estate advisory team.</p>
                    <Link href="/#contact" className="inline-block bg-[#C9A96E] text-[#0D0B09] px-8 py-3.5 font-sans text-xs uppercase tracking-widest hover:bg-[#F5F0E8] transition-colors">
                        Get in Touch
                    </Link>
                </section>
            </div>

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
    );
}
