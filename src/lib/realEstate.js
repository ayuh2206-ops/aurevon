import { BUSINESS } from "@/lib/config";
import { blogArticles, initialProperties, testimonials as sampleTestimonials } from "@/lib/data";

export const PROPERTY_STATUSES = ["Draft", "Published", "Archived"];
export const AVAILABILITY_OPTIONS = [
  "Available",
  "Sold",
  "Booked",
  "Rented",
  "Under Negotiation",
  "Coming Soon",
  "Ready to Move",
  "Under Construction",
  "New Launch",
];
export const LEAD_STATUSES = ["New", "Contacted", "Site Visit", "Negotiating", "Converted", "Lost"];
export const COMPARE_LIMIT = 3;

export const SALE_BUDGET_RANGES = [
  { label: "Under Rs. 25 L", min: 0, max: 2500000 },
  { label: "Rs. 25 L to Rs. 50 L", min: 2500000, max: 5000000 },
  { label: "Rs. 50 L to Rs. 75 L", min: 5000000, max: 7500000 },
  { label: "Rs. 75 L to Rs. 1 Cr", min: 7500000, max: 10000000 },
  { label: "Rs. 1 Cr to Rs. 1.5 Cr", min: 10000000, max: 15000000 },
  { label: "Rs. 1.5 Cr to Rs. 2 Cr", min: 15000000, max: 20000000 },
  { label: "Rs. 2 Cr to Rs. 3 Cr", min: 20000000, max: 30000000 },
  { label: "Rs. 3 Cr to Rs. 5 Cr", min: 30000000, max: 50000000 },
  { label: "Rs. 5 Cr to Rs. 10 Cr", min: 50000000, max: 100000000 },
  { label: "Rs. 10 Cr to Rs. 25 Cr", min: 100000000, max: 250000000 },
  { label: "Rs. 25 Cr plus", min: 250000000, max: Infinity },
];

export const RENT_BUDGET_RANGES = [
  { label: "Under Rs. 10,000", min: 0, max: 10000 },
  { label: "Under Rs. 20,000", min: 0, max: 20000 },
  { label: "Rs. 20,000 to Rs. 40,000", min: 20000, max: 40000 },
  { label: "Rs. 40,000 to Rs. 60,000", min: 40000, max: 60000 },
  { label: "Rs. 60,000 to Rs. 80,000", min: 60000, max: 80000 },
  { label: "Rs. 80,000 to Rs. 1 L", min: 80000, max: 100000 },
  { label: "Rs. 1 L to Rs. 2 L", min: 100000, max: 200000 },
  { label: "Rs. 2 L to Rs. 5 L", min: 200000, max: 500000 },
  { label: "Rs. 5 L to Rs. 10 L", min: 500000, max: 1000000 },
  { label: "Rs. 10 L plus", min: 1000000, max: Infinity },
];

