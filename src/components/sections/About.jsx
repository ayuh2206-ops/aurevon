import { ShieldCheck, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function About() {
    return (
        <section id="about" className="py-24 bg-[#0D0B09]">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="relative">
                    <div className="aspect-[3/4] max-w-md mx-auto relative z-10 p-2 border border-[#C9A96E]/30">
                        <img
                            src="/images/arun-dongare.png"
                            alt="Arun Dongare - Founder"
                            className="w-full h-full object-cover object-top"
                            loading="lazy"
                        />
                    </div>
                    <div className="absolute top-12 -left-4 w-24 h-[1px] bg-[#C9A96E] hidden md:block z-0" />
                    <div className="absolute -bottom-6 right-12 font-sans text-[10px] text-[#C9A96E] uppercase tracking-widest bg-[#0D0B09] px-4 py-2 border border-[#2E2A25] z-20">
                        Founder &amp; Principal Broker
                    </div>
                </div>

                <div>
                    <span className="block font-sans text-xs text-[#C9A96E] uppercase tracking-[0.2em] mb-4">Meet The Principal</span>
                    <h2 className="font-serif text-5xl md:text-6xl text-[#F5F0E8] mb-2">Arun Dongare</h2>
                    <h3 className="font-serif italic text-2xl text-[#7A7268] mb-8">25 Years of Commercial Real Estate Mastery</h3>

                    <div className="space-y-6 text-base text-[#F5F0E8]/70 leading-relaxed mb-10" style={{ fontFamily: "'Inter', sans-serif" }}>
                        <p>
                            With over two decades navigating India&apos;s most dynamic commercial property markets, Arun Dongare has built a reputation on one principle: every investor deserves complete transparency and maximum returns.
                        </p>
                        <p>
                            From Pune&apos;s fastest-growing IT corridors to high-yield retail spaces and NRI investment portfolios, Arun leads every deal personally — from discovery and due diligence to documentation and tenant acquisition.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-10">
                        {['RERA Registered', '1,000+ Deals Closed', 'NRI Specialist'].map((badge, i) => (
                            <div key={i} className="flex items-center space-x-2 bg-[#1A1714] border border-[#2E2A25] px-4 py-2 rounded">
                                <ShieldCheck className="w-4 h-4 text-[#C9A96E]" />
                                <span className="font-sans text-xs text-[#F5F0E8] tracking-wider">{badge}</span>
                            </div>
                        ))}
                    </div>

                    <a
                        href={SITE_CONFIG.LINKEDIN_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-[#C9A96E] font-sans text-sm uppercase tracking-wider hover:text-[#F5F0E8] transition-colors group"
                    >
                        Connect on LinkedIn <ArrowUpRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
}
