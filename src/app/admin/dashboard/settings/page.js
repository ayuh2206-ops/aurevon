'use client';

import { useEffect, useMemo, useState } from 'react';
import {
    Edit3,
    HelpCircle,
    ImagePlus,
    Loader2,
    Plus,
    RotateCcw,
    Save,
    Star,
    Trash2,
    X,
} from 'lucide-react';
import {
    addFaq,
    addTestimonial,
    deleteFaq,
    deleteTestimonial,
    getContentSettings,
    getFaqs,
    getTestimonials,
    updateContentSettings,
    updateFaq,
    updateTestimonial,
} from '@/lib/firebaseUtils';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { DEFAULT_CONTENT_SETTINGS } from '@/lib/realEstate';
import { BUSINESS } from '@/lib/config';

const fieldGroups = [
    {
        id: 'logo',
        label: 'Logo',
        fields: [
            { key: 'logoUrl', label: 'Logo Image URL', type: 'image', placeholder: 'https://...' },
            { key: 'brandLabel', label: 'Brand Label', placeholder: BUSINESS.businessName },
            { key: 'brandSubtitle', label: 'Brand Subtitle', placeholder: 'REALTY PVT. LTD.' },
        ],
    },
    {
        id: 'hero',
        label: 'Hero',
        fields: [
            { key: 'heroImage', label: 'Hero Background Image', type: 'image', placeholder: 'https://...' },
            { key: 'heroTitle', label: 'Hero Title', placeholder: DEFAULT_CONTENT_SETTINGS.heroTitle },
            { key: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea', placeholder: DEFAULT_CONTENT_SETTINGS.heroSubtitle },
            { key: 'statsPropertiesSold', label: 'Properties / Deals Stat', placeholder: '1,000+' },
            { key: 'statsYearsTrust', label: 'Years Trust Stat', placeholder: '25+' },
            { key: 'statsLitigations', label: 'Disputes Stat', placeholder: 'Zero' },
            { key: 'statsReraCompliant', label: 'Compliance Stat', placeholder: 'Verified' },
        ],
    },
    {
        id: 'about',
        label: 'About',
        fields: [
            { key: 'founderName', label: 'Founder Name', placeholder: BUSINESS.founderName },
            { key: 'founderTitle', label: 'Founder Title', placeholder: 'Founder & Principal Broker' },
            { key: 'founderPhoto', label: 'Founder Photo URL', type: 'image', placeholder: '/images/arun-dongare.png' },
            { key: 'aboutText', label: 'About Text', type: 'textareaLarge', placeholder: DEFAULT_CONTENT_SETTINGS.aboutText },
            { key: 'footerDescription', label: 'Footer Description', type: 'textarea', placeholder: DEFAULT_CONTENT_SETTINGS.footerDescription },
        ],
    },
    {
        id: 'contact',
        label: 'Contact',
        fields: [
            { key: 'contactAddress', label: 'Office Address', type: 'textarea', placeholder: BUSINESS.officeAddress },
            { key: 'contactPhone', label: 'Phone Display', placeholder: BUSINESS.officePhone },
            { key: 'contactEmail', label: 'Email', placeholder: BUSINESS.email },
            { key: 'contactWhatsapp', label: 'WhatsApp Numbers', placeholder: BUSINESS.whatsappNumbers },
            { key: 'contactRera', label: 'License / RERA Number', placeholder: BUSINESS.licenseNumber },
            { key: 'businessHours', label: 'Business Hours', placeholder: 'Mon-Sat: 10:00 AM - 7:00 PM' },
            { key: 'mapEmbedUrl', label: 'Google Maps Embed URL', type: 'textarea', placeholder: 'https://www.google.com/maps/embed?...' },
        ],
    },
    {
        id: 'social',
        label: 'Social',
        fields: [
            { key: 'linkedinUrl', label: 'LinkedIn URL', placeholder: BUSINESS.socialLinks.linkedin },
            { key: 'instagramUrl', label: 'Instagram URL', placeholder: 'https://instagram.com/...' },
            { key: 'facebookUrl', label: 'Facebook URL', placeholder: 'https://facebook.com/...' },
            { key: 'youtubeUrl', label: 'YouTube URL', placeholder: 'https://youtube.com/...' },
        ],
    },
    {
        id: 'seo',
        label: 'SEO',
        fields: [
            { key: 'seoTitle', label: 'Default SEO Title', placeholder: DEFAULT_CONTENT_SETTINGS.seoTitle },
            { key: 'seoDesc', label: 'Default Meta Description', type: 'textarea', placeholder: DEFAULT_CONTENT_SETTINGS.seoDesc, max: 160 },
            { key: 'seoKeywords', label: 'SEO Keywords', type: 'textarea', placeholder: DEFAULT_CONTENT_SETTINGS.seoKeywords },
            { key: 'websiteBaseUrl', label: 'Website Base URL', placeholder: BUSINESS.websiteBaseUrl },
        ],
    },
];

const emptyTestimonial = { name: '', locality: '', rating: 5, text: '' };
const emptyFaq = { question: '', answer: '' };

function groupKeys(groupId) {
    return fieldGroups.find((group) => group.id === groupId)?.fields.map((field) => field.key) || [];
}

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState(DEFAULT_CONTENT_SETTINGS);
    const [testimonials, setTestimonials] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [activeTab, setActiveTab] = useState('logo');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [uploadingField, setUploadingField] = useState('');
    const [savedTab, setSavedTab] = useState('');
    const [error, setError] = useState('');
    const [testimonialForm, setTestimonialForm] = useState(emptyTestimonial);
    const [testimonialEditId, setTestimonialEditId] = useState('');
    const [faqForm, setFaqForm] = useState(emptyFaq);
    const [faqEditId, setFaqEditId] = useState('');

    const currentGroup = useMemo(() => fieldGroups.find((group) => group.id === activeTab), [activeTab]);

    const loadAll = async () => {
        setIsLoading(true);
        setError('');
        try {
            const [content, testimonialItems, faqItems] = await Promise.all([
                getContentSettings(),
                getTestimonials(),
                getFaqs(),
            ]);
            setSettings({ ...DEFAULT_CONTENT_SETTINGS, ...content });
            setTestimonials(testimonialItems);
            setFaqs(faqItems);
        } catch (loadError) {
            console.error(loadError);
            setError('Failed to load site content.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadAll();
    }, []);

    const updateSetting = (field, value) => {
        setSettings((prev) => ({ ...prev, [field]: value }));
    };

    const saveSettings = async (keys = groupKeys(activeTab)) => {
        setIsSaving(true);
        setError('');
        const payload = keys.reduce((acc, key) => {
            acc[key] = settings[key] ?? '';
            return acc;
        }, {});

        try {
            await updateContentSettings(payload);
            setSavedTab(activeTab);
            setTimeout(() => setSavedTab(''), 2000);
        } catch (saveError) {
            console.error(saveError);
            setError('Failed to save settings. Check Firestore permissions.');
        } finally {
            setIsSaving(false);
        }
    };

    const resetGroup = () => {
        const keys = groupKeys(activeTab);
        setSettings((prev) => {
            const next = { ...prev };
            keys.forEach((key) => {
                next[key] = DEFAULT_CONTENT_SETTINGS[key] || '';
            });
            return next;
        });
    };

    const uploadImage = async (field, file) => {
        if (!file) return;
        setUploadingField(field);
        setError('');
        try {
            const url = await uploadToCloudinary(file);
            updateSetting(field, url);
        } catch (uploadError) {
            console.error(uploadError);
            setError(uploadError.message || 'Image upload failed.');
        } finally {
            setUploadingField('');
        }
    };

    const reloadTestimonials = async () => {
        const data = await getTestimonials();
        setTestimonials(data);
    };

    const saveTestimonial = async () => {
        if (!testimonialForm.name.trim() || !testimonialForm.text.trim()) {
            setError('Testimonial name and text are required.');
            return;
        }
        setIsSaving(true);
        setError('');
        try {
            const payload = {
                name: testimonialForm.name.trim(),
                locality: testimonialForm.locality.trim(),
                rating: Number(testimonialForm.rating) || 5,
                text: testimonialForm.text.trim(),
            };
            const editingSample = testimonials.find((item) => item.id === testimonialEditId)?.isSample;
            if (testimonialEditId && !editingSample) await updateTestimonial(testimonialEditId, payload);
            else await addTestimonial(payload);
            setTestimonialForm(emptyTestimonial);
            setTestimonialEditId('');
            await reloadTestimonials();
        } catch (saveError) {
            console.error(saveError);
            setError('Failed to save testimonial.');
        } finally {
            setIsSaving(false);
        }
    };

    const editTestimonial = (item) => {
        setTestimonialForm({
            name: item.name || '',
            locality: item.locality || item.type || '',
            rating: Number(item.rating) || 5,
            text: item.text || item.quote || '',
        });
        setTestimonialEditId(item.id);
    };

    const removeTestimonial = async (item) => {
        if (item.isSample) return;
        if (!confirm(`Delete testimonial from ${item.name}?`)) return;
        setIsSaving(true);
        setError('');
        try {
            await deleteTestimonial(item.id);
            setTestimonials((items) => items.filter((candidate) => candidate.id !== item.id));
        } catch (deleteError) {
            console.error(deleteError);
            setError('Failed to delete testimonial.');
        } finally {
            setIsSaving(false);
        }
    };

    const reloadFaqs = async () => {
        const data = await getFaqs();
        setFaqs(data);
    };

    const saveFaq = async () => {
        if (!faqForm.question.trim() || !faqForm.answer.trim()) {
            setError('FAQ question and answer are required.');
            return;
        }
        setIsSaving(true);
        setError('');
        try {
            const payload = {
                question: faqForm.question.trim(),
                answer: faqForm.answer.trim(),
            };
            const editingSample = faqs.find((item) => item.id === faqEditId)?.isSample;
            if (faqEditId && !editingSample) await updateFaq(faqEditId, payload);
            else await addFaq(payload);
            setFaqForm(emptyFaq);
            setFaqEditId('');
            await reloadFaqs();
        } catch (saveError) {
            console.error(saveError);
            setError('Failed to save FAQ.');
        } finally {
            setIsSaving(false);
        }
    };

    const editFaq = (item) => {
        setFaqForm({
            question: item.question || '',
            answer: item.answer || '',
        });
        setFaqEditId(item.id);
    };

    const removeFaq = async (item) => {
        if (item.isSample) return;
        if (!confirm(`Delete FAQ "${item.question}"?`)) return;
        setIsSaving(true);
        setError('');
        try {
            await deleteFaq(item.id);
            setFaqs((items) => items.filter((candidate) => candidate.id !== item.id));
        } catch (deleteError) {
            console.error(deleteError);
            setError('Failed to delete FAQ.');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#C9A96E]" />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <h2 className="font-serif text-2xl text-[#1A1714] sm:text-3xl">Content Settings</h2>
                    <p className="mt-1 font-sans text-sm text-[#7A7268]">Edit site-wide copy, branding, contact details, testimonials, FAQs, and SEO defaults.</p>
                </div>
                {activeTab !== 'testimonials' && activeTab !== 'faqs' && (
                    <button
                        onClick={() => saveSettings()}
                        disabled={isSaving}
                        className={`flex items-center rounded px-6 py-2.5 font-sans text-xs uppercase tracking-wider transition-colors disabled:opacity-50 ${savedTab === activeTab ? 'bg-green-600 text-white' : 'bg-[#C9A96E] text-[#0D0B09] hover:bg-[#F5F0E8]'}`}
                    >
                        {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        {savedTab === activeTab ? 'Saved' : 'Save Section'}
                    </button>
                )}
            </div>

            {error && <div className="mb-5 rounded border border-red-200 bg-red-50 p-3 font-sans text-sm text-red-700">{error}</div>}

            <div className="flex flex-col gap-6 lg:flex-row">
                <div className="w-full shrink-0 lg:w-64">
                    <div className="overflow-hidden rounded border border-[#D9D0C0] bg-white shadow">
                        {[...fieldGroups, { id: 'testimonials', label: 'Testimonials' }, { id: 'faqs', label: 'FAQs' }].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full border-b border-[#D9D0C0] px-4 py-3 text-left font-sans text-sm transition-colors last:border-b-0 ${activeTab === tab.id ? 'border-l-2 border-l-[#C9A96E] bg-[#C9A96E]/10 font-medium text-[#1A1714]' : 'text-[#7A7268] hover:bg-[#F5F0E8]/50 hover:text-[#1A1714]'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="min-w-0 flex-1">
                    {currentGroup && (
                        <div className="rounded border border-[#D9D0C0] bg-white p-6 shadow sm:p-8">
                            <div className="mb-6 flex items-center justify-between border-b border-[#D9D0C0] pb-4">
                                <h3 className="font-serif text-xl text-[#1A1714]">{currentGroup.label}</h3>
                                <button onClick={resetGroup} className="flex items-center font-sans text-xs uppercase tracking-wider text-[#7A7268] hover:text-[#8B4A2F]">
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    Reset
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {currentGroup.fields.map((field) => {
                                    const value = settings[field.key] || '';
                                    const isLong = field.type === 'textarea' || field.type === 'textareaLarge';
                                    const isWide = isLong || field.type === 'image';
                                    return (
                                        <div key={field.key} className={isWide ? 'md:col-span-2' : ''}>
                                            <label className="mb-2 block font-sans text-xs uppercase tracking-wider text-[#7A7268]">{field.label}</label>
                                            {field.type === 'image' ? (
                                                <div className="space-y-3">
                                                    <div className="flex flex-col gap-3 sm:flex-row">
                                                        <input
                                                            value={value}
                                                            onChange={(event) => updateSetting(field.key, event.target.value)}
                                                            className="flex-1 rounded border border-[#D9D0C0] px-4 py-3 font-sans text-sm outline-none focus:border-[#C9A96E]"
                                                            placeholder={field.placeholder}
                                                        />
                                                        <label className="flex cursor-pointer items-center justify-center rounded border border-[#D9D0C0] px-4 py-3 font-sans text-xs uppercase tracking-wider text-[#7A7268] hover:border-[#C9A96E] hover:text-[#1A1714]">
                                                            {uploadingField === field.key ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ImagePlus className="mr-2 h-4 w-4" />}
                                                            Upload
                                                            <input type="file" accept="image/*" className="hidden" onChange={(event) => uploadImage(field.key, event.target.files?.[0])} />
                                                        </label>
                                                    </div>
                                                    {value && (
                                                        <div className="max-w-md overflow-hidden rounded border border-[#D9D0C0] bg-[#F5F0E8]">
                                                            <img src={value} alt={`${field.label} preview`} className="max-h-56 w-full object-contain" />
                                                        </div>
                                                    )}
                                                </div>
                                            ) : isLong ? (
                                                <>
                                                    <textarea
                                                        value={value}
                                                        onChange={(event) => updateSetting(field.key, event.target.value)}
                                                        rows={field.type === 'textareaLarge' ? 8 : 3}
                                                        className="w-full resize-y rounded border border-[#D9D0C0] px-4 py-3 font-sans text-sm leading-relaxed outline-none focus:border-[#C9A96E]"
                                                        placeholder={field.placeholder}
                                                    />
                                                    {field.max && <p className={`mt-1 font-sans text-xs ${String(value).length > field.max ? 'text-amber-700' : 'text-[#7A7268]'}`}>{String(value).length}/{field.max} characters</p>}
                                                </>
                                            ) : (
                                                <input
                                                    value={value}
                                                    onChange={(event) => updateSetting(field.key, event.target.value)}
                                                    className="w-full rounded border border-[#D9D0C0] px-4 py-3 font-sans text-sm outline-none focus:border-[#C9A96E]"
                                                    placeholder={field.placeholder}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {activeTab === 'testimonials' && (
                        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[380px_1fr]">
                            <div className="rounded border border-[#D9D0C0] bg-white p-6 shadow">
                                <div className="mb-5 flex items-center justify-between">
                                    <h3 className="font-serif text-xl text-[#1A1714]">{testimonialEditId ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
                                    {testimonialEditId && (
                                        <button onClick={() => { setTestimonialEditId(''); setTestimonialForm(emptyTestimonial); }} className="rounded p-2 text-[#7A7268] hover:bg-[#F5F0E8]">
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <input value={testimonialForm.name} onChange={(event) => setTestimonialForm((prev) => ({ ...prev, name: event.target.value }))} placeholder="Client name" className="w-full rounded border border-[#D9D0C0] px-4 py-3 font-sans text-sm outline-none focus:border-[#C9A96E]" />
                                    <input value={testimonialForm.locality} onChange={(event) => setTestimonialForm((prev) => ({ ...prev, locality: event.target.value }))} placeholder="Locality or client type" className="w-full rounded border border-[#D9D0C0] px-4 py-3 font-sans text-sm outline-none focus:border-[#C9A96E]" />
                                    <select value={testimonialForm.rating} onChange={(event) => setTestimonialForm((prev) => ({ ...prev, rating: event.target.value }))} className="w-full rounded border border-[#D9D0C0] bg-white px-4 py-3 font-sans text-sm outline-none focus:border-[#C9A96E]">
                                        {[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} Stars</option>)}
                                    </select>
                                    <textarea value={testimonialForm.text} onChange={(event) => setTestimonialForm((prev) => ({ ...prev, text: event.target.value }))} rows={5} placeholder="Client quote" className="w-full resize-y rounded border border-[#D9D0C0] px-4 py-3 font-sans text-sm outline-none focus:border-[#C9A96E]" />
                                    <button onClick={saveTestimonial} disabled={isSaving} className="flex w-full items-center justify-center rounded bg-[#C9A96E] px-5 py-3 font-sans text-xs uppercase tracking-wider text-[#0D0B09] hover:bg-[#F5F0E8] disabled:opacity-50">
                                        {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                                        {testimonialEditId ? 'Save Testimonial' : 'Add Testimonial'}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {testimonials.map((item) => (
                                    <div key={item.id} className="rounded border border-[#D9D0C0] bg-white p-5 shadow">
                                        <div className="mb-3 flex items-start justify-between gap-4">
                                            <div>
                                                <h4 className="font-serif text-lg text-[#1A1714]">{item.name}</h4>
                                                <p className="font-sans text-xs uppercase tracking-wider text-[#7A7268]">{item.locality || item.type || 'Client'}</p>
                                            </div>
                                            <div className="flex gap-1">
                                                <button onClick={() => editTestimonial(item)} className="rounded p-2 text-[#7A7268] hover:bg-[#F5F0E8] hover:text-[#C9A96E]" title={item.isSample ? 'Use sample as new' : 'Edit'}>
                                                    <Edit3 className="h-4 w-4" />
                                                </button>
                                                <button onClick={() => removeTestimonial(item)} disabled={item.isSample} className="rounded p-2 text-[#7A7268] hover:bg-red-50 hover:text-red-600 disabled:opacity-35" title="Delete">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mb-3 flex gap-1 text-[#C9A96E]">
                                            {Array.from({ length: Number(item.rating) || 5 }).map((_, index) => <Star key={index} className="h-3.5 w-3.5 fill-current" />)}
                                        </div>
                                        <p className="font-sans text-sm leading-relaxed text-[#7A7268]">{item.text || item.quote}</p>
                                        {item.isSample && <p className="mt-3 font-sans text-[10px] uppercase tracking-wider text-[#C9A96E]">Sample fallback</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'faqs' && (
                        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[380px_1fr]">
                            <div className="rounded border border-[#D9D0C0] bg-white p-6 shadow">
                                <div className="mb-5 flex items-center justify-between">
                                    <h3 className="font-serif text-xl text-[#1A1714]">{faqEditId ? 'Edit FAQ' : 'Add FAQ'}</h3>
                                    {faqEditId && (
                                        <button onClick={() => { setFaqEditId(''); setFaqForm(emptyFaq); }} className="rounded p-2 text-[#7A7268] hover:bg-[#F5F0E8]">
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <input value={faqForm.question} onChange={(event) => setFaqForm((prev) => ({ ...prev, question: event.target.value }))} placeholder="Question" className="w-full rounded border border-[#D9D0C0] px-4 py-3 font-sans text-sm outline-none focus:border-[#C9A96E]" />
                                    <textarea value={faqForm.answer} onChange={(event) => setFaqForm((prev) => ({ ...prev, answer: event.target.value }))} rows={6} placeholder="Answer" className="w-full resize-y rounded border border-[#D9D0C0] px-4 py-3 font-sans text-sm outline-none focus:border-[#C9A96E]" />
                                    <button onClick={saveFaq} disabled={isSaving} className="flex w-full items-center justify-center rounded bg-[#C9A96E] px-5 py-3 font-sans text-xs uppercase tracking-wider text-[#0D0B09] hover:bg-[#F5F0E8] disabled:opacity-50">
                                        {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <HelpCircle className="mr-2 h-4 w-4" />}
                                        {faqEditId ? 'Save FAQ' : 'Add FAQ'}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {faqs.map((item) => (
                                    <div key={item.id} className="rounded border border-[#D9D0C0] bg-white p-5 shadow">
                                        <div className="mb-3 flex items-start justify-between gap-4">
                                            <h4 className="font-serif text-lg text-[#1A1714]">{item.question}</h4>
                                            <div className="flex gap-1">
                                                <button onClick={() => editFaq(item)} className="rounded p-2 text-[#7A7268] hover:bg-[#F5F0E8] hover:text-[#C9A96E]" title={item.isSample ? 'Use sample as new' : 'Edit'}>
                                                    <Edit3 className="h-4 w-4" />
                                                </button>
                                                <button onClick={() => removeFaq(item)} disabled={item.isSample} className="rounded p-2 text-[#7A7268] hover:bg-red-50 hover:text-red-600 disabled:opacity-35" title="Delete">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="font-sans text-sm leading-relaxed text-[#7A7268]">{item.answer}</p>
                                        {item.isSample && <p className="mt-3 font-sans text-[10px] uppercase tracking-wider text-[#C9A96E]">Sample fallback</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