export const PUNE_LOCALITIES = [
  "Agalambe",
  "Agarkar Nagar",
  "Akurdi",
  "Alandi",
  "Alephata",
  "Amanora Park Town",
  "Ambegaon",
  "Ambegaon Budruk",
  "Ambegaon Pathar",
  "Anand Nagar",
  "Ane",
  "Ashok Nagar",
  "Ashoka Nagar",
  "Ashtapur",
  "Aundh",
  "Aundh Gaon",
  "Bakori",
  "Balaji Nagar",
  "Balewadi",
  "Balewadi Phata",
  "Baner",
  "Baner Gaon",
  "Baramati",
  "Bavdhan",
  "Bavdhan Budruk",
  "Bavdhan Khurd",
  "Bawada",
  "Bhagyashree Nagar",
  "Bhawani Peth",
  "Bhekrai Nagar",
  "Bhor",
  "Bhosale Nagar",
  "Bhosari",
  "Bhugaon",
  "Bhukum",
  "Bhumkar Nagar",
  "Bhusari Colony",
  "Bibwewadi",
  "Bope",
  "Bopodi",
  "Budhwar Peth",
  "Bund Garden",
  "Camp",
  "Chakan",
  "Chandan Nagar",
  "Chandani Chowk",
  "Chande",
  "Chandkhed",
  "Charholi",
  "Charholi Budruk",
  "Charholi Khurd",
  "Chikhali",
  "Chimbali",
  "Chinchwad",
  "Chinchwad Gaon",
  "Clover Park",
  "Dahanukar Colony",
  "Dange Chowk",
  "Dapodi",
  "Dattanagar",
  "Dattawadi",
  "Daund",
  "Deccan Gymkhana",
  "Dehu",
  "Dhankawadi",
  "Dhanori",
  "Dhayari",
  "Dhayari Phata",
  "Dighi",
  "Donaje",
  "DP Road",
  "DSK Vishwa",
  "Erandwane",
  "EON IT Park",
  "Fatima Nagar",
  "Fergusson College Road",
  "Fursungi",
  "Fursungi Uruli Devachi",
  "Ganesh Peth",
  "Ghorpade Peth",
  "Ghorpadi",
  "Gokhale Nagar",
  "Gultekdi",
  "Guruwar Peth",
  "Hadapsar",
  "Hadapsar Industrial Estate",
  "Handewadi",
  "Hinjawadi",
  "Hinjewadi",
  "Holkarwadi",
  "Indapur",
  "Jambhulwadi",
  "Jangali Maharaj Road",
  "Jejuri",
  "Junnar",
  "Kalas",
  "Kalyani Nagar",
  "Karve Nagar",
  "Karve Road",
  "Kasarwadi",
  "Kasba Peth",
  "Katraj",
  "Katraj Kondhwa Road",
  "Keshav Nagar",
  "Khadakwasla",
  "Khadki",
  "Kharadi",
  "Kharadi Bypass",
  "Khed Shivapur",
  "Kirkatwadi",
  "Kiwale",
  "Kondhwa",
  "Kondhwa Budruk",
  "Kondhwa Khurd",
  "Koregaon Park",
  "Koregaon Park Annexe",
  "Kothrud",
  "Kothrud Depot",
  "Law College Road",
  "Laxmi Road",
  "Lohegaon",
  "Lonavala",
  "Lulla Nagar",
  "Maan",
  "Magarpatta City",
  "Mahalunge",
  "Maharshi Nagar",
  "Malwadi",
  "Manchar",
  "Mandai",
  "Manjari",
  "Manjari Budruk",
  "Market Yard",
  "Marunji",
  "Maval",
  "MG Road",
  "Model Colony",
  "Mohammed Wadi",
  "Moshi",
  "Mukund Nagar",
  "Mundhwa",
  "Mutha",
  "Nanded City",
  "Nande",
  "Nana Peth",
  "Narayan Peth",
  "Narhe",
  "Navi Peth",
  "NDA Road",
  "New Kalyani Nagar",
  "Nigdi",
  "Nigdi Pradhikaran",
  "NIBM",
  "NIBM Annexe",
  "Panchvati",
  "Parvati",
  "Pashan",
  "Pashan Sus Road",
  "Paud",
  "Paud Road",
  "Perne",
  "Phursungi",
  "Pimpri",
  "Pimpri Colony",
  "Pimpri-Chinchwad",
  "Pimple Gurav",
  "Pimple Nilakh",
  "Pimple Saudagar",
  "Pirangut",
  "Prabhat Road",
  "Pune Camp",
  "Pune Station",
  "Punawale",
  "Purandar",
  "Rahatani",
  "Rajgurunagar",
  "Ramtekdi",
  "Ramwadi",
  "Range Hills",
  "Ranjangaon",
  "Rasta Peth",
  "Ravet",
  "Raviwar Peth",
  "Sadashiv Peth",
  "Sahakar Nagar",
  "Salisbury Park",
  "Sanaswadi",
  "Sangamwadi",
  "Sasane Nagar",
  "Saswad",
  "Satara Road",
  "Senapati Bapat Road",
  "Shaniwar Peth",
  "Shankar Sheth Road",
  "Shastri Nagar",
  "Shirur",
  "Shivane",
  "Shivajinagar",
  "Shukrawar Peth",
  "Sinhagad Road",
  "Somwar Peth",
  "Sopan Baug",
  "Sus",
  "Sus Gaon",
  "Swargate",
  "Tadiwala Road",
  "Talegaon Dabhade",
  "Talawade",
  "Tathawade",
  "Thergaon",
  "Tingre Nagar",
  "Tulshibaug",
  "Undri",
  "Uruli Devachi",
  "Uruli Kanchan",
  "Vadgaon Budruk",
  "Vadgaon Maval",
  "Vadgaon Sheri",
  "Viman Nagar",
  "Vimannagar",
  "Vishal Nagar",
  "Vishrantwadi",
  "Wadgaon Sheri",
  "Wagholi",
  "Wakad",
  "Wanwadi",
  "Wanowrie",
  "Warje",
  "Yavat",
  "Yerwada",
  "Yewalewadi",
];

