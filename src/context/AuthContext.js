'use client';

import { createContext, useContext, useEffect, useState, useRef } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signup = async (email, password, name) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user to Firestore
        await setDoc(doc(db, 'users', user.uid), {
            name: name || '',
            email: user.email,
            createdAt: serverTimestamp(),
            role: 'user'
        });

        return userCredential;
    };

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;

        // Check if user exists, if not create them
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            await setDoc(userDocRef, {
                name: user.displayName || '',
                email: user.email,
                createdAt: serverTimestamp(),
                role: 'user'
            });
        }

        return userCredential;
    };

    const logout = () => {
        return signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, loginWithGoogle, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
