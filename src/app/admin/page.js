'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { isAdminEmail } from '@/lib/config';

export default function AdminLoginPage() {
    const { user, loginWithGoogle, logout, loading } = useAuth();
    const router = useRouter();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // If already logged in as admin, go straight to dashboard
    useEffect(() => {
        if (!loading && user && isAdminEmail(user.email)) {
            router.push('/admin/dashboard');
        }
    }, [user, loading, router]);

    const handleGoogleLogin = async () => {
        setError('');
        setIsLoading(true);
        try {
            const credential = await loginWithGoogle();
            
            // Check if the Google account matches the hardcoded admin email
            if (!isAdminEmail(credential.user.email)) {
                await logout();
                setError('Unauthorized. This portal is restricted to the site administrator.');
            }
            // If it matches, the useEffect above will handle the redirect
        } catch (err) {
            console.error('Admin Google login error:', err);
            setError('Failed to sign in with Google. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (loading) return null;

    return (
        <div className="min-h-screen bg-[#0D0B09] flex flex-col items-center justify-center p-6">
            <div className="mb-10 text-center">
                <h1 className="font-serif text-4xl text-[#C9A96E]">AUREVON</h1>
                <p className="font-sans text-[10px] text-[#F5F0E8] tracking-[0.2em]">ADMIN PORTAL</p>
            </div>
            <div className="bg-[#1A1714] border border-[#2E2A25] p-10 rounded-lg w-full max-w-md shadow-2xl">
                <h2 className="font-sans text-xl text-[#F5F0E8] mb-8 text-center bg-transparent">Sign In</h2>

                {error && (
                    <div className="mb-6 bg-red-900/30 border border-red-700 text-red-300 p-3 rounded text-sm font-sans text-center">
                        {error}
                    </div>
                )}

                <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full bg-[#F5F0E8] text-[#0D0B09] py-3.5 px-4 font-sans text-sm font-medium hover:bg-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 rounded"
                >
                    {/* Google SVG Icon */}
                    <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                        <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                            <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                            <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                            <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                            <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                        </g>
                    </svg>
                    {isLoading ? 'Signing In...' : 'Sign in with Google'}
                </button>
                <p className="mt-6 text-center text-xs font-sans text-[#7A7268]">
                    Restricted to site administrator only.
                </p>
            </div>
        </div>
    );
}
