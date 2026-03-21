'use client';
import { useState, useEffect, Fragment } from 'react';
import { getEnquiries } from '@/lib/firebaseUtils';

const statusColors = {
    'New': 'bg-[#C9A96E]/20 text-[#C9A96E]',
    'Contacted': 'bg-blue-100 text-blue-700',
    'Closed': 'bg-gray-100 text-gray-500',
};

export default function AdminEnquiriesPage() {
    const [enquiries, setEnquiries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expanded, setExpanded] = useState(null);

    useEffect(() => {
        getEnquiries()
            .then(data => setEnquiries(data))
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, []);

    const exportCSV = () => {
        const headers = ['Name', 'Phone', 'Email', 'Enquiry Type', 'City', 'Budget', 'Message', 'Status', 'Source', 'Date'];
        const rows = enquiries.map(e => [
            e.name, e.phone, e.email, e.enquiryType, e.city,
            e.budget, e.message, e.status, e.source,
            e.createdAt ? new Date(e.createdAt).toLocaleDateString('en-IN') : ''
        ]);
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${String(cell || '').replace(/"/g, '""')}"`).join(','))
        ].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `aurevon_enquiries_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1714]">Enquiries</h2>
                    <p className="text-sm text-[#7A7268] mt-1">{enquiries.length} total leads from contact form</p>
                </div>
                <button onClick={exportCSV} className="border border-[#D9D0C0] text-[#7A7268] px-4 py-2 text-sm uppercase tracking-wider rounded hover:border-[#C9A96E] transition-colors cursor-pointer">
                    Export CSV
                </button>
            </div>

            {enquiries.length === 0 ? (
                <div className="bg-white rounded shadow border border-[#D9D0C0] p-12 text-center text-[#7A7268]">
                    <p className="text-lg font-serif text-[#1A1714] mb-2">No enquiries yet</p>
                    <p className="text-sm">Leads submitted via the Contact form will appear here.</p>
                </div>
            ) : (
                <div className="bg-white rounded shadow border border-[#D9D0C0] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#0D0B09] text-[#C9A96E] font-sans uppercase tracking-wider text-xs">
                                <tr>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Phone</th>
                                    <th className="p-4">Type</th>
                                    <th className="p-4">City</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#D9D0C0]">
                                {enquiries.map(e => (
                                    <Fragment key={e.id}>
                                        <tr
                                            className="hover:bg-[#F5F0E8]/50 transition-colors cursor-pointer"
                                            onClick={() => setExpanded(expanded === e.id ? null : e.id)}
                                        >
                                            <td className="p-4 font-medium text-[#1A1714]">{e.name}</td>
                                            <td className="p-4 text-[#7A7268]">{e.phone}</td>
                                            <td className="p-4">
                                                <span className="px-2 py-1 bg-[#C9A96E]/10 text-[#8B4A2F] text-xs rounded-full">{e.enquiryType || '—'}</span>
                                            </td>
                                            <td className="p-4 text-[#7A7268]">{e.city || '—'}</td>
                                            <td className="p-4 text-[#7A7268]">
                                                {e.createdAt ? new Date(e.createdAt).toLocaleDateString('en-IN') : '—'}
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 text-xs rounded-full ${statusColors[e.status] || 'bg-gray-100 text-gray-500'}`}>
                                                    {e.status || 'New'}
                                                </span>
                                            </td>
                                        </tr>
                                        {expanded === e.id && (
                                            <tr key={`${e.id}-detail`}>
                                                <td colSpan={6} className="p-6 bg-[#F5F0E8]/30">
                                                    <div className="max-w-lg space-y-2 text-sm text-[#7A7268]">
                                                        <p><strong className="text-[#1A1714]">Email:</strong> {e.email || '—'}</p>
                                                        <p><strong className="text-[#1A1714]">Phone:</strong> {e.phone || '—'}</p>
                                                        <p><strong className="text-[#1A1714]">Budget Range:</strong> {e.budget || '—'}</p>
                                                        <p><strong className="text-[#1A1714]">Source:</strong> {e.source || '—'}</p>
                                                        {e.message && (
                                                            <div className="mt-3 p-3 bg-white rounded border border-[#D9D0C0]">
                                                                <p className="text-xs text-[#7A7268] uppercase font-medium mb-1">Message</p>
                                                                <p>{e.message}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
