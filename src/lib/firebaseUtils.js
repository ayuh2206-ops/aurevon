import { db } from './firebase';
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy
} from 'firebase/firestore';

const PROPERTIES_COLLECTION = 'properties';

// ==========================================
// PROPERTIES CRUD
// ==========================================

/**
 * Get all properties from Firestore, ordered by creation date descending
 */
export async function getProperties() {
    try {
        const propertiesRef = collection(db, PROPERTIES_COLLECTION);
        const q = query(propertiesRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error fetching properties:', error);
        throw error;
    }
}

/**
 * Get properties submitted by a specific user email
 */
export async function getUserProperties(email) {
    if (!email) return [];
    try {
        const propertiesRef = collection(db, PROPERTIES_COLLECTION);
        const q = query(
            propertiesRef,
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);

        // Filter on client side due to needing a composite index if combining where() and orderBy()
        const allDocs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return allDocs.filter(p => p.submittedBy === email);
    } catch (error) {
        console.error('Error fetching user properties:', error);
        throw error;
    }
}

/**
 * Get a single property by ID
 */
export async function getProperty(id) {
    try {
        const propertyRef = doc(db, PROPERTIES_COLLECTION, id);
        const snapshot = await getDoc(propertyRef);
        if (snapshot.exists()) {
            return { id: snapshot.id, ...snapshot.data() };
        }
        return null;
    } catch (error) {
        console.error('Error fetching property:', error);
        throw error;
    }
}

/**
 * Add a new property to Firestore
 */
export async function addProperty(propertyData) {
    try {
        const propertiesRef = collection(db, PROPERTIES_COLLECTION);
        const newDoc = await addDoc(propertiesRef, {
            ...propertyData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        return newDoc.id;
    } catch (error) {
        console.error('Error adding property:', error);
        throw error;
    }
}

/**
 * Update an existing property in Firestore
 */
export async function updateProperty(id, propertyData) {
    try {
        const propertyRef = doc(db, PROPERTIES_COLLECTION, id);
        await updateDoc(propertyRef, {
            ...propertyData,
            updatedAt: new Date().toISOString()
        });
        return true;
    } catch (error) {
        console.error('Error updating property:', error);
        throw error;
    }
}

/**
 * Delete a property from Firestore (and its associated image if it exists)
 */
export async function deleteProperty(id, imageUrl = null) {
    try {
        // Delete the document
        const propertyRef = doc(db, PROPERTIES_COLLECTION, id);
        await deleteDoc(propertyRef);

        // Note: The previous logic strictly relied on Firebase Storage deletion.
        // As we have migrated to Cloudinary unsigned uploads, Cloudinary handles its own 
        // asset retention, or they will be orphaned unless specifically managed via their backend API.

        return true;
    } catch (error) {
        console.error('Error deleting property:', error);
        throw error;
    }
}

// ==========================================
// SEARCH OPTIONS (ADMIN DYNAMIC ARRAYS)
// ==========================================

const SETTINGS_COLLECTION = 'settings';
const SEARCH_OPTIONS_DOC = 'searchOptions';

const defaultSearchOptions = {
    commercialTypes: [
        'Office Space', 'Retail', 'Showroom', 'Co-Working',
        'Industrial', 'Warehouse', 'IT Park', 'Commercial Land'
    ],
    residentialTypes: [
        'Apartment', 'Villa', 'Independent House', 'Residential Plot', 'Agricultural'
    ],
    locations: [
        'Akurdi', 'Aundh', 'Balewadi', 'Baner', 'Bavdhan', 'Bhosari', 'Bibwewadi', 'Camp', 'Chakan',
        'Chinchwad', 'Deccan Gymkhana', 'Dhanori', 'Erandwane', 'FC Road', 'Fatima Nagar', 'Hadapsar',
        'Hinjewadi', 'JM Road', 'Kalyani Nagar', 'Karve Nagar', 'Kharadi', 'Kondhwa', 'Koregaon Park',
        'Kothrud', 'Magarpatta City', 'Mahalunge', 'Market Yard', 'Model Colony', 'Nigdi', 'Pashan',
        'Pimpri', 'Pune Station', 'Ravet', 'Sadashiv Peth', 'SB Road', 'Shivajinagar', 'Sinhagad Road',
        'Swargate', 'Tathawade', 'Viman Nagar', 'Vishrantwadi', 'Wagholi', 'Wakad', 'Wanowrie', 'Yerwada'
    ],
    budgets: ['Under ₹50 Lacs', '₹50 Lacs - ₹1 Cr', '₹1 Cr - ₹5 Cr', 'Above ₹5 Cr'],
    areas: ['Under 500 sqft', '500 - 1000 sqft', '1000 - 5000 sqft', 'Above 5000 sqft'],
    yields: ['Up to 5%', '5% - 7%', '7% - 9%', 'Above 9%'],
    constructionStatuses: ['Under Construction', 'Ready to Move', 'New Launch']
};

/**
 * Fetch dynamic search options from Firestore.
 * If they don't exist yet, returns the default arrays.
 */
export async function getSearchOptions() {
    try {
        const docRef = doc(db, SETTINGS_COLLECTION, SEARCH_OPTIONS_DOC);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
            return { ...defaultSearchOptions, ...snapshot.data() };
        }
        return defaultSearchOptions;
    } catch (error) {
        console.error('Error fetching search options:', error);
        return defaultSearchOptions; // Fallback so the app doesn't break
    }
}

/**
 * Update the dynamic search options in Firestore.
 */
export async function updateSearchOptions(optionsData) {
    try {
        const docRef = doc(db, SETTINGS_COLLECTION, SEARCH_OPTIONS_DOC);
        // Using setDoc with merge:true securely creates the doc if it doesn't exist,
        // or updates the specific fields if it does.
        await setDoc(docRef, optionsData, { merge: true });
        return true;
    } catch (error) {
        console.error('Error updating search options:', error);
        throw error;
    }
}

// ==========================================
// ENQUIRIES CRUD
// ==========================================

const ENQUIRIES_COLLECTION = 'enquiries';

export async function addEnquiry(enquiryData) {
    try {
        const enquiriesRef = collection(db, ENQUIRIES_COLLECTION);
        const newDoc = await addDoc(enquiriesRef, {
            ...enquiryData,
            createdAt: new Date().toISOString()
        });
        return newDoc.id;
    } catch (error) {
        console.error('Error adding enquiry:', error);
        throw error;
    }
}

export async function getEnquiries() {
    try {
        const enquiriesRef = collection(db, ENQUIRIES_COLLECTION);
        const q = query(enquiriesRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error fetching enquiries:', error);
        throw error;
    }
}

// ==========================================
// BLOGS CRUD
// ==========================================

const BLOGS_COLLECTION = 'blogs';

export async function getBlogs() {
    try {
        const ref = collection(db, BLOGS_COLLECTION);
        const q = query(ref, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
}

export async function addBlog(blogData) {
    try {
        const ref = collection(db, BLOGS_COLLECTION);
        const newDoc = await addDoc(ref, {
            ...blogData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
        return newDoc.id;
    } catch (error) {
        console.error('Error adding blog:', error);
        throw error;
    }
}

export async function updateBlog(id, blogData) {
    try {
        const ref = doc(db, BLOGS_COLLECTION, id);
        await updateDoc(ref, { ...blogData, updatedAt: new Date().toISOString() });
        return true;
    } catch (error) {
        console.error('Error updating blog:', error);
        throw error;
    }
}

export async function deleteBlog(id) {
    try {
        const ref = doc(db, BLOGS_COLLECTION, id);
        await deleteDoc(ref);
        return true;
    } catch (error) {
        console.error('Error deleting blog:', error);
        throw error;
    }
}

// ==========================================
// SITE SETTINGS (siteConfig document)
// ==========================================

const SITE_CONFIG_DOC = 'siteConfig';

export async function getSiteConfig() {
    try {
        const ref = doc(db, SETTINGS_COLLECTION, SITE_CONFIG_DOC);
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) return snapshot.data();
        return null;
    } catch (error) {
        console.error('Error fetching siteConfig:', error);
        return null;
    }
}

export async function updateSiteConfig(configData) {
    try {
        const ref = doc(db, SETTINGS_COLLECTION, SITE_CONFIG_DOC);
        await setDoc(ref, configData, { merge: true });
        return true;
    } catch (error) {
        console.error('Error updating siteConfig:', error);
        throw error;
    }
}

