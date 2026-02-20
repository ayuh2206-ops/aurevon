'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getUserProperties, deleteProperty } from '@/lib/firebaseUtils';
import Link from 'next/link';
import { Plus, Trash2, LogOut } from 'lucide-react';

export default function UserDashboard() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const [properties, setProperties] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        } else if (user) {
            loadUserProperties();
        }
    }, [user, loading, router]);

    const loadUserProperties = async () => {
        setIsLoadingData(true);
        try {
            const data = await getUserProperties(user.email);
            setProperties(data);
        } catch (error) {
            console.error('Failed to load properties:', error);
        } finally {
            setIsLoadingData(false);
        }
    };

    const handleDelete = async (id, image) => {
        if (confirm('Are you sure you want to delete this listing?')) {
            try {
                await deleteProperty(id, image);
                loadUserProperties();
            } catch (error) {
                console.error('Failed to delete property:', error);
                alert('Could not delete property.');
            }
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/');
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    if (loading || !user) {
        return <div className="min-h-screen py-32 flex justify-center bg-[#F5F0E8]"><div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin"></div></div>;
    }

    // Since anyone logged in could be an admin, add a quick link for admin dashboard if their email matches an admin list
    // For simplicity right now, if they want admin they go to /admin/dashboard manually.
    const isAdmin = user.email === 'admin@aurevon.com'; // Hardcoded check or use role-based logic later

    return (
        <div className="min-h-screen bg-[#F5F0E8]">
            {/* Header */}
            <header className="bg-[#0D0B09] border-b border-[#1A1714] sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link href="/" className="font-serif text-2xl tracking-wider text-[#C9A96E]">
                        AUREVON
                    </Link>
                    <div className="flex items-center gap-6">
                        {isAdmin && (
                            <Link href="/admin/dashboard" className="text-sm font-sans text-[#C9A96E] hover:text-white transition-colors">
                                Admin Panel
                            </Link>
                        )}
                        <span className="text-sm font-sans text-[#D9D0C0] hidden sm:block">
                            Welcome, {user.email}
                        </span>
                        <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-sans text-[#7A7268] hover:text-[#D9D0C0] transition-colors">
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1714]">My Properties</h1>
                        <p className="mt-2 text-[#7A7268] font-sans">Manage your property submissions</p>
                    </div>
                    <Link
                        href="/submit-property"
                        className="w-full sm:w-auto bg-[#0D0B09] text-[#C9A96E] px-4 py-2 text-sm uppercase tracking-wider rounded flex items-center justify-center hover:bg-[#1A1714] transition-colors"
                    >
                        <Plus className="w-4 h-4 mr-2" /> List New Property
                    </Link>
                </div>

                <div className="bg-white rounded shadow border border-[#D9D0C0] overflow-hidden">
                    {isLoadingData ? (
                        <div className="p-12 flex justify-center items-center">
                            <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : properties.length === 0 ? (
                        <div className="p-12 text-center">
                            <h2 className="text-xl font-serif text-[#1A1714] mb-2">No Properties Listed</h2>
                            <p className="text-[#7A7268] font-sans mb-6">You haven't submitted any properties yet.</p>
                            <Link href="/submit-property" className="inline-block border border-[#C9A96E] text-[#C9A96E] px-6 py-2 rounded text-sm uppercase tracking-wider hover:bg-[#C9A96E] hover:text-white transition-colors">
                                Submit Property
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-[#1A1714] text-[#D9D0C0] font-sans uppercase tracking-wider text-xs">
                                    <tr>
                                        <th className="p-4">Property</th>
                                        <th className="p-4">Location</th>
                                        <th className="p-4">Price</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#D9D0C0]">
                                    {properties.map(p => (
                                        <tr key={p.id} className="hover:bg-[#F5F0E8]/50 transition-colors">
                                            <td className="p-4 flex items-center min-w-[250px]">
                                                <img src={p.image} className="w-12 h-12 rounded flex-shrink-0 object-cover mr-4 border border-[#D9D0C0]" alt="" />
                                                <div className="overflow-hidden">
                                                    <p className="font-medium text-[#1A1714] truncate">{p.name || 'Unnamed Property'}</p>
                                                    <p className="text-xs text-[#7A7268] truncate">{p.type} • {p.subtype}</p>
                                                </div>
                                            </td>
                                            <td className="p-4 text-[#7A7268] whitespace-nowrap">
                                                {p.locality ? `${p.locality}, ` : ''}{p.city || 'N/A'}
                                            </td>
                                            <td className="p-4 font-medium text-[#1A1714] whitespace-nowrap">
                                                {p.priceDisplay || 'Price on Request'}
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                {p.approvalStatus === 'pending_review' || p.status === 'Under Review' ? (
                                                    <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full border border-yellow-200">
                                                        Under Review
                                                    </span>
                                                ) : p.approvalStatus === 'approved' || p.status === 'Active' ? (
                                                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full border border-green-200">
                                                        Active
                                                    </span>
                                                ) : p.approvalStatus === 'rejected' ? (
                                                    <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full border border-red-200">
                                                        Rejected
                                                    </span>
                                                ) : (
                                                    <span className="inline-block px-2 py-1 bg-[#D9D0C0]/30 text-[#0D0B09] text-xs rounded-full">
                                                        {p.status || 'Active'}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex justify-end items-center gap-2">
                                                    <button onClick={() => handleDelete(p.id, p.image)} className="p-2 text-[#7A7268] hover:bg-red-50 hover:text-red-600 transition-colors rounded cursor-pointer flex items-center justify-center">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
