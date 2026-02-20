'use client';
import { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Eye, Save, X, FileText } from 'lucide-react';
import Link from 'next/link';
import { blogArticles as initialBlogs } from '@/lib/data';

export default function AdminBlogPage() {
    const [blogs, setBlogs] = useState([]);
    const [editing, setEditing] = useState(null); // null = list view, 'new' = new form, slug = editing
    const [form, setForm] = useState({
        title: '', slug: '', category: '', excerpt: '', metaDescription: '',
        image: '', author: 'Arun Dongare', authorRole: 'Founder & MD, Aurevon Realty',
        readTime: '', tags: '', featured: false, contentText: '',
    });

    useEffect(() => {
        const stored = localStorage.getItem('aurevon_blogs');
        if (stored) {
            setBlogs(JSON.parse(stored));
        } else {
            setBlogs(initialBlogs);
            localStorage.setItem('aurevon_blogs', JSON.stringify(initialBlogs));
        }
    }, []);

    const saveBlogs = (updated) => {
        setBlogs(updated);
        localStorage.setItem('aurevon_blogs', JSON.stringify(updated));
    };

    const generateSlug = (title) => {
        return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
    };

    // Parse content text into content blocks: lines starting with ## are headings, rest are paragraphs
    const parseContent = (text) => {
        if (!text) return [];
        return text.split('\n').filter(l => l.trim()).map(line => {
            if (line.startsWith('## ')) {
                return { type: 'heading', text: line.replace('## ', '') };
            }
            return { type: 'paragraph', text: line };
        });
    };

    // Convert content blocks back to text
    const contentToText = (content) => {
        if (!content || !Array.isArray(content)) return '';
        return content.map(block => block.type === 'heading' ? `## ${block.text}` : block.text).join('\n\n');
    };

    const handleNew = () => {
        setForm({
            title: '', slug: '', category: '', excerpt: '', metaDescription: '',
            image: '', author: 'Arun Dongare', authorRole: 'Founder & MD, Aurevon Realty',
            readTime: '5 min read', tags: '', featured: false, contentText: '',
        });
        setEditing('new');
    };

    const handleEdit = (blog) => {
        setForm({
            title: blog.title,
            slug: blog.slug,
            category: blog.category,
            excerpt: blog.excerpt,
            metaDescription: blog.metaDescription || '',
            image: blog.image || '',
            author: blog.author || 'Arun Dongare',
            authorRole: blog.authorRole || 'Founder & MD, Aurevon Realty',
            readTime: blog.readTime || '',
            tags: blog.tags?.join(', ') || '',
            featured: blog.featured || false,
            contentText: contentToText(blog.content),
        });
        setEditing(blog.slug);
    };

    const handleSave = () => {
        const slug = form.slug || generateSlug(form.title);
        const newBlog = {
            slug,
            title: form.title,
            category: form.category,
            excerpt: form.excerpt,
            metaDescription: form.metaDescription,
            image: form.image,
            author: form.author,
            authorRole: form.authorRole,
            date: new Date().toISOString().split('T')[0],
            readTime: form.readTime,
            tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
            featured: form.featured,
            content: parseContent(form.contentText),
        };

        let updated;
        if (editing === 'new') {
            updated = [newBlog, ...blogs];
        } else {
            updated = blogs.map(b => b.slug === editing ? { ...newBlog, slug: editing } : b);
        }
        saveBlogs(updated);
        setEditing(null);
    };

    const handleDelete = (slug) => {
        if (confirm('Are you sure you want to delete this blog post?')) {
            const updated = blogs.filter(b => b.slug !== slug);
            saveBlogs(updated);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return 'No date';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    // Editor View
    if (editing !== null) {
        return (
            <div>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1714]">
                        {editing === 'new' ? 'New Blog Post' : 'Edit Blog Post'}
                    </h2>
                    <button onClick={() => setEditing(null)} className="flex items-center gap-2 text-[#7A7268] hover:text-[#1A1714] font-sans text-sm cursor-pointer">
                        <X className="w-4 h-4" /> Cancel
                    </button>
                </div>

                <div className="bg-white border border-[#D9D0C0] rounded p-6 md:p-8 space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block font-sans text-xs uppercase tracking-wider text-[#7A7268] mb-2">Title *</label>
                        <input
                            value={form.title}
                            onChange={e => setForm({ ...form, title: e.target.value, slug: editing === 'new' ? generateSlug(e.target.value) : form.slug })}
                            className="w-full border border-[#D9D0C0] rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#C9A96E]"
                            placeholder="e.g., Why Commercial Real Estate Beats Residential in 2025"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Slug */}
                        <div>
                            <label className="block font-sans text-xs uppercase tracking-wider text-[#7A7268] mb-2">URL Slug</label>
                            <input
                                value={form.slug}
                                onChange={e => setForm({ ...form, slug: e.target.value })}
                                className="w-full border border-[#D9D0C0] rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#C9A96E]"
                                placeholder="auto-generated-from-title"
                            />
                        </div>
                        {/* Category */}
                        <div>
                            <label className="block font-sans text-xs uppercase tracking-wider text-[#7A7268] mb-2">Category *</label>
                            <select
                                value={form.category}
                                onChange={e => setForm({ ...form, category: e.target.value })}
                                className="w-full border border-[#D9D0C0] rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#C9A96E] bg-white"
                                aria-label="Blog category"
                            >
                                <option value="">Select Category</option>
                                <option value="Market Insights">Market Insights</option>
                                <option value="NRI Guide">NRI Guide</option>
                                <option value="Investment">Investment</option>
                                <option value="Investment Strategy">Investment Strategy</option>
                                <option value="Legal & Compliance">Legal & Compliance</option>
                                <option value="Location Spotlight">Location Spotlight</option>
                                <option value="Buyer Guide">Buyer Guide</option>
                            </select>
                        </div>
                    </div>

                    {/* Excerpt (SEO critical) */}
                    <div>
                        <label className="block font-sans text-xs uppercase tracking-wider text-[#7A7268] mb-2">Excerpt / Summary * <span className="normal-case text-[#C9A96E]">(Shows on listing cards)</span></label>
                        <textarea
                            value={form.excerpt}
                            onChange={e => setForm({ ...form, excerpt: e.target.value })}
                            rows={2}
                            className="w-full border border-[#D9D0C0] rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#C9A96E] resize-none"
                            placeholder="A compelling 1-2 sentence summary..."
                        />
                    </div>

                    {/* Meta Description (SEO) */}
                    <div>
                        <label className="block font-sans text-xs uppercase tracking-wider text-[#7A7268] mb-2">Meta Description <span className="normal-case text-[#C9A96E]">(SEO — shows in Google search results, 150-160 chars ideal)</span></label>
                        <textarea
                            value={form.metaDescription}
                            onChange={e => setForm({ ...form, metaDescription: e.target.value })}
                            rows={2}
                            className="w-full border border-[#D9D0C0] rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#C9A96E] resize-none"
                            placeholder="SEO description for search engines..."
                        />
                        <p className="font-sans text-xs text-[#7A7268] mt-1">{form.metaDescription.length}/160 characters</p>
                    </div>

                    {/* Cover Image */}
                    <div>
                        <label className="block font-sans text-xs uppercase tracking-wider text-[#7A7268] mb-2">Cover Image URL</label>
                        <input
                            value={form.image}
                            onChange={e => setForm({ ...form, image: e.target.value })}
                            className="w-full border border-[#D9D0C0] rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#C9A96E]"
                            placeholder="https://images.unsplash.com/photo-..."
                        />
                        {form.image && (
                            <div className="mt-3 aspect-[16/9] max-w-sm border border-[#D9D0C0] rounded overflow-hidden">
                                <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Author */}
                        <div>
                            <label className="block font-sans text-xs uppercase tracking-wider text-[#7A7268] mb-2">Author</label>
                            <input
                                value={form.author}
                                onChange={e => setForm({ ...form, author: e.target.value })}
                                className="w-full border border-[#D9D0C0] rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#C9A96E]"
                            />
                        </div>
                        {/* Read Time */}
                        <div>
                            <label className="block font-sans text-xs uppercase tracking-wider text-[#7A7268] mb-2">Read Time</label>
                            <input
                                value={form.readTime}
                                onChange={e => setForm({ ...form, readTime: e.target.value })}
                                className="w-full border border-[#D9D0C0] rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#C9A96E]"
                                placeholder="e.g., 7 min read"
                            />
                        </div>
                        {/* Featured */}
                        <div className="flex items-end pb-1">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={form.featured}
                                    onChange={e => setForm({ ...form, featured: e.target.checked })}
                                    className="w-5 h-5 accent-[#C9A96E]"
                                />
                                <span className="font-sans text-sm text-[#1A1714]">Featured Article</span>
                            </label>
                        </div>
                    </div>

                    {/* Tags (SEO critical) */}
                    <div>
                        <label className="block font-sans text-xs uppercase tracking-wider text-[#7A7268] mb-2">SEO Tags <span className="normal-case text-[#C9A96E]">(comma-separated keywords)</span></label>
                        <input
                            value={form.tags}
                            onChange={e => setForm({ ...form, tags: e.target.value })}
                            className="w-full border border-[#D9D0C0] rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#C9A96E]"
                            placeholder="e.g., Pune commercial, office space, NRI investment, RERA"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block font-sans text-xs uppercase tracking-wider text-[#7A7268] mb-2">Article Content <span className="normal-case text-[#C9A96E]">(Use ## for section headings, one paragraph per line)</span></label>
                        <textarea
                            value={form.contentText}
                            onChange={e => setForm({ ...form, contentText: e.target.value })}
                            rows={16}
                            className="w-full border border-[#D9D0C0] rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#C9A96E] resize-y leading-relaxed font-mono"
                            placeholder={"Start with your opening paragraph...\n\n## Section Heading\n\nWrite your paragraph content here...\n\n## Another Heading\n\nMore content..."}
                        />
                    </div>

                    {/* Save */}
                    <div className="flex items-center gap-4 pt-4">
                        <button
                            onClick={handleSave}
                            disabled={!form.title || !form.category || !form.excerpt}
                            className="flex items-center gap-2 bg-[#C9A96E] text-[#0D0B09] px-6 py-3 font-sans text-xs uppercase tracking-widest hover:bg-[#F5F0E8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <Save className="w-4 h-4" /> {editing === 'new' ? 'Publish Article' : 'Save Changes'}
                        </button>
                        <button onClick={() => setEditing(null)} className="text-[#7A7268] font-sans text-sm hover:text-[#1A1714] cursor-pointer">Cancel</button>
                    </div>
                </div>
            </div>
        );
    }

    // List View
    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1714]">Blog Posts</h2>
                    <p className="font-sans text-sm text-[#7A7268] mt-1">{blogs.length} articles published</p>
                </div>
                <button
                    onClick={handleNew}
                    className="flex items-center gap-2 bg-[#C9A96E] text-[#0D0B09] px-5 py-2.5 font-sans text-xs uppercase tracking-widest hover:bg-[#F5F0E8] transition-colors cursor-pointer"
                >
                    <Plus className="w-4 h-4" /> New Article
                </button>
            </div>

            {/* Blog List */}
            <div className="space-y-4">
                {blogs.map((blog) => (
                    <div key={blog.slug} className="bg-white border border-[#D9D0C0] rounded overflow-hidden hover:border-[#C9A96E] transition-colors">
                        <div className="flex flex-col md:flex-row">
                            {/* Thumbnail */}
                            {blog.image && (
                                <div className="w-full md:w-48 h-32 md:h-auto shrink-0">
                                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                                </div>
                            )}
                            {/* Info */}
                            <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="bg-[#8B4A2F] text-[#F5F0E8] font-sans text-[10px] uppercase px-2 py-0.5 rounded-full tracking-wider">{blog.category}</span>
                                        {blog.featured && <span className="bg-[#C9A96E] text-[#0D0B09] font-sans text-[10px] uppercase px-2 py-0.5 rounded-full tracking-wider">Featured</span>}
                                    </div>
                                    <h3 className="font-serif text-lg text-[#1A1714] leading-snug mb-1">{blog.title}</h3>
                                    <p className="font-sans text-xs text-[#7A7268] line-clamp-1">{blog.excerpt}</p>
                                </div>
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#D9D0C0]">
                                    <div className="flex items-center gap-4 text-xs font-sans text-[#7A7268]">
                                        <span>{formatDate(blog.date)}</span>
                                        <span>{blog.readTime}</span>
                                        <span>{blog.tags?.length || 0} tags</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link href={`/blog/${blog.slug}`} target="_blank" className="p-2 text-[#7A7268] hover:text-[#C9A96E] transition-colors" title="Preview">
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                        <button onClick={() => handleEdit(blog)} className="p-2 text-[#7A7268] hover:text-[#C9A96E] transition-colors cursor-pointer" title="Edit">
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(blog.slug)} className="p-2 text-[#7A7268] hover:text-red-600 transition-colors cursor-pointer" title="Delete">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {blogs.length === 0 && (
                <div className="bg-white border border-[#D9D0C0] rounded p-12 text-center">
                    <FileText className="w-12 h-12 text-[#D9D0C0] mx-auto mb-4" />
                    <h3 className="font-serif text-xl text-[#1A1714] mb-2">No Blog Posts Yet</h3>
                    <p className="font-sans text-sm text-[#7A7268] mb-6">Start creating content to boost your SEO and attract commercial investors.</p>
                    <button
                        onClick={handleNew}
                        className="bg-[#C9A96E] text-[#0D0B09] px-6 py-3 font-sans text-xs uppercase tracking-widest hover:bg-[#F5F0E8] transition-colors cursor-pointer"
                    >
                        Create First Article
                    </button>
                </div>
            )}
        </div>
    );
}
