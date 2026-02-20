'use client';
import { useState, useEffect } from 'react';
import { SITE_CONFIG } from '@/lib/config';
import { Save, RotateCcw } from 'lucide-react';

const defaultSettings = {
    // Contact & Communication
    whatsappNumber: SITE_CONFIG.ARUN_PHONE,
    phoneDisplay: '+91 9767 446 655',
    email: SITE_CONFIG.ADMIN_EMAIL,
    alternateEmail: '',
    officeAddress: 'Pune, Maharashtra, India',

    // Legal & Compliance
    reraNumber: SITE_CONFIG.RERA_NUMBER,
    gstNumber: '',
    panNumber: '',
    companyName: SITE_CONFIG.COMPANY_NAME,
    foundedYear: String(SITE_CONFIG.FOUNDED_YEAR),

    // Social Media
    linkedinUrl: SITE_CONFIG.LINKEDIN_URL,
    instagramUrl: '',
    facebookUrl: '',
    youtubeUrl: '',
    twitterUrl: '',

    // Founder Info
    founderName: 'Arun Dongare',
    founderTitle: 'Founder & Principal Broker',
    founderSubtitle: '25 Years of Commercial Real Estate Mastery',

    // SEO & Branding
    siteTitle: 'Aurevon Realty — Premium Commercial Real Estate in Pune',
    siteDescription: "Pune's most trusted commercial real estate partner since 2001.",
    ogTitle: 'Aurevon Realty — Where Vision Meets Commerce',
    heroHeadline: 'Where Vision Meets Commerce.',
    heroSubtext: '25 years of curating exceptional commercial properties across India — offices, retail, co-working. 1,000+ deals closed. 8%+ average yields. RERA registered.',

    // Announcement Banner
    announcementEnabled: false,
    announcementText: '',

    // Business Hours
    businessHours: 'Mon–Sat: 10:00 AM – 7:00 PM',
    consultationNote: 'Free 30-min consultation for NRI investors',
};

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState(defaultSettings);
    const [saved, setSaved] = useState(false);
    const [activeTab, setActiveTab] = useState('contact');

    useEffect(() => {
        const stored = typeof window !== 'undefined' ? localStorage.getItem('aurevon_settings') : null;
        if (stored) {
            setSettings(prev => ({ ...prev, ...JSON.parse(stored) }));
        }
    }, []);

    const handleSave = () => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('aurevon_settings', JSON.stringify(settings));
        }
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleReset = (section) => {
        const sectionFields = tabs.find(t => t.id === section)?.fields.map(f => f.key) || [];
        setSettings(prev => {
            const updated = { ...prev };
            sectionFields.forEach(key => { updated[key] = defaultSettings[key]; });
            return updated;
        });
    };

    const update = (field, value) => setSettings(prev => ({ ...prev, [field]: value }));

    const tabs = [
        {
            id: 'contact', label: 'Contact & Communication',
            fields: [
                { key: 'whatsappNumber', label: 'WhatsApp Number', hint: 'Country code + number, no spaces or +', placeholder: '918180993030' },
                { key: 'phoneDisplay', label: 'Phone Display Text', hint: 'How the phone shows on the website', placeholder: '+91 9767 446 655' },
                { key: 'email', label: 'Primary Email', placeholder: 'info@aurevonrealty.in' },
                { key: 'alternateEmail', label: 'Alternate Email', placeholder: 'Optional' },
                { key: 'officeAddress', label: 'Office Address', placeholder: 'Pune, Maharashtra, India', type: 'textarea' },
                { key: 'businessHours', label: 'Business Hours', placeholder: 'Mon–Sat: 10:00 AM – 7:00 PM' },
                { key: 'consultationNote', label: 'Consultation Note', placeholder: 'Free 30-min consultation...' },
            ]
        },
        {
            id: 'legal', label: 'Legal & Compliance',
            fields: [
                { key: 'companyName', label: 'Company Name', placeholder: 'Aurevon Realty Pvt. Ltd.' },
                { key: 'foundedYear', label: 'Founded Year', placeholder: '2001' },
                { key: 'reraNumber', label: 'RERA Registration Number', placeholder: 'PRXXXXXXXXXXXXX' },
                { key: 'gstNumber', label: 'GST Number', placeholder: 'Optional' },
                { key: 'panNumber', label: 'PAN Number', placeholder: 'Optional' },
            ]
        },
        {
            id: 'social', label: 'Social Media',
            fields: [
                { key: 'linkedinUrl', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/...' },
                { key: 'instagramUrl', label: 'Instagram URL', placeholder: 'https://instagram.com/...' },
                { key: 'facebookUrl', label: 'Facebook URL', placeholder: 'https://facebook.com/...' },
                { key: 'youtubeUrl', label: 'YouTube URL', placeholder: 'https://youtube.com/...' },
                { key: 'twitterUrl', label: 'Twitter / X URL', placeholder: 'https://x.com/...' },
            ]
        },
        {
            id: 'founder', label: 'Founder Info',
            fields: [
                { key: 'founderName', label: 'Founder Name', placeholder: 'Arun Dongare' },
                { key: 'founderTitle', label: 'Title / Role', placeholder: 'Founder & Principal Broker' },
                { key: 'founderSubtitle', label: 'Subtitle / Tagline', placeholder: '25 Years of Commercial Real Estate Mastery' },
            ]
        },
        {
            id: 'seo', label: 'SEO & Branding',
            fields: [
                { key: 'siteTitle', label: 'Page Title (appears in browser tab)', placeholder: 'Aurevon Realty — ...' },
                { key: 'siteDescription', label: 'Meta Description', placeholder: 'Site description for search engines', type: 'textarea' },
                { key: 'ogTitle', label: 'Open Graph Title (social shares)' },
                { key: 'heroHeadline', label: 'Hero Headline', placeholder: 'Where Vision Meets Commerce.' },
                { key: 'heroSubtext', label: 'Hero Subtext', type: 'textarea' },
            ]
        },
        {
            id: 'announcement', label: 'Announcement Banner',
            fields: [
                { key: 'announcementEnabled', label: 'Enable Announcement Banner', type: 'toggle' },
                { key: 'announcementText', label: 'Announcement Text', placeholder: 'e.g. New Project Launch: Balewadi IT Hub — Book Now', condition: 'announcementEnabled' },
            ]
        },
    ];

    const currentTab = tabs.find(t => t.id === activeTab);

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1714]">Site Settings</h2>
                <button
                    onClick={handleSave}
                    className={`flex items-center px-6 py-2.5 rounded text-sm uppercase tracking-wider cursor-pointer transition-all ${saved ? 'bg-green-600 text-white' : 'bg-[#C9A96E] text-[#0D0B09] hover:bg-[#F5F0E8]'
                        }`}
                >
                    <Save className="w-4 h-4 mr-2" />
                    {saved ? 'Saved!' : 'Save All Settings'}
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 max-w-5xl">
                {/* Sidebar Tabs */}
                <div className="lg:w-56 shrink-0">
                    <div className="bg-white rounded shadow border border-[#D9D0C0] overflow-hidden">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full text-left px-4 py-3 text-sm font-sans border-b border-[#D9D0C0] last:border-b-0 cursor-pointer transition-colors ${activeTab === tab.id ? 'bg-[#C9A96E]/10 text-[#1A1714] font-medium border-l-2 border-l-[#C9A96E]' : 'text-[#7A7268] hover:text-[#1A1714] hover:bg-[#F5F0E8]/50'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded shadow border border-[#D9D0C0] p-6 sm:p-8">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#D9D0C0]">
                        <h3 className="font-serif text-xl text-[#1A1714]">{currentTab?.label}</h3>
                        <button
                            onClick={() => handleReset(activeTab)}
                            className="flex items-center text-xs text-[#7A7268] hover:text-[#8B4A2F] cursor-pointer transition-colors"
                        >
                            <RotateCcw className="w-3 h-3 mr-1" /> Reset to Default
                        </button>
                    </div>

                    <div className="space-y-6">
                        {currentTab?.fields.map(field => {
                            // Skip conditional fields if condition not met
                            if (field.condition && !settings[field.condition]) return null;

                            if (field.type === 'toggle') {
                                return (
                                    <label key={field.key} className="flex items-center gap-3 cursor-pointer">
                                        <div
                                            className={`w-11 h-6 rounded-full relative transition-colors ${settings[field.key] ? 'bg-[#C9A96E]' : 'bg-[#D9D0C0]'}`}
                                            onClick={() => update(field.key, !settings[field.key])}
                                        >
                                            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${settings[field.key] ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
                                        </div>
                                        <span className="text-sm font-sans text-[#1A1714]">{field.label}</span>
                                    </label>
                                );
                            }

                            if (field.type === 'textarea') {
                                return (
                                    <div key={field.key}>
                                        <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1.5">{field.label}</label>
                                        <textarea
                                            className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none resize-none text-sm"
                                            rows={3}
                                            value={settings[field.key]}
                                            onChange={e => update(field.key, e.target.value)}
                                            placeholder={field.placeholder}
                                        />
                                        {field.hint && <p className="text-[10px] text-[#7A7268] mt-1">{field.hint}</p>}
                                    </div>
                                );
                            }

                            return (
                                <div key={field.key}>
                                    <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1.5">{field.label}</label>
                                    <input
                                        type="text"
                                        className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none text-sm"
                                        value={settings[field.key]}
                                        onChange={e => update(field.key, e.target.value)}
                                        placeholder={field.placeholder}
                                    />
                                    {field.hint && <p className="text-[10px] text-[#7A7268] mt-1">{field.hint}</p>}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
