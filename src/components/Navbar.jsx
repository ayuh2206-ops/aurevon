'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = ['Properties', 'About', 'Services', 'NRI Desk', 'Contact'];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${scrolled ? 'bg-[#0D0B09]/95 backdrop-blur-md h-20 border-b border-[#2E2A25]' : 'bg-gradient-to-b from-[#0D0B09]/80 to-transparent h-28'}`}>
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                <Link href="/" className="flex flex-col">
                    <span className="font-serif text-2xl md:text-3xl text-[#C9A96E] leading-none">AUREVON</span>
                    <span className="font-sans text-[9px] md:text-[10px] text-[#F5F0E8] tracking-[0.25em] mt-1">REALTY</span>
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase().replace(' ', '-')}`}
                            className="group relative font-sans text-[13px] uppercase tracking-[0.15em] text-[#F5F0E8]"
                        >
                            {link}
                            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#C9A96E] transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </div>

                <div className="hidden md:block">
                    <a
                        href="#contact"
                        className="border border-[#C9A96E] text-[#C9A96E] px-6 py-2 font-sans text-xs uppercase tracking-wider hover:bg-[#C9A96E] hover:text-[#0D0B09] transition-colors"
                    >
                        Get in Touch
                    </a>
                </div>

                <button className="md:hidden text-[#F5F0E8]" onClick={() => setMobileMenu(true)} aria-label="Open menu">
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenu && (
                <div className="fixed inset-0 bg-[#0D0B09] z-50 flex flex-col items-center justify-center space-y-8 animate-fade-in">
                    <button className="absolute top-8 right-8 text-[#C9A96E]" onClick={() => setMobileMenu(false)} aria-label="Close menu">
                        <X className="w-8 h-8" />
                    </button>
                    {navLinks.map(link => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase().replace(' ', '-')}`}
                            onClick={() => setMobileMenu(false)}
                            className="font-serif text-4xl text-[#F5F0E8] hover:text-[#C9A96E] transition-colors"
                        >
                            {link}
                        </a>
                    ))}
                    <Link
                        href="/admin"
                        onClick={() => setMobileMenu(false)}
                        className="mt-8 font-sans text-xs text-[#7A7268] uppercase tracking-widest"
                    >
                        Admin Access
                    </Link>
                </div>
            )}
        </nav>
    );
}
