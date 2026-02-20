'use client';
import { useState, Fragment } from 'react';

const mockEnquiries = [
    { id: 1, name: 'Priya Sharma', phone: '+91 98765 43210', email: 'priya@example.com', property: 'Balewadi Tech Corridor', type: 'Office Space', date: '2026-02-18', status: 'New' },
    { id: 2, name: 'Rohit Patel', phone: '+91 91234 56789', email: 'rohit@example.com', property: 'Kharadi Business Hub', type: 'Pre-Leased', date: '2026-02-17', status: 'Contacted' },
    { id: 3, name: 'Ananya Mehta (NRI)', phone: '+44 7700 900000', email: 'ananya@example.com', property: 'Hinjewadi IT Park Plaza', type: 'NRI Advisory', date: '2026-02-15', status: 'New' },
];

const statusColors = {
    'New': 'bg-[#C9A96E]/20 text-[#C9A96E]',
    'Contacted': 'bg-blue-100 text-blue-700',
    'Closed': 'bg-gray-100 text-gray-500',
};

export default function AdminEnquiriesPage() {
    const [enquiries] = useState(mockEnquiries);
    const [expanded, setExpanded] = useState(null);

    const exportCSV = () => {
        const headers = ['Name', 'Phone', 'Email', 'Property', 'Type', 'Date', 'Status'];
        const rows = enquiries.map(e => [e.name, e.phone, e.email, e.property, e.type, e.date, e.status]);
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
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

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1714]">Enquiries</h2>
                <button onClick={exportCSV} className="border border-[#D9D0C0] text-[#7A7268] px-4 py-2 text-sm uppercase tracking-wider rounded hover:border-[#C9A96E] transition-colors cursor-pointer">
                    Export CSV
                </button>
            </div>

            <div className="bg-white rounded shadow border border-[#D9D0C0] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#0D0B09] text-[#C9A96E] font-sans uppercase tracking-wider text-xs">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Phone</th>
                                <th className="p-4">Property</th>
                                <th className="p-4">Type</th>
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
                                        <td className="p-4 text-[#7A7268]">{e.property}</td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 bg-[#C9A96E]/10 text-[#8B4A2F] text-xs rounded-full">{e.type}</span>
                                        </td>
                                        <td className="p-4 text-[#7A7268]">{e.date}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${statusColors[e.status]}`}>{e.status}</span>
                                        </td>
                                    </tr>
                                    {expanded === e.id && (
                                        <tr key={`${e.id}-detail`}>
                                            <td colSpan={6} className="p-6 bg-[#F5F0E8]/30">
                                                <div className="max-w-lg space-y-2 text-sm text-[#7A7268]">
                                                    <p><strong>Email:</strong> {e.email}</p>
                                                    <p><strong>Phone:</strong> {e.phone}</p>
                                                    <p><strong>Interested in:</strong> {e.property}</p>
                                                    <p><strong>Enquiry Type:</strong> {e.type}</p>
                                                    <p><strong>Submitted:</strong> {e.date}</p>
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
        </div>
    );
}
