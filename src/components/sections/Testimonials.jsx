'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { DEFAULT_FAQS, DEFAULT_TESTIMONIALS } from '@/lib/realEstate';
import { getFaqs, getTestimonials } from '@/lib/firebaseUtils';

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);
    const [faqs, setFaqs] = useState(DEFAULT_FAQS);

    useEffect(() => {
        getTestimonials().then(setTestimonials).catch(() => {});
        getFaqs().then(setFaqs).catch(() => {});
    }, []);

    return (
        <section className="overflow-hidden bg-[#F5F0E8] py-24">
            <div className="mx-auto mb-16 max-w-7xl px-6 text-center">
                <span className="mb-4 block font-sans text-xs uppercase tracking-[0.2em] text-[#C9A96E]">Trust Signals</span>
                <h2 className="font-serif text-4xl text-[#1A1714] md:text-5xl lg:text-6xl">What Our Clients Say</h2>
            </div>
            <div className="mx-auto flex max-w-7xl snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-12 scrollbar-hide md:gap-8">
                {testimonials.map((test) => (
                    <div key={test.id || test.name} className="relative w-[85vw] shrink-0 snap-center border border-[#D9D0C0] bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:w-[400px] md:p-10">
                        <div className="absolute left-6 top-4 font-serif text-8xl leading-none text-[#C9A96E] opacity-20">&ldquo;</div>
                        <div className="relative z-10 flex h-full flex-col">
                            <div className="mb-6 flex text-[#C9A96E]">
                                {[...Array(Math.max(1, Math.min(Number(test.rating) || 5, 5)))].map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}
                            </div>
                            <p className="mb-8 flex-1 font-serif text-xl italic leading-relaxed text-[#1A1714] md:text-2xl">
                                {test.text || test.quote}
                            </p>
                            <div>
                                <p className="mb-1 font-sans text-xs uppercase tracking-widest text-[#8B4A2F]">{test.name}</p>
                                <p className="font-sans text-[11px] text-[#7A7268]">{test.locality || test.type}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mx-auto mt-6 max-w-5xl px-6">
                <h3 className="mb-8 text-center font-serif text-3xl text-[#1A1714]">Questions Buyers Ask First</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {faqs.map((faq) => (
                        <details key={faq.id || faq.question} className="group border border-[#D9D0C0] bg-white p-5">
                            <summary className="cursor-pointer list-none font-sans text-sm font-medium text-[#1A1714]">
                                {faq.question}
                            </summary>
                            <p className="mt-3 font-sans text-sm leading-relaxed text-[#7A7268]">{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
