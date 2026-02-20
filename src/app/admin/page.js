'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const [pwd, setPwd] = useState('');
    const router = useRouter();

    const handleLogin = (password) => {
        if (password === 'admin') {
            if (typeof window !== 'undefined') {
                localStorage.setItem('aurevon_auth', 'true');
            }
            router.push('/admin/dashboard');
        } else {
            alert("Incorrect password. Hint: admin");
        }
    };

    return (
        <div className="min-h-screen bg-[#0D0B09] flex flex-col items-center justify-center p-6">
            <div className="mb-10 text-center">
                <h1 className="font-serif text-4xl text-[#C9A96E]">AUREVON</h1>
                <p className="font-sans text-[10px] text-[#F5F0E8] tracking-[0.2em]">ADMIN PORTAL</p>
            </div>
            <div className="bg-[#1A1714] border border-[#2E2A25] p-10 rounded-lg w-full max-w-md shadow-2xl">
                <h2 className="font-sans text-xl text-[#F5F0E8] mb-8 text-center">Sign In</h2>
                <input
                    type="password"
                    placeholder="Enter password (hint: admin)"
                    className="w-full bg-transparent border-b border-[#2E2A25] py-3 text-[#F5F0E8] font-sans focus:outline-none focus:border-[#C9A96E] mb-8 placeholder:text-[#7A7268]"
                    value={pwd}
                    onChange={e => setPwd(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleLogin(pwd)}
                />
                <button
                    onClick={() => handleLogin(pwd)}
                    className="w-full bg-[#C9A96E] text-[#0D0B09] py-3 font-sans text-sm uppercase tracking-widest hover:bg-[#F5F0E8] transition-colors cursor-pointer"
                >
                    Access Dashboard
                </button>
            </div>
        </div>
    );
}
