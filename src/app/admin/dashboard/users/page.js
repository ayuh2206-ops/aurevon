'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User, Mail, Calendar, Search } from 'lucide-react';

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);
                const fetchedUsers = [];
                querySnapshot.forEach((doc) => {
                    fetchedUsers.push({ id: doc.id, ...doc.data() });
                });
                setUsers(fetchedUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        // Handle Firestore Timestamp
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-[#1A1714]">Users</h1>
                    <p className="text-[#7A7268] mt-1 font-sans">View all registered users on the platform</p>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white p-4 rounded-xl border border-[#D9D0C0] mb-8 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-[#E5E0D8] rounded-lg focus:outline-none focus:border-[#C9A96E] font-sans text-sm bg-[#FAF8F5]"
                        />
                        <Search className="w-4 h-4 text-[#A39B8F] absolute left-3 top-2.5" />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-[#D9D0C0] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans">
                        <thead className="bg-[#FAF8F5] border-b border-[#E5E0D8] text-sm text-[#7A7268]">
                            <tr>
                                <th className="p-4 font-medium">User Details</th>
                                <th className="p-4 font-medium hidden md:table-cell">Contact</th>
                                <th className="p-4 font-medium hidden sm:table-cell">Joined Date</th>
                                <th className="p-4 font-medium hidden sm:table-cell">Role</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5E0D8]">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-[#7A7268]">
                                        <div className="animate-spin w-6 h-6 border-2 border-[#C9A96E] border-t-transparent rounded-full mx-auto mb-4"></div>
                                        Loading users...
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-[#7A7268]">
                                        <User className="w-8 h-8 mx-auto mb-2 text-[#D9D0C0]" />
                                        No users found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-[#FAF8F5] transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-[#E8F0FE] flex items-center justify-center shrink-0">
                                                    <span className="text-sm font-medium text-[#1A73E8]">
                                                        {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-[#1A1714]">
                                                        {user.name || 'Unnamed User'}
                                                    </p>
                                                    {/* Mobile fallback for email */}
                                                    <p className="text-xs text-[#7A7268] md:hidden mt-0.5">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 hidden md:table-cell">
                                            <div className="flex items-center gap-2 text-[#7A7268] text-sm">
                                                <Mail className="w-4 h-4" />
                                                {user.email}
                                            </div>
                                        </td>
                                        <td className="p-4 hidden sm:table-cell">
                                            <div className="flex items-center gap-2 text-[#7A7268] text-sm">
                                                <Calendar className="w-4 h-4" />
                                                {formatDate(user.createdAt)}
                                            </div>
                                        </td>
                                        <td className="p-4 hidden sm:table-cell">
                                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-[#E8F0FE] text-[#1A73E8] capitalize">
                                                {user.role || 'user'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {!isLoading && filteredUsers.length > 0 && (
                    <div className="p-4 border-t border-[#E5E0D8] bg-[#FAF8F5] flex justify-between items-center text-sm text-[#7A7268]">
                        <span>Showing {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
