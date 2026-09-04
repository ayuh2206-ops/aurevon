'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Edit2, Plus, RefreshCcw, Trash2 } from 'lucide-react';
import {
    backfillListingIds,
    deleteProperty,
    getProperties,
    updateProperty,
} from '@/lib/firebaseUtils';
import { getSampleProperties, normalizeProperty } from '@/lib/realEstate';

const statusTabs = ['All', 'Published', 'Draft', 'Archived'];

export default function AdminPropertiesPage() {
    const [properties, setProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTab, setFilterTab] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState([]);
    const [propertyToDelete, setPropertyToDelete] = useState(null);
    const [usingSamples, setUsingSamples] = useState(false);

    const loadProperties = async () => {
        setIsLoading(true);
        try {
            const live = await getProperties({ includeSample: false });
            if (live.length) {
                setUsingSamples(false);
                setProperties(live.map(normalizeProperty));
            } else {
                setUsingSamples(true);
                setProperties(getSampleProperties().map((item) => ({ ...item, isSample: true })));
            }
            setSelectedIds([]);
        } catch (error) {
            console.error('Failed to load properties:', error);
            alert('Failed to load properties from database.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadProperties();
    }, []);

    const filtered = useMemo(() => properties.filter((property) => {
        const p = normalizeProperty(property);
        const matchesSearch = [p.title, p.locality, p.city, p.type, p.listingId]
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesStatus = filterTab === 'All' || p.status === filterTab;
        return matchesSearch && matchesStatus;
    }), [filterTab, properties, searchTerm]);

    const toggleSelected = (id) => {
        setSelectedIds((ids) => ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]);
    };

    const confirmDelete = async () => {
        if (!propertyToDelete || propertyToDelete.isSample) {
            setPropertyToDelete(null);
            return;
        }

        try {
            await deleteProperty(propertyToDelete.id);
            await loadProperties();
        } catch (error) {
            console.error('Failed to delete property:', error);
            alert('Failed to delete property. Check permissions.');
        } finally {
            setPropertyToDelete(null);
        }
    };

    const handleBulkDelete = async () => {
        if (!selectedIds.length) return;
        if (usingSamples) {
            alert('Sample preview rows cannot be deleted.');
            return;
        }
        if (!confirm(`Delete ${selectedIds.length} selected properties?`)) return;
        try {
            await Promise.all(selectedIds.map((id) => deleteProperty(id)));
            await loadProperties();
        } catch (error) {
            console.error('Bulk delete failed:', error);
            alert('Could not delete selected properties.');
        }
    };

    const handleStatus = async (property, status) => {
        if (property.isSample) {
            alert('Sample preview rows cannot be updated.');
            return;
        }
        try {
            await updateProperty(property.id, {
                status,
                active: status === 'Published',
                availability: status === 'Archived' ? 'Sold' : property.availability || 'Available',
            });
            await loadProperties();
        } catch (error) {
            console.error('Status update failed:', error);
            alert('Could not update property status.');
        }
    };

    const handleBackfill = async () => {
        try {
            const count = await backfillListingIds('AR');
            alert(count ? `Assigned listing IDs to ${count} properties.` : 'All properties already have listing IDs.');
            await loadProperties();
        } catch (error) {
            console.error('Backfill failed:', error);
            alert('Could not backfill listing IDs.');
        }
    };

    return (
        <div>
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="font-serif text-2xl text-[#1A1714] sm:text-3xl">Property Portfolio</h2>
                    <p className="mt-1 font-sans text-sm text-[#7A7268]">
                        {usingSamples ? 'Showing development sample listings because no live properties were found.' : `${properties.length} live property records`}
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button onClick={loadProperties} className="flex items-center rounded border border-[#D9D0C0] px-4 py-2 font-sans text-sm uppercase tracking-wider text-[#7A7268] hover:border-[#C9A96E]">
                        <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
                    </button>
                    <button onClick={handleBackfill} className="flex items-center rounded border border-[#D9D0C0] px-4 py-2 font-sans text-sm uppercase tracking-wider text-[#7A7268] hover:border-[#C9A96E]">
                        <CheckCircle className="mr-2 h-4 w-4" /> Backfill IDs
                    </button>
                    <Link href="/admin/dashboard/properties/new" className="flex items-center justify-center rounded bg-[#0D0B09] px-4 py-2 text-sm uppercase tracking-wider text-[#C9A96E]">
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Link>
                </div>
            </div>

            <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="flex rounded border border-[#D9D0C0] bg-white p-1">
                    {statusTabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilterTab(tab)}
                            className={`rounded px-4 py-1.5 text-sm transition-colors ${filterTab === tab ? 'bg-[#F5F0E8] font-medium text-[#1A1714]' : 'text-[#7A7268] hover:text-[#1A1714]'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
                    {selectedIds.length > 0 && (
                        <button onClick={handleBulkDelete} className="rounded bg-[#8B4A2F] px-4 py-2.5 font-sans text-sm uppercase tracking-wider text-white">
                            Delete Selected ({selectedIds.length})
                        </button>
                    )}
                    <input
                        type="text"
                        placeholder="Search title, locality, ID..."
                        className="w-full rounded border border-[#D9D0C0] bg-white p-2.5 font-sans text-sm outline-none focus:border-[#C9A96E] md:max-w-xs"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-hidden rounded border border-[#D9D0C0] bg-white shadow">
                {isLoading ? (
                    <div className="flex items-center justify-center p-12">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#C9A96E] border-t-transparent" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#0D0B09] font-sans text-xs uppercase tracking-wider text-[#C9A96E]">
                                <tr>
                                    <th className="p-4">
                                        <input
                                            type="checkbox"
                                            disabled={usingSamples}
                                            checked={!usingSamples && filtered.length > 0 && selectedIds.length === filtered.length}
                                            onChange={(event) => setSelectedIds(event.target.checked ? filtered.map((property) => property.id) : [])}
                                            className="accent-[#C9A96E]"
                                            aria-label="Select all properties"
                                        />
                                    </th>
                                    <th className="p-4">Property</th>
                                    <th className="p-4">Location</th>
                                    <th className="p-4">Price</th>
                                    <th className="p-4">Type</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#D9D0C0]">
                                {filtered.map((property) => {
                                    const p = normalizeProperty(property);
                                    return (
                                        <tr key={p.id} className="transition-colors hover:bg-[#F5F0E8]/50">
                                            <td className="p-4">
                                                <input
                                                    type="checkbox"
                                                    disabled={property.isSample}
                                                    checked={selectedIds.includes(p.id)}
                                                    onChange={() => toggleSelected(p.id)}
                                                    className="accent-[#C9A96E]"
                                                    aria-label={`Select ${p.title}`}
                                                />
                                            </td>
                                            <td className="flex min-w-[280px] items-center p-4">
                                                <img src={p.thumbnail} className="mr-4 h-12 w-12 flex-shrink-0 rounded border border-[#D9D0C0] object-cover" alt="" />
                                                <div className="overflow-hidden">
                                                    <p className="truncate font-medium text-[#1A1714]">{p.title}</p>
                                                    <p className="truncate text-xs text-[#7A7268]">ID: {p.listingId || p.id}{property.isSample ? ' - sample' : ''}</p>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap p-4 text-[#7A7268]">{p.locality}, {p.city}</td>
                                            <td className="whitespace-nowrap p-4 font-medium text-[#1A1714]">{p.priceLabel}</td>
                                            <td className="whitespace-nowrap p-4">
                                                <span className="inline-block rounded-full bg-[#C9A96E]/10 px-2 py-1 text-xs text-[#8B4A2F]">
                                                    {p.category} - {p.type}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap p-4">
                                                <select
                                                    value={p.status}
                                                    disabled={property.isSample}
                                                    onChange={(event) => handleStatus(p, event.target.value)}
                                                    className="rounded border border-[#D9D0C0] bg-white px-2 py-1 text-xs text-[#0D0B09]"
                                                    aria-label={`Status for ${p.title}`}
                                                >
                                                    {['Published', 'Draft', 'Archived'].map((status) => <option key={status}>{status}</option>)}
                                                </select>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    {!property.isSample && (
                                                        <Link href={`/admin/dashboard/properties/new?id=${p.id}`} className="flex items-center justify-center rounded p-2 text-[#7A7268] transition-colors hover:bg-[#D9D0C0]/30 hover:text-[#0D0B09]" title="Edit">
                                                            <Edit2 className="h-4 w-4" />
                                                        </Link>
                                                    )}
                                                    <button onClick={() => setPropertyToDelete(property)} disabled={property.isSample} className="flex items-center justify-center rounded p-2 text-[#7A7268] transition-colors hover:bg-red-50 hover:text-[#8B4A2F] disabled:opacity-30" title="Delete">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
                {!isLoading && filtered.length === 0 && (
                    <div className="p-12 text-center font-sans text-[#7A7268]">No properties found.</div>
                )}
            </div>

            {propertyToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0B09]/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-sm rounded border border-[#D9D0C0] bg-white p-6 shadow-xl">
                        <h3 className="mb-2 font-serif text-xl text-[#1A1714]">Delete Property</h3>
                        <p className="mb-6 font-sans text-sm text-[#7A7268]">
                            Delete <strong>{propertyToDelete.title || propertyToDelete.name}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3 font-sans text-sm uppercase tracking-wider">
                            <button onClick={() => setPropertyToDelete(null)} className="rounded border border-[#D9D0C0] px-4 py-2 text-[#7A7268] transition-colors hover:border-[#C9A96E] hover:text-[#1A1714]">
                                Cancel
                            </button>
                            <button onClick={confirmDelete} className="rounded bg-[#8B4A2F] px-4 py-2 text-white transition-colors hover:bg-red-800">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
