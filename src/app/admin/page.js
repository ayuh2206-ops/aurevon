'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const ADMIN_EMAIL = 'arundongare@aurevon.com';

export default function AdminLoginPage() {
    const { user, login, loading } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // If already logged in as admin, go straight to dashboard
    useEffect(() => {
        if (!loading && user && user.email === ADMIN_EMAIL) {
            router.push('/admin/dashboard');
        }
    }, [user, loading, router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(email, password);
            // The useEffect above will handle the redirect once user state updates
        } catch (err) {
            console.error('Admin login error:', err);
            setError('Invalid credentials. Please check your email and password.');
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
                <h2 className="font-sans text-xl text-[#F5F0E8] mb-8 text-center">Sign In</h2>

                {error && (
                    <div className="mb-6 bg-red-900/30 border border-red-700 text-red-300 p-3 rounded text-sm font-sans">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <input
                        type="email"
                        placeholder="Admin email"
                        required
                        className="w-full bg-transparent border-b border-[#2E2A25] py-3 text-[#F5F0E8] font-sans focus:outline-none focus:border-[#C9A96E] placeholder:text-[#7A7268]"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full bg-transparent border-b border-[#2E2A25] py-3 text-[#F5F0E8] font-sans focus:outline-none focus:border-[#C9A96E] placeholder:text-[#7A7268]"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#C9A96E] text-[#0D0B09] py-3 font-sans text-sm uppercase tracking-widest hover:bg-[#F5F0E8] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Signing In...' : 'Access Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
}
