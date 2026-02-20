(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/config.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Site-wide configuration
__turbopack_context__.s([
    "COLORS",
    ()=>COLORS,
    "SITE_CONFIG",
    ()=>SITE_CONFIG
]);
const SITE_CONFIG = {
    ARUN_PHONE: "918180993030",
    RERA_NUMBER: "PRXXXXXXXXXXXXX",
    ADMIN_EMAIL: "info@aurevonrealty.in",
    LINKEDIN_URL: "https://linkedin.com/in/arundongare-64b486351",
    COMPANY_NAME: "Aurevon Realty Pvt. Ltd.",
    FOUNDED_YEAR: 2001
};
const COLORS = {
    primary: '#0D0B09',
    secondary: '#F5F0E8',
    gold: '#C9A96E',
    terra: '#8B4A2F',
    textLight: '#F5F0E8',
    textDark: '#1A1714',
    textMuted: '#7A7268',
    borderDark: '#2E2A25',
    borderLight: '#D9D0C0',
    whatsappGreen: '#25D366'
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/admin/dashboard/settings/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminSettingsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/config.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const defaultSettings = {
    // Contact & Communication
    whatsappNumber: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_CONFIG"].ARUN_PHONE,
    phoneDisplay: '+91 8180 993 030',
    email: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_CONFIG"].ADMIN_EMAIL,
    alternateEmail: '',
    officeAddress: 'Pune, Maharashtra, India',
    // Legal & Compliance
    reraNumber: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_CONFIG"].RERA_NUMBER,
    gstNumber: '',
    panNumber: '',
    companyName: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_CONFIG"].COMPANY_NAME,
    foundedYear: String(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_CONFIG"].FOUNDED_YEAR),
    // Social Media
    linkedinUrl: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_CONFIG"].LINKEDIN_URL,
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
    consultationNote: 'Free 30-min consultation for NRI investors'
};
function AdminSettingsPage() {
    _s();
    const [settings, setSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultSettings);
    const [saved, setSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('contact');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminSettingsPage.useEffect": ()=>{
            const stored = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('aurevon_settings') : "TURBOPACK unreachable";
            if (stored) {
                setSettings({
                    "AdminSettingsPage.useEffect": (prev)=>({
                            ...prev,
                            ...JSON.parse(stored)
                        })
                }["AdminSettingsPage.useEffect"]);
            }
        }
    }["AdminSettingsPage.useEffect"], []);
    const handleSave = ()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem('aurevon_settings', JSON.stringify(settings));
        }
        setSaved(true);
        setTimeout(()=>setSaved(false), 2000);
    };
    const handleReset = (section)=>{
        const sectionFields = tabs.find((t)=>t.id === section)?.fields.map((f)=>f.key) || [];
        setSettings((prev)=>{
            const updated = {
                ...prev
            };
            sectionFields.forEach((key)=>{
                updated[key] = defaultSettings[key];
            });
            return updated;
        });
    };
    const update = (field, value)=>setSettings((prev)=>({
                ...prev,
                [field]: value
            }));
    const tabs = [
        {
            id: 'contact',
            label: 'Contact & Communication',
            fields: [
                {
                    key: 'whatsappNumber',
                    label: 'WhatsApp Number',
                    hint: 'Country code + number, no spaces or +',
                    placeholder: '918180993030'
                },
                {
                    key: 'phoneDisplay',
                    label: 'Phone Display Text',
                    hint: 'How the phone shows on the website',
                    placeholder: '+91 8180 993 030'
                },
                {
                    key: 'email',
                    label: 'Primary Email',
                    placeholder: 'info@aurevonrealty.in'
                },
                {
                    key: 'alternateEmail',
                    label: 'Alternate Email',
                    placeholder: 'Optional'
                },
                {
                    key: 'officeAddress',
                    label: 'Office Address',
                    placeholder: 'Pune, Maharashtra, India',
                    type: 'textarea'
                },
                {
                    key: 'businessHours',
                    label: 'Business Hours',
                    placeholder: 'Mon–Sat: 10:00 AM – 7:00 PM'
                },
                {
                    key: 'consultationNote',
                    label: 'Consultation Note',
                    placeholder: 'Free 30-min consultation...'
                }
            ]
        },
        {
            id: 'legal',
            label: 'Legal & Compliance',
            fields: [
                {
                    key: 'companyName',
                    label: 'Company Name',
                    placeholder: 'Aurevon Realty Pvt. Ltd.'
                },
                {
                    key: 'foundedYear',
                    label: 'Founded Year',
                    placeholder: '2001'
                },
                {
                    key: 'reraNumber',
                    label: 'RERA Registration Number',
                    placeholder: 'PRXXXXXXXXXXXXX'
                },
                {
                    key: 'gstNumber',
                    label: 'GST Number',
                    placeholder: 'Optional'
                },
                {
                    key: 'panNumber',
                    label: 'PAN Number',
                    placeholder: 'Optional'
                }
            ]
        },
        {
            id: 'social',
            label: 'Social Media',
            fields: [
                {
                    key: 'linkedinUrl',
                    label: 'LinkedIn URL',
                    placeholder: 'https://linkedin.com/in/...'
                },
                {
                    key: 'instagramUrl',
                    label: 'Instagram URL',
                    placeholder: 'https://instagram.com/...'
                },
                {
                    key: 'facebookUrl',
                    label: 'Facebook URL',
                    placeholder: 'https://facebook.com/...'
                },
                {
                    key: 'youtubeUrl',
                    label: 'YouTube URL',
                    placeholder: 'https://youtube.com/...'
                },
                {
                    key: 'twitterUrl',
                    label: 'Twitter / X URL',
                    placeholder: 'https://x.com/...'
                }
            ]
        },
        {
            id: 'founder',
            label: 'Founder Info',
            fields: [
                {
                    key: 'founderName',
                    label: 'Founder Name',
                    placeholder: 'Arun Dongare'
                },
                {
                    key: 'founderTitle',
                    label: 'Title / Role',
                    placeholder: 'Founder & Principal Broker'
                },
                {
                    key: 'founderSubtitle',
                    label: 'Subtitle / Tagline',
                    placeholder: '25 Years of Commercial Real Estate Mastery'
                }
            ]
        },
        {
            id: 'seo',
            label: 'SEO & Branding',
            fields: [
                {
                    key: 'siteTitle',
                    label: 'Page Title (appears in browser tab)',
                    placeholder: 'Aurevon Realty — ...'
                },
                {
                    key: 'siteDescription',
                    label: 'Meta Description',
                    placeholder: 'Site description for search engines',
                    type: 'textarea'
                },
                {
                    key: 'ogTitle',
                    label: 'Open Graph Title (social shares)'
                },
                {
                    key: 'heroHeadline',
                    label: 'Hero Headline',
                    placeholder: 'Where Vision Meets Commerce.'
                },
                {
                    key: 'heroSubtext',
                    label: 'Hero Subtext',
                    type: 'textarea'
                }
            ]
        },
        {
            id: 'announcement',
            label: 'Announcement Banner',
            fields: [
                {
                    key: 'announcementEnabled',
                    label: 'Enable Announcement Banner',
                    type: 'toggle'
                },
                {
                    key: 'announcementText',
                    label: 'Announcement Text',
                    placeholder: 'e.g. New Project Launch: Balewadi IT Hub — Book Now',
                    condition: 'announcementEnabled'
                }
            ]
        }
    ];
    const currentTab = tabs.find((t)=>t.id === activeTab);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-serif text-2xl sm:text-3xl text-[#1A1714]",
                        children: "Site Settings"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                        lineNumber: 145,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSave,
                        className: `flex items-center px-6 py-2.5 rounded text-sm uppercase tracking-wider cursor-pointer transition-all ${saved ? 'bg-green-600 text-white' : 'bg-[#C9A96E] text-[#0D0B09] hover:bg-[#F5F0E8]'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                className: "w-4 h-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                                lineNumber: 151,
                                columnNumber: 21
                            }, this),
                            saved ? 'Saved!' : 'Save All Settings'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                        lineNumber: 146,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                lineNumber: 144,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col lg:flex-row gap-6 max-w-5xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:w-56 shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded shadow border border-[#D9D0C0] overflow-hidden",
                            children: tabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab(tab.id),
                                    className: `w-full text-left px-4 py-3 text-sm font-sans border-b border-[#D9D0C0] last:border-b-0 cursor-pointer transition-colors ${activeTab === tab.id ? 'bg-[#C9A96E]/10 text-[#1A1714] font-medium border-l-2 border-l-[#C9A96E]' : 'text-[#7A7268] hover:text-[#1A1714] hover:bg-[#F5F0E8]/50'}`,
                                    children: tab.label
                                }, tab.id, false, {
                                    fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                                    lineNumber: 161,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                            lineNumber: 159,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                        lineNumber: 158,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 bg-white rounded shadow border border-[#D9D0C0] p-6 sm:p-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-6 pb-4 border-b border-[#D9D0C0]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-serif text-xl text-[#1A1714]",
                                        children: currentTab?.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                                        lineNumber: 176,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleReset(activeTab),
                                        className: "flex items-center text-xs text-[#7A7268] hover:text-[#8B4A2F] cursor-pointer transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                className: "w-3 h-3 mr-1"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                                                lineNumber: 181,
                                                columnNumber: 29
                                            }, this),
                                            " Reset to Default"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                                        lineNumber: 177,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                                lineNumber: 175,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: currentTab?.fields.map((field)=>{
                                    // Skip conditional fields if condition not met
                                    if (field.condition && !settings[field.condition]) return null;
                                    if (field.type === 'toggle') {
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-3 cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `w-11 h-6 rounded-full relative transition-colors ${settings[field.key] ? 'bg-[#C9A96E]' : 'bg-[#D9D0C0]'}`,
                                                    onClick: ()=>update(field.key, !settings[field.key]),
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${settings[field.key] ? 'translate-x-[22px]' : 'translate-x-0.5'}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                                                        lineNumber: 197,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                                                    lineNumber: 193,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-sans text-[#1A1714]",
                                                    children: field.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                                                    lineNumber: 199,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, field.key, true, {
                                            fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                                            lineNumber: 192,
                                            columnNumber: 37
                                        }, this);
                                    }
                                    if (field.type === 'textarea') {
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-xs font-medium text-[#7A7268] uppercase mb-1.5",
                                                    children: field.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                                                    lineNumber: 207,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    className: "w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none resize-none text-sm",
                                                    rows: 3,
                                                    value: settings[field.key],
                                                    onChange: (e)=>update(field.key, e.target.value),
                                                    placeholder: field.placeholder
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                                                    lineNumber: 208,
                                                    columnNumber: 41
                                                }, this),
                                                field.hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-[#7A7268] mt-1",
                                                    children: field.hint
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                                                    lineNumber: 215,
                                                    columnNumber: 56
                                                }, this)
                                            ]
                                        }, field.key, true, {
                                            fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                                            lineNumber: 206,
                                            columnNumber: 37
                                        }, this);
                                    }
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-[#7A7268] uppercase mb-1.5",
                                                children: field.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                                                lineNumber: 222,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                className: "w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none text-sm",
                                                value: settings[field.key],
                                                onChange: (e)=>update(field.key, e.target.value),
                                                placeholder: field.placeholder
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                                                lineNumber: 223,
                                                columnNumber: 37
                                            }, this),
                                            field.hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-[#7A7268] mt-1",
                                                children: field.hint
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                                                lineNumber: 230,
                                                columnNumber: 52
                                            }, this)
                                        ]
                                    }, field.key, true, {
                                        fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                                        lineNumber: 221,
                                        columnNumber: 33
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                                lineNumber: 185,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                        lineNumber: 174,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/dashboard/settings/page.js",
                lineNumber: 156,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/dashboard/settings/page.js",
        lineNumber: 143,
        columnNumber: 9
    }, this);
}
_s(AdminSettingsPage, "rdbogOyHJ22wgpmgR/SJt62wozk=");
_c = AdminSettingsPage;
var _c;
__turbopack_context__.k.register(_c, "AdminSettingsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Save
]);
/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
            key: "1c8476"
        }
    ],
    [
        "path",
        {
            d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",
            key: "1ydtos"
        }
    ],
    [
        "path",
        {
            d: "M7 3v4a1 1 0 0 0 1 1h7",
            key: "t51u73"
        }
    ]
];
const Save = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("save", __iconNode);
;
 //# sourceMappingURL=save.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Save",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>RotateCcw
]);
/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
            key: "1357e3"
        }
    ],
    [
        "path",
        {
            d: "M3 3v5h5",
            key: "1xhq8a"
        }
    ]
];
const RotateCcw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("rotate-ccw", __iconNode);
;
 //# sourceMappingURL=rotate-ccw.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RotateCcw",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_bd8e1265._.js.map