const PUNE_LOCALITY_ZONE_GROUPS = {
  "Central Pune": [
    "Agarkar Nagar",
    "Ashok Nagar",
    "Bhawani Peth",
    "Budhwar Peth",
    "Camp",
    "Deccan Gymkhana",
    "Erandwane",
    "Fergusson College Road",
    "Ganesh Peth",
    "Ghorpade Peth",
    "Ghorpadi",
    "Gokhale Nagar",
    "Guruwar Peth",
    "Jangali Maharaj Road",
    "Kasba Peth",
    "Khadki",
    "Koregaon Park",
    "Law College Road",
    "Laxmi Road",
    "Mandai",
    "Market Yard",
    "MG Road",
    "Model Colony",
    "Mukund Nagar",
    "Nana Peth",
    "Narayan Peth",
    "Navi Peth",
    "Parvati",
    "Prabhat Road",
    "Pune Camp",
    "Pune Station",
    "Range Hills",
    "Rasta Peth",
    "Raviwar Peth",
    "Sadashiv Peth",
    "Salisbury Park",
    "Senapati Bapat Road",
    "Shaniwar Peth",
    "Shankar Sheth Road",
    "Shivajinagar",
    "Shukrawar Peth",
    "Somwar Peth",
    "Swargate",
    "Tadiwala Road",
    "Tulshibaug",
  ],
  "West Pune": [
    "Aundh",
    "Aundh Gaon",
    "Balewadi",
    "Balewadi Phata",
    "Baner",
    "Baner Gaon",
    "Bavdhan",
    "Bavdhan Budruk",
    "Bavdhan Khurd",
    "Bhosale Nagar",
    "Bhugaon",
    "Bhukum",
    "Bhusari Colony",
    "Bopodi",
    "Chandani Chowk",
    "Dahanukar Colony",
    "DP Road",
    "Karve Nagar",
    "Karve Road",
    "Kothrud",
    "Kothrud Depot",
    "Mahalunge",
    "NDA Road",
    "Panchvati",
    "Pashan",
    "Pashan Sus Road",
    "Paud Road",
    "Sus",
    "Sus Gaon",
    "Vadgaon Budruk",
    "Warje",
  ],
  "East Pune": [
    "Amanora Park Town",
    "Bakori",
    "Chandan Nagar",
    "Dhanori",
    "EON IT Park",
    "Hadapsar",
    "Hadapsar Industrial Estate",
    "Kalyani Nagar",
    "Keshav Nagar",
    "Kharadi",
    "Kharadi Bypass",
    "Koregaon Park Annexe",
    "Lohegaon",
    "Magarpatta City",
    "Manjari",
    "Manjari Budruk",
    "Mundhwa",
    "New Kalyani Nagar",
    "Perne",
    "Ramwadi",
    "Sangamwadi",
    "Sasane Nagar",
    "Vadgaon Sheri",
    "Viman Nagar",
    "Vimannagar",
    "Wadgaon Sheri",
    "Wagholi",
    "Yerwada",
  ],
  "South Pune": [
    "Ambegaon",
    "Ambegaon Budruk",
    "Ambegaon Pathar",
    "Anand Nagar",
    "Balaji Nagar",
    "Bhekrai Nagar",
    "Bibwewadi",
    "Dattanagar",
    "Dattawadi",
    "Dhankawadi",
    "Dhayari",
    "Dhayari Phata",
    "Donaje",
    "DSK Vishwa",
    "Fatima Nagar",
    "Fursungi",
    "Fursungi Uruli Devachi",
    "Gultekdi",
    "Handewadi",
    "Holkarwadi",
    "Jambhulwadi",
    "Katraj",
    "Katraj Kondhwa Road",
    "Khadakwasla",
    "Kirkatwadi",
    "Kondhwa",
    "Kondhwa Budruk",
    "Kondhwa Khurd",
    "Lulla Nagar",
    "Maharshi Nagar",
    "Mohammed Wadi",
    "Narhe",
    "NIBM",
    "NIBM Annexe",
    "Phursungi",
    "Ramtekdi",
    "Sahakar Nagar",
    "Satara Road",
    "Shivane",
    "Sinhagad Road",
    "Sopan Baug",
    "Undri",
    "Uruli Devachi",
    "Wanwadi",
    "Wanowrie",
    "Yewalewadi",
  ],
  "North Pune": [
    "Alandi",
    "Bopodi",
    "Charholi",
    "Charholi Budruk",
    "Charholi Khurd",
    "Dapodi",
    "Dighi",
    "Kalas",
    "Tingre Nagar",
    "Vishrantwadi",
  ],
  "IT Corridor": [
    "Hinjawadi",
    "Hinjewadi",
    "Maan",
    "Marunji",
    "Nande",
    "Punawale",
    "Tathawade",
    "Wakad",
  ],
  "PCMC": [
    "Akurdi",
    "Bhosari",
    "Bhumkar Nagar",
    "Chikhali",
    "Chinchwad",
    "Chinchwad Gaon",
    "Dange Chowk",
    "Dehu",
    "Kasarwadi",
    "Kiwale",
    "Moshi",
    "Nigdi",
    "Nigdi Pradhikaran",
    "Pimpri",
    "Pimpri Colony",
    "Pimpri-Chinchwad",
    "Pimple Gurav",
    "Pimple Nilakh",
    "Pimple Saudagar",
    "Rahatani",
    "Ravet",
    "Talawade",
    "Thergaon",
    "Vishal Nagar",
  ],
  "Industrial Belt": [
    "Chakan",
    "Chande",
    "Chandkhed",
    "Chimbali",
    "Pirangut",
    "Ranjangaon",
    "Sanaswadi",
    "Shirur",
    "Talegaon Dabhade",
  ],
  "Pune District": [
    "Agalambe",
    "Alephata",
    "Ane",
    "Ashtapur",
    "Baramati",
    "Bawada",
    "Bhor",
    "Bope",
    "Daund",
    "Indapur",
    "Jejuri",
    "Junnar",
    "Khed Shivapur",
    "Lonavala",
    "Malwadi",
    "Manchar",
    "Maval",
    "Mutha",
    "Paud",
    "Purandar",
    "Rajgurunagar",
    "Saswad",
    "Uruli Kanchan",
    "Vadgaon Maval",
    "Yavat",
  ],
};

