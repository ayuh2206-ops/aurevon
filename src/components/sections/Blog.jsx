import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { blogArticles } from '@/lib/data';

export default function Blog() {
    return (
        <section className="py-24 bg-[#F5F0E8]">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1714] text-center mb-16">Real Estate Intelligence</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogArticles.slice(0, 3).map((article) => (
                        <Link key={article.slug} href={`/blog/${article.slug}`} className="bg-white border border-[#D9D0C0] overflow-hidden hover:border-[#C9A96E] transition-colors group block">
                            {article.image && (
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                </div>
                            )}
                            <div className="p-8">
                                <span className="inline-block bg-[#8B4A2F] text-[#F5F0E8] font-sans text-[10px] uppercase px-3 py-1 rounded-full tracking-wider mb-6">
                                    {article.category}
                                </span>
                                <h3 className="font-serif text-xl md:text-2xl text-[#1A1714] leading-snug mb-4">
                                    {article.title}
                                </h3>
                                <p className="font-sans text-sm text-[#7A7268] leading-relaxed mb-6">
                                    {article.excerpt}
                                </p>
                                <span className="inline-flex items-center font-sans text-sm text-[#C9A96E] uppercase tracking-wider hover:text-[#8B4A2F] transition-colors group-hover:translate-x-1">
                                    Read More <ArrowRight className="w-4 h-4 ml-2" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All CTA */}
                <div className="text-center mt-12">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 border border-[#C9A96E] text-[#C9A96E] bg-[#0D0B09] px-8 py-3 font-sans text-xs uppercase tracking-widest hover:bg-[#C9A96E] hover:text-[#0D0B09] transition-colors"
                    >
                        View All Articles <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
