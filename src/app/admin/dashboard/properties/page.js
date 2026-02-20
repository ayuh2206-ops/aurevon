'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { initialProperties } from '@/lib/data';

export default function AdminPropertiesPage() {
    const [properties, setProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Load from localStorage or use initial data
        const stored = typeof window !== 'undefined' ? localStorage.getItem('aurevon_properties') : null;
        setProperties(stored ? JSON.parse(stored) : initialProperties);
    }, []);

    const saveProperties = (props) => {
        setProperties(props);
        if (typeof window !== 'undefined') {
            localStorage.setItem('aurevon_properties', JSON.stringify(props));
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this property?')) {
            saveProperties(properties.filter(p => p.id !== id));
        }
    };

    const filtered = properties.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.locality.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1714]">Property Portfolio</h2>
                <Link
                    href="/admin/dashboard/properties/new"
                    className="w-full sm:w-auto bg-[#0D0B09] text-[#C9A96E] px-4 py-2 text-sm uppercase tracking-wider rounded flex items-center justify-center"
                >
                    <Plus className="w-4 h-4 mr-2" /> Add New
                </Link>
            </div>

            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search properties..."
                    className="w-full max-w-md border border-[#D9D0C0] p-3 rounded focus:border-[#C9A96E] outline-none font-sans text-sm bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="bg-white rounded shadow border border-[#D9D0C0] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#0D0B09] text-[#C9A96E] font-sans uppercase tracking-wider text-xs">
                            <tr>
                                <th className="p-4">Property</th>
                                <th className="p-4">Location</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#D9D0C0]">
                            {filtered.map(p => (
                                <tr key={p.id} className="hover:bg-[#F5F0E8]/50 transition-colors">
                                    <td className="p-4 flex items-center">
                                        <img src={p.image} className="w-12 h-12 rounded object-cover mr-4 border border-[#D9D0C0]" alt="" />
                                        <div>
                                            <p className="font-medium text-[#1A1714]">{p.name}</p>
                                            <p className="text-xs text-[#7A7268]">ID: {p.id}</p>
                                        </div>
                                    </td>
                                    <td className="p-4 text-[#7A7268]">{p.locality}, {p.city}</td>
                                    <td className="p-4 font-medium text-[#1A1714]">{p.priceDisplay}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-[#C9A96E]/10 text-[#8B4A2F] text-xs rounded-full">{p.type} • {p.subtype}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-[#D9D0C0]/30 text-[#0D0B09] text-xs rounded-full">{p.status}</span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="p-2 text-[#7A7268] hover:text-[#0D0B09] cursor-pointer"><Edit2 className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete(p.id)} className="p-2 text-[#7A7268] hover:text-[#8B4A2F] cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filtered.length === 0 && (
                    <div className="p-12 text-center text-[#7A7268] font-sans">No properties found.</div>
                )}
            </div>
        </div>
    );
}