function buildLocalityZones(groups) {
  return Object.entries(groups).reduce((zones, [zone, localities]) => {
    localities.forEach((locality) => {
      zones[locality] = zone;
    });
    return zones;
  }, {});
}

export const PUNE_LOCALITY_ZONES = buildLocalityZones(PUNE_LOCALITY_ZONE_GROUPS);

export const RESIDENTIAL_PROPERTY_TYPES = [
  "Apartment",
  "Flat",
  "Studio Apartment",
  "1 RK",
  "1 HK",
  "Room Kitchen",
  "Single Room",
  "Serviced Apartment",
  "Builder Floor",
  "Independent Floor",
  "Independent House",
  "Villa",
  "Bungalow",
  "Twin Bungalow",
  "Row House",
  "Duplex",
  "Triplex",
  "Penthouse",
  "Farmhouse",
  "Gated Community Villa",
  "Residential Plot",
  "NA Plot",
  "Gated Community Plot",
  "Farm Plot",
  "Land",
  "Redevelopment Property",
  "Co-living",
  "PG",
  "Hostel",
  "Paying Guest",
  "Senior Living",
];

export const COMMERCIAL_PROPERTY_TYPES = [
  "Office Space",
  "Bare Shell Office",
  "Warm Shell Office",
  "Fully Fitted Office",
  "IT/ITES Office",
  "Managed Office",
  "Co-Working",
  "Business Center",
  "Retail Shop",
  "Retail",
  "Retail/Shop",
  "High Street Retail",
  "Mall Shop",
  "Showroom",
  "Restaurant/Cafe Space",
  "Cloud Kitchen",
  "Hotel/Guest House",
  "Clinic",
  "Hospital",
  "School/Institute",
  "Banquet Hall",
  "Warehouse",
  "Godown",
  "Logistics Park",
  "Industrial Shed",
  "Factory",
  "Manufacturing Unit",
  "Industrial",
  "Industrial Land",
  "Commercial Land",
  "IT Park",
  "SEZ",
  "Data Center",
  "Mixed-Use Property",
  "Pre-Leased Asset",
];

export const ROOM_CONFIGURATION_OPTIONS = [
  "Studio",
  "1 RK",
  "1 HK",
  "1 BHK",
  "1.5 BHK",
  "2 BHK",
  "2.5 BHK",
  "3 BHK",
  "3.5 BHK",
  "4 BHK",
  "4.5 BHK",
  "5 BHK",
  "5.5 BHK",
  "6 BHK",
  "7 BHK",
  "8 BHK",
  "9 BHK",
  "10 BHK",
  "10+ BHK",
  "Penthouse",
  "Duplex",
  "Triplex",
  "Commercial",
  "Plot/Land",
];

export const DEFAULT_SITE_OPTIONS = {
  localities: PUNE_LOCALITIES,
  featuredLocalities: ["Baner", "Balewadi", "Kharadi", "Hinjewadi", "Wakad", "Viman Nagar", "Aundh", "Kothrud", "Hadapsar", "Wagholi", "Ravet", "Tathawade"],
  localityZones: PUNE_LOCALITY_ZONES,
  listingTypes: ["Sell", "Rent/Lease", "Lease", "PG/Co-living"],
  residentialTypes: RESIDENTIAL_PROPERTY_TYPES,
  commercialTypes: COMMERCIAL_PROPERTY_TYPES,
  bhkOptions: ROOM_CONFIGURATION_OPTIONS,
  furnishingOptions: ["Unfurnished", "Semi-Furnished", "Fully Furnished", "Bare Shell", "Warm Shell", "Fully Fitted", "Plug and Play", "With White Goods"],
  areaUnits: ["sq.ft", "sq.m", "sq.yd", "acre", "hectare", "guntha"],
  facingOptions: ["East", "West", "North", "South", "North-East", "North-West", "South-East", "South-West"],
  ageOptions: ["New", "0-1 year", "1-5 years", "5-10 years", "10+ years"],
  possessionOptions: ["Immediate", "Within 3 months", "Within 6 months", "This year", "Next year", "Under construction"],
  cardBadgeOptions: ["New Launch", "Resale", "Under Construction", "Investment", "Premium", "Exclusive", "Verified", "Hot Deal", "Reduced Price"],
  amenities: [
    "Lift",
    "Covered Parking",
    "Visitor Parking",
    "Security (24/7)",
    "CCTV",
    "Power Backup",
    "High-Speed Internet",
    "Conference Room",
    "Cafeteria",
    "Fire Safety",
    "Reception/Lobby",
    "Air Conditioning",
    "Pantry",
    "Server Room",
    "Meeting Rooms",
    "Workstations",
    "Cabins",
    "Managed Office",
    "Loading Bay",
    "Dock Leveler",
    "Heavy Vehicle Access",
    "Swimming Pool",
    "Gym",
    "Clubhouse",
    "Garden",
    "Kids Play Area",
    "Jogging Track",
    "Pet Friendly",
    "EV Charging",
    "Solar Power",
    "Community Hall",
    "Gas Pipeline",
    "Water Supply",
    "STP",
    "Rainwater Harvesting",
    "Metro Nearby",
  ],
  zoneOptions: ["Central Pune", "West Pune", "East Pune", "South Pune", "North Pune", "IT Corridor", "PCMC", "Industrial Belt", "Pune District", "Mumbai", "Bangalore"],
  buyBudgets: SALE_BUDGET_RANGES.map((item) => item.label),
  rentBudgets: RENT_BUDGET_RANGES.map((item) => item.label),
  areas: ["Under 500 sqft", "500 - 1000 sqft", "1000 - 5000 sqft", "Above 5000 sqft"],
  yields: ["Up to 5%", "5% - 7%", "7% - 9%", "Above 9%"],
  constructionStatuses: ["Ready to Move", "Under Construction", "New Launch"],
};

