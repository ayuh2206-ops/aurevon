import { db, storage } from './firebase';
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    orderBy
} from 'firebase/firestore';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from 'firebase/storage';

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

        // Try to delete the image from storage if an explicit firebase storage URL is provided
        if (imageUrl && imageUrl.includes('firebasestorage')) {
            try {
                // Extract filename from URL (basic approach)
                // Proper approach depends on exact storage path structure
                const imageRef = ref(storage, imageUrl);
                await deleteObject(imageRef);
            } catch (imgError) {
                console.warn('Could not delete associated image:', imgError);
            }
        }
        return true;
    } catch (error) {
        console.error('Error deleting property:', error);
        throw error;
    }
}

// ==========================================
// STORAGE UTILITIES
// ==========================================

/**
 * Upload an image file to Firebase Storage and return its public URL
 */
export async function uploadPropertyImage(file) {
    if (!file) return null;

    try {
        // Create a unique filename
        const filename = `${Date.now()}_${file.name.replace(/\.[^/.]+$/, "")}`;
        const storageRef = ref(storage, `properties/${filename}`);

        // Upload the file
        const snapshot = await uploadBytes(storageRef, file);

        // Get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}
