'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { getProperties, deleteProperty, updateProperty } from '@/lib/firebaseUtils';

export default function AdminPropertiesPage() {
    const [properties, setProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTab, setFilterTab] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [propertyToDelete, setPropertyToDelete] = useState(null);

    useEffect(() => {
        loadProperties();
    }, []);

    const loadProperties = async () => {
        setIsLoading(true);
        try {
            const data = await getProperties();
            setProperties(data);
        } catch (error) {
            console.error("Failed to load properties:", error);
            alert("Failed to load properties from database.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteClick = (e, p) => {
        e.preventDefault();
        e.stopPropagation();
        setPropertyToDelete(p);
    };

    const confirmDelete = async () => {
        if (!propertyToDelete) return;

        try {
            await deleteProperty(propertyToDelete.id, propertyToDelete.image);
            await loadProperties(); // Refresh the list
        } catch (error) {
            console.error("Failed to delete property:", error);
            alert("Failed to delete property. Check permissions.");
        } finally {
            setPropertyToDelete(null);
        }
    };

    const handleApprove = async (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await updateProperty(id, { approvalStatus: 'approved', status: 'Active', active: true });
            await loadProperties();
        } catch (error) {
            console.error("Failed to approve:", error);
        }
    };

    const handleReject = async (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await updateProperty(id, { approvalStatus: 'rejected', status: 'Rejected', active: false });
            await loadProperties();
        } catch (error) {
            console.error("Failed to reject:", error);
        }
    };

    const filtered = properties.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.locality && p.locality.toLowerCase().includes(searchTerm.toLowerCase()));

        if (filterTab === 'pending') {
            return matchesSearch && p.approvalStatus === 'pending_review';
        } else if (filterTab === 'active') {
            return matchesSearch && (p.status === 'Active' || p.active === true);
        }
        return matchesSearch;
    });

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

            {/* Search & Tabs */}
            <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div className="flex bg-white rounded border border-[#D9D0C0] p-1 scale-90 sm:scale-100 origin-left">
                    <button
                        onClick={() => setFilterTab('all')}
                        className={`px-4 py-1.5 text-sm rounded transition-colors ${filterTab === 'all' ? 'bg-[#F5F0E8] text-[#1A1714] font-medium' : 'text-[#7A7268] hover:text-[#1A1714]'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilterTab('active')}
                        className={`px-4 py-1.5 text-sm rounded transition-colors ${filterTab === 'active' ? 'bg-[#F5F0E8] text-[#1A1714] font-medium' : 'text-[#7A7268] hover:text-[#1A1714]'}`}
                    >
                        Active
                    </button>
                    <button
                        onClick={() => setFilterTab('pending')}
                        className={`px-4 py-1.5 text-sm rounded transition-colors flex items-center gap-1 ${filterTab === 'pending' ? 'bg-[#F5F0E8] text-[#1A1714] font-medium' : 'text-[#7A7268] hover:text-[#1A1714]'}`}
                    >
                        Pending Review
                        {properties.filter(p => p.approvalStatus === 'pending_review').length > 0 && (
                            <span className="bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                {properties.filter(p => p.approvalStatus === 'pending_review').length}
                            </span>
                        )}
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Search properties..."
                    className="w-full md:max-w-xs border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none font-sans text-sm bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="bg-white rounded shadow border border-[#D9D0C0] overflow-hidden">
                {isLoading ? (
                    <div className="p-12 flex justify-center items-center">
                        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
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
                                        <td className="p-4 flex items-center min-w-[250px]">
                                            <img src={p.image} className="w-12 h-12 rounded flex-shrink-0 object-cover mr-4 border border-[#D9D0C0]" alt="" />
                                            <div className="overflow-hidden">
                                                <p className="font-medium text-[#1A1714] truncate">{p.name || 'Unnamed Property'}</p>
                                                <p className="text-xs text-[#7A7268] truncate" title={p.id}>ID: {p.id}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-[#7A7268] whitespace-nowrap">
                                            {p.locality ? `${p.locality}, ` : ''}{p.city || 'N/A'}
                                        </td>
                                        <td className="p-4 font-medium text-[#1A1714] whitespace-nowrap">
                                            {p.priceDisplay || 'Price on Request'}
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            <span className="inline-block px-2 py-1 bg-[#C9A96E]/10 text-[#8B4A2F] text-xs rounded-full">
                                                {p.type} {p.subtype ? `• ${p.subtype}` : ''}
                                            </span>
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            <span className="inline-block px-2 py-1 bg-[#D9D0C0]/30 text-[#0D0B09] text-xs rounded-full">
                                                {p.status || 'Active'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-end items-center gap-2">
                                                {p.approvalStatus === 'pending_review' && (
                                                    <>
                                                        <button onClick={(e) => handleApprove(e, p.id)} title="Approve" className="p-2 text-green-600 hover:bg-green-50 transition-colors rounded cursor-pointer flex items-center justify-center">
                                                            <CheckCircle className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={(e) => handleReject(e, p.id)} title="Reject" className="p-2 text-yellow-600 hover:bg-yellow-50 transition-colors rounded cursor-pointer flex items-center justify-center">
                                                            <XCircle className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                                <Link href={`/admin/dashboard/properties/new?id=${p.id}`} className="p-2 text-[#7A7268] hover:bg-[#D9D0C0]/30 hover:text-[#0D0B09] transition-colors rounded cursor-pointer flex items-center justify-center">
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <button onClick={(e) => handleDeleteClick(e, p)} className="p-2 text-[#7A7268] hover:bg-red-50 hover:text-[#8B4A2F] transition-colors rounded cursor-pointer flex items-center justify-center">
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
                {!isLoading && filtered.length === 0 && (
                    <div className="p-12 text-center text-[#7A7268] font-sans">No properties found.</div>
                )}
            </div>

            {/* Custom Confirmation Modal */}
            {propertyToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0B09]/50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded shadow-xl max-w-sm w-full border border-[#D9D0C0]">
                        <h3 className="font-serif text-xl text-[#1A1714] mb-2">Delete Property</h3>
                        <p className="text-sm text-[#7A7268] mb-6 font-sans">
                            Are you sure you want to delete <strong>{propertyToDelete.name}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3 font-sans text-sm tracking-wider uppercase">
                            <button
                                onClick={() => setPropertyToDelete(null)}
                                className="px-4 py-2 border border-[#D9D0C0] text-[#7A7268] hover:border-[#C9A96E] hover:text-[#1A1714] transition-colors rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-[#8B4A2F] text-white hover:bg-red-800 transition-colors rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
