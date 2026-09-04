'use client';

import { useEffect, useMemo, useState } from 'react';
import {
    Download,
    Eye,
    Loader2,
    MessageCircle,
    Phone,
    RefreshCw,
    Search,
    Trash2,
    X,
} from 'lucide-react';
import { deleteLead, getLeads, updateLeadStatus } from '@/lib/firebaseUtils';
import { createWhatsAppUrl, LEAD_STATUSES, sanitizePhone } from '@/lib/realEstate';

const statusColors = {
    New: 'bg-[#C9A96E]/20 text-[#8B4A2F]',
    Contacted: 'bg-blue-100 text-blue-700',
    'Site Visit': 'bg-purple-100 text-purple-700',
    Negotiating: 'bg-amber-100 text-amber-700',
    Converted: 'bg-green-100 text-green-700',
    Lost: 'bg-gray-100 text-gray-500',
};

function formatDate(value) {
    if (!value) return 'No date';
    return new Date(value).toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function csvEscape(value) {
    return `"${String(value || '').replace(/"/g, '""')}"`;
}

export default function AdminEnquiriesPage() {
    const [leads, setLeads] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [savingId, setSavingId] = useState('');
    const [query, setQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedLead, setSelectedLead] = useState(null);
    const [error, setError] = useState('');

    const loadLeads = async () => {
        setIsLoading(true);
        setError('');
        try {
            const data = await getLeads();
            setLeads(data);
        } catch (loadError) {
            console.error(loadError);
            setError('Failed to load leads.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadLeads();
    }, []);

    const counts = useMemo(() => {
        return leads.reduce((acc, lead) => {
            const status = lead.status || 'New';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});
    }, [leads]);

    const filteredLeads = useMemo(() => {
        const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
        return leads.filter((lead) => {
            if (statusFilter !== 'All' && (lead.status || 'New') !== statusFilter) return false;
            if (!terms.length) return true;
            const haystack = [
                lead.name,
                lead.phone,
                lead.email,
                lead.propertyTitle,
                lead.propertyLocality,
                lead.requestType,
                lead.subject,
                lead.source,
                lead.message,
            ].join(' ').toLowerCase();
            return terms.every((term) => haystack.includes(term));
        });
    }, [leads, query, statusFilter]);

    const handleStatusChange = async (lead, status) => {
        setSavingId(lead.id);
        setError('');
        const previous = leads;
        setLeads((items) => items.map((item) => item.id === lead.id ? { ...item, status } : item));
        if (selectedLead?.id === lead.id) setSelectedLead((prev) => ({ ...prev, status }));

        try {
            await updateLeadStatus(lead.id, status, lead._collection);
        } catch (statusError) {
            console.error(statusError);
            setLeads(previous);
            setSelectedLead(lead);
            setError('Failed to update lead status.');
        } finally {
            setSavingId('');
        }
    };

    const handleDelete = async (lead) => {
        if (!confirm(`Delete lead from ${lead.name || lead.phone || 'this visitor'} permanently?`)) return;
        setSavingId(lead.id);
        setError('');
        try {
            await deleteLead(lead.id, lead._collection);
            setLeads((items) => items.filter((item) => item.id !== lead.id));
            if (selectedLead?.id === lead.id) setSelectedLead(null);
        } catch (deleteError) {
            console.error(deleteError);
            setError('Failed to delete lead.');
        } finally {
            setSavingId('');
        }
    };

    const exportCSV = () => {
        const headers = [
            'Name',
            'Phone',
            'Email',
            'Request Type',
            'Property',
            'Locality',
            'Source',
            'Status',
            'Message',
            'Created At',
        ];
        const rows = filteredLeads.map((lead) => [
            lead.name,
            lead.phone,
            lead.email,
            lead.requestType,
            lead.propertyTitle,
            lead.propertyLocality,
            lead.source,
            lead.status || 'New',
            lead.message,
            lead.createdAt ? new Date(lead.createdAt).toISOString() : '',
        ]);
        const csv = [headers, ...rows].map((row) => row.map(csvEscape).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `aurevon_leads_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <h2 className="font-serif text-2xl text-[#1A1714] sm:text-3xl">Leads</h2>
                    <p className="mt-1 font-sans text-sm text-[#7A7268]">
                        {leads.length} enquiries from listings, contact forms, sell requests, and WhatsApp intent.
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={loadLeads}
                        disabled={isLoading}
                        className="flex items-center rounded border border-[#D9D0C0] px-4 py-2 font-sans text-xs uppercase tracking-wider text-[#7A7268] transition-colors hover:border-[#C9A96E] disabled:opacity-50"
                    >
                        <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                    <button
                        onClick={exportCSV}
                        disabled={!filteredLeads.length}
                        className="flex items-center rounded bg-[#C9A96E] px-4 py-2 font-sans text-xs uppercase tracking-wider text-[#0D0B09] transition-colors hover:bg-[#F5F0E8] disabled:opacity-50"
                    >
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                    </button>
                </div>
            </div>

            {error && <div className="mb-5 rounded border border-red-200 bg-red-50 p-3 font-sans text-sm text-red-700">{error}</div>}

            <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-6">
                {['All', ...LEAD_STATUSES].map((status) => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`rounded border px-4 py-3 text-left transition-colors ${statusFilter === status ? 'border-[#C9A96E] bg-[#C9A96E]/10' : 'border-[#D9D0C0] bg-white hover:border-[#C9A96E]'}`}
                    >
                        <span className="block font-sans text-[10px] uppercase tracking-wider text-[#7A7268]">{status}</span>
                        <span className="font-serif text-2xl text-[#1A1714]">{status === 'All' ? leads.length : counts[status] || 0}</span>
                    </button>
                ))}
            </div>

            <div className="mb-6 flex flex-col gap-3 rounded border border-[#D9D0C0] bg-white p-4 shadow sm:flex-row sm:items-center">
                <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A7268]" />
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search name, phone, property, locality, source..."
                        className="w-full rounded border border-[#D9D0C0] py-2.5 pl-10 pr-3 font-sans text-sm outline-none focus:border-[#C9A96E]"
                    />
                </div>
                <p className="font-sans text-xs uppercase tracking-wider text-[#7A7268]">{filteredLeads.length} shown</p>
            </div>

            <div className="overflow-hidden rounded border border-[#D9D0C0] bg-white shadow">
                {isLoading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-[#C9A96E]" />
                    </div>
                ) : filteredLeads.length ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-sans text-sm">
                            <thead className="bg-[#0D0B09] text-xs uppercase tracking-wider text-[#C9A96E]">
                                <tr>
                                    <th className="p-4">Lead</th>
                                    <th className="p-4">Property / Need</th>
                                    <th className="p-4">Source</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#D9D0C0]">
                                {filteredLeads.map((lead) => {
                                    const phone = sanitizePhone(lead.phone);
                                    return (
                                        <tr key={lead.id} className="transition-colors hover:bg-[#F5F0E8]/40">
                                            <td className="p-4">
                                                <p className="font-medium text-[#1A1714]">{lead.name || 'Unnamed Lead'}</p>
                                                <p className="text-xs text-[#7A7268]">{lead.phone || 'No phone'}</p>
                                                {lead.email && <p className="text-xs text-[#7A7268]">{lead.email}</p>}
                                            </td>
                                            <td className="max-w-xs p-4">
                                                <p className="font-medium text-[#1A1714]">{lead.propertyTitle || lead.requestType || 'General Enquiry'}</p>
                                                <p className="mt-1 line-clamp-1 text-xs text-[#7A7268]">
                                                    {[lead.requestType, lead.propertyLocality, lead.propertyPrice].filter(Boolean).join(' | ') || 'Website request'}
                                                </p>
                                            </td>
                                            <td className="p-4 text-[#7A7268]">{lead.source || 'Website'}</td>
                                            <td className="p-4 text-xs text-[#7A7268]">{formatDate(lead.createdAt)}</td>
                                            <td className="p-4">
                                                <select
                                                    value={lead.status || 'New'}
                                                    onChange={(event) => handleStatusChange(lead, event.target.value)}
                                                    disabled={savingId === lead.id}
                                                    className={`rounded border border-transparent px-2 py-1 text-xs outline-none ${statusColors[lead.status || 'New'] || statusColors.New}`}
                                                >
                                                    {LEAD_STATUSES.map((status) => <option key={status}>{status}</option>)}
                                                </select>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex justify-end gap-1">
                                                    <button onClick={() => setSelectedLead(lead)} className="rounded p-2 text-[#7A7268] hover:bg-[#F5F0E8] hover:text-[#C9A96E]" title="View lead">
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    {phone && (
                                                        <>
                                                            <a href={`tel:+${phone}`} className="rounded p-2 text-[#7A7268] hover:bg-[#F5F0E8] hover:text-[#C9A96E]" title="Call lead">
                                                                <Phone className="h-4 w-4" />
                                                            </a>
                                                            <a
                                                                href={createWhatsAppUrl({
                                                                    phone,
                                                                    message: `Hi ${lead.name || ''}, this is Aurevon Realty. We received your enquiry about ${lead.propertyTitle || lead.requestType || 'real estate assistance'}.`,
                                                                })}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="rounded p-2 text-[#7A7268] hover:bg-[#F5F0E8] hover:text-[#C9A96E]"
                                                                title="WhatsApp lead"
                                                            >
                                                                <MessageCircle className="h-4 w-4" />
                                                            </a>
                                                        </>
                                                    )}
                                                    <button onClick={() => handleDelete(lead)} disabled={savingId === lead.id} className="rounded p-2 text-[#7A7268] hover:bg-red-50 hover:text-red-600 disabled:opacity-50" title="Delete lead">
                                                        {savingId === lead.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-12 text-center">
                        <h3 className="mb-2 font-serif text-xl text-[#1A1714]">No Leads Found</h3>
                        <p className="font-sans text-sm text-[#7A7268]">Incoming listing, contact, loan, and sell enquiries will appear here.</p>
                    </div>
                )}
            </div>

            {selectedLead && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0B09]/60 p-4 backdrop-blur-sm" onClick={() => setSelectedLead(null)}>
                    <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded border border-[#D9D0C0] bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
                        <div className="flex items-start justify-between border-b border-[#D9D0C0] p-6">
                            <div>
                                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#C9A96E]">Lead Detail</p>
                                <h3 className="mt-1 font-serif text-2xl text-[#1A1714]">{selectedLead.name || 'Unnamed Lead'}</h3>
                            </div>
                            <button onClick={() => setSelectedLead(null)} className="rounded p-2 text-[#7A7268] hover:bg-[#F5F0E8] hover:text-[#1A1714]" aria-label="Close lead detail">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                            {[
                                ['Phone', selectedLead.phone],
                                ['Email', selectedLead.email],
                                ['Request Type', selectedLead.requestType],
                                ['Property', selectedLead.propertyTitle],
                                ['Locality', selectedLead.propertyLocality],
                                ['Budget / Price', selectedLead.budget || selectedLead.propertyPrice],
                                ['Source', selectedLead.source],
                                ['Date', formatDate(selectedLead.createdAt)],
                            ].map(([label, value]) => (
                                <div key={label} className="rounded border border-[#D9D0C0] p-3">
                                    <p className="font-sans text-[10px] uppercase tracking-wider text-[#7A7268]">{label}</p>
                                    <p className="mt-1 font-sans text-sm text-[#1A1714]">{value || 'Not provided'}</p>
                                </div>
                            ))}
                            <div className="md:col-span-2">
                                <label className="mb-2 block font-sans text-xs uppercase tracking-wider text-[#7A7268]">Status</label>
                                <div className="flex flex-wrap gap-2">
                                    {LEAD_STATUSES.map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => handleStatusChange(selectedLead, status)}
                                            disabled={savingId === selectedLead.id}
                                            className={`rounded-full border px-3 py-1.5 font-sans text-xs transition-colors ${selectedLead.status === status ? 'border-[#C9A96E] bg-[#C9A96E]/15 text-[#1A1714]' : 'border-[#D9D0C0] text-[#7A7268] hover:border-[#C9A96E]'}`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <p className="mb-2 font-sans text-xs uppercase tracking-wider text-[#7A7268]">Message</p>
                                <div className="min-h-28 rounded border border-[#D9D0C0] bg-[#F5F0E8]/40 p-4 font-sans text-sm leading-relaxed text-[#1A1714]">
                                    {selectedLead.message || selectedLead.subject || 'No message provided.'}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-between gap-3 border-t border-[#D9D0C0] p-6">
                            <div className="flex flex-wrap gap-3">
                                {sanitizePhone(selectedLead.phone) && (
                                    <>
                                        <a href={`tel:+${sanitizePhone(selectedLead.phone)}`} className="flex items-center rounded bg-[#0D0B09] px-4 py-2 font-sans text-xs uppercase tracking-wider text-[#C9A96E]">
                                            <Phone className="mr-2 h-4 w-4" />
                                            Call
                                        </a>
                                        <a
                                            href={createWhatsAppUrl({
                                                phone: selectedLead.phone,
                                                message: `Hi ${selectedLead.name || ''}, this is Aurevon Realty. We received your enquiry about ${selectedLead.propertyTitle || selectedLead.requestType || 'real estate assistance'}.`,
                                            })}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center rounded border border-[#D9D0C0] px-4 py-2 font-sans text-xs uppercase tracking-wider text-[#7A7268] hover:border-[#C9A96E] hover:text-[#1A1714]"
                                        >
                                            <MessageCircle className="mr-2 h-4 w-4" />
                                            WhatsApp
                                        </a>
                                    </>
                                )}
                            </div>
                            <button onClick={() => handleDelete(selectedLead)} className="flex items-center rounded border border-red-200 px-4 py-2 font-sans text-xs uppercase tracking-wider text-red-600 hover:bg-red-50">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
