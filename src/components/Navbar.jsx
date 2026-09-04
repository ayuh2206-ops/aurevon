'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, LogOut, Menu, UserCircle, X } from 'lucide-react';
import { BUSINESS } from '@/lib/config';
import { getContentSettings } from '@/lib/firebaseUtils';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const pathname = usePathname();
    const { user, userProfile, logout, openAuthModal } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [userMenu, setUserMenu] = useState(false);
    const [logoUrl, setLogoUrl] = useState('');

    useEffect(() => {
        if (pathname?.startsWith('/admin')) return;
        const cachedLogo = sessionStorage.getItem('aurevon_logo_url');
        if (cachedLogo) setLogoUrl(cachedLogo);
        getContentSettings().then((settings) => {
            if (settings?.logoUrl) {
                setLogoUrl(settings.logoUrl);
                sessionStorage.setItem('aurevon_logo_url', settings.logoUrl);
            }
        }).catch(() => {});
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (pathname?.startsWith('/admin')) return null;

    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'Properties', href: '/listings' },
        { label: 'Journal', href: '/journal' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
    ];

    const closeMobile = () => setMobileMenu(false);

    return (
        <nav className={`fixed top-0 z-[100] w-full transition-all duration-500 ease-in-out ${scrolled ? 'h-20 border-b border-[#2E2A25] bg-[#0D0B09]/95 backdrop-blur-md' : 'h-28 bg-gradient-to-b from-[#0D0B09]/80 to-transparent'}`}>
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-3">
                    {logoUrl ? (
                        <img
                            src={logoUrl}
                            alt={BUSINESS.businessName}
                            className="h-10 w-auto max-w-[150px] object-contain"
                            onError={() => setLogoUrl('')}
                        />
                    ) : (
                        <span className="flex flex-col">
                            <span className="font-serif text-2xl leading-none text-[#C9A96E] md:text-3xl">AUREVON</span>
                            <span className="mt-1 font-sans text-[9px] tracking-[0.25em] text-[#F5F0E8] md:text-[10px]">REALTY</span>
                        </span>
                    )}
                </Link>

                <div className="hidden items-center space-x-7 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="group relative font-sans text-[13px] uppercase tracking-[0.15em] text-[#F5F0E8]"
                        >
                            {link.label}
                            <span className="absolute -bottom-2 left-0 h-[1px] w-0 bg-[#C9A96E] transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                <div className="hidden items-center gap-4 md:flex">
                    <Link
                        href="/contact"
                        className="border border-[#C9A96E] px-5 py-2 font-sans text-xs uppercase tracking-wider text-[#C9A96E] transition-colors hover:bg-[#C9A96E] hover:text-[#0D0B09]"
                    >
                        Schedule Consultation
                    </Link>
                    {user ? (
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setUserMenu((open) => !open)}
                                className="flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-[#F5F0E8] transition-colors hover:text-[#C9A96E]"
                            >
                                <UserCircle className="h-4 w-4" />
                                {userProfile?.name || user.displayName || 'Account'}
                                <ChevronDown className={`h-3 w-3 transition-transform ${userMenu ? 'rotate-180' : ''}`} />
                            </button>
                            {userMenu && (
                                <div className="absolute right-0 top-full mt-4 w-48 rounded border border-[#2E2A25] bg-[#0D0B09]/95 p-2 shadow-2xl backdrop-blur">
                                    <Link href="/saved" onClick={() => setUserMenu(false)} className="block rounded px-3 py-2 font-sans text-sm text-[#F5F0E8] hover:bg-[#1A1714] hover:text-[#C9A96E]">
                                        Saved Properties
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            setUserMenu(false);
                                            await logout();
                                        }}
                                        className="flex w-full items-center rounded px-3 py-2 text-left font-sans text-sm text-[#7A7268] hover:bg-[#1A1714] hover:text-[#F5F0E8]"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" /> Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => openAuthModal('default')}
                            className="font-sans text-xs uppercase tracking-wider text-[#F5F0E8] transition-colors hover:text-[#C9A96E]"
                        >
                            Sign In
                        </button>
                    )}
                </div>

                <button className="text-[#F5F0E8] md:hidden" onClick={() => setMobileMenu(true)} aria-label="Open menu">
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            {mobileMenu && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center space-y-8 bg-[#0D0B09] animate-fade-in">
                    <button className="absolute right-8 top-8 text-[#C9A96E]" onClick={closeMobile} aria-label="Close menu">
                        <X className="h-8 w-8" />
                    </button>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeMobile}
                            className="font-serif text-4xl text-[#F5F0E8] transition-colors hover:text-[#C9A96E]"
                        >
                            {link.label}
                        </Link>
                    ))}
                    {user ? (
                        <>
                            <Link href="/saved" onClick={closeMobile} className="font-serif text-4xl text-[#C9A96E] transition-colors hover:text-[#F5F0E8]">
                                Saved
                            </Link>
                            <button
                                type="button"
                                onClick={async () => {
                                    closeMobile();
                                    await logout();
                                }}
                                className="font-sans text-xs uppercase tracking-widest text-[#7A7268]"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={() => {
                                closeMobile();
                                openAuthModal('default');
                            }}
                            className="font-serif text-4xl text-[#C9A96E] transition-colors hover:text-[#F5F0E8]"
                        >
                            Sign In
                        </button>
                    )}
                    <Link href="/admin" onClick={closeMobile} className="mt-8 font-sans text-xs uppercase tracking-widest text-[#7A7268]">
                        Admin Access
                    </Link>
                </div>
            )}
        </nav>
    );
}
