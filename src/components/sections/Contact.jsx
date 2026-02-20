'use client';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function Contact() {
    return (
        <section id="contact" className="py-24 bg-[#0D0B09] border-t border-[#2E2A25]">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                    <h2 className="font-serif text-5xl md:text-6xl text-[#F5F0E8] mb-12">Let&apos;s Find Your Space</h2>

                    <div className="font-sans text-[#F5F0E8] space-y-2 mb-12 text-sm leading-relaxed">
                        <p className="font-bold text-lg text-[#C9A96E] mb-4">AUREVON REALTY PVT. LTD.</p>
                        <p>Pune, Maharashtra, India</p>
                        <p className="mt-6 flex items-center">
                            <svg className="w-4 h-4 mr-3 text-[#C9A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {SITE_CONFIG.ADMIN_EMAIL}
                        </p>
                        <p className="flex items-center">
                            <MessageCircle className="w-4 h-4 mr-3 text-[#C9A96E]" />
                            <a href={`https://wa.me/${SITE_CONFIG.ARUN_WHATSAPP}`} target="_blank" rel="noreferrer" className="hover:text-[#C9A96E] transition-colors">
                                WhatsApp: +91 8180993030
                            </a>
                        </p>
                        <p className="flex items-center">
                            <svg className="w-4 h-4 mr-3 text-[#C9A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <a href="tel:+919767446655" className="hover:text-[#C9A96E] transition-colors">+91 9767 446 655</a>
                        </p>
                    </div>

                    {/* Google Maps Embed */}
                    <div className="w-full h-64 rounded overflow-hidden border border-[#2E2A25]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.548890837658!2d73.76493!3d18.57244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b900bfcab5e1%3A0xe6a29f92a7ee8e44!2sAurevon%20Realty!5e0!3m2!1sen!2sin!4v1708416000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(80%) invert(92%) contrast(83%)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Aurevon Realty Location"
                        />
                    </div>
                </div>

                <div className="bg-[#1A1714] p-8 md:p-12 rounded border border-[#2E2A25]">
                    <form className="space-y-8" onSubmit={e => e.preventDefault()}>
                        {/* Full Name */}
                        <div className="relative group">
                            <input type="text" id="name" required className="w-full bg-transparent border-b border-[#2E2A25] py-2 text-[#F5F0E8] font-sans focus:outline-none focus:border-[#C9A96E] transition-colors peer placeholder-transparent" placeholder="Full Name" />
                            <label htmlFor="name" className="absolute left-0 -top-4 text-xs font-sans text-[#7A7268] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#C9A96E]">Full Name</label>
                        </div>

                        {/* Email & Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="relative group">
                                <input type="email" id="email" required className="w-full bg-transparent border-b border-[#2E2A25] py-2 text-[#F5F0E8] font-sans focus:outline-none focus:border-[#C9A96E] transition-colors peer placeholder-transparent" placeholder="Email" />
                                <label htmlFor="email" className="absolute left-0 -top-4 text-xs font-sans text-[#7A7268] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#C9A96E]">Email Address</label>
                            </div>
                            <div className="relative group">
                                <input type="tel" id="phone" required className="w-full bg-transparent border-b border-[#2E2A25] py-2 text-[#F5F0E8] font-sans focus:outline-none focus:border-[#C9A96E] transition-colors peer placeholder-transparent" placeholder="Phone" />
                                <label htmlFor="phone" className="absolute left-0 -top-4 text-xs font-sans text-[#7A7268] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#C9A96E]">Phone / WhatsApp</label>
                            </div>
                        </div>

                        {/* Enquiry Type */}
                        <div className="relative">
                            <label htmlFor="enquiry-type" className="sr-only">Enquiry Type</label>
                            <select id="enquiry-type" defaultValue="" aria-label="Select enquiry type" className="w-full bg-transparent border-b border-[#2E2A25] py-2 text-[#F5F0E8] font-sans focus:outline-none focus:border-[#C9A96E] appearance-none">
                                <option value="" disabled className="bg-[#1A1714]">Enquiry Type</option>
                                <option value="office" className="bg-[#1A1714]">Office Space</option>
                                <option value="retail" className="bg-[#1A1714]">Retail / Shop</option>
                                <option value="preleased" className="bg-[#1A1714]">Pre-Leased Investment</option>
                                <option value="nri" className="bg-[#1A1714]">NRI Commercial Advisory</option>
                                <option value="other" className="bg-[#1A1714]">Other</option>
                            </select>
                            <ChevronDown className="absolute right-0 top-3 w-4 h-4 text-[#7A7268] pointer-events-none" />
                        </div>

                        {/* City of Interest */}
                        <div className="relative">
                            <label htmlFor="city-interest" className="sr-only">City of Interest</label>
                            <select id="city-interest" defaultValue="" aria-label="Select city of interest" className="w-full bg-transparent border-b border-[#2E2A25] py-2 text-[#F5F0E8] font-sans focus:outline-none focus:border-[#C9A96E] appearance-none">
                                <option value="" disabled className="bg-[#1A1714]">City of Interest</option>
                                <option value="pune" className="bg-[#1A1714]">Pune</option>
                                <option value="mumbai" className="bg-[#1A1714]">Mumbai</option>
                                <option value="bangalore" className="bg-[#1A1714]">Bangalore</option>
                                <option value="other" className="bg-[#1A1714]">Other</option>
                            </select>
                            <ChevronDown className="absolute right-0 top-3 w-4 h-4 text-[#7A7268] pointer-events-none" />
                        </div>

                        {/* Budget */}
                        <div className="relative">
                            <label htmlFor="budget-range" className="sr-only">Budget Range</label>
                            <select id="budget-range" defaultValue="" aria-label="Select budget range" className="w-full bg-transparent border-b border-[#2E2A25] py-2 text-[#F5F0E8] font-sans focus:outline-none focus:border-[#C9A96E] appearance-none">
                                <option value="" disabled className="bg-[#1A1714]">Budget Range</option>
                                <option value="under50l" className="bg-[#1A1714]">Under ₹50 Lakhs</option>
                                <option value="50l-1cr" className="bg-[#1A1714]">₹50L – ₹1 Crore</option>
                                <option value="1cr-2cr" className="bg-[#1A1714]">₹1Cr – ₹2 Crore</option>
                                <option value="2cr-5cr" className="bg-[#1A1714]">₹2Cr – ₹5 Crore</option>
                                <option value="5cr+" className="bg-[#1A1714]">₹5 Crore+</option>
                            </select>
                            <ChevronDown className="absolute right-0 top-3 w-4 h-4 text-[#7A7268] pointer-events-none" />
                        </div>

                        {/* Message */}
                        <div className="relative group">
                            <textarea id="message" rows="4" className="w-full bg-transparent border-b border-[#2E2A25] py-2 text-[#F5F0E8] font-sans focus:outline-none focus:border-[#C9A96E] transition-colors peer placeholder-transparent resize-none" placeholder="Message" />
                            <label htmlFor="message" className="absolute left-0 -top-4 text-xs font-sans text-[#7A7268] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#C9A96E]">Message / Requirements</label>
                        </div>

                        <button type="submit" className="w-full bg-[#C9A96E] text-[#0D0B09] py-4 font-sans text-[13px] uppercase tracking-widest hover:bg-[#F5F0E8] hover:scale-[1.02] transition-all shadow-lg cursor-pointer">
                            Send Enquiry
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
