'use client';
import { Building2, MessageCircle, ArrowUpRight } from 'lucide-react';

export default function AdminDashboardPage() {
    return (
        <div>
            <h2 className="font-serif text-3xl text-[#1A1714] mb-8">Dashboard Overview</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                    { label: 'Total Properties', value: '6', icon: Building2, color: '#C9A96E' },
                    { label: 'Active Listings', value: '6', icon: ArrowUpRight, color: '#25D366' },
                    { label: 'New Enquiries', value: '3', icon: MessageCircle, color: '#8B4A2F' },
                    { label: 'Featured', value: '6', icon: Building2, color: '#C9A96E' },
                ].map((card, i) => (
                    <div key={i} className="bg-white p-6 rounded border border-[#D9D0C0]">
                        <div className="flex justify-between items-start mb-4">
                            <card.icon className="w-6 h-6" style={{ color: card.color }} />
                        </div>
                        <p className="font-serif text-3xl text-[#1A1714] mb-1">{card.value}</p>
                        <p className="font-sans text-xs text-[#7A7268] uppercase tracking-wider">{card.label}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white p-8 rounded border border-[#D9D0C0]">
                <h3 className="font-serif text-xl text-[#1A1714] mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-4">
                    <a href="/admin/dashboard/properties/new" className="bg-[#0D0B09] text-[#C9A96E] px-6 py-3 rounded font-sans text-sm uppercase tracking-wider hover:bg-[#1A1714] transition-colors">
                        Add New Property
                    </a>
                    <a href="/admin/dashboard/enquiries" className="border border-[#D9D0C0] text-[#1A1714] px-6 py-3 rounded font-sans text-sm uppercase tracking-wider hover:border-[#C9A96E] transition-colors">
                        View Enquiries
                    </a>
                    <a href="/admin/dashboard/settings" className="border border-[#D9D0C0] text-[#1A1714] px-6 py-3 rounded font-sans text-sm uppercase tracking-wider hover:border-[#C9A96E] transition-colors">
                        Site Settings
                    </a>
                </div>
            </div>
        </div>
    );
}
