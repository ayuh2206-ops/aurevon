import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
    try {
        console.log("Fetching...");
        const snapshot = await getDocs(collection(db, "properties"));
        const docs = snapshot.docs.map(d => ({id: d.id, name: d.data().name}));
        console.log("Docs:", docs);
        
        if (docs.length > 0) {
            console.log("Deleting:", docs[0].id);
            await deleteDoc(doc(db, "properties", docs[0].id));
            console.log("Deleted.");
        }
    } catch (e) {
        console.error("Error:", e);
    }
}
test();