export const DEFAULT_CONTENT_SETTINGS = {
  brandLabel: BUSINESS.businessName,
  brandSubtitle: "REALTY PVT. LTD.",
  logoUrl: "",
  heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=75",
  heroTitle: "Where Vision Meets Reality.",
  heroSubtitle:
    "25 years of curating exceptional properties across India: premium homes, offices, retail, and co-working spaces. 1,000+ deals closed. RERA registered.",
  statsPropertiesSold: "1,000+",
  statsYearsTrust: "25+",
  statsLitigations: "Zero",
  statsReraCompliant: "Verified",
  aboutText:
    "With over two decades navigating India's most dynamic property markets, Aurevon Realty has built a reputation on one principle: every client deserves complete transparency and maximum returns.",
  footerDescription: "Trusted real estate advisory across Pune, with specialist support for commercial assets, homes, NRI investors, documentation, and post-sale management.",
  seoTitle: "Aurevon Realty - Premium Real Estate in Pune",
  seoDesc: "Aurevon Realty is Pune's trusted real estate partner for homes, commercial properties, retail spaces, and NRI investment advisory.",
  seoKeywords: "real estate Pune, commercial property Pune, homes Pune, RERA broker, NRI property investment",
  contactAddress: BUSINESS.officeAddress,
  contactPhone: BUSINESS.officePhone,
  contactEmail: BUSINESS.email,
  contactRera: BUSINESS.licenseNumber,
  contactWhatsapp: BUSINESS.whatsappNumbers,
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.548890837658!2d73.76493!3d18.57244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b900bfcab5e1%3A0xe6a29f92a7ee8e44!2sAurevon%20Realty!5e0!3m2!1sen!2sin!4v1708416000000!5m2!1sen!2sin",
  founderName: BUSINESS.founderName,
  founderTitle: "Founder & Principal Broker",
  founderPhoto: "/images/arun-dongare.png",
  linkedinUrl: BUSINESS.socialLinks.linkedin,
  instagramUrl: BUSINESS.socialLinks.instagram,
  facebookUrl: BUSINESS.socialLinks.facebook,
  youtubeUrl: BUSINESS.socialLinks.youtube,
  websiteBaseUrl: BUSINESS.websiteBaseUrl,
};

export const DEFAULT_FAQS = [
  {
    id: "faq-1",
    isSample: true,
    question: "Do you support both residential and commercial requirements?",
    answer: "Yes. Aurevon handles premium homes, offices, retail spaces, investment assets, lease requirements, and NRI mandates.",
  },
  {
    id: "faq-2",
    isSample: true,
    question: "Are listings verified before they are shown?",
    answer: "Published listings are reviewed for availability, documentation, ownership or developer details, and local compliance markers before they appear publicly.",
  },
  {
    id: "faq-3",
    isSample: true,
    question: "Can I sell or lease my property through Aurevon?",
    answer: "Yes. Use the Sell tab on the homepage or the contact form, and the advisory team will review your asset and next steps.",
  },
  {
    id: "faq-4",
    isSample: true,
    question: "Do you help with RERA and documentation checks?",
    answer: "Yes. The team coordinates due diligence, RERA verification, agreement support, registration, and post-transaction documentation.",
  },
];

export const DEFAULT_TESTIMONIALS = sampleTestimonials.map((item, index) => ({
  id: `sample-testimonial-${index + 1}`,
  name: item.name,
  locality: item.type,
  rating: 5,
  text: item.quote,
  isSample: true,
}));

