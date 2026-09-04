'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import {
    ensureUserProfile,
    toggleSavedProperty,
    updateUserProfile,
} from '@/lib/firebaseUtils';
import { trackConversion } from '@/lib/realEstate';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const reasonCopy = {
    enquiry: 'Sign in to send high-intent property enquiries with verified contact details.',
    loan: 'Sign in to request home-loan assistance for this property.',
    compare: 'Sign in to compare properties and keep your shortlist available.',
    save: 'Sign in to save properties across devices.',
    default: 'Sign in to continue with Aurevon Realty.',
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileLoading, setProfileLoading] = useState(false);
    const [authModal, setAuthModal] = useState({ open: false, reason: 'default' });
    const [modalError, setModalError] = useState('');
    const [profileForm, setProfileForm] = useState({ name: '', phone: '' });
    const pendingActionRef = useRef(null);
    const userRef = useRef(null);

    const runPendingAction = useCallback(async () => {
        const action = pendingActionRef.current;
        pendingActionRef.current = null;
        if (typeof action === 'function') {
            await action();
        }
    }, []);

    const refreshUserProfile = useCallback(async (currentUser = userRef.current) => {
        if (!currentUser) {
            setUserProfile(null);
            return null;
        }

        setProfileLoading(true);
        try {
            const profile = await ensureUserProfile(currentUser);
            setUserProfile(profile);
            setProfileForm({
                name: profile?.name || currentUser.displayName || '',
                phone: profile?.phone || '',
            });
            return profile;
        } catch (error) {
            console.error('Failed to load user profile:', error);
            return null;
        } finally {
            setProfileLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            return undefined;
        }

        let cancelled = false;
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (cancelled) return;
            userRef.current = currentUser;
            setUser(currentUser);
            if (currentUser) {
                await refreshUserProfile(currentUser);
            } else {
                setUserProfile(null);
                setProfileForm({ name: '', phone: '' });
            }
            if (!cancelled) setLoading(false);
        });

        return () => {
            cancelled = true;
            unsubscribe();
        };
    }, [refreshUserProfile]);

    useEffect(() => {
        if (!authModal.open || loading || profileLoading || !user || !userProfile) return;
        if (userProfile.phone) {
            setAuthModal({ open: false, reason: 'default' });
            runPendingAction().catch((error) => {
                console.error('Pending auth action failed:', error);
            });
        }
    }, [authModal.open, loading, profileLoading, runPendingAction, user, userProfile]);

    const login = async (email, password) => {
        if (!auth) throw new Error('Firebase Auth is not configured.');
        const credential = await signInWithEmailAndPassword(auth, email, password);
        await refreshUserProfile(credential.user);
        return credential;
    };

    const signup = async (email, password, name) => {
        if (!auth) throw new Error('Firebase Auth is not configured.');
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        const profile = await ensureUserProfile(credential.user, { name });
        setUserProfile(profile);
        return credential;
    };

    const loginWithGoogle = async () => {
        if (!auth) throw new Error('Firebase Auth is not configured.');
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        const credential = await signInWithPopup(auth, provider);
        const profile = await ensureUserProfile(credential.user);
        setUserProfile(profile);
        return credential;
    };

    const logout = async () => {
        if (!auth) return;
        await signOut(auth);
        userRef.current = null;
        setUser(null);
        setUserProfile(null);
    };

    const openAuthModal = (reason = 'default', pendingAction = null) => {
        if (pendingAction) pendingActionRef.current = pendingAction;
        if (user && userProfile?.phone) {
            runPendingAction().catch((error) => console.error('Pending action failed:', error));
            return;
        }
        setModalError('');
        setAuthModal({ open: true, reason });
    };

    const closeAuthModal = () => {
        pendingActionRef.current = null;
        setAuthModal({ open: false, reason: 'default' });
        setModalError('');
    };

    const completeProfile = async (event) => {
        event?.preventDefault?.();
        if (!user) return;
        const phoneDigits = profileForm.phone.replace(/\D/g, '');
        if (!profileForm.name.trim() || phoneDigits.length < 8) {
            setModalError('Please enter your full name and a valid phone number.');
            return;
        }

        const lastSave = Number(localStorage.getItem('aurevon_profile_save_at') || 0);
        if (Date.now() - lastSave < 10000) {
            setModalError('Please wait a few seconds before saving again.');
            return;
        }

        setProfileLoading(true);
        setModalError('');
        try {
            localStorage.setItem('aurevon_profile_save_at', String(Date.now()));
            const profile = await updateUserProfile(user.uid, {
                uid: user.uid,
                email: user.email || '',
                name: profileForm.name.trim(),
                phone: profileForm.phone.trim(),
                photoURL: user.photoURL || '',
            });
            setUserProfile(profile);
            trackConversion('profile_completed', { userId: user.uid });
            setAuthModal({ open: false, reason: 'default' });
            await runPendingAction();
        } catch (error) {
            console.error('Profile completion failed:', error);
            setModalError(error.message || 'Could not save your profile. Please try again.');
        } finally {
            setProfileLoading(false);
        }
    };

    const toggleSaved = async (propertyId, shouldSave) => {
        if (!user) throw new Error('Sign in required.');
        const before = userProfile?.savedProperties || [];
        const nextShouldSave = typeof shouldSave === 'boolean' ? shouldSave : !before.includes(propertyId);
        const nextSaved = nextShouldSave
            ? [...new Set([...before, propertyId])]
            : before.filter((id) => id !== propertyId);

        setUserProfile((profile) => ({
            ...(profile || {}),
            savedProperties: nextSaved,
        }));

        try {
            await toggleSavedProperty(user.uid, propertyId, nextShouldSave);
            trackConversion(nextShouldSave ? 'property_saved' : 'property_unsaved', { propertyId });
            return nextShouldSave;
        } catch (error) {
            setUserProfile((profile) => ({
                ...(profile || {}),
                savedProperties: before,
            }));
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                userProfile,
                loading,
                profileLoading,
                login,
                signup,
                loginWithGoogle,
                logout,
                openAuthModal,
                closeAuthModal,
                refreshUserProfile,
                completeProfile,
                toggleSaved,
            }}
        >
            {children}
            {authModal.open && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0D0B09]/80 backdrop-blur-sm px-4">
                    <div className="w-full max-w-md bg-[#1A1714] border border-[#2E2A25] rounded-xl p-8 shadow-2xl">
                        <div className="mb-6">
                            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] mb-3">Aurevon Access</p>
                            <h2 className="font-serif text-3xl text-[#F5F0E8] mb-2">
                                {user ? 'Complete your profile' : 'Sign in to continue'}
                            </h2>
                            <p className="font-sans text-sm text-[#9E968E] leading-relaxed">
                                {reasonCopy[authModal.reason] || reasonCopy.default}
                            </p>
                        </div>

                        {modalError && (
                            <div className="mb-5 rounded border border-red-700 bg-red-900/30 p-3 text-sm text-red-200">
                                {modalError}
                            </div>
                        )}

                        {!user ? (
                            <button
                                onClick={async () => {
                                    setModalError('');
                                    try {
                                        await loginWithGoogle();
                                    } catch (error) {
                                        setModalError(error.message || 'Google sign-in failed.');
                                    }
                                }}
                                className="w-full rounded bg-[#F5F0E8] px-4 py-3.5 font-sans text-sm font-medium text-[#0D0B09] transition-colors hover:bg-white"
                            >
                                Sign in with Google
                            </button>
                        ) : (
                            <form onSubmit={completeProfile} className="space-y-4">
                                <div>
                                    <label className="mb-1.5 block font-sans text-xs uppercase tracking-wider text-[#7A7268]">Full Name</label>
                                    <input
                                        value={profileForm.name}
                                        onChange={(event) => setProfileForm((prev) => ({ ...prev, name: event.target.value }))}
                                        className="w-full rounded border border-[#2E2A25] bg-[#0D0B09] px-3 py-3 text-sm text-[#F5F0E8] outline-none focus:border-[#C9A96E]"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block font-sans text-xs uppercase tracking-wider text-[#7A7268]">Phone / WhatsApp</label>
                                    <input
                                        value={profileForm.phone}
                                        onChange={(event) => setProfileForm((prev) => ({ ...prev, phone: event.target.value }))}
                                        className="w-full rounded border border-[#2E2A25] bg-[#0D0B09] px-3 py-3 text-sm text-[#F5F0E8] outline-none focus:border-[#C9A96E]"
                                        placeholder="+91 ..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={profileLoading}
                                    className="w-full rounded bg-[#C9A96E] px-4 py-3.5 font-sans text-xs uppercase tracking-widest text-[#0D0B09] transition-colors hover:bg-[#F5F0E8] disabled:opacity-60"
                                >
                                    {profileLoading ? 'Saving...' : 'Save and Continue'}
                                </button>
                            </form>
                        )}

                        <button
                            onClick={closeAuthModal}
                            className="mt-5 w-full text-center font-sans text-xs uppercase tracking-widest text-[#7A7268] transition-colors hover:text-[#F5F0E8]"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </AuthContext.Provider>
    );
};
