import { Star } from 'lucide-react';
import { testimonials } from '@/lib/data';

export default function Testimonials() {
    return (
        <section className="py-24 bg-[#F5F0E8] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1714]">What Our Clients Say</h2>
            </div>
            <div className="flex overflow-x-auto snap-x snap-mandatory pb-12 scrollbar-hide px-6 gap-6 md:gap-8 max-w-7xl mx-auto">
                {testimonials.map((test, i) => (
                    <div key={i} className="snap-center shrink-0 w-[85vw] md:w-[400px] bg-white p-8 md:p-10 border border-[#D9D0C0] relative hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                        <div className="absolute top-4 left-6 font-serif text-8xl text-[#C9A96E] opacity-20 leading-none">&ldquo;</div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex text-[#C9A96E] mb-6">
                                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                            </div>
                            <p className="font-serif italic text-xl md:text-2xl text-[#1A1714] leading-relaxed mb-8 flex-1">
                                {test.quote}
                            </p>
                            <div>
                                <p className="font-sans text-xs uppercase tracking-widest text-[#8B4A2F] mb-1">{test.name}</p>
                                <p className="font-sans text-[11px] text-[#7A7268]">{test.type}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
