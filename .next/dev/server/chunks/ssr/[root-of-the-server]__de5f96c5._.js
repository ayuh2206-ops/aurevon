module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/data.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
        slug: 'pune-commercial-corridors-outperforming-2025',
        category: 'Market Insights',
        title: "Why Pune's Commercial Corridors Are Outperforming Every Other Asset Class in 2025",
        excerpt: "With consistent 8-9% yields and rising demand from IT & startups, Pune's commercial real estate is on an unprecedented run.",
        metaDescription: "Discover why Pune's commercial real estate corridors like Kharadi, Hinjewadi, and Balewadi are delivering 8-9% yields in 2025, outperforming stocks, gold, and residential property.",
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        author: 'Arun Dongare',
        authorRole: 'Founder & MD, Aurevon Realty',
        date: '2025-12-15',
        readTime: '7 min read',
        tags: [
            'Pune Commercial',
            'Office Space',
            'Investment Yields',
            'Market Analysis',
            'IT Corridor'
        ],
        featured: true,
        content: [
            {
                type: 'paragraph',
                text: "Pune has quietly emerged as India's most compelling destination for commercial property investment. While Tier-1 cities like Mumbai and Bangalore command headlines, it is Pune's secondary corridors — Kharadi, Hinjewadi, Baner-Balewadi, and Viman Nagar — that are delivering the most consistent returns for investors in 2025."
            },
            {
                type: 'heading',
                text: 'The Numbers Speak: 8-9% Rental Yields'
            },
            {
                type: 'paragraph',
                text: "Unlike residential real estate, which has stagnated at 2-3% rental yields nationally, Pune's commercial market is delivering a steady 8-9% per annum. Pre-leased office spaces in IT corridors are especially attractive, offering guaranteed rental income from Day 1 with annual escalation clauses of 5-7%."
            },
            {
                type: 'paragraph',
                text: "Consider this: a ₹1 Crore investment in a pre-leased office unit in Kharadi currently generates ₹70,000-₹80,000 per month in rental income. That's a 8.4-9.6% gross yield — significantly higher than fixed deposits (6.5%), gold (historically 7-8% with high volatility), or residential rental income (2-3%)."
            },
            {
                type: 'heading',
                text: 'Why Pune Over Mumbai or Bangalore?'
            },
            {
                type: 'paragraph',
                text: "Entry costs matter. A comparable Grade-A office space in Mumbai's BKC costs ₹40,000-₹50,000 per sqft, while Bangalore's Whitefield commands ₹12,000-₹15,000. Pune's prime corridors offer similar IT-grade infrastructure at ₹8,000-₹12,000 per sqft — making it accessible for first-time commercial investors and NRIs looking to diversify."
            },
            {
                type: 'heading',
                text: 'The IT Factor: 700+ Companies & Growing'
            },
            {
                type: 'paragraph',
                text: "Pune hosts offices of Infosys, TCS, Wipro, Cognizant, IBM, Barclays, HSBC, and 700+ technology firms. The city adds approximately 50,000 new IT professionals each year — creating sustained demand for Grade-A commercial spaces, co-working offices, and supporting retail infrastructure."
            },
            {
                type: 'heading',
                text: 'Infrastructure Game-Changers'
            },
            {
                type: 'paragraph',
                text: "The Pune Metro (operational on key routes by 2025), the Ring Road project, the expansion of Pune Airport's international terminal, and the proposed Pune-Nashik & Pune-Bangalore expressways are dramatically improving connectivity. These infrastructure projects are converting previously undervalued micro-markets into commercial hotspots."
            },
            {
                type: 'heading',
                text: 'NRI Investment Surge'
            },
            {
                type: 'paragraph',
                text: "Over 35% of commercial property transactions in Pune now involve NRI buyers, attracted by favourable currency conversions, high yields, and the relative ease of FEMA-compliant transactions. Aurevon Realty has facilitated over 200 NRI commercial deals in the last 5 years alone."
            },
            {
                type: 'heading',
                text: 'Conclusion: The Smart Money Is Moving to Pune'
            },
            {
                type: 'paragraph',
                text: "For investors seeking stable, high-yield assets with strong capital appreciation potential, Pune's commercial corridors represent the best risk-adjusted opportunity in Indian real estate today. With entry points starting at ₹45 Lakhs and yields consistently above 8%, the case for commercial investment in Pune has never been stronger."
            }
        ]
    },
    {
        slug: 'nri-guide-investing-indian-commercial-real-estate',
        category: 'NRI Guide',
        title: "NRI Guide: Investing in Indian Commercial Real Estate — Rules, Taxes & Best Locations",
        excerpt: "Everything non-resident Indians need to know about FEMA regulations, taxation, and the smartest commercial markets to invest in.",
        metaDescription: "Complete NRI guide to investing in Indian commercial property: FEMA rules, RBI regulations, NRE/NRO accounts, tax benefits, Power of Attorney, and top locations for commercial investment.",
        image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1200&q=80',
        author: 'Arun Dongare',
        authorRole: 'Founder & MD, Aurevon Realty',
        date: '2025-11-28',
        readTime: '10 min read',
        tags: [
            'NRI Investment',
            'FEMA',
            'Commercial Property India',
            'Tax Guide',
            'Power of Attorney'
        ],
        featured: true,
        content: [
            {
                type: 'paragraph',
                text: "India's commercial real estate market has become increasingly attractive for Non-Resident Indians (NRIs) seeking to diversify their portfolios. With rental yields of 8-9% in select markets, favourable currency dynamics, and streamlined digital processes, the opportunity is significant — but so are the regulatory intricacies. This guide walks you through everything you need to know."
            },
            {
                type: 'heading',
                text: '1. What Can NRIs Buy? FEMA Rules Explained'
            },
            {
                type: 'paragraph',
                text: "Under the Foreign Exchange Management Act (FEMA), 1999 and RBI Master Directions, NRIs and PIOs (Persons of Indian Origin) are permitted to purchase commercial property in India — including office spaces, retail shops, warehouses, and co-working units. The only restriction: agricultural land, plantation property, and farmhouses are not allowed without RBI's prior approval."
            },
            {
                type: 'heading',
                text: '2. Payment Channels: NRE, NRO & Inward Remittance'
            },
            {
                type: 'paragraph',
                text: "All property payments must be routed through banking channels. NRIs can pay from: (a) NRE Account — funds repatriable, ideal for investment; (b) NRO Account — non-repatriable beyond $1M per year with CA certificate; (c) Direct inward remittance from abroad to the developer/seller's account. Cash payments exceeding ₹2 Lakhs are strictly prohibited under Section 269ST of the Income Tax Act."
            },
            {
                type: 'heading',
                text: '3. Taxation: What NRIs Pay'
            },
            {
                type: 'paragraph',
                text: "Rental income is taxed at slab rates (with 30% standard deduction). Capital gains: Short-term (< 2 years) taxed at slab rates; Long-term (> 2 years) taxed at 20% with indexation benefit. TDS at 20%+ surcharge is deducted on sale. NRIs can claim benefits under the Double Taxation Avoidance Agreement (DTAA) between India and their country of residence to avoid being taxed twice."
            },
            {
                type: 'heading',
                text: '4. Power of Attorney (POA) for Remote Transactions'
            },
            {
                type: 'paragraph',
                text: "Since most NRIs cannot be physically present for registration, a Power of Attorney (POA) is essential. The POA must be executed on appropriate stamp paper, notarized, and apostilled (for Hague Convention countries) or attested by the Indian Consulate. At Aurevon Realty, we guide NRI clients through the entire POA process and coordinate with the Sub-Registrar's office."
            },
            {
                type: 'heading',
                text: '5. Top Locations for NRI Commercial Investment in 2025'
            },
            {
                type: 'paragraph',
                text: "Based on yield, infrastructure growth, and tenant quality, the top commercial markets for NRI investors are: Pune (Kharadi, Hinjewadi, Balewadi) — 8-9% yields; Mumbai (Navi Mumbai, Thane) — 7-8% yields; Bangalore (Whitefield, Electronic City) — 7-8.5% yields; Hyderabad (HITEC City, Gachibowli) — 7.5-9% yields."
            },
            {
                type: 'heading',
                text: '6. How Aurevon Realty Helps NRIs'
            },
            {
                type: 'paragraph',
                text: "We offer end-to-end NRI commercial investment services: curated property shortlisting via video tours, legal due diligence (RERA verification, title clearance), POA facilitation, digital documentation, tenant acquisition, and post-sale property management. Over 200 NRI clients across 15 countries trust Aurevon Realty for their Indian commercial investments."
            }
        ]
    },
    {
        slug: 'office-vs-retail-commercial-property-returns-pune',
        category: 'Investment',
        title: "Office vs Retail: Which Commercial Property Type Delivers Better Returns in Pune?",
        excerpt: "A deep-dive comparison of office space yields vs retail investments across Pune's top micro-markets.",
        metaDescription: "Office space vs retail shop investment in Pune: detailed comparison of rental yields, capital appreciation, vacancy rates, tenant quality, and risk factors for commercial property investors.",
        image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&w=1200&q=80',
        author: 'Arun Dongare',
        authorRole: 'Founder & MD, Aurevon Realty',
        date: '2025-10-20',
        readTime: '8 min read',
        tags: [
            'Office Space',
            'Retail Investment',
            'Yields Comparison',
            'Pune Market',
            'Commercial Strategy'
        ],
        featured: false,
        content: [
            {
                type: 'paragraph',
                text: "One of the most common questions we receive from investors — especially first-time commercial buyers and NRIs — is: should I invest in an office space or a retail shop? Both have distinct risk-return profiles, and the right choice depends on your investment horizon, risk appetite, and income expectations."
            },
            {
                type: 'heading',
                text: 'Office Spaces: The Yield Champion'
            },
            {
                type: 'paragraph',
                text: "Office spaces in Pune's IT corridors consistently deliver higher rental yields — typically 8-9% — thanks to robust demand from IT/ITES companies, co-working operators, and professional services firms. Lease tenures are longer (3-5 years with lock-in), providing income stability. The downside: higher entry costs (₹60L+) and slightly lower capital appreciation compared to retail."
            },
            {
                type: 'heading',
                text: 'Retail Shops: The Appreciation Play'
            },
            {
                type: 'paragraph',
                text: "Retail commercial (high-street shops, mall units, showrooms) tend to deliver lower current yields (5-7%) but higher capital appreciation over time, especially in emerging residential catchment areas. A well-located shop in a growing suburb can appreciate 50-80% over 5 years. The risk: higher vacancy periods, tenant turnover, and dependency on local foot traffic."
            },
            {
                type: 'heading',
                text: 'Head-to-Head: Key Metrics Compared'
            },
            {
                type: 'paragraph',
                text: "Rental Yield: Office 8-9% vs Retail 5-7%. Capital Appreciation (5yr): Office 30-50% vs Retail 50-80%. Vacancy Risk: Office Low (IT demand) vs Retail Medium. Lease Tenure: Office 3-5 years vs Retail 1-3 years. Entry Cost: Office ₹60L+ vs Retail ₹40L+. Tenant Quality: Office IT/MNC vs Retail SME/Franchise."
            },
            {
                type: 'heading',
                text: 'Micro-Market Analysis: Where to Buy What'
            },
            {
                type: 'paragraph',
                text: "For office: Kharadi, Hinjewadi Phase 1-2, Balewadi Tech Corridor, Viman Nagar. For retail: Baner Road, Wakad High Street, Pimpri-Chinchwad PCMC commercial zones, Kalyani Nagar. For mixed strategy: Magarpatta City, Aundh-Baner connector, Hadapsar IT Park periphery."
            },
            {
                type: 'heading',
                text: 'Our Recommendation'
            },
            {
                type: 'paragraph',
                text: "For income-focused investors and NRIs seeking consistent returns, office space is the clear winner. For risk-tolerant investors with a 5-7 year horizon seeking capital gains, retail in emerging suburbs offers higher upside. The smartest investors? They diversify across both — and that's exactly the portfolio strategy Aurevon Realty helps build."
            }
        ]
    },
    {
        slug: 'rera-guide-commercial-property-buyers',
        category: 'Legal & Compliance',
        title: "RERA Explained: What Every Commercial Property Buyer Must Know Before Investing",
        excerpt: "A practical guide to RERA registration, compliance checks, and how the Act protects commercial investors in Maharashtra.",
        metaDescription: "Complete RERA guide for commercial property buyers: how to verify MahaRERA registration, check compliance, understand builder obligations, and protect your investment under RERA 2016.",
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        author: 'Arun Dongare',
        authorRole: 'Founder & MD, Aurevon Realty',
        date: '2025-09-10',
        readTime: '6 min read',
        tags: [
            'RERA',
            'MahaRERA',
            'Legal Compliance',
            'Buyer Protection',
            'Commercial Regulation'
        ],
        featured: false,
        content: [
            {
                type: 'paragraph',
                text: "The Real Estate (Regulation and Development) Act, 2016 — commonly known as RERA — was a landmark reform that brought transparency and accountability to Indian real estate. While most coverage focuses on residential buyers, RERA applies equally to commercial property transactions. Here's what every commercial investor must understand."
            },
            {
                type: 'heading',
                text: 'Does RERA Apply to Commercial Properties?'
            },
            {
                type: 'paragraph',
                text: "Yes. Under Section 3 of the RERA Act, all real estate projects exceeding 500 sqm or 8 units must register with the state RERA authority — regardless of whether they are residential, commercial, or mixed-use. In Maharashtra, this falls under MahaRERA (Maharashtra Real Estate Regulatory Authority)."
            },
            {
                type: 'heading',
                text: 'How to Verify RERA Registration (MahaRERA)'
            },
            {
                type: 'paragraph',
                text: "Every RERA-registered project has a unique MahaRERA registration number. Before investing, visit maharera.maharashtra.gov.in and search using the project name, promoter name, or registration number. The portal provides project details, approved plans, completion timeline, financial statements, and any complaints filed."
            },
            {
                type: 'heading',
                text: "What RERA Guarantees for Commercial Buyers"
            },
            {
                type: 'paragraph',
                text: "Carpet area disclosure (no ambiguity on usable area), delivery timeline commitment (with penalties for delays), structural defect warranty (5 years), 70% of collections deposited in escrow, no advertisement without RERA registration, and a formal grievance redressal mechanism."
            },
            {
                type: 'heading',
                text: 'Red Flags to Watch For'
            },
            {
                type: 'paragraph',
                text: "Projects without RERA registration, discrepancies between brochure and RERA-approved plans, builders demanding 100% payment before registration, modification of carpet area after booking, and delays without formal communication. If a builder isn't RERA-compliant, do not invest — regardless of how attractive the deal appears."
            },
            {
                type: 'heading',
                text: "How Aurevon Realty Ensures RERA Compliance"
            },
            {
                type: 'paragraph',
                text: "At Aurevon Realty, every property we list undergoes RERA verification. We cross-check registration numbers, approved plans, builder track records, and financial health before recommending any project to our clients. This is non-negotiable — your investment safety comes first."
            }
        ]
    },
    {
        slug: 'pre-leased-commercial-property-investment-guide',
        category: 'Investment Strategy',
        title: "Pre-Leased Commercial Properties: The Ultimate Passive Income Strategy for 2025",
        excerpt: "Why pre-leased office spaces are the smartest entry point for first-time commercial investors and NRIs.",
        metaDescription: "Complete guide to investing in pre-leased commercial properties in India: guaranteed rental income from Day 1, yield calculations, risk factors, and top pre-leased opportunities in Pune.",
        image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1200&q=80',
        author: 'Arun Dongare',
        authorRole: 'Founder & MD, Aurevon Realty',
        date: '2025-08-05',
        readTime: '9 min read',
        tags: [
            'Pre-Leased',
            'Passive Income',
            'Office Investment',
            'Yield Strategy',
            'Commercial Investing'
        ],
        featured: false,
        content: [
            {
                type: 'paragraph',
                text: "Pre-leased commercial properties have emerged as the gold standard for investors seeking guaranteed rental income. Unlike vacant units where income depends on finding a tenant, pre-leased properties come with an existing tenant, a signed lease agreement, and rental income starting from Day 1 of your purchase."
            },
            {
                type: 'heading',
                text: 'What Is a Pre-Leased Property?'
            },
            {
                type: 'paragraph',
                text: "A pre-leased (or 'pre-rented') commercial property is one where the seller already has a tenant in place with an active lease agreement. The buyer acquires the property along with the tenant — meaning rental income starts immediately upon registration. The lease agreement, including rent amount, escalation terms, and lock-in period, transfers to the new owner."
            },
            {
                type: 'heading',
                text: 'The Math: Why Yields Are Higher'
            },
            {
                type: 'paragraph',
                text: "Pre-leased properties are priced based on their rental yield, not just carpet area rates. A unit generating ₹60,000/month rent at a 9% yield cap rate would be priced at approximately ₹80 Lakhs. If the property's market value is ₹90 Lakhs, the buyer is essentially purchasing at a 10% discount while locking in guaranteeed income. Typical yields range from 7-10% for quality pre-leased assets."
            },
            {
                type: 'heading',
                text: 'Key Factors to Evaluate'
            },
            {
                type: 'paragraph',
                text: "Not all pre-leased properties are equal. Evaluate these critical factors: tenant quality (MNC/listed company > SME > startup), remaining lease term (3+ years preferred), escalation clause (5-7% annual is standard), lock-in period (minimum 1-2 years), maintenance and fit-out responsibility, and the property's RERA compliance status."
            },
            {
                type: 'heading',
                text: 'Risks to Be Aware Of'
            },
            {
                type: 'paragraph',
                text: "Tenant vacating after lock-in expiry, rental renegotiation at lower rates in a downturn, inflated pricing based on artificially high rents, and structural issues masked by occupied status. Due diligence — including independent valuation and lease document review — is essential."
            },
            {
                type: 'heading',
                text: 'Why NRIs Love Pre-Leased'
            },
            {
                type: 'paragraph',
                text: "For NRIs managing investments from abroad, pre-leased properties are ideal: no tenant hunting, no vacancy risk, predictable income, and minimal management overhead. At Aurevon Realty, we specialize in curating A-grade pre-leased commercial units in Pune's IT corridors — turnkey investments for discerning NRI investors."
            }
        ]
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
}),
"[project]/src/lib/config.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Site-wide configuration
__turbopack_context__.s([
    "COLORS",
    ()=>COLORS,
    "SITE_CONFIG",
    ()=>SITE_CONFIG
]);
const SITE_CONFIG = {
    ARUN_PHONE: "919767446655",
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
}),
"[project]/src/app/blog/[slug]/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BlogDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-ssr] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tag.js [app-ssr] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/share-2.js [app-ssr] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-ssr] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/config.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function BlogDetailPage() {
    const { slug } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    // Check localStorage for admin-added blogs, then fall back to initial data
    let allBlogs = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["blogArticles"];
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const article = allBlogs.find((b)=>b.slug === slug);
    if (!article) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-[#F5F0E8] flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "font-serif text-4xl text-[#1A1714] mb-4",
                        children: "Article Not Found"
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/[slug]/page.js",
                        lineNumber: 24,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-sans text-sm text-[#7A7268] mb-8",
                        children: "The article you're looking for doesn't exist."
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/[slug]/page.js",
                        lineNumber: 25,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/blog",
                        className: "bg-[#C9A96E] text-[#0D0B09] px-6 py-3 font-sans text-xs uppercase tracking-widest hover:bg-[#F5F0E8] transition-colors",
                        children: "Back to Blog"
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/[slug]/page.js",
                        lineNumber: 26,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/blog/[slug]/page.js",
                lineNumber: 23,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/blog/[slug]/page.js",
            lineNumber: 22,
            columnNumber: 13
        }, this);
    }
    const formatDate = (dateStr)=>{
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };
    // Related articles
    const related = allBlogs.filter((b)=>b.slug !== slug).slice(0, 3);
    // WhatsApp share
    const shareUrl = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : '';
    const whatsappShare = `https://wa.me/?text=${encodeURIComponent(`${article.title} — Read on Aurevon Realty Blog: ${shareUrl}`)}`;
    // JSON-LD structured data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": article.title,
        "description": article.metaDescription || article.excerpt,
        "image": article.image,
        "author": {
            "@type": "Person",
            "name": article.author,
            "jobTitle": article.authorRole
        },
        "publisher": {
            "@type": "Organization",
            "name": "Aurevon Realty Pvt. Ltd.",
            "url": "https://aurevonrealty.in"
        },
        "datePublished": article.date,
        "dateModified": article.date,
        "mainEntityOfPage": {
            "@type": "WebPage"
        },
        "keywords": article.tags?.join(', '),
        "articleSection": article.category
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                type: "application/ld+json",
                dangerouslySetInnerHTML: {
                    __html: JSON.stringify(jsonLd)
                }
            }, void 0, false, {
                fileName: "[project]/src/app/blog/[slug]/page.js",
                lineNumber: 75,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen bg-[#F5F0E8]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative bg-[#0D0B09] overflow-hidden",
                        children: [
                            article.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: article.image,
                                alt: article.title,
                                className: "absolute inset-0 w-full h-full object-cover opacity-30"
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/[slug]/page.js",
                                lineNumber: 84,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-gradient-to-t from-[#0D0B09] via-[#0D0B09]/70 to-[#0D0B09]/40"
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/[slug]/page.js",
                                lineNumber: 90,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative z-10 max-w-4xl mx-auto px-6 pt-16 pb-20",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/blog",
                                        className: "text-[#C9A96E] font-sans text-sm hover:text-[#F5F0E8] transition-colors mb-8 inline-flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/blog/[slug]/page.js",
                                                lineNumber: 93,
                                                columnNumber: 29
                                            }, this),
                                            " All Articles"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/blog/[slug]/page.js",
                                        lineNumber: 92,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-block bg-[#8B4A2F] text-[#F5F0E8] font-sans text-[10px] uppercase px-3 py-1 rounded-full tracking-wider mb-6",
                                                children: article.category
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/blog/[slug]/page.js",
                                                lineNumber: 96,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "font-serif text-3xl sm:text-4xl md:text-5xl text-[#F5F0E8] leading-tight mb-6",
                                                children: article.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/blog/[slug]/page.js",
                                                lineNumber: 99,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap items-center gap-4 md:gap-6 text-sm font-sans text-[#9E968E]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/blog/[slug]/page.js",
                                                                lineNumber: 103,
                                                                columnNumber: 75
                                                            }, this),
                                                            " ",
                                                            article.author
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/blog/[slug]/page.js",
                                                        lineNumber: 103,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/blog/[slug]/page.js",
                                                                lineNumber: 104,
                                                                columnNumber: 75
                                                            }, this),
                                                            " ",
                                                            formatDate(article.date)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/blog/[slug]/page.js",
                                                        lineNumber: 104,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/blog/[slug]/page.js",
                                                                lineNumber: 105,
                                                                columnNumber: 75
                                                            }, this),
                                                            " ",
                                                            article.readTime
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/blog/[slug]/page.js",
                                                        lineNumber: 105,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/blog/[slug]/page.js",
                                                lineNumber: 102,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/blog/[slug]/page.js",
                                        lineNumber: 95,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/blog/[slug]/page.js",
                                lineNumber: 91,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/blog/[slug]/page.js",
                        lineNumber: 82,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-4xl mx-auto px-6 py-12 md:py-16",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                    className: "min-w-0",
                                    children: [
                                        article.content?.map((block, i)=>{
                                            if (block.type === 'heading') {
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "font-serif text-2xl md:text-3xl text-[#1A1714] mt-10 mb-4 leading-snug",
                                                    children: block.text
                                                }, i, false, {
                                                    fileName: "[project]/src/app/blog/[slug]/page.js",
                                                    lineNumber: 119,
                                                    columnNumber: 41
                                                }, this);
                                            }
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-sans text-[15px] text-[#3D3830] leading-[1.85] mb-5",
                                                children: block.text
                                            }, i, false, {
                                                fileName: "[project]/src/app/blog/[slug]/page.js",
                                                lineNumber: 125,
                                                columnNumber: 37
                                            }, this);
                                        }),
                                        article.tags && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-12 pt-8 border-t border-[#D9D0C0]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                            className: "w-4 h-4 text-[#C9A96E]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/blog/[slug]/page.js",
                                                            lineNumber: 135,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-sans text-xs uppercase tracking-wider text-[#7A7268]",
                                                            children: "Tags"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/blog/[slug]/page.js",
                                                            lineNumber: 136,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/blog/[slug]/page.js",
                                                    lineNumber: 134,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2",
                                                    children: article.tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "px-3 py-1 bg-white border border-[#D9D0C0] rounded-full font-sans text-xs text-[#7A7268]",
                                                            children: tag
                                                        }, tag, false, {
                                                            fileName: "[project]/src/app/blog/[slug]/page.js",
                                                            lineNumber: 140,
                                                            columnNumber: 45
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/blog/[slug]/page.js",
                                                    lineNumber: 138,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/blog/[slug]/page.js",
                                            lineNumber: 133,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-8 pt-8 border-t border-[#D9D0C0] flex items-center gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-sans text-xs uppercase tracking-wider text-[#7A7268] flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/blog/[slug]/page.js",
                                                            lineNumber: 150,
                                                            columnNumber: 133
                                                        }, this),
                                                        " Share"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/blog/[slug]/page.js",
                                                    lineNumber: 150,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: whatsappShare,
                                                    target: "_blank",
                                                    rel: "noreferrer",
                                                    className: "flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded font-sans text-xs uppercase tracking-wider hover:bg-[#20bd5a] transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                            className: "w-4 h-4",
                                                            fill: "currentColor"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/blog/[slug]/page.js",
                                                            lineNumber: 152,
                                                            columnNumber: 37
                                                        }, this),
                                                        " WhatsApp"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/blog/[slug]/page.js",
                                                    lineNumber: 151,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/blog/[slug]/page.js",
                                            lineNumber: 149,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/blog/[slug]/page.js",
                                    lineNumber: 115,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                    className: "hidden lg:block",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "sticky top-32 space-y-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white border border-[#D9D0C0] rounded p-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-sans text-xs uppercase tracking-wider text-[#C9A96E] mb-3",
                                                        children: "About the Author"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/blog/[slug]/page.js",
                                                        lineNumber: 162,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-serif text-lg text-[#1A1714] mb-1",
                                                        children: article.author
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/blog/[slug]/page.js",
                                                        lineNumber: 163,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-sans text-xs text-[#7A7268] mb-4",
                                                        children: article.authorRole
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/blog/[slug]/page.js",
                                                        lineNumber: 164,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-sans text-xs text-[#7A7268] leading-relaxed",
                                                        children: "25+ years of expertise in commercial real estate advisory across India. RERA registered. 1,000+ successful deals."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/blog/[slug]/page.js",
                                                        lineNumber: 165,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/blog/[slug]/page.js",
                                                lineNumber: 161,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-[#0D0B09] border border-[#2E2A25] rounded p-6 text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-serif text-xl text-[#F5F0E8] mb-3",
                                                        children: "Need Expert Advice?"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/blog/[slug]/page.js",
                                                        lineNumber: 170,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-sans text-xs text-[#9E968E] mb-6",
                                                        children: "Get personalised commercial property recommendations."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/blog/[slug]/page.js",
                                                        lineNumber: 171,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: `https://wa.me/${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE_CONFIG"].ARUN_PHONE}?text=${encodeURIComponent('Hi Arun, I just read your article "' + article.title + '" and would like to discuss commercial property investment opportunities.')}`,
                                                        target: "_blank",
                                                        rel: "noreferrer",
                                                        className: "block w-full bg-[#25D366] text-white py-3 rounded font-sans text-xs uppercase tracking-wider hover:bg-[#20bd5a] transition-colors",
                                                        children: "Chat with Arun"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/blog/[slug]/page.js",
                                                        lineNumber: 172,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/blog/[slug]/page.js",
                                                lineNumber: 169,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/blog/[slug]/page.js",
                                        lineNumber: 159,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/blog/[slug]/page.js",
                                    lineNumber: 158,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/blog/[slug]/page.js",
                            lineNumber: 113,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/[slug]/page.js",
                        lineNumber: 112,
                        columnNumber: 17
                    }, this),
                    related.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-[#0D0B09] border-t border-[#2E2A25] py-16",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-7xl mx-auto px-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-sans text-xs uppercase tracking-[0.2em] text-[#C9A96E] mb-8",
                                    children: "Continue Reading"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/blog/[slug]/page.js",
                                    lineNumber: 190,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                                    children: related.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/blog/${r.slug}`,
                                            className: "group border border-[#2E2A25] rounded overflow-hidden hover:border-[#C9A96E] transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative aspect-[16/9] overflow-hidden",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: r.image,
                                                        alt: r.title,
                                                        className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
                                                        loading: "lazy"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/blog/[slug]/page.js",
                                                        lineNumber: 199,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/blog/[slug]/page.js",
                                                    lineNumber: 198,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-sans text-[10px] uppercase tracking-wider text-[#C9A96E]",
                                                            children: r.category
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/blog/[slug]/page.js",
                                                            lineNumber: 202,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-serif text-lg text-[#F5F0E8] mt-2 leading-snug group-hover:text-[#C9A96E] transition-colors line-clamp-2",
                                                            children: r.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/blog/[slug]/page.js",
                                                            lineNumber: 203,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-sans text-xs text-[#7A7268] mt-2",
                                                            children: r.readTime
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/blog/[slug]/page.js",
                                                            lineNumber: 204,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/blog/[slug]/page.js",
                                                    lineNumber: 201,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, r.slug, true, {
                                            fileName: "[project]/src/app/blog/[slug]/page.js",
                                            lineNumber: 193,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/blog/[slug]/page.js",
                                    lineNumber: 191,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/blog/[slug]/page.js",
                            lineNumber: 189,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/[slug]/page.js",
                        lineNumber: 188,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-[#0D0B09] border-t border-[#2E2A25] py-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[#7A7268] text-xs font-sans",
                                    children: [
                                        "© ",
                                        new Date().getFullYear(),
                                        " Aurevon Realty Pvt. Ltd. All rights reserved."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/blog/[slug]/page.js",
                                    lineNumber: 216,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/privacy-policy",
                                            className: "text-[#7A7268] text-xs font-sans hover:text-[#C9A96E] transition-colors",
                                            children: "Privacy Policy"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/blog/[slug]/page.js",
                                            lineNumber: 218,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/terms-of-service",
                                            className: "text-[#7A7268] text-xs font-sans hover:text-[#C9A96E] transition-colors",
                                            children: "Terms"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/blog/[slug]/page.js",
                                            lineNumber: 219,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/blog/[slug]/page.js",
                                    lineNumber: 217,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/blog/[slug]/page.js",
                            lineNumber: 215,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/[slug]/page.js",
                        lineNumber: 214,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/blog/[slug]/page.js",
                lineNumber: 80,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__de5f96c5._.js.map