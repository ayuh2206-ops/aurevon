import { Building2, Store, Globe, TrendingUp, FileText, CheckCircle2 } from 'lucide-react';
import { services as serviceData } from '@/lib/data';

const iconMap = { Building2, Store, Globe, TrendingUp, FileText, CheckCircle2 };

export default function Services() {
    return (
        <section id="services" className="py-24 bg-[#F5F0E8]">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1714] text-center mb-16">End-to-End Commercial Services</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {serviceData.map((svc, i) => {
                        const Icon = iconMap[svc.iconName];
                        return (
                            <div key={i} className="p-8 border border-[#D9D0C0] hover:border-[#C9A96E] bg-white transition-colors group">
                                <Icon className="w-10 h-10 text-[#C9A96E] mb-6" strokeWidth={1} />
                                <h3 className="font-serif text-2xl text-[#1A1714] mb-3">{svc.title}</h3>
                                <p className="font-sans text-sm text-[#7A7268] leading-relaxed">{svc.desc}</p>
                            </div>
                        );
                    })}
                </div>

                {/* NRI CTA Card */}
                <div className="bg-[#0D0B09] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between text-center md:text-left rounded-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A96E] opacity-5 rounded-full blur-3xl" />
                    <div className="relative z-10 max-w-2xl mb-8 md:mb-0">
                        <h3 className="font-serif text-3xl md:text-4xl text-[#F5F0E8] mb-4">Planning to invest in Indian commercial real estate from abroad?</h3>
                        <p className="font-sans text-[#F5F0E8]/70">Our NRI Desk offers virtual tours, yield analysis, foreign currency payment guidance, and complete legal support.</p>
                    </div>
                    <a href="#nri-desk" className="relative z-10 shrink-0 bg-[#C9A96E] text-[#0D0B09] px-8 py-4 font-sans text-[13px] uppercase tracking-widest hover:bg-[#F5F0E8] transition-colors">
                        Book NRI Consultation
                    </a>
                </div>
            </div>
        </section>
    );
}
