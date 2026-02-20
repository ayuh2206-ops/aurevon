(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/data.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Mock data for properties, testimonials, cities, services, and blog articles
__turbopack_context__.s([
    "blogArticles",
    ()=>blogArticles,
    "cities",
    ()=>cities,
    "initialProperties",
    ()=>initialProperties,
    "nriProcessSteps",
    ()=>nriProcessSteps,
    "services",
    ()=>services,
    "stats",
    ()=>stats,
    "testimonials",
    ()=>testimonials
]);
const initialProperties = [
    {
        id: 'AR-2024-001',
        name: 'Balewadi Tech Corridor',
        type: 'Commercial',
        subtype: 'Office Space',
        locality: 'Balewadi',
        city: 'Pune',
        priceDisplay: '₹45L–1.2Cr',
        bhk: 'Commercial',
        sqft: '500-1500',
        status: 'Ready to Move',
        yield: '8.2%',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        featured: true,
        nriFriendly: true,
        active: true,
        shortDescription: 'High-yield commercial spaces in Balewadi tech hub.',
        fullDescription: 'Strategically positioned in the heart of Balewadi\'s IT belt, this Grade-A commercial complex offers plug-and-play office spaces with premium specifications. Surrounded by leading IT companies and minutes from the Pune–Mumbai Expressway, these units are ideal for startups, SMEs, and NRI investors seeking stable 8%+ rental yields.',
        gallery: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: [
            'Lift',
            'Covered Parking',
            'Security (24/7)',
            'CCTV',
            'Power Backup',
            'High-Speed Internet',
            'Conference Room',
            'Cafeteria',
            'Fire Safety'
        ],
        highlights: [
            '8.2% Rental Yield',
            'Near Pune-Mumbai Expressway',
            'Grade-A Specifications',
            'Ready to Move'
        ],
        floor: 'Ground + 12',
        facing: 'East',
        parking: '1 Covered',
        furnishing: 'Warm Shell',
        possession: 'Immediate',
        constructionStatus: 'Completed',
        reraId: 'PR-XXXXX-001',
        pricePerSqft: '₹8,500/sqft',
        maintenanceCharge: '₹5/sqft/month'
    },
    {
        id: 'AR-2024-002',
        name: 'Kharadi Business Hub',
        type: 'Commercial',
        subtype: 'Office Space',
        locality: 'Kharadi',
        city: 'Pune',
        priceDisplay: '₹60L+',
        bhk: 'Commercial',
        sqft: '800-2000',
        status: 'Ready to Move',
        yield: '9.0%',
        image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80',
        featured: true,
        nriFriendly: true,
        active: true,
        shortDescription: 'Premium commercial office space with 9% yield.',
        fullDescription: 'Located in Pune\'s fastest-growing IT corridor, Kharadi Business Hub offers world-class office spaces with modern infrastructure and excellent connectivity. With EON IT Park and World Trade Center in proximity, these spaces command premium rental rates and boast a consistent 9% yield — one of the highest in Pune.',
        gallery: [
            'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: [
            'Lift',
            'Covered Parking',
            'Visitor Parking',
            'Security (24/7)',
            'CCTV',
            'Power Backup',
            'High-Speed Internet',
            'Reception/Lobby',
            'Air Conditioning',
            'Server Room'
        ],
        highlights: [
            '9.0% Rental Yield',
            'Near EON IT Park',
            'Multi-national Tenants',
            'Pre-Leased Available'
        ],
        floor: 'Ground + 18',
        facing: 'North-East',
        parking: '2 Covered',
        furnishing: 'Fully Fitted',
        possession: 'Immediate',
        constructionStatus: 'Completed',
        reraId: 'PR-XXXXX-002',
        pricePerSqft: '₹9,200/sqft',
        maintenanceCharge: '₹6/sqft/month'
    },
    {
        id: 'AR-2024-003',
        name: 'Hinjewadi IT Park Plaza',
        type: 'Commercial',
        subtype: 'Office Space',
        locality: 'Hinjewadi',
        city: 'Pune',
        priceDisplay: '₹35L–90L',
        bhk: 'Commercial',
        sqft: '400-1200',
        status: 'Under Construction',
        yield: '8.5%',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        featured: true,
        nriFriendly: true,
        active: true,
        shortDescription: 'IT park office spaces in Pune\'s largest tech corridor.',
        fullDescription: 'Hinjewadi IT Park Plaza is a landmark commercial development in the heart of Pune\'s largest IT hub. With Phase 1, 2, and 3 of Rajiv Gandhi Infotech Park at your doorstep, this project offers early-bird pricing with guaranteed appreciation. Ideal for IT/ITES companies, co-working operators, and investors looking for long-term growth.',
        gallery: [
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: [
            'Lift',
            'Covered Parking',
            'Security (24/7)',
            'Power Backup',
            'UPS/Generator',
            'Fire Safety',
            'Cafeteria',
            'ATM',
            'Metro Nearby'
        ],
        highlights: [
            '8.5% Expected Yield',
            'Rajiv Gandhi Infotech Park',
            'Metro Line Upcoming',
            'Early-Bird Pricing'
        ],
        floor: 'Ground + 22',
        facing: 'West',
        parking: '1 Covered + 1 Open',
        furnishing: 'Bare Shell',
        possession: 'Dec 2026',
        constructionStatus: 'Under Construction',
        reraId: 'PR-XXXXX-003',
        pricePerSqft: '₹7,200/sqft',
        maintenanceCharge: '₹4.5/sqft/month'
    },
    {
        id: 'AR-2024-004',
        name: 'Baner High Street Retail',
        type: 'Commercial',
        subtype: 'Retail/Shop',
        locality: 'Baner',
        city: 'Pune',
        priceDisplay: '₹75L–2.5Cr',
        bhk: 'Commercial',
        sqft: '300-2000',
        status: 'Ready to Move',
        yield: '7.8%',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
        featured: true,
        nriFriendly: false,
        active: true,
        shortDescription: 'Prime high-street retail spaces in Baner\'s busiest corridor.',
        fullDescription: 'Baner High Street offers the most premium retail frontage in Pune\'s upscale Baner neighbourhood. With 40,000+ daily footfall, proximity to IT parks, and a rapidly growing residential catchment, these retail spaces are perfect for brand showrooms, F&B outlets, clinics, and lifestyle stores. Ground and first-floor units available.',
        gallery: [
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1567449303078-57ad995bd329?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: [
            'Covered Parking',
            'Visitor Parking',
            'Security (24/7)',
            'CCTV',
            'Power Backup',
            'Signage Rights',
            'Loading Dock',
            'Fire Safety'
        ],
        highlights: [
            '7.8% Rental Yield',
            '40,000+ Daily Footfall',
            'Ground Floor Available',
            'High-Street Location'
        ],
        floor: 'Ground + 3',
        facing: 'South',
        parking: '2 Open',
        furnishing: 'Bare Shell',
        possession: 'Immediate',
        constructionStatus: 'Completed',
        reraId: 'PR-XXXXX-004',
        pricePerSqft: '₹12,000/sqft',
        maintenanceCharge: '₹8/sqft/month'
    },
    {
        id: 'AR-2024-005',
        name: 'Wakad Commercial Complex',
        type: 'Commercial',
        subtype: 'Office Space',
        locality: 'Wakad',
        city: 'Pune',
        priceDisplay: '₹50L–1.5Cr',
        bhk: 'Commercial',
        sqft: '600-1800',
        status: 'New Launch',
        yield: '8.8%',
        image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=800&q=80',
        featured: true,
        nriFriendly: true,
        active: true,
        shortDescription: 'New launch commercial complex with premium amenities.',
        fullDescription: 'A brand-new commercial landmark in Wakad, one of Pune\'s most vibrant suburbs. This complex features contemporary design, world-class amenities, and flexible floor plates suitable for offices of all sizes. With Hinjewadi IT Park just 10 minutes away and the Mumbai-Pune Expressway within reach, this is a compelling investment opportunity at launch pricing.',
        gallery: [
            'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: [
            'Lift',
            'Covered Parking',
            'Security (24/7)',
            'CCTV',
            'Power Backup',
            'High-Speed Internet',
            'Conference Room',
            'Pantry',
            'Reception/Lobby',
            'Air Conditioning'
        ],
        highlights: [
            '8.8% Expected Yield',
            'Launch Pricing',
            '10 Min to Hinjewadi',
            'Flexible Floor Plates'
        ],
        floor: 'Ground + 15',
        facing: 'North',
        parking: '1 Covered',
        furnishing: 'Warm Shell',
        possession: 'Mar 2027',
        constructionStatus: 'New Launch',
        reraId: 'PR-XXXXX-005',
        pricePerSqft: '₹7,800/sqft',
        maintenanceCharge: '₹5.5/sqft/month'
    },
    {
        id: 'AR-2024-006',
        name: 'Viman Nagar Business Centre',
        type: 'Commercial',
        subtype: 'Co-Working',
        locality: 'Viman Nagar',
        city: 'Pune',
        priceDisplay: '₹40L–80L',
        bhk: 'Commercial',
        sqft: '350-1000',
        status: 'Ready to Move',
        yield: '9.2%',
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
        featured: true,
        nriFriendly: true,
        active: true,
        shortDescription: 'Fully equipped co-working and flexi-office spaces.',
        fullDescription: 'Viman Nagar Business Centre is the ultimate co-working and managed office destination in Pune. Located minutes from the airport and Phoenix Marketcity, this space is fully equipped with modern workstations, meeting rooms, high-speed internet, and 24/7 access. With a thriving 9.2% yield and minimal vacancy rates, it\'s the top choice for passive income investors.',
        gallery: [
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: [
            'Lift',
            'Covered Parking',
            'Security (24/7)',
            'High-Speed Internet',
            'Conference Room',
            'Cafeteria',
            'Pantry',
            'Reception/Lobby',
            'Air Conditioning',
            'UPS/Generator'
        ],
        highlights: [
            '9.2% Rental Yield',
            'Near Pune Airport',
            'Fully Equipped',
            'Zero Vacancy Currently'
        ],
        floor: 'Ground + 8',
        facing: 'East',
        parking: '1 Covered',
        furnishing: 'Fully Fitted',
        possession: 'Immediate',
        constructionStatus: 'Completed',
        reraId: 'PR-XXXXX-006',
        pricePerSqft: '₹8,000/sqft',
        maintenanceCharge: '₹7/sqft/month'
    }
];
const testimonials = [
    {
        quote: "Best commercial property deal I've made. The yield on our Kharadi office space is consistently above 9%. Arun's market intelligence is unmatched.",
        name: "Vikram Singhania",
        type: "Commercial Investor"
    },
    {
        quote: "Arun helped us secure office space in Hinjewadi while we were based in the UK. The entire process was seamless — from virtual tours to registration.",
        name: "Priya & Rohan Mehta",
        type: "NRI Investors"
    },
    {
        quote: "25 years of experience shows in every detail. Our retail space in Baner has been generating consistent returns. Full transparency, zero surprises.",
        name: "Sneha Kulkarni",
        type: "Retail Investor, Pune"
    }
];
const cities = {
    'PUNE': [
        'Baner',
        'Balewadi',
        'Wakad',
        'Viman Nagar',
        'Kharadi',
        'Hinjewadi',
        'Kothrud',
        'Aundh'
    ],
    'MUMBAI': [
        'Thane',
        'Navi Mumbai',
        'Panvel',
        'BKC',
        'Lower Parel'
    ],
    'BANGALORE': [
        'Whitefield',
        'Electronic City',
        'Sarjapur',
        'Koramangala'
    ]
};
const services = [
    {
        title: "Office Space Sales",
        desc: "Premium office spaces, IT parks & co-working setups in Pune's key commercial corridors.",
        iconName: "Building2"
    },
    {
        title: "Retail & Shop Leasing",
        desc: "High-street retail, showrooms & commercial shops with strong footfall potential.",
        iconName: "Store"
    },
    {
        title: "NRI Commercial Advisory",
        desc: "Remote commercial property acquisition with virtual tours & legal coordination.",
        iconName: "Globe"
    },
    {
        title: "Yield & ROI Analysis",
        desc: "Data-driven market assessment and rental yield projections using 25 years of local intelligence.",
        iconName: "TrendingUp"
    },
    {
        title: "Documentation & RERA",
        desc: "End-to-end paperwork, agreement drafting, legal & RERA compliance for commercial deals.",
        iconName: "FileText"
    },
    {
        title: "Post-Sale Management",
        desc: "Tenant acquisition, lease management, and property maintenance coordination.",
        iconName: "CheckCircle2"
    }
];
const blogArticles = [
    {
        category: "Market Insights",
        title: "Why Pune's Commercial Corridors Are Outperforming Every Other Asset Class in 2025",
        excerpt: "With consistent 8-9% yields and rising demand from IT & startups, Pune's commercial real estate is on an unprecedented run."
    },
    {
        category: "NRI Guide",
        title: "NRI Guide: Investing in Indian Commercial Real Estate — Rules, Taxes & Best Locations",
        excerpt: "Everything non-resident Indians need to know about FEMA regulations, taxation, and the smartest commercial markets to invest in."
    },
    {
        category: "Investment",
        title: "Office vs Retail: Which Commercial Property Type Delivers Better Returns in Pune?",
        excerpt: "A deep-dive comparison of office space yields vs retail investments across Pune's top micro-markets."
    }
];
const nriProcessSteps = [
    {
        step: 1,
        title: "Consultation Call (Free)",
        desc: "Discuss budget, preferred commercial zones, and investment goals."
    },
    {
        step: 2,
        title: "Virtual Property Shortlisting",
        desc: "Curated list of commercial properties with high-res virtual walkthroughs."
    },
    {
        step: 3,
        title: "Legal Due Diligence",
        desc: "Our legal team verifies all titles, RERA approvals, and lease structures."
    },
    {
        step: 4,
        title: "Agreement & Payment",
        desc: "Secure digital signatures and guided forex routing for NRI investors."
    },
    {
        step: 5,
        title: "Registration & Handover",
        desc: "Power of Attorney registration, tenant acquisition, and property management."
    }
];
const stats = [
    {
        num: "1,000+",
        label: "Successful Deals"
    },
    {
        num: "25+",
        label: "Years Experience"
    },
    {
        num: "8%+",
        label: "Avg. Yield on Commercial"
    },
    {
        num: "Pan-India",
        label: "Markets Covered"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
"[project]/src/app/properties/[id]/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PropertyDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/car.js [app-client] (ecmascript) <export default as Car>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/compass.js [app-client] (ecmascript) <export default as Compass>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/config.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function PropertyDetailPage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const [property, setProperty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeImage, setActiveImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PropertyDetailPage.useEffect": ()=>{
            // Check localStorage first (for admin-added properties), then fall back to initialProperties
            const stored = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('aurevon_properties') : "TURBOPACK unreachable";
            const allProperties = stored ? [
                ...JSON.parse(stored),
                ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialProperties"]
            ] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialProperties"];
            const found = allProperties.find({
                "PropertyDetailPage.useEffect.found": (p)=>p.id === params.id
            }["PropertyDetailPage.useEffect.found"]);
            setProperty(found || null);
            setLoading(false);
        }
    }["PropertyDetailPage.useEffect"], [
        params.id
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-[#0D0B09] flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-10 h-10 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin"
            }, void 0, false, {
                fileName: "[project]/src/app/properties/[id]/page.js",
                lineNumber: 30,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/properties/[id]/page.js",
            lineNumber: 29,
            columnNumber: 13
        }, this);
    }
    if (!property) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-[#0D0B09] flex flex-col items-center justify-center text-center px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "font-serif text-4xl text-[#F5F0E8] mb-4",
                    children: "Property Not Found"
                }, void 0, false, {
                    fileName: "[project]/src/app/properties/[id]/page.js",
                    lineNumber: 38,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-sans text-[#7A7268] mb-8",
                    children: "The listing you're looking for doesn't exist or has been removed."
                }, void 0, false, {
                    fileName: "[project]/src/app/properties/[id]/page.js",
                    lineNumber: 39,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/#properties",
                    className: "bg-[#C9A96E] text-[#0D0B09] px-8 py-3 font-sans text-xs uppercase tracking-widest hover:bg-[#F5F0E8] transition-colors",
                    children: "Browse All Properties"
                }, void 0, false, {
                    fileName: "[project]/src/app/properties/[id]/page.js",
                    lineNumber: 40,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/properties/[id]/page.js",
            lineNumber: 37,
            columnNumber: 13
        }, this);
    }
    const whatsappMessage = `Hi Arun, I'm interested in the following commercial property listed on Aurevon Realty:\n\n🏢 *${property.name}*\n📍 ${property.locality}, ${property.city}\n📐 ${property.sqft} sqft\n💰 ${property.priceDisplay}\n📈 Yield: ${property.yield || 'N/A'}\n✅ ${property.status}\n🔖 Listing ID: ${property.id}\n\nI found this listing on your website and would like to know more. Could you please share:\n— Floor plans & specifications\n— Payment schedule\n— Site visit availability\n\nThank you!`;
    const whatsappUrl = `https://wa.me/${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_CONFIG"].ARUN_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;
    const gallery = property.gallery || [
        property.image
    ];
    const amenities = property.amenities || [];
    const highlights = property.highlights || [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#F5F0E8]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky top-0 z-50 bg-[#0D0B09]/95 backdrop-blur-lg border-b border-[#2E2A25]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/#properties",
                            className: "flex items-center text-[#C9A96E] hover:text-[#F5F0E8] transition-colors text-sm font-sans",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    className: "w-4 h-4 mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                    lineNumber: 61,
                                    columnNumber: 25
                                }, this),
                                " Back to Listings"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/properties/[id]/page.js",
                            lineNumber: 60,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden md:block text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-serif text-[#F5F0E8] text-sm",
                                    children: property.name
                                }, void 0, false, {
                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                    lineNumber: 64,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[#7A7268] mx-2",
                                    children: "·"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                    lineNumber: 65,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[#C9A96E] text-sm font-sans",
                                    children: property.id
                                }, void 0, false, {
                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                    lineNumber: 66,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/properties/[id]/page.js",
                            lineNumber: 63,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "w-9 h-9 rounded-full bg-[#2E2A25] flex items-center justify-center text-[#7A7268] hover:text-[#C9A96E] transition-colors cursor-pointer",
                                    title: "Share",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/properties/[id]/page.js",
                                        lineNumber: 70,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                    lineNumber: 69,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "w-9 h-9 rounded-full bg-[#2E2A25] flex items-center justify-center text-[#7A7268] hover:text-red-400 transition-colors cursor-pointer",
                                    title: "Save",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/properties/[id]/page.js",
                                        lineNumber: 73,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                    lineNumber: 72,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/properties/[id]/page.js",
                            lineNumber: 68,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/properties/[id]/page.js",
                    lineNumber: 59,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/properties/[id]/page.js",
                lineNumber: 58,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#0D0B09]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-4 gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:col-span-3 relative aspect-[16/9] md:aspect-[16/10] overflow-hidden cursor-pointer",
                                    onClick: ()=>setActiveImage(0),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: gallery[activeImage],
                                            alt: property.name,
                                            className: "w-full h-full object-cover transition-all duration-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/properties/[id]/page.js",
                                            lineNumber: 85,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/properties/[id]/page.js",
                                            lineNumber: 90,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute bottom-6 left-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "bg-[#8B4A2F] text-[#F5F0E8] font-sans text-[10px] uppercase px-3 py-1 rounded-full tracking-wider",
                                                    children: property.subtype
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                                    lineNumber: 92,
                                                    columnNumber: 33
                                                }, this),
                                                property.nriFriendly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-2 bg-[#0D0B09]/80 backdrop-blur text-[#C9A96E] border border-[#C9A96E] font-sans text-[10px] uppercase px-3 py-1 rounded-full tracking-wider",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                            className: "w-3 h-3 inline mr-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/properties/[id]/page.js",
                                                            lineNumber: 97,
                                                            columnNumber: 41
                                                        }, this),
                                                        " NRI Pick"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                                    lineNumber: 96,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/properties/[id]/page.js",
                                            lineNumber: 91,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                    lineNumber: 84,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden md:flex md:flex-col gap-1",
                                    children: gallery.slice(1, 4).map((img, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `relative aspect-[4/3] overflow-hidden cursor-pointer group ${activeImage === i + 1 ? 'ring-2 ring-[#C9A96E]' : ''}`,
                                            onClick: ()=>setActiveImage(i + 1),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: img,
                                                    alt: `View ${i + 2}`,
                                                    className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                                    lineNumber: 110,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                                    lineNumber: 111,
                                                    columnNumber: 37
                                                }, this),
                                                i === 2 && gallery.length > 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute inset-0 bg-black/50 flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white font-sans text-sm",
                                                        children: [
                                                            "+",
                                                            gallery.length - 4,
                                                            " more"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/properties/[id]/page.js",
                                                        lineNumber: 114,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                                    lineNumber: 113,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/app/properties/[id]/page.js",
                                            lineNumber: 105,
                                            columnNumber: 33
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                    lineNumber: 103,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/properties/[id]/page.js",
                            lineNumber: 82,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex md:hidden gap-2 p-3 overflow-x-auto",
                            children: gallery.map((img, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveImage(i),
                                    className: `shrink-0 w-16 h-12 rounded overflow-hidden border-2 cursor-pointer ${activeImage === i ? 'border-[#C9A96E]' : 'border-transparent opacity-60'}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: img,
                                        alt: "",
                                        className: "w-full h-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/properties/[id]/page.js",
                                        lineNumber: 129,
                                        columnNumber: 33
                                    }, this)
                                }, i, false, {
                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                    lineNumber: 124,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/properties/[id]/page.js",
                            lineNumber: 122,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/properties/[id]/page.js",
                    lineNumber: 81,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/properties/[id]/page.js",
                lineNumber: 80,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 md:px-6 py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-3 gap-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-2 space-y-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-[#7A7268] font-sans text-sm mb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                    className: "w-4 h-4 text-[#C9A96E]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                                    lineNumber: 145,
                                                    columnNumber: 33
                                                }, this),
                                                property.locality,
                                                ", ",
                                                property.city,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "mx-1",
                                                    children: "·"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                                    lineNumber: 147,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#C9A96E]",
                                                    children: property.status
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                                    lineNumber: 148,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/properties/[id]/page.js",
                                            lineNumber: 144,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1714] leading-tight mb-4",
                                            children: property.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/properties/[id]/page.js",
                                            lineNumber: 150,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-sans text-lg text-[#7A7268] leading-relaxed",
                                            style: {
                                                fontFamily: "'Inter', sans-serif"
                                            },
                                            children: property.shortDescription
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/properties/[id]/page.js",
                                            lineNumber: 151,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                    lineNumber: 143,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 md:grid-cols-4 gap-4",
                                    children: [
                                        {
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"],
                                            label: 'Type',
                                            value: property.subtype
                                        },
                                        {
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"],
                                            label: 'Area',
                                            value: `${property.sqft} sqft`
                                        },
                                        {
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
                                            label: 'Yield',
                                            value: property.yield || 'N/A'
                                        },
                                        {
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"],
                                            label: 'Possession',
                                            value: property.possession || property.status
                                        }
                                    ].map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white p-5 border border-[#D9D0C0] text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(m.icon, {
                                                    className: "w-5 h-5 text-[#C9A96E] mx-auto mb-2",
                                                    strokeWidth: 1.5
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                                    lineNumber: 165,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-sans text-[10px] uppercase tracking-wider text-[#7A7268] mb-1",
                                                    children: m.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                                    lineNumber: 166,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-serif text-lg text-[#1A1714]",
                                                    children: m.value
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                                    lineNumber: 167,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/app/properties/[id]/page.js",
                                            lineNumber: 164,
                                            columnNumber: 33
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                    lineNumber: 157,
                                    columnNumber: 25
                                }, this),
                                highlights.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-3",
                                    children: highlights.map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex items-center gap-1.5 bg-[#C9A96E]/10 border border-[#C9A96E]/30 px-4 py-2 rounded-full font-sans text-sm text-[#1A1714]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                    className: "w-4 h-4 text-[#C9A96E]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                                    lineNumber: 177,
                                                    columnNumber: 41
                                                }, this),
                                                " ",
                                                h
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/app/properties/[id]/page.js",
                                            lineNumber: 176,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                    lineNumber: 174,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "font-serif text-2xl text-[#1A1714] mb-4",
                                            children: "About This Property"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/properties/[id]/page.js",
                                            lineNumber: 185,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-sans text-base text-[#7A7268] leading-relaxed",
                                            style: {
                                                fontFamily: "'Inter', sans-serif"
                                            },
                                            children: property.fullDescription || property.shortDescription
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/properties/[id]/page.js",
                                            lineNumber: 186,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                    lineNumber: 184,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "font-serif text-2xl text-[#1A1714] mb-4",
                                            children: "Specifications"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/properties/[id]/page.js",
                                            lineNumber: 193,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 gap-px bg-[#D9D0C0] border border-[#D9D0C0] overflow-hidden rounded",
                                            children: [
                                                {
                                                    label: 'Property Type',
                                                    value: property.subtype,
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"]
                                                },
                                                {
                                                    label: 'Area Range',
                                                    value: `${property.sqft} sqft`,
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"]
                                                },
                                                {
                                                    label: 'Price Range',
                                                    value: property.priceDisplay,
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"]
                                                },
                                                {
                                                    label: 'Price per sqft',
                                                    value: property.pricePerSqft || '—',
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"]
                                                },
                                                {
                                                    label: 'Floors',
                                                    value: property.floor || '—',
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"]
                                                },
                                                {
                                                    label: 'Facing',
                                                    value: property.facing || '—',
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__["Compass"]
                                                },
                                                {
                                                    label: 'Parking',
                                                    value: property.parking || '—',
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__["Car"]
                                                },
                                                {
                                                    label: 'Furnishing',
                                                    value: property.furnishing || '—',
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"]
                                                },
                                                {
                                                    label: 'Construction',
                                                    value: property.constructionStatus || property.status,
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"]
                                                },
                                                {
                                                    label: 'Possession',
                                                    value: property.possession || '—',
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"]
                                                },
                                                {
                                                    label: 'Maintenance',
                                                    value: property.maintenanceCharge || '—',
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"]
                                                },
                                                {
                                                    label: 'RERA ID',
                                                    value: property.reraId || '—',
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"]
                                                }
                                            ].map((spec, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-white p-4 flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(spec.icon, {
                                                            className: "w-4 h-4 text-[#C9A96E] shrink-0",
                                                            strokeWidth: 1.5
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/properties/[id]/page.js",
                                                            lineNumber: 210,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-sans text-[10px] uppercase tracking-wider text-[#7A7268]",
                                                                    children: spec.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                                                    lineNumber: 212,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-sans text-sm text-[#1A1714] font-medium",
                                                                    children: spec.value
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                                                    lineNumber: 213,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/properties/[id]/page.js",
                                                            lineNumber: 211,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                                    lineNumber: 209,
                                                    columnNumber: 37
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/properties/[id]/page.js",
                                            lineNumber: 194,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                    lineNumber: 192,
                                    columnNumber: 25
                                }, this),
                                amenities.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "font-serif text-2xl text-[#1A1714] mb-4",
                                            children: "Amenities & Features"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/properties/[id]/page.js",
                                            lineNumber: 223,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 md:grid-cols-3 gap-3",
                                            children: amenities.map((a, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 bg-white p-3 border border-[#D9D0C0] rounded",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                            className: "w-4 h-4 text-[#C9A96E] shrink-0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/properties/[id]/page.js",
                                                            lineNumber: 227,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-sans text-sm text-[#1A1714]",
                                                            children: a
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/properties/[id]/page.js",
                                                            lineNumber: 228,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                                    lineNumber: 226,
                                                    columnNumber: 41
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/properties/[id]/page.js",
                                            lineNumber: 224,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                    lineNumber: 222,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/properties/[id]/page.js",
                            lineNumber: 141,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sticky top-24 space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white border border-[#D9D0C0] p-8 rounded shadow-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-sans text-[10px] uppercase tracking-wider text-[#7A7268] mb-1",
                                                children: "Starting From"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/properties/[id]/page.js",
                                                lineNumber: 241,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-serif text-4xl text-[#1A1714] mb-1",
                                                children: property.priceDisplay
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/properties/[id]/page.js",
                                                lineNumber: 242,
                                                columnNumber: 33
                                            }, this),
                                            property.pricePerSqft && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-sans text-sm text-[#C9A96E] mb-6",
                                                children: property.pricePerSqft
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/properties/[id]/page.js",
                                                lineNumber: 244,
                                                columnNumber: 37
                                            }, this),
                                            property.yield && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 bg-[#C9A96E]/10 border border-[#C9A96E]/30 rounded p-3 mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                        className: "w-5 h-5 text-[#C9A96E]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/properties/[id]/page.js",
                                                        lineNumber: 249,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-sans text-xs text-[#7A7268]",
                                                                children: "Expected Yield"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/properties/[id]/page.js",
                                                                lineNumber: 251,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-serif text-xl text-[#1A1714]",
                                                                children: property.yield
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/properties/[id]/page.js",
                                                                lineNumber: 252,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/properties/[id]/page.js",
                                                        lineNumber: 250,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/properties/[id]/page.js",
                                                lineNumber: 248,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: whatsappUrl,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded font-sans text-sm uppercase tracking-wider hover:bg-[#20bd5a] transition-colors shadow-lg shadow-[#25D366]/20",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                        className: "w-5 h-5",
                                                        fill: "currentColor"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/properties/[id]/page.js",
                                                        lineNumber: 264,
                                                        columnNumber: 37
                                                    }, this),
                                                    "Enquire Now on WhatsApp"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/properties/[id]/page.js",
                                                lineNumber: 258,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-center font-sans text-[10px] text-[#7A7268] mt-3",
                                                children: "Pre-filled message • Instant reply within 2 hours"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/properties/[id]/page.js",
                                                lineNumber: 268,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "tel:+918180993030",
                                                className: "w-full flex items-center justify-center gap-2 border border-[#D9D0C0] text-[#1A1714] py-3 rounded font-sans text-sm uppercase tracking-wider hover:border-[#C9A96E] transition-colors mt-4",
                                                children: "Call +91 8180 993 030"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/properties/[id]/page.js",
                                                lineNumber: 273,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/properties/[id]/page.js",
                                        lineNumber: 240,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-[#0D0B09] p-6 rounded border border-[#2E2A25]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: [
                                                {
                                                    label: 'RERA Registered',
                                                    sub: property.reraId || 'Verified'
                                                },
                                                {
                                                    label: '25+ Years Experience',
                                                    sub: 'Since 2001'
                                                },
                                                {
                                                    label: '1,000+ Deals Closed',
                                                    sub: 'Pan-India'
                                                }
                                            ].map((badge, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                                            className: "w-5 h-5 text-[#C9A96E] shrink-0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/properties/[id]/page.js",
                                                            lineNumber: 290,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-sans text-sm text-[#F5F0E8]",
                                                                    children: badge.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                                                    lineNumber: 292,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-sans text-[10px] text-[#7A7268]",
                                                                    children: badge.sub
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                                                    lineNumber: 293,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/properties/[id]/page.js",
                                                            lineNumber: 291,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/src/app/properties/[id]/page.js",
                                                    lineNumber: 289,
                                                    columnNumber: 41
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/properties/[id]/page.js",
                                            lineNumber: 283,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/properties/[id]/page.js",
                                        lineNumber: 282,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-center font-sans text-[10px] text-[#7A7268] uppercase tracking-wider",
                                        children: [
                                            "Listing ID: ",
                                            property.id
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/properties/[id]/page.js",
                                        lineNumber: 301,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/properties/[id]/page.js",
                                lineNumber: 238,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/properties/[id]/page.js",
                            lineNumber: 237,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/properties/[id]/page.js",
                    lineNumber: 138,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/properties/[id]/page.js",
                lineNumber: 137,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 bg-[#0D0B09]/95 backdrop-blur-lg border-t border-[#2E2A25] p-4 flex items-center justify-between gap-4 lg:hidden z-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-serif text-xl text-[#F5F0E8]",
                                children: property.priceDisplay
                            }, void 0, false, {
                                fileName: "[project]/src/app/properties/[id]/page.js",
                                lineNumber: 312,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-sans text-[10px] text-[#7A7268]",
                                children: [
                                    property.sqft,
                                    " sqft · ",
                                    property.yield || 'N/A',
                                    " yield"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/properties/[id]/page.js",
                                lineNumber: 313,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/properties/[id]/page.js",
                        lineNumber: 311,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: whatsappUrl,
                        target: "_blank",
                        rel: "noreferrer",
                        className: "flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded font-sans text-sm uppercase tracking-wider hover:bg-[#20bd5a] transition-colors shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                className: "w-4 h-4",
                                fill: "currentColor"
                            }, void 0, false, {
                                fileName: "[project]/src/app/properties/[id]/page.js",
                                lineNumber: 321,
                                columnNumber: 21
                            }, this),
                            "Enquire Now"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/properties/[id]/page.js",
                        lineNumber: 315,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/properties/[id]/page.js",
                lineNumber: 310,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/properties/[id]/page.js",
        lineNumber: 56,
        columnNumber: 9
    }, this);
}
_s(PropertyDetailPage, "Y74wclHBLjWGdncgM1WIX0bIurw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = PropertyDetailPage;
var _c;
__turbopack_context__.k.register(_c, "PropertyDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_027ab8e3._.js.map