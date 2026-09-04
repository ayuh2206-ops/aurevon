'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, ChevronDown, Mail, MessageCircle, Phone } from 'lucide-react';
import { addLead, getContentSettings } from '@/lib/firebaseUtils';
import {
    DEFAULT_CONTENT_SETTINGS,
    createWhatsAppUrl,
    getPrimaryWhatsapp,
    sanitizePhone,
    trackConversion,
} from '@/lib/realEstate';

const defaultMapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.548890837658!2d73.76493!3d18.57244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b900bfcab5e1%3A0xe6a29f92a7ee8e44!2sAurevon%20Realty!5e0!3m2!1sen!2sin!4v1708416000000!5m2!1sen!2sin';

export default function Contact({ standalone = false }) {
    const [settings, setSettings] = useState(DEFAULT_CONTENT_SETTINGS);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        getContentSettings().then(setSettings).catch(() => {});
    }, []);

    const update = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

    const resetForm = () => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const phoneDigits = sanitizePhone(formData.phone);
        const validEmail = !formData.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

        if (!formData.name.trim() || phoneDigits.length < 8 || !formData.message.trim()) {
            setError('Please enter your name, phone number, and message.');
            return;
        }
        if (!validEmail) {
            setError('Please enter a valid email address or leave it blank.');
            return;
        }

        const lastSubmitted = Number(localStorage.getItem('aurevon_contact_submit_at') || 0);
        if (Date.now() - lastSubmitted < 120000) {
            setError('Your message was recently sent. Please wait a moment before sending again.');
            return;
        }

        setIsSubmitting(true);
        setError('');
        try {
            await addLead({
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                subject: formData.subject.trim(),
                message: formData.message.trim(),
                propertyId: '',
                propertyTitle: 'General Enquiry',
                source: standalone ? 'Contact Page' : 'Homepage Contact Section',
                requestType: 'General Enquiry',
                status: 'New',
            });
            localStorage.setItem('aurevon_contact_submit_at', String(Date.now()));
            trackConversion('contact_lead_submitted', { source: standalone ? 'Contact Page' : 'Homepage Contact Section' });
            setSubmitted(true);
        } catch (err) {
            console.error('Failed to save lead:', err);
            setError('Failed to send enquiry. Please try WhatsApp or call directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const whatsapp = getPrimaryWhatsapp(settings);

    return (
        <section id="contact" className={`${standalone ? 'pt-36' : 'py-24'} border-t border-[#2E2A25] bg-[#0D0B09]`}>
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2">
                <div>
                    <h2 className="mb-12 font-serif text-5xl text-[#F5F0E8] md:text-6xl">Let&apos;s Find Your Space</h2>

                    <div className="mb-12 space-y-3 font-sans text-sm leading-relaxed text-[#F5F0E8]">
                        <p className="mb-4 text-lg font-bold text-[#C9A96E]">AUREVON REALTY PVT. LTD.</p>
                        <p>{settings.contactAddress || DEFAULT_CONTENT_SETTINGS.contactAddress}</p>
                        <p className="mt-6 flex items-center">
                            <Mail className="mr-3 h-4 w-4 text-[#C9A96E]" />
                            <a href={`mailto:${settings.contactEmail}`} className="transition-colors hover:text-[#C9A96E]">
                                {settings.contactEmail}
                            </a>
                        </p>
                        <p className="flex items-center">
                            <MessageCircle className="mr-3 h-4 w-4 text-[#C9A96E]" />
                            <a href={createWhatsAppUrl({ phone: whatsapp, message: 'I would like to schedule a consultation with Aurevon Realty.' })} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#C9A96E]">
                                WhatsApp: +{whatsapp}
                            </a>
                        </p>
                        <p className="flex items-center">
                            <Phone className="mr-3 h-4 w-4 text-[#C9A96E]" />
                            <a href={`tel:${String(settings.contactPhone).replace(/\s/g, '')}`} className="transition-colors hover:text-[#C9A96E]">{settings.contactPhone}</a>
                        </p>
                        <p className="pt-4 font-sans text-xs uppercase tracking-wider text-[#C9A96E]">
                            License: {settings.contactRera || DEFAULT_CONTENT_SETTINGS.contactRera}
                        </p>
                    </div>

                    <div className="h-64 w-full overflow-hidden rounded border border-[#2E2A25]">
                        <iframe
                            src={settings.mapEmbedUrl || defaultMapEmbedUrl}
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

                <div className="rounded border border-[#2E2A25] bg-[#1A1714] p-8 md:p-12">
                    {submitted ? (
                        <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                            <CheckCircle2 className="mb-6 h-16 w-16 text-[#C9A96E]" />
                            <h3 className="mb-3 font-serif text-3xl text-[#F5F0E8]">Message Sent</h3>
                            <p className="max-w-xs font-sans text-sm leading-relaxed text-[#7A7268]">
                                Thank you for reaching out. The advisory team will get back to you shortly.
                            </p>
                            <button
                                onClick={resetForm}
                                className="mt-8 font-sans text-sm uppercase tracking-wider text-[#C9A96E] transition-colors hover:text-[#F5F0E8]"
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <form className="space-y-8" onSubmit={handleSubmit}>
                            {error && (
                                <div className="rounded border border-red-700 bg-red-900/30 p-3 font-sans text-sm text-red-300">
                                    {error}
                                </div>
                            )}

                            <div className="relative group">
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    className="peer w-full border-b border-[#2E2A25] bg-transparent py-2 font-sans text-[#F5F0E8] outline-none transition-colors placeholder-transparent focus:border-[#C9A96E]"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={(event) => update('name', event.target.value)}
                                />
                                <label htmlFor="name" className="absolute -top-4 left-0 font-sans text-xs text-[#7A7268] transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#C9A96E]">Full Name</label>
                            </div>

                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                <div className="relative group">
                                    <input
                                        type="email"
                                        id="email"
                                        className="peer w-full border-b border-[#2E2A25] bg-transparent py-2 font-sans text-[#F5F0E8] outline-none transition-colors placeholder-transparent focus:border-[#C9A96E]"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={(event) => update('email', event.target.value)}
                                    />
                                    <label htmlFor="email" className="absolute -top-4 left-0 font-sans text-xs text-[#7A7268] transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#C9A96E]">Email Address</label>
                                </div>
                                <div className="relative group">
                                    <input
                                        type="tel"
                                        id="phone"
                                        required
                                        className="peer w-full border-b border-[#2E2A25] bg-transparent py-2 font-sans text-[#F5F0E8] outline-none transition-colors placeholder-transparent focus:border-[#C9A96E]"
                                        placeholder="Phone"
                                        value={formData.phone}
                                        onChange={(event) => update('phone', event.target.value)}
                                    />
                                    <label htmlFor="phone" className="absolute -top-4 left-0 font-sans text-xs text-[#7A7268] transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#C9A96E]">Phone / WhatsApp</label>
                                </div>
                            </div>

                            <div className="relative">
                                <label htmlFor="subject" className="sr-only">Subject</label>
                                <select
                                    id="subject"
                                    value={formData.subject}
                                    onChange={(event) => update('subject', event.target.value)}
                                    className="w-full appearance-none border-b border-[#2E2A25] bg-transparent py-2 font-sans text-[#F5F0E8] outline-none focus:border-[#C9A96E]"
                                >
                                    <option value="" className="bg-[#1A1714]">Subject</option>
                                    <option value="Buying Property" className="bg-[#1A1714]">Buying Property</option>
                                    <option value="Renting or Leasing" className="bg-[#1A1714]">Renting or Leasing</option>
                                    <option value="Selling Property" className="bg-[#1A1714]">Selling Property</option>
                                    <option value="NRI Advisory" className="bg-[#1A1714]">NRI Advisory</option>
                                    <option value="Documentation" className="bg-[#1A1714]">Documentation</option>
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-0 top-3 h-4 w-4 text-[#7A7268]" />
                            </div>

                            <div className="relative group">
                                <textarea
                                    id="message"
                                    rows="4"
                                    required
                                    className="peer w-full resize-none border-b border-[#2E2A25] bg-transparent py-2 font-sans text-[#F5F0E8] outline-none transition-colors placeholder-transparent focus:border-[#C9A96E]"
                                    placeholder="Message"
                                    value={formData.message}
                                    onChange={(event) => update('message', event.target.value)}
                                />
                                <label htmlFor="message" className="absolute -top-4 left-0 font-sans text-xs text-[#7A7268] transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#C9A96E]">Message / Requirements</label>
                            </div>

                            <p className="font-sans text-[11px] leading-relaxed text-[#7A7268]">
                                By submitting, you consent to being contacted by phone, email, SMS, or WhatsApp about your enquiry. Listing details should be independently verified before any transaction.
                            </p>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#C9A96E] py-4 font-sans text-[13px] uppercase tracking-widest text-[#0D0B09] shadow-lg shadow-[#C9A96E]/20 transition-all hover:scale-[1.02] hover:bg-[#F5F0E8] disabled:scale-100 disabled:opacity-60"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
