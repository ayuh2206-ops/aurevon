import { db } from "./firebase";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  DEFAULT_CONTENT_SETTINGS,
  DEFAULT_FAQS,
  DEFAULT_SITE_OPTIONS,
  DEFAULT_TESTIMONIALS,
  getSampleArticles,
  getSampleProperties,
  normalizeArticle,
  normalizeProperty,
  nowISO,
} from "@/lib/realEstate";

const PROPERTIES_COLLECTION = "properties";
const LEADS_COLLECTION = "leads";
const LEGACY_ENQUIRIES_COLLECTION = "enquiries";
const ARTICLES_COLLECTION = "articles";
const LEGACY_BLOGS_COLLECTION = "blogs";
const CONTENT_COLLECTION = "content";
const SETTINGS_DOC = "settings";
const CONFIG_COLLECTION = "config";
const OPTIONS_DOC = "options";
const USERS_COLLECTION = "users";

function requireDb() {
  if (!db) {
    throw new Error("Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* values to enable live writes.");
  }
  return db;
}

function normalizeDate(value) {
  if (!value) return nowISO();
  if (typeof value === "string") return value;
  if (value?.toDate) return value.toDate().toISOString();
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

async function readCollection(collectionName, orderField = "createdAt") {
  if (!db) return [];
  try {
    const ref = collection(db, collectionName);
    const q = orderField ? query(ref, orderBy(orderField, "desc")) : ref;
    const snapshot = await getDocs(q);
    return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
  } catch (error) {
    try {
      const snapshot = await getDocs(collection(db, collectionName));
      return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
    } catch (fallbackError) {
      console.error(`Error fetching ${collectionName}:`, fallbackError || error);
      return [];
    }
  }
}

async function readDoc(collectionName, docId) {
  if (!db) return null;
  try {
    const snapshot = await getDoc(doc(db, collectionName, docId));
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  } catch (error) {
    console.error(`Error fetching ${collectionName}/${docId}:`, error);
    return null;
  }
}

function mapContentSettings(data = {}) {
  return {
    ...DEFAULT_CONTENT_SETTINGS,
    ...data,
    logoUrl: data.logoUrl || data.logo || DEFAULT_CONTENT_SETTINGS.logoUrl,
    heroImage: data.heroImage || data.heroBackground || DEFAULT_CONTENT_SETTINGS.heroImage,
    heroTitle: data.heroTitle || data.heroHeadline || DEFAULT_CONTENT_SETTINGS.heroTitle,
    heroSubtitle: data.heroSubtitle || data.heroSubtext || DEFAULT_CONTENT_SETTINGS.heroSubtitle,
    aboutText: data.aboutText || DEFAULT_CONTENT_SETTINGS.aboutText,
    footerDescription: data.footerDescription || DEFAULT_CONTENT_SETTINGS.footerDescription,
    seoTitle: data.seoTitle || data.siteTitle || DEFAULT_CONTENT_SETTINGS.seoTitle,
    seoDesc: data.seoDesc || data.siteDescription || DEFAULT_CONTENT_SETTINGS.seoDesc,
    seoKeywords: data.seoKeywords || DEFAULT_CONTENT_SETTINGS.seoKeywords,
    contactAddress: data.contactAddress || data.officeAddress || DEFAULT_CONTENT_SETTINGS.contactAddress,
    contactPhone: data.contactPhone || data.phoneDisplay || DEFAULT_CONTENT_SETTINGS.contactPhone,
    contactEmail: data.contactEmail || data.email || DEFAULT_CONTENT_SETTINGS.contactEmail,
    contactRera: data.contactRera || data.reraNumber || DEFAULT_CONTENT_SETTINGS.contactRera,
    contactWhatsapp: data.contactWhatsapp || data.whatsappNumber || DEFAULT_CONTENT_SETTINGS.contactWhatsapp,
    founderName: data.founderName || DEFAULT_CONTENT_SETTINGS.founderName,
    founderTitle: data.founderTitle || DEFAULT_CONTENT_SETTINGS.founderTitle,
  };
}

function mapSiteOptions(data = {}) {
  return {
    ...DEFAULT_SITE_OPTIONS,
    ...data,
    localities: data.localities || data.locations || DEFAULT_SITE_OPTIONS.localities,
    locations: data.locations || data.localities || DEFAULT_SITE_OPTIONS.localities,
    buyBudgets: data.buyBudgets || data.budgets || DEFAULT_SITE_OPTIONS.buyBudgets,
    rentBudgets: data.rentBudgets || DEFAULT_SITE_OPTIONS.rentBudgets,
  };
}

function normalizeLead(lead = {}) {
  return {
    ...lead,
    id: lead.id,
    _collection: lead._collection || LEADS_COLLECTION,
    name: lead.name || "",
    phone: lead.phone || "",
    email: lead.email || "",
    subject: lead.subject || "",
    message: lead.message || "",
    propertyId: lead.propertyId || "",
    propertyTitle: lead.propertyTitle || lead.propertyName || "General Enquiry",
    propertyLocality: lead.propertyLocality || lead.locality || "",
    propertyPrice: lead.propertyPrice || "",
    source: lead.source || "Website",
    requestType: lead.requestType || lead.enquiryType || "General Enquiry",
    status: lead.status || "New",
    userId: lead.userId || "",
    createdAt: normalizeDate(lead.createdAt),
    updatedAt: lead.updatedAt ? normalizeDate(lead.updatedAt) : "",
  };
}

export async function getProperties({ includeSample = true } = {}) {
  const live = await readCollection(PROPERTIES_COLLECTION);
  if (live.length) return live.map(normalizeProperty);
  return includeSample ? getSampleProperties() : [];
}

export async function getPublicProperties() {
  const properties = await getProperties();
  return properties.filter((property) => property.status === "Published");
}

export async function getUserProperties(email) {
  if (!email) return [];
  const properties = await getProperties({ includeSample: false });
  return properties.filter((property) => property.submittedBy === email);
}

export async function getProperty(id) {
  if (!id) return null;

  if (db) {
    try {
      const listingQuery = query(collection(db, PROPERTIES_COLLECTION), where("listingId", "==", id), limit(1));
      const listingSnapshot = await getDocs(listingQuery);
      if (!listingSnapshot.empty) {
        const match = listingSnapshot.docs[0];
        return normalizeProperty({ id: match.id, ...match.data() });
      }
    } catch (error) {
      console.error("Error looking up property by listingId:", error);
    }

    const byDocId = await readDoc(PROPERTIES_COLLECTION, id);
    if (byDocId) return normalizeProperty(byDocId);
  }

  return getSampleProperties().find((property) => property.id === id || property.listingId === id) || null;
}

export async function generateListingId(prefix = "AR") {
  const properties = await getProperties({ includeSample: false });
  const maxNumber = properties.reduce((max, property) => {
    const id = String(property.listingId || property.id || "");
    const match = id.match(/(\d+)$/);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0);
  return `${prefix}-${String(maxNumber + 1).padStart(3, "0")}`;
}

export async function addProperty(propertyData) {
  const database = requireDb();
  const listingId = propertyData.listingId || await generateListingId("AR");
  const normalized = normalizeProperty({ ...propertyData, listingId });
  const payload = {
    ...propertyData,
    listingId,
    title: normalized.title,
    locality: normalized.locality,
    city: normalized.city,
    zone: normalized.zone,
    price: normalized.price,
    priceLabel: normalized.priceLabel,
    priceDisplay: normalized.priceDisplay,
    listingType: normalized.listingType,
    category: normalized.category,
    type: normalized.type,
    bhk: normalized.bhk,
    area: normalized.area,
    areaUnit: normalized.areaUnit,
    bedrooms: normalized.bedrooms,
    bathrooms: normalized.bathrooms,
    parking: normalized.parking,
    floor: normalized.floor,
    facing: normalized.facing,
    age: normalized.age,
    furnishing: normalized.furnishing,
    possession: normalized.possession,
    cardBadge: normalized.cardBadge,
    status: normalized.status,
    availability: normalized.availability,
    verified: normalized.verified,
    legalClear: normalized.legalClear,
    reraRegistered: normalized.reraRegistered,
    description: normalized.description,
    amenities: normalized.amenities,
    tags: normalized.tags,
    neighborhood: normalized.neighborhood,
    thumbnail: normalized.thumbnail,
    image: normalized.image,
    images: normalized.images,
    inquiries: normalized.inquiries,
    views: normalized.views,
    active: normalized.status === "Published",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const newDoc = await addDoc(collection(database, PROPERTIES_COLLECTION), payload);
  return newDoc.id;
}

export async function updateProperty(id, propertyData) {
  const database = requireDb();
  const normalized = normalizeProperty({ id, ...propertyData });
  await updateDoc(doc(database, PROPERTIES_COLLECTION, id), {
    ...propertyData,
    title: normalized.title,
    price: normalized.price,
    priceLabel: normalized.priceLabel,
    priceDisplay: normalized.priceDisplay,
    listingType: normalized.listingType,
    category: normalized.category,
    type: normalized.type,
    status: normalized.status,
    availability: normalized.availability,
    active: normalized.status === "Published",
    updatedAt: serverTimestamp(),
  });
  return true;
}

export async function deleteProperty(id) {
  const database = requireDb();
  await deleteDoc(doc(database, PROPERTIES_COLLECTION, id));
  return true;
}

export async function backfillListingIds(prefix = "AR") {
  const database = requireDb();
  const properties = await getProperties({ includeSample: false });
  const missing = properties
    .filter((property) => !property.listingId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  let counter = properties.reduce((max, property) => {
    const match = String(property.listingId || property.id || "").match(/(\d+)$/);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0);

  await Promise.all(missing.map((property) => {
    counter += 1;
    return updateDoc(doc(database, PROPERTIES_COLLECTION, property.id), {
      listingId: `${prefix}-${String(counter).padStart(3, "0")}`,
      updatedAt: serverTimestamp(),
    });
  }));

  return missing.length;
}

export async function incrementPropertyInquiries(id) {
  if (!db || !id) return false;
  try {
    await updateDoc(doc(db, PROPERTIES_COLLECTION, id), {
      inquiries: increment(1),
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Error incrementing property inquiries:", error);
    return false;
  }
}

export async function addLead(leadData) {
  const database = requireDb();
  const payload = {
    ...leadData,
    propertyTitle: leadData.propertyTitle || leadData.propertyName || "General Enquiry",
    source: leadData.source || "Website",
    requestType: leadData.requestType || leadData.enquiryType || "General Enquiry",
    status: leadData.status || "New",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const newDoc = await addDoc(collection(database, LEADS_COLLECTION), payload);
  return newDoc.id;
}

export async function addEnquiry(enquiryData) {
  return addLead(enquiryData);
}

export async function getLeads() {
  const leads = await readCollection(LEADS_COLLECTION);
  if (leads.length) return leads.map((lead) => normalizeLead({ ...lead, _collection: LEADS_COLLECTION }));
  const legacy = await readCollection(LEGACY_ENQUIRIES_COLLECTION);
  return legacy.map((lead) => normalizeLead({ ...lead, _collection: LEGACY_ENQUIRIES_COLLECTION }));
}

export async function getEnquiries() {
  return getLeads();
}

export async function updateLead(id, leadData, collectionName = LEADS_COLLECTION) {
  const database = requireDb();
  const candidates = collectionName === LEGACY_ENQUIRIES_COLLECTION
    ? [LEGACY_ENQUIRIES_COLLECTION, LEADS_COLLECTION]
    : [LEADS_COLLECTION, LEGACY_ENQUIRIES_COLLECTION];
  let lastError = null;

  for (const name of candidates) {
    try {
      await updateDoc(doc(database, name, id), {
        ...leadData,
        updatedAt: serverTimestamp(),
      });
      return true;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Lead not found.");
}

export async function updateLeadStatus(id, status, collectionName) {
  return updateLead(id, { status }, collectionName);
}

export async function deleteLead(id, collectionName) {
  const database = requireDb();
  const candidates = collectionName
    ? [collectionName, collectionName === LEADS_COLLECTION ? LEGACY_ENQUIRIES_COLLECTION : LEADS_COLLECTION]
    : [LEADS_COLLECTION, LEGACY_ENQUIRIES_COLLECTION];
  const results = await Promise.allSettled(candidates.map((name) => deleteDoc(doc(database, name, id))));
  if (results.every((result) => result.status === "rejected")) {
    throw results[0].reason;
  }
  return true;
}

export async function getArticles({ includeSamples = true } = {}) {
  const articles = await readCollection(ARTICLES_COLLECTION);
  if (articles.length) return articles.map(normalizeArticle);
  const legacy = await readCollection(LEGACY_BLOGS_COLLECTION);
  if (legacy.length) return legacy.map(normalizeArticle);
  return includeSamples ? getSampleArticles() : [];
}

export async function getArticleBySlug(slug) {
  const articles = await getArticles();
  return articles.find((article) => article.slug === slug && article.status === "Published") || null;
}

export async function addArticle(articleData) {
  const database = requireDb();
  const existing = await getArticles({ includeSamples: false });
  const slug = articleData.slug || articleData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (existing.some((article) => article.slug === slug)) {
    throw new Error("Article slug already exists.");
  }
  const newDoc = await addDoc(collection(database, ARTICLES_COLLECTION), {
    ...articleData,
    slug,
    status: articleData.status || "Draft",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return newDoc.id;
}

export async function updateArticle(id, articleData) {
  const database = requireDb();
  const existing = await getArticles({ includeSamples: false });
  const slug = articleData.slug || articleData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (existing.some((article) => article.slug === slug && article.id !== id)) {
    throw new Error("Article slug already exists.");
  }
  await updateDoc(doc(database, ARTICLES_COLLECTION, id), {
    ...articleData,
    slug,
    updatedAt: serverTimestamp(),
  });
  return true;
}

export async function deleteArticle(id) {
  const database = requireDb();
  await deleteDoc(doc(database, ARTICLES_COLLECTION, id));
  return true;
}

export async function getBlogs() {
  return getArticles({ includeSamples: false });
}

export async function addBlog(blogData) {
  return addArticle({ ...blogData, status: blogData.status || "Published" });
}

export async function updateBlog(id, blogData) {
  return updateArticle(id, blogData);
}

export async function deleteBlog(id) {
  return deleteArticle(id);
}

export async function getContentSettings() {
  const settings = await readDoc(CONTENT_COLLECTION, SETTINGS_DOC);
  if (settings) return mapContentSettings(settings);
  const legacy = await readDoc("settings", "siteConfig");
  return mapContentSettings(legacy || {});
}

export async function updateContentSettings(settingsData) {
  const database = requireDb();
  await setDoc(doc(database, CONTENT_COLLECTION, SETTINGS_DOC), {
    ...settingsData,
    updatedAt: serverTimestamp(),
  }, { merge: true });
  return true;
}

export async function getSiteConfig() {
  return getContentSettings();
}

export async function updateSiteConfig(configData) {
  return updateContentSettings(configData);
}

export async function getSiteOptions() {
  const options = await readDoc(CONFIG_COLLECTION, OPTIONS_DOC);
  if (options) return mapSiteOptions(options);
  const legacy = await readDoc("settings", "searchOptions");
  return mapSiteOptions(legacy || {});
}

export async function updateSiteOptions(optionsData) {
  const database = requireDb();
  const mapped = mapSiteOptions(optionsData);
  await setDoc(doc(database, CONFIG_COLLECTION, OPTIONS_DOC), {
    ...mapped,
    updatedAt: serverTimestamp(),
  }, { merge: true });
  return true;
}

export async function getSearchOptions() {
  return getSiteOptions();
}

export async function updateSearchOptions(optionsData) {
  return updateSiteOptions(optionsData);
}

export async function getTestimonials() {
  const items = await readCollection("testimonials");
  return items.length ? items.map((item) => ({ ...item, text: item.text || item.quote || "", rating: Number(item.rating) || 5 })) : DEFAULT_TESTIMONIALS;
}

export async function addTestimonial(data) {
  const database = requireDb();
  const newDoc = await addDoc(collection(database, "testimonials"), {
    ...data,
    rating: Number(data.rating) || 5,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return newDoc.id;
}

export async function updateTestimonial(id, data) {
  const database = requireDb();
  await updateDoc(doc(database, "testimonials", id), {
    ...data,
    rating: Number(data.rating) || 5,
    updatedAt: serverTimestamp(),
  });
  return true;
}

export async function deleteTestimonial(id) {
  const database = requireDb();
  await deleteDoc(doc(database, "testimonials", id));
  return true;
}

export async function getFaqs() {
  const items = await readCollection("faqs");
  return items.length ? items : DEFAULT_FAQS;
}

export async function addFaq(data) {
  const database = requireDb();
  const newDoc = await addDoc(collection(database, "faqs"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return newDoc.id;
}

export async function updateFaq(id, data) {
  const database = requireDb();
  await updateDoc(doc(database, "faqs", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
  return true;
}

export async function deleteFaq(id) {
  const database = requireDb();
  await deleteDoc(doc(database, "faqs", id));
  return true;
}

export async function getUserProfile(uid) {
  if (!uid) return null;
  const profile = await readDoc(USERS_COLLECTION, uid);
  return profile
    ? {
      uid,
      email: profile.email || "",
      name: profile.name || "",
      phone: profile.phone || "",
      photoURL: profile.photoURL || "",
      savedProperties: profile.savedProperties || [],
      createdAt: normalizeDate(profile.createdAt),
      updatedAt: normalizeDate(profile.updatedAt),
      role: profile.role || "user",
    }
    : null;
}

export async function getUsers() {
  const users = await readCollection(USERS_COLLECTION);
  return users.map((profile) => ({
    id: profile.id,
    uid: profile.uid || profile.id,
    email: profile.email || "",
    name: profile.name || "",
    phone: profile.phone || "",
    role: profile.role || "user",
    photoURL: profile.photoURL || "",
    savedProperties: profile.savedProperties || [],
    createdAt: normalizeDate(profile.createdAt),
    updatedAt: normalizeDate(profile.updatedAt),
  }));
}

export async function ensureUserProfile(firebaseUser, extra = {}) {
  if (!firebaseUser) return null;
  if (!db) {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email || "",
      name: extra.name || firebaseUser.displayName || "",
      phone: extra.phone || "",
      photoURL: firebaseUser.photoURL || "",
      savedProperties: [],
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
  }

  const ref = doc(db, USERS_COLLECTION, firebaseUser.uid);
  const snapshot = await getDoc(ref);
  const base = {
    uid: firebaseUser.uid,
    email: firebaseUser.email || "",
    name: extra.name || firebaseUser.displayName || "",
    phone: extra.phone || "",
    photoURL: firebaseUser.photoURL || "",
    savedProperties: [],
    role: "user",
  };

  if (!snapshot.exists()) {
    await setDoc(ref, {
      ...base,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { ...base, createdAt: nowISO(), updatedAt: nowISO() };
  }

  const existing = snapshot.data();
  const merged = {
    ...base,
    ...existing,
    name: existing.name || base.name,
    phone: existing.phone || extra.phone || "",
    savedProperties: existing.savedProperties || [],
  };

  if (extra.name || extra.phone) {
    await setDoc(ref, {
      name: extra.name || merged.name,
      phone: extra.phone || merged.phone,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  }

  return {
    ...merged,
    createdAt: normalizeDate(merged.createdAt),
    updatedAt: normalizeDate(merged.updatedAt),
  };
}

export async function updateUserProfile(uid, profileData) {
  const database = requireDb();
  const existing = await getUserProfile(uid);
  await setDoc(doc(database, USERS_COLLECTION, uid), {
    ...profileData,
    savedProperties: profileData.savedProperties || existing?.savedProperties || [],
    createdAt: existing?.createdAt || serverTimestamp(),
    updatedAt: serverTimestamp(),
  }, { merge: true });
  return getUserProfile(uid);
}

export async function toggleSavedProperty(uid, propertyId, shouldSave) {
  const database = requireDb();
  const profile = await getUserProfile(uid);
  const currentlySaved = profile?.savedProperties?.includes(propertyId);
  const nextShouldSave = typeof shouldSave === "boolean" ? shouldSave : !currentlySaved;
  const ref = doc(database, USERS_COLLECTION, uid);

  if (!profile) {
    await setDoc(ref, {
      uid,
      savedProperties: nextShouldSave ? [propertyId] : [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } else {
    await updateDoc(ref, {
      savedProperties: nextShouldSave ? arrayUnion(propertyId) : arrayRemove(propertyId),
      updatedAt: serverTimestamp(),
    });
  }

  return nextShouldSave;
}

export async function logWhatsAppClick(data = {}) {
  if (!db) return false;
  try {
    await addDoc(collection(db, "whatsapp_clicks"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Error logging WhatsApp click:", error);
    return false;
  }
}
