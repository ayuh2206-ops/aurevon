'use client';

import { useEffect, useMemo, useState } from 'react';
import { Calendar, Heart, Loader2, Mail, Phone, RefreshCw, Search, User } from 'lucide-react';
import { getUsers } from '@/lib/firebaseUtils';

function formatDate(value) {
    if (!value) return 'No date';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'No date';
    return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');

    const loadUsers = async () => {
        setIsLoading(true);
        setError('');
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (loadError) {
            console.error(loadError);
            setError('Failed to load users.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
        if (!terms.length) return users;
        return users.filter((profile) => {
            const haystack = [profile.name, profile.email, profile.phone, profile.role].join(' ').toLowerCase();
            return terms.every((term) => haystack.includes(term));
        });
    }, [query, users]);

    const adminCount = users.filter((profile) => profile.role === 'admin').length;
    const savedCount = users.reduce((sum, profile) => sum + (profile.savedProperties?.length || 0), 0);

    return (
        <div>
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <h2 className="font-serif text-2xl text-[#1A1714] sm:text-3xl">Users</h2>
                    <p className="mt-1 font-sans text-sm text-[#7A7268]">Registered buyers, sellers, and saved-property profiles.</p>
                </div>
                <button onClick={loadUsers} disabled={isLoading} className="flex items-center rounded border border-[#D9D0C0] px-4 py-2 font-sans text-xs uppercase tracking-wider text-[#7A7268] hover:border-[#C9A96E] disabled:opacity-50">
                    <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>

            {error && <div className="mb-5 rounded border border-red-200 bg-red-50 p-3 font-sans text-sm text-red-700">{error}</div>}

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                    ['Users', users.length],
                    ['Admins', adminCount],
                    ['Saved Properties', savedCount],
                ].map(([label, value]) => (
                    <div key={label} className="rounded border border-[#D9D0C0] bg-white p-5 shadow">
                        <p className="font-sans text-[10px] uppercase tracking-wider text-[#7A7268]">{label}</p>
                        <p className="mt-1 font-serif text-3xl text-[#1A1714]">{value}</p>
                    </div>
                ))}
            </div>

            <div className="mb-6 rounded border border-[#D9D0C0] bg-white p-4 shadow">
                <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A7268]" />
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search name, email, phone, or role..."
                        className="w-full rounded border border-[#D9D0C0] py-2.5 pl-10 pr-3 font-sans text-sm outline-none focus:border-[#C9A96E]"
                    />
                </div>
            </div>

            <div className="overflow-hidden rounded border border-[#D9D0C0] bg-white shadow">
                {isLoading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-[#C9A96E]" />
                    </div>
                ) : filteredUsers.length ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-sans text-sm">
                            <thead className="bg-[#0D0B09] text-xs uppercase tracking-wider text-[#C9A96E]">
                                <tr>
                                    <th className="p-4">User</th>
                                    <th className="p-4">Contact</th>
                                    <th className="p-4">Saved</th>
                                    <th className="p-4">Joined</th>
                                    <th className="p-4">Role</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#D9D0C0]">
                                {filteredUsers.map((profile) => (
                                    <tr key={profile.id} className="hover:bg-[#F5F0E8]/40">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                {profile.photoURL ? (
                                                    <img src={profile.photoURL} alt="" className="h-10 w-10 rounded-full object-cover" />
                                                ) : (
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F0E8]">
                                                        <User className="h-5 w-5 text-[#C9A96E]" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-[#1A1714]">{profile.name || 'Unnamed User'}</p>
                                                    <p className="text-xs text-[#7A7268]">{profile.uid}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="space-y-1 text-[#7A7268]">
                                                {profile.email && <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> {profile.email}</p>}
                                                {profile.phone && <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> {profile.phone}</p>}
                                            </div>
                                        </td>
                                        <td className="p-4 text-[#7A7268]">
                                            <span className="inline-flex items-center gap-2 rounded-full bg-[#F5F0E8] px-3 py-1 text-xs">
                                                <Heart className="h-3.5 w-3.5" />
                                                {profile.savedProperties?.length || 0}
                                            </span>
                                        </td>
                                        <td className="p-4 text-[#7A7268]">
                                            <span className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                {formatDate(profile.createdAt)}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`rounded-full px-2 py-1 text-xs capitalize ${profile.role === 'admin' ? 'bg-[#C9A96E]/20 text-[#8B4A2F]' : 'bg-gray-100 text-gray-600'}`}>
                                                {profile.role || 'user'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-12 text-center">
                        <User className="mx-auto mb-3 h-10 w-10 text-[#D9D0C0]" />
                        <h3 className="mb-2 font-serif text-xl text-[#1A1714]">No Users Found</h3>
                        <p className="font-sans text-sm text-[#7A7268]">Authenticated visitors will appear here after they create a profile.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
