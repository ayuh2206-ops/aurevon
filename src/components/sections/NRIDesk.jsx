import { Check, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';
import { nriProcessSteps } from '@/lib/data';

export default function NRIDesk() {
    return (
        <section id="nri-desk" className="py-24 bg-[#0D0B09] relative">
            {/* Noise grain overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                <div>
                    <span className="block font-sans text-xs text-[#C9A96E] uppercase tracking-[0.2em] mb-4">Dedicated NRI Investment Desk</span>
                    <h2 className="font-serif text-5xl md:text-6xl text-[#F5F0E8] mb-6 leading-tight">
                        Invest in India.<br />From Anywhere in the World.
                    </h2>
                    <p className="text-[#F5F0E8]/70 text-base leading-relaxed mb-10 max-w-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Whether you&apos;re in the UK, US, UAE, Canada or Singapore — owning property in India has never been easier. We handle everything remotely with full legal transparency.
                    </p>

                    <ul className="space-y-4 mb-12">
                        {[
                            "Virtual property tours via video call",
                            "NRI-compliant documentation (FEMA, RBI guidelines)",
                            "Foreign currency payment guidance",
                            "End-to-end coordination with legal & banking teams"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start text-sm text-[#F5F0E8]/90" style={{ fontFamily: "'Inter', sans-serif" }}>
                                <Check className="w-5 h-5 text-[#C9A96E] mr-3 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <a href="#contact" className="w-full sm:w-auto bg-[#C9A96E] text-[#0D0B09] px-8 py-4 font-sans text-[13px] uppercase tracking-widest hover:bg-[#F5F0E8] transition-colors text-center">
                            Schedule Free Consultation
                        </a>
                        <a
                            href={`https://wa.me/${SITE_CONFIG.ARUN_PHONE}?text=${encodeURIComponent("Hi Arun, I am an NRI and would like to explore investment opportunities in Indian real estate through Aurevon Realty.")}`}
                            target="_blank" rel="noreferrer"
                            className="flex items-center text-[#F5F0E8] hover:text-[#25D366] transition-colors font-sans text-sm"
                        >
                            <MessageCircle className="w-5 h-5 mr-2 text-[#25D366]" /> Chat on WhatsApp
                        </a>
                    </div>
                </div>

                <div className="lg:pl-16 border-l-0 lg:border-l border-[#2E2A25]">
                    <h3 className="font-serif text-3xl text-[#C9A96E] mb-10">The Remote Acquisition Process</h3>
                    <div className="relative border-l border-[#C9A96E]/30 ml-3 md:ml-4 space-y-12">
                        {nriProcessSteps.map((item, i) => (
                            <div key={i} className="relative pl-10">
                                <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-[#1A1714] border-2 border-[#C9A96E] flex items-center justify-center font-sans text-xs text-[#C9A96E]">
                                    {item.step}
                                </div>
                                <p className="font-sans uppercase tracking-widest text-[#F5F0E8] text-sm mb-2 pt-1">{item.title}</p>
                                <p className="font-sans text-sm text-[#7A7268]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
