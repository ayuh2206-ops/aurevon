'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Building2, Plus, MessageCircle, Settings, LogOut, LayoutDashboard, FileText } from 'lucide-react';

const sidebarLinks = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Properties', href: '/admin/dashboard/properties', icon: Building2 },
    { label: 'Add Property', href: '/admin/dashboard/properties/new', icon: Plus },
    { label: 'Blog Posts', href: '/admin/dashboard/blogs', icon: FileText },
    { label: 'Enquiries', href: '/admin/dashboard/enquiries', icon: MessageCircle },
    { label: 'Settings', href: '/admin/dashboard/settings', icon: Settings },
];

export default function AdminDashboardLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [authed, setAuthed] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isAuthed = localStorage.getItem('aurevon_auth') === 'true';
            if (!isAuthed) {
                router.push('/admin');
            } else {
                setAuthed(true);
            }
        }
    }, [router]);

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('aurevon_auth');
        }
        router.push('/admin');
    };

    if (!authed) return null;

    return (
        <div className="min-h-screen bg-[#F5F0E8] flex flex-col md:flex-row font-sans">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-[#0D0B09] text-[#F5F0E8] flex flex-col md:min-h-screen shrink-0">
                <div className="p-4 md:p-6 border-b border-[#2E2A25] flex justify-between items-center md:block">
                    <Link href="/">
                        <h1 className="font-serif text-xl md:text-2xl text-[#C9A96E]">AUREVON</h1>
                        <p className="text-[10px] tracking-[0.2em] text-[#7A7268]">ADMIN</p>
                    </Link>
                    <button onClick={handleLogout} className="md:hidden text-[#8B4A2F] p-2 hover:bg-[#1A1714] rounded cursor-pointer">
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
                <nav className="flex-row overflow-x-auto md:flex-col flex-1 p-2 md:p-4 gap-2 md:space-y-2 flex scrollbar-hide border-b border-[#2E2A25] md:border-none">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`shrink-0 md:w-full flex items-center p-3 rounded text-sm transition-colors ${isActive ? 'bg-[#1A1714] text-[#C9A96E]' : 'text-[#7A7268] hover:text-[#F5F0E8]'}`}
                            >
                                <link.icon className="w-4 h-4 mr-2 md:mr-3" />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="hidden md:block p-4 border-t border-[#2E2A25]">
                    <button onClick={handleLogout} className="w-full flex items-center p-3 rounded text-sm text-[#8B4A2F] hover:bg-[#1A1714] cursor-pointer">
                        <LogOut className="w-4 h-4 mr-3" /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-8 md:p-12 overflow-y-auto w-full">
                <div className="mb-6 text-right">
                    <span className="font-sans text-sm text-[#7A7268]">Welcome, <span className="text-[#1A1714] font-medium">Arun</span></span>
                </div>
                {children}
            </main>
        </div>
    );
}