export function uniqueOptionList(...lists) {
  const seen = new Set();
  return lists
    .flat()
    .filter((item) => item !== null && item !== undefined && String(item).trim())
    .filter((item) => {
      const key = String(item).trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

export function formatBhkOption(value) {
  const text = String(value ?? "").trim();
  if (!text) return "";
  if (/^\d+(\.\d+)?\+?$/.test(text)) return `${text} BHK`;
  return text;
}

export function normalizeRoomConfiguration(value) {
  const text = String(value ?? "").trim().toLowerCase().replace(/\s+/g, " ");
  if (!text) return "";
  if (text.includes("commercial")) return "commercial";
  if (text.includes("plot") || text.includes("land")) return "plot/land";
  if (text.includes("studio")) return "studio";
  if (text.includes("penthouse")) return "penthouse";
  if (text.includes("duplex")) return "duplex";
  if (text.includes("triplex")) return "triplex";

  const number = text.match(/\d+(?:\.\d+)?\+?/)?.[0] || "";
  if (number && text.includes("rk")) return `${number} rk`;
  if (number && text.includes("hk") && !text.includes("bhk")) return `${number} hk`;
  if (number && text.includes("bhk")) return `${number} bhk`;
  if (number) return `${number} bhk`;
  return text;
}

function matchesRoomConfiguration(property, filterValue) {
  if (!filterValue) return true;
  const target = normalizeRoomConfiguration(filterValue);
  if (!target) return true;
  const values = [
    property.bhk,
    property.bedrooms,
    property.type,
    property.subtype,
    property.category,
  ].map(normalizeRoomConfiguration);
  return values.includes(target);
}

export function nowISO() {
  return new Date().toISOString();
}

export function sanitizePhone(phone) {
  return String(phone || "").replace(/\D/g, "");
}

export function getPrimaryWhatsapp(settings = {}) {
  const raw = settings.contactWhatsapp || settings.whatsappNumber || BUSINESS.whatsappNumbers;
  return String(raw || "")
    .split("|")
    .map(sanitizePhone)
    .find(Boolean) || BUSINESS.whatsappNumbers.split("|")[0];
}

export function createWhatsAppUrl({ phone, message }) {
  return `https://wa.me/${sanitizePhone(phone)}?text=${encodeURIComponent(message || "I would like to know more about your properties.")}`;
}

export function trackConversion(eventName, payload = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...payload });
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, payload);
  }
}

export function parsePriceToNumber(value) {
  if (typeof value === "number") return value;
  if (!value) return 0;
  const raw = String(value).toLowerCase().replace(/,/g, "");
  const firstNumber = raw.match(/\d+(\.\d+)?/);
  if (!firstNumber) return 0;
  const amount = Number(firstNumber[0]);
  if (raw.includes("cr") || raw.includes("crore")) return amount * 10000000;
  if (raw.includes("lac") || raw.includes("lakh") || raw.includes(" l")) return amount * 100000;
  if (raw.includes("k") && amount < 1000) return amount * 1000;
  return amount;
}

export function formatINR(value) {
  const amount = Number(value || 0);
  if (!amount) return "Price on Request";
  if (amount >= 10000000) return `Rs. ${(amount / 10000000).toFixed(amount % 10000000 === 0 ? 0 : 1)} Cr`;
  if (amount >= 100000) return `Rs. ${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)} L`;
  return `Rs. ${amount.toLocaleString("en-IN")}`;
}

export function priceRangeFromLabel(label, listingType) {
  const allRanges = [...SALE_BUDGET_RANGES, ...RENT_BUDGET_RANGES];
  const known = allRanges.find((range) => range.label === label);
  if (known) return known;

  const normalizedType = normalizeListingType(listingType);
  const numbers = String(label || "")
    .split(/to|-|–/)
    .map((part) => parsePriceToNumber(part))
    .filter(Boolean);
  if (!numbers.length) return null;
  return {
    label,
    min: numbers[0] || 0,
    max: numbers[1] || (normalizedType === "Rent/Lease" ? 100000000 : Infinity),
  };
}

export function normalizeListingType(value) {
  const normalized = String(value || "Sell").toLowerCase();
  if (normalized.includes("buy") || normalized.includes("sale") || normalized.includes("sell")) {
    return "Sell";
  }
  if (normalized.includes("rent") || normalized.includes("lease") || normalized.includes("pre_leased") || normalized.includes("pre-leased")) {
    return "Rent/Lease";
  }
  if (normalized.includes("pg")) return "PG";
  return "Sell";
}

export function normalizeCategory(property) {
  const value = property?.category || property?.portfolio || property?.type || "";
  const normalized = String(value).toLowerCase();
  if (normalized.includes("commercial") || DEFAULT_SITE_OPTIONS.commercialTypes.some((type) => type.toLowerCase() === normalized)) {
    return "Commercial";
  }
  if (normalized.includes("residential") || normalized.includes("bhk") || normalized.includes("rk") || DEFAULT_SITE_OPTIONS.residentialTypes.some((type) => type.toLowerCase() === normalized)) {
    return "Residential";
  }
  if (normalized.includes("industrial") || normalized.includes("office") || normalized.includes("retail") || normalized.includes("warehouse")) return "Commercial";
  if (normalized.includes("plot") || normalized.includes("land")) {
    return String(property?.category || "").toLowerCase().includes("residential") ? "Residential" : "Commercial";
  }
  return "Residential";
}

