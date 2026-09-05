// Site-wide business configuration.
// Replace these values per client; public pages and admin defaults consume this object.
export const BUSINESS = {
  businessName: "Aurevon Realty Pvt. Ltd.",
  tagline: "Where Vision Meets Reality.",
  establishedYear: 2001,
  founderName: "Arun Dongare",
  primaryAgentName: "Aurevon Advisory Team",
  licenseName: "MahaRERA",
  licenseNumber: "PRXXXXXXXXXXXXX",
  officePhone: "+91 9767 446 655",
  secondaryPhone: "+91 8180 993 030",
  email: "info@aurevonrealty.in",
  whatsappNumbers: "918180993030|919767446655",
  officeAddress: "Pune, Maharashtra, India",
  city: "Pune",
  stateOrRegion: "Maharashtra",
  postalCode: "411045",
  country: "India",
  geoLatitude: "18.5204",
  geoLongitude: "73.8567",
  primaryServiceAreas: ["Baner", "Balewadi", "Kharadi", "Hinjewadi", "Wakad", "Viman Nagar"],
  websiteBaseUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://aurevonrealty.in",
  socialLinks: {
    googleMaps: "",
    instagram: "https://www.instagram.com/aurevon_realty_pvt._ltd?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==",
    facebook: "",
    youtube: "",
    linkedin: "https://www.linkedin.com/in/arun-dongare-64b486351/",
  },
};

export const ADMIN_EMAILS = ["vero.media.150@gmail.com", "arundongare150@gmail.com"];

export function isAdminEmail(email) {
  return Boolean(email && ADMIN_EMAILS.includes(String(email).toLowerCase()));
}

export const SITE_CONFIG = {
  ARUN_PHONE: BUSINESS.officePhone.replace(/\D/g, ""),
  ARUN_WHATSAPP: BUSINESS.whatsappNumbers.split("|")[0],
  RERA_NUMBER: BUSINESS.licenseNumber,
  ADMIN_EMAIL: BUSINESS.email,
  LINKEDIN_URL: BUSINESS.socialLinks.linkedin,
  INSTAGRAM_URL: BUSINESS.socialLinks.instagram,
  COMPANY_NAME: BUSINESS.businessName,
  FOUNDED_YEAR: BUSINESS.establishedYear,
};

export const COLORS = {
  primary: '#0D0B09',
  secondary: '#F5F0E8',
  gold: '#C9A96E',
  terra: '#8B4A2F',
  textLight: '#F5F0E8',
  textDark: '#1A1714',
  textMuted: '#7A7268',
  borderDark: '#2E2A25',
  borderLight: '#D9D0C0',
  whatsappGreen: '#25D366',
};
