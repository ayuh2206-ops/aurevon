import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/config';

export default function Footer() {
    const columns = [
        { title: "Company", links: ["About", "Our Story", "Founder", "Awards"] },
        { title: "Properties", links: ["Office Spaces", "Retail / Shops", "IT Parks", "Pre-Leased"] },
        { title: "Services", links: ["NRI Desk", "Documentation", "Yield Analysis", "Post-Sale Management"] }
    ];

    return (
        <footer className="bg-[#0D0B09] pt-20 pb-10 border-t border-[#2E2A25]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                    <div className="sm:col-span-2 md:col-span-1">
                        <h2 className="font-serif text-3xl text-[#C9A96E] leading-none mb-1">AUREVON</h2>
                        <p className="font-sans text-[10px] text-[#F5F0E8] tracking-[0.2em] mb-6">REALTY PVT. LTD.</p>
                        <p className="font-sans text-xs text-[#7A7268] leading-relaxed mb-4">
                            25 years of trusted commercial real estate advisory across India.
                        </p>
                        <p className="font-sans text-xs text-[#C9A96E]">RERA: {SITE_CONFIG.RERA_NUMBER}</p>
                    </div>

                    {columns.map((col, i) => (
                        <div key={i}>
                            <h4 className="font-sans text-xs text-[#F5F0E8] uppercase tracking-widest mb-6">{col.title}</h4>
                            <ul className="space-y-3">
                                {col.links.map(link => (
                                    <li key={link}>
                                        <a href="#" className="font-sans text-sm text-[#7A7268] hover:text-[#C9A96E] transition-colors">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-[#2E2A25] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="font-sans text-xs text-[#7A7268]">
                        © {new Date().getFullYear()} Aurevon Realty Pvt. Ltd. All Rights Reserved.
                        <br className="md:hidden" /> Designed for excellence. Built on trust.
                    </p>
                    <div className="flex flex-wrap justify-center space-x-6">
                        <Link href="/privacy-policy" className="text-[#7A7268] hover:text-[#C9A96E] font-sans text-xs uppercase tracking-wider">Privacy Policy</Link>
                        <Link href="/terms-of-service" className="text-[#7A7268] hover:text-[#C9A96E] font-sans text-xs uppercase tracking-wider">Terms</Link>
                        <a href={SITE_CONFIG.LINKEDIN_URL} target="_blank" rel="noreferrer" className="text-[#7A7268] hover:text-[#C9A96E] font-sans text-xs uppercase tracking-wider">LinkedIn</a>
                        <a href={`https://wa.me/${SITE_CONFIG.ARUN_PHONE}`} target="_blank" rel="noreferrer" className="text-[#7A7268] hover:text-[#C9A96E] font-sans text-xs uppercase tracking-wider">WhatsApp</a>
                        <Link href="/admin" className="text-[#2E2A25] hover:text-[#C9A96E] font-sans text-xs uppercase tracking-wider">Admin</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