function normalizeTimestamp(value) {
  if (!value) return nowISO();
  if (typeof value === "string") return value;
  if (value?.toDate) return value.toDate().toISOString();
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

function statusToAvailability(status, constructionStatus) {
  const statusValue = String(status || "");
  if (AVAILABILITY_OPTIONS.includes(statusValue)) return statusValue;
  if (constructionStatus === "ready") return "Ready to Move";
  if (constructionStatus === "under") return "Under Construction";
  if (constructionStatus === "new") return "New Launch";
  return "Available";
}

export function normalizeProperty(property = {}) {
  const category = normalizeCategory(property);
  const typeWasCategory = ["commercial", "residential"].includes(String(property.type || "").toLowerCase());
  const type = property.propertyType || property.typeName || (typeWasCategory ? property.subtype : property.type) || property.subtype || category;
  const title = property.title || property.name || "Untitled Property";
  const price = Number(property.price) || parsePriceToNumber(property.priceMin) || parsePriceToNumber(property.priceDisplay) || 0;
  const thumbnail = property.thumbnail || property.image || property.featureImage || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80";
  const gallery = [
    thumbnail,
    ...(property.images || []),
    ...(property.gallery || []),
    property.floorPlan,
  ].filter(Boolean);
  const dedupedGallery = [...new Set(gallery)];
  const rawStatus = property.status || (property.active === false ? "Draft" : "Published");
  const status = PROPERTY_STATUSES.includes(rawStatus)
    ? rawStatus
    : property.active === false || property.approvalStatus === "rejected"
      ? "Draft"
      : "Published";
  const availability = property.availability || statusToAvailability(rawStatus, property.constructionStatus);
  const area = Number(property.area) || Number(property.superBuiltUp) || Number(property.sqft) || Number(property.carpetArea) || 0;
  const bedrooms = Number(property.bedrooms) || Number(String(property.bhk || "").match(/\d+(?:\.\d+)?/)?.[0]) || 0;
  const locality = property.locality || property.location || "Pune";
  const listingId = property.listingId || property.id || "";

  return {
    ...property,
    id: property.id || listingId,
    listingId,
    title,
    name: title,
    locality,
    city: property.city || BUSINESS.city,
    zone: property.zone || DEFAULT_SITE_OPTIONS.localityZones[locality] || "",
    price,
    priceLabel: property.priceLabel || property.priceDisplay || formatINR(price),
    priceDisplay: property.priceDisplay || property.priceLabel || formatINR(price),
    priceNegotiable: Boolean(property.priceNegotiable ?? property.negotiable),
    listingType: normalizeListingType(property.listingType || property.tab),
    category,
    type,
    subtype: property.subtype || type,
    bhk: property.bhk || bedrooms || "",
    area,
    sqft: property.sqft || property.superBuiltUp || property.area || "",
    areaUnit: property.areaUnit || "sq.ft",
    carpetArea: Number(property.carpetArea) || "",
    builtUpArea: Number(property.builtUpArea) || Number(property.superBuiltUp) || "",
    bedrooms,
    bathrooms: Number(property.bathrooms) || 0,
    parking: property.parking || "Available",
    floor: property.floor || "On Request",
    facing: property.facing || "On Request",
    age: property.age || property.propertyAge || "On Request",
    furnishing: property.furnishing || "On Request",
    possession: property.possession || "On Request",
    cardBadge: property.cardBadge || (property.featured ? "Premium" : availability),
    status,
    availability,
    verified: Boolean(property.verified ?? property.nriFriendly ?? true),
    featured: Boolean(property.featured),
    legalClear: Boolean(property.legalClear ?? true),
    reraRegistered: Boolean(property.reraRegistered ?? property.reraId),
    reraId: property.reraId || property.reraID || "",
    description: property.description || property.fullDescription || property.shortDescription || "",
    shortDescription: property.shortDescription || property.excerpt || property.description || "",
    amenities: property.amenities || [],
    tags: property.tags || property.highlights || [],
    neighborhood: property.neighborhood || property.landmark || "",
    thumbnail,
    image: thumbnail,
    images: dedupedGallery,
    videoUrl: property.videoUrl || property.virtualTourUrl || "",
    inquiries: Number(property.inquiries) || 0,
    views: Number(property.views) || 0,
    createdAt: normalizeTimestamp(property.createdAt),
    updatedAt: normalizeTimestamp(property.updatedAt || property.createdAt),
    active: status === "Published",
  };
}

export function getSampleProperties() {
  return initialProperties.map(normalizeProperty);
}

export function isPublicProperty(property) {
  const item = normalizeProperty(property);
  return item.status === "Published" && !["Sold", "Rented"].includes(item.availability);
}

export function buildPropertySearchText(property) {
  const p = normalizeProperty(property);
  return [
    p.title,
    p.locality,
    p.type,
    p.description,
    p.zone,
    p.neighborhood,
    p.city,
    p.facing,
    p.furnishing,
    p.age,
    p.possession,
    p.floor,
    p.availability,
    p.listingType,
    p.category,
    p.bhk ? `${p.bhk} bhk` : "",
    p.bedrooms ? `${p.bedrooms} bedrooms` : "",
    p.reraId,
    ...(p.tags || []),
    ...(p.amenities || []),
  ]
    .join(" ")
    .toLowerCase();
}

export function filterProperties(properties = [], filters = {}) {
  const terms = String(filters.search || filters.q || "")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  const budgetRange = priceRangeFromLabel(filters.budget || filters.price, filters.listingType);

  return properties.map(normalizeProperty).filter((property) => {
    if (!isPublicProperty(property)) return false;
    if (terms.length && !terms.every((term) => buildPropertySearchText(property).includes(term))) return false;
    if (filters.locality && property.locality !== filters.locality) return false;
    if (filters.location && property.locality !== filters.location) return false;
    if (filters.type && property.type !== filters.type && property.subtype !== filters.type) return false;
    if (!matchesRoomConfiguration(property, filters.bhk)) return false;
    if (filters.listingType && property.listingType !== normalizeListingType(filters.listingType)) return false;
    if (filters.category && property.category !== filters.category) return false;
    if (filters.furnishing && property.furnishing !== filters.furnishing) return false;
    if (filters.verified === "true" && !property.verified) return false;
    if (budgetRange && (property.price < budgetRange.min || property.price > budgetRange.max)) return false;
    return true;
  });
}

export function sortProperties(properties = [], sortMode = "newest") {
  return [...properties].sort((a, b) => {
    if (sortMode === "price-asc") return (a.price || 0) - (b.price || 0);
    if (sortMode === "price-desc") return (b.price || 0) - (a.price || 0);
    if (sortMode === "popular") return (b.inquiries + b.views) - (a.inquiries + a.views);
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export function getSimilarProperties(currentProperty, allProperties, limit = 3) {
  const current = normalizeProperty(currentProperty);
  const candidates = allProperties
    .map(normalizeProperty)
    .filter((property) => property.id !== current.id && property.listingId !== current.listingId && isPublicProperty(property));
  const sameLocality = candidates.filter((property) => property.locality === current.locality);
  const remaining = candidates.filter((property) => property.locality !== current.locality);
  return [...sameLocality, ...remaining].slice(0, limit);
}

export function propertyWhatsAppMessage(property) {
  const p = normalizeProperty(property);
  return `Hi Aurevon Realty, I am interested in ${p.title} in ${p.locality}, ${p.city}. Price: ${p.priceLabel}. Configuration: ${p.bhk || p.area + " " + p.areaUnit}, ${p.type}. Listing ID: ${p.listingId || p.id}. Please share details and site visit options.`;
}

export function normalizeArticle(article = {}) {
  const title = article.title || "Untitled Article";
  const slug = article.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const createdAt = normalizeTimestamp(article.createdAt || article.date);
  return {
    ...article,
    id: article.id || slug,
    title,
    slug,
    category: article.category || "Market Insights",
    excerpt: article.excerpt || article.metaDescription || "",
    content: article.content || article.contentText || "",
    imageUrl: article.imageUrl || article.image || "",
    image: article.image || article.imageUrl || "",
    author: article.author || BUSINESS.founderName,
    authorRole: article.authorRole || "Founder & Principal Broker",
    tags: article.tags || [],
    featured: Boolean(article.featured),
    status: article.status || "Published",
    readTime: article.readTime || "5 min read",
    date: article.date || createdAt.split("T")[0],
    createdAt,
    updatedAt: normalizeTimestamp(article.updatedAt || createdAt),
  };
}

export function getSampleArticles() {
  return blogArticles.map(normalizeArticle);
}

export function renderInlineMarkdown(text) {
  return String(text || "").split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return { type: "strong", text: part.slice(2, -2), key: index };
    }
    return { type: "text", text: part, key: index };
  });
}

export function parseArticleContent(content) {
  if (Array.isArray(content)) {
    return content.map((block, index) => ({
      type: block.type || "paragraph",
      text: block.text || "",
      key: index,
    }));
  }

  const blocks = [];
  const chunks = String(content || "")
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  chunks.forEach((chunk, index) => {
    if (chunk.startsWith("### ")) blocks.push({ type: "h3", text: chunk.replace(/^###\s+/, ""), key: index });
    else if (chunk.startsWith("## ")) blocks.push({ type: "h2", text: chunk.replace(/^##\s+/, ""), key: index });
    else if (chunk.startsWith("# ")) blocks.push({ type: "h1", text: chunk.replace(/^#\s+/, ""), key: index });
    else if (/^([-*]|•)\s+/m.test(chunk)) {
      blocks.push({
        type: "ul",
        items: chunk.split("\n").map((line) => line.replace(/^([-*]|•)\s+/, "").trim()).filter(Boolean),
        key: index,
      });
    } else if (/^\d+[.)]\s+/m.test(chunk)) {
      blocks.push({
        type: "ol",
        items: chunk.split("\n").map((line) => line.replace(/^\d+[.)]\s+/, "").trim()).filter(Boolean),
        key: index,
      });
    } else {
      blocks.push({ type: "paragraph", text: chunk, key: index });
    }
  });

  return blocks;
}
