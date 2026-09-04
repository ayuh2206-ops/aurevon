'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getArticles } from '@/lib/firebaseUtils';
import { getSampleArticles } from '@/lib/realEstate';

export default function Blog() {
    const [articles, setArticles] = useState(getSampleArticles().slice(0, 3));

    useEffect(() => {
        getArticles().then((items) => {
            setArticles(items.filter((article) => article.status === 'Published').slice(0, 3));
        }).catch(() => {});
    }, []);

    return (
        <section className="bg-[#F5F0E8] py-24">
            <div className="mx-auto max-w-7xl px-6">
                <h2 className="mb-16 text-center font-serif text-4xl text-[#1A1714] md:text-5xl lg:text-6xl">Real Estate Intelligence</h2>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {articles.map((article) => (
                        <Link key={article.slug} href={`/journal/${article.slug}`} className="group block overflow-hidden border border-[#D9D0C0] bg-white transition-colors hover:border-[#C9A96E]">
                            {article.image && (
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                            )}
                            <div className="p-8">
                                <span className="mb-6 inline-block rounded-full bg-[#8B4A2F] px-3 py-1 font-sans text-[10px] uppercase tracking-wider text-[#F5F0E8]">
                                    {article.category}
                                </span>
                                <h3 className="mb-4 font-serif text-xl leading-snug text-[#1A1714] md:text-2xl">
                                    {article.title}
                                </h3>
                                <p className="mb-6 font-sans text-sm leading-relaxed text-[#7A7268]">
                                    {article.excerpt}
                                </p>
                                <span className="inline-flex items-center font-sans text-sm uppercase tracking-wider text-[#C9A96E] transition-colors group-hover:translate-x-1 hover:text-[#8B4A2F]">
                                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/journal"
                        className="inline-flex items-center gap-2 border border-[#C9A96E] bg-[#0D0B09] px-8 py-3 font-sans text-xs uppercase tracking-widest text-[#C9A96E] transition-colors hover:bg-[#C9A96E] hover:text-[#0D0B09]"
                    >
                        View All Articles <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
