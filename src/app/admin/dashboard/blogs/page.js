'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
    Edit3,
    Eye,
    FileText,
    ImagePlus,
    Loader2,
    Plus,
    RefreshCw,
    Save,
    Search,
    Trash2,
    X,
} from 'lucide-react';
import { addArticle, deleteArticle, getArticles, updateArticle } from '@/lib/firebaseUtils';
import { uploadToCloudinary } from '@/lib/cloudinary';

const ARTICLE_CATEGORIES = [
    'Market Insights',
    'Buyer Guide',
    'Seller Guide',
    'NRI Guide',
    'Investment',
    'Legal & Compliance',
    'Location Spotlight',
    'Commercial Real Estate',
    'Residential Real Estate',
];

const emptyForm = {
    title: '',
    slug: '',
    category: 'Market Insights',
    excerpt: '',
    metaDescription: '',
    imageUrl: '',
    author: 'Arun Dongare',
    authorRole: 'Founder & Principal Broker',
    readTime: '',
    tags: '',
    featured: false,
    status: 'Draft',
    date: '',
    content: '',
};

function generateSlug(value) {
    return String(value || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

function contentToText(content) {
    if (!content) return '';
    if (typeof content === 'string') return content;
    if (!Array.isArray(content)) return '';
    return content.map((block) => {
        if (block.type === 'heading' || block.type === 'h2') return `## ${block.text || ''}`;
        if (block.type === 'h3') return `### ${block.text || ''}`;
        if (block.type === 'ul') return (block.items || []).map((item) => `- ${item}`).join('\n');
        if (block.type === 'ol') return (block.items || []).map((item, index) => `${index + 1}. ${item}`).join('\n');
        return block.text || '';
    }).join('\n\n');
}

function formatDate(value) {
    if (!value) return 'No date';
    return new Date(value).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

function estimateReadTime(content) {
    const words = String(content || '').trim().split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.ceil(words / 180))} min read`;
}

export default function AdminBlogPage() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [query, setQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [error, setError] = useState('');
    const [uploadingCover, setUploadingCover] = useState(false);

    const loadArticles = async () => {
        setIsLoading(true);
        setError('');
        try {
            const data = await getArticles({ includeSamples: false });
            setArticles(data);
        } catch (loadError) {
            console.error(loadError);
            setError('Failed to load journal articles.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadArticles();
    }, []);

    const categories = useMemo(() => {
        return [...new Set([...ARTICLE_CATEGORIES, ...articles.map((article) => article.category).filter(Boolean)])];
    }, [articles]);

    const filteredArticles = useMemo(() => {
        const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
        return articles.filter((article) => {
            if (statusFilter !== 'All' && article.status !== statusFilter) return false;
            if (categoryFilter !== 'All' && article.category !== categoryFilter) return false;
            if (!terms.length) return true;
            const haystack = [article.title, article.slug, article.category, article.excerpt, article.author, ...(article.tags || [])]
                .join(' ')
                .toLowerCase();
            return terms.every((term) => haystack.includes(term));
        });
    }, [articles, categoryFilter, query, statusFilter]);

    const startNew = () => {
        setForm({
            ...emptyForm,
            date: new Date().toISOString().split('T')[0],
            readTime: '5 min read',
        });
        setEditing('new');
        setError('');
    };

    const startEdit = (article) => {
        setForm({
            title: article.title || '',
            slug: article.slug || '',
            category: article.category || 'Market Insights',
            excerpt: article.excerpt || '',
            metaDescription: article.metaDescription || article.excerpt || '',
            imageUrl: article.imageUrl || article.image || '',
            author: article.author || 'Arun Dongare',
            authorRole: article.authorRole || 'Founder & Principal Broker',
            readTime: article.readTime || '5 min read',
            tags: (article.tags || []).join(', '),
            featured: Boolean(article.featured),
            status: article.status || 'Draft',
            date: article.date || new Date().toISOString().split('T')[0],
            content: contentToText(article.content),
        });
        setEditing(article.id);
        setError('');
    };

    const updateForm = (field, value) => {
        setForm((prev) => {
            const next = { ...prev, [field]: value };
            if (field === 'title' && editing === 'new') next.slug = generateSlug(value);
            if (field === 'content' && !prev.readTime) next.readTime = estimateReadTime(value);
            return next;
        });
    };

    const validate = () => {
        if (!form.title.trim()) return 'Title is required.';
        if (!form.slug.trim()) return 'Slug is required.';
        if (!form.category.trim()) return 'Category is required.';
        if (!form.excerpt.trim()) return 'Excerpt is required.';
        if (!form.content.trim()) return 'Article content is required.';
        return '';
    };

    const uploadCoverImage = async (file) => {
        if (!file) return;
        setUploadingCover(true);
        setError('');
        try {
            const url = await uploadToCloudinary(file);
            updateForm('imageUrl', url);
        } catch (uploadError) {
            console.error(uploadError);
            setError(uploadError.message || 'Cover image upload failed.');
        } finally {
            setUploadingCover(false);
        }
    };

    const handleSave = async (statusOverride = form.status) => {
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsSaving(true);
        setError('');
        const payload = {
            title: form.title.trim(),
            slug: generateSlug(form.slug || form.title),
            category: form.category.trim(),
            excerpt: form.excerpt.trim(),
            metaDescription: form.metaDescription.trim() || form.excerpt.trim(),
            imageUrl: form.imageUrl.trim(),
            image: form.imageUrl.trim(),
            author: form.author.trim() || 'Aurevon Realty',
            authorRole: form.authorRole.trim(),
            readTime: form.readTime.trim() || estimateReadTime(form.content),
            tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
            featured: Boolean(form.featured),
            status: statusOverride,
            date: form.date || new Date().toISOString().split('T')[0],
            content: form.content.trim(),
        };

        try {
            if (editing === 'new') await addArticle(payload);
            else await updateArticle(editing, payload);
            await loadArticles();
            setEditing(null);
        } catch (saveError) {
            console.error(saveError);
            setError(saveError.message || 'Failed to save article.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (article) => {
        if (!confirm(`Delete "${article.title}" permanently?`)) return;
        setError('');
        try {
            await deleteArticle(article.id);
            setArticles((items) => items.filter((item) => item.id !== article.id));
        } catch (deleteError) {
            console.error(deleteError);
            setError('Failed to delete article.');
        }
    };

    if (editing !== null) {
        return (
            <div>
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="font-serif text-2xl text-[#1A1714] sm:text-3xl">{editing === 'new' ? 'New Journal Article' : 'Edit Journal Article'}</h2>
                        <p className="mt-1 font-sans text-sm text-[#7A7268]">Create market guides, listing explainers, and SEO-ready resources.</p>
                    </div>
                    <button onClick={() => setEditing(null)} className="flex items-center gap-2 font-sans text-sm text-[#7A7268] hover:text-[#1A1714]">
                        <X className="h-4 w-4" />
                        Cancel
                    </button>
                </div>

                {error && <div className="mb-5 rounded border border-red-200 bg-red-50 p-3 font-sans text-sm text-red-700">{error}</div>}

                <div className="max-w-5xl rounded border border-[#D9D0C0] bg-white p-6 shadow md:p-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <label className="mb-2 block font-sans text-xs uppercase tracking-wider text-[#7A7268]">Title *</label>
                            <input
                                value={form.title}
                                onChange={(event) => updateForm('title', event.target.value)}
                                className="w-full rounded border border-[#D9D0C0] px-4 py-3 font-sans text-sm outline-none focus:border-[#C9A96E]"
                                placeholder="Pune real estate market outlook"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-sans text-xs uppercase tracking-wider text-[#7A7268]">Slug *</label>
                            <input
                                value={form.slug}
                                onChange={(event) => updateForm('slug', generateSlug(event.target.value))}
                                className="w-full rounded border border-[#D9D0C0] px-4 py-3 font-sans text-sm outline-none focus:border-[#C9A96E]"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-sans text-xs uppercase tracking-wider text-[#7A7268]">Category *</label>
                            <select
                                value={form.category}
                                onChange={(event) => updateForm('category', event.target.value)}
                                className="w-full rounded border border-[#D9D0C0] bg-white px-4 py-3 font-sans text-sm outline-none focus:border-[#C9A96E]"
                            >
                                {categories.map((category) => <option key={category}>{category}</option>)}
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-2 block font-sans text-xs uppercase tracking-wider text-[#7A7268]">Excerpt *</label>
                            <textarea
                                value={form.excerpt}
                                onChange={(event) => updateForm('excerpt', event.target.value)}
                                rows={3}
                                className="w-full resize-y rounded border border-[#D9D0C0] px-4 py-3 font-sans text-sm outline-none focus:border-[#C9A96E]"
                                placeholder="A short summary for cards and previews."
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-2 block font-sans text-xs uppercase tracking-wider text-[#7A7268]">Meta Description</label>
                            <textarea
                                value={form.metaDescription}
                                onChange={(event) => updateForm('metaDescription', event.target.value)}
                                rows={2}
                                className="w-full resize-y rounded border border-[#D9D0C0] px-4 py-3 font-sans text-sm outline-none focus:border-[#C9A96E]"
                            />
                            <p className={`mt-1 font-sans text-xs ${form.metaDescription.length > 160 ? 'text-amber-700' : 'text-[#7A7268]'}`}>
                                {form.metaDescription.length}/160 characters
                            </p>
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-2 block font-sans text-xs uppercase tracking-wider text-[#7A7268]">Cover Image URL</label>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                    value={form.imageUrl}
                                    onChange={(event) => updateForm('imageUrl', event.target.value)}
                                    className="flex-1 rounded border border-[#D9D0C0] px-4 py-3 font-sans text-sm outline-none focus:border-[#C9A96E]"
                                    placeholder="https://..."
                                />
                                <label className="flex cursor-pointer items-center justify-center rounded border border-[#D9D0C0] px-4 py-3 font-sans text-xs uppercase tracking-wider text-[#7A7268] hover:border-[#C9A96E] hover:text-[#1A1714]">
                                    {uploadingCover ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ImagePlus className="mr-2 h-4 w-4" />}
                                    Upload
                                    <input type="file" accept="image/*" className="hidden" onChange={(event) => uploadCoverImage(event.target.files?.[0])} />
                                </label>
                            </div>
                            {form.imageUrl && (
                                <div className="mt-4 aspect-[16/9] max-w-md overflow-hidden rounded border border-[#D9D0C0]">
                                    <img src={form.imageUrl} alt="Article cover preview" className="h-full w-full object-cover" />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block font-sans text-xs uppercase tracking-wider text-[#7A7268]">Author</label>
                            <input value={form.author} onChange={(event) => updateForm('author', event.target.value)} className="w-full rounded border border-[#D9D0C0] px-4 py-3 font-sans text-sm outline-none focus:border-[#C9A96E]" />
                        </div>
                        <div>
                            <label className="mb-2 block font-sans text-xs uppercase tracking-wider text-[#7A7268]">Author Role</label>
                            <input value={form.authorRole} onChange={(event) => updateForm('authorRole', event.target.value)} className="w-full rounded border border-[#D9D0C0] px-4 py-3 font-sans text-sm outline-none focus:border-[#C9A96E]" />
                        </div>
                        <div>
                            <label className="mb-2 block font-sans text-xs uppercase tracking-wider text-[#7A7268]">Read Time</label>
                            <input value={form.readTime} onChange={(event) => updateForm('readTime', event.target.value)} className="w-full rounded border border-[#D9D0C0] px-4 py-3 font-sans text-sm outline-none focus:border-[#C9A96E]" />
                        </div>
                        <div>
                            <label className="mb-2 block font-sans text-xs uppercase tracking-wider text-[#7A7268]">Date</label>
                            <input type="date" value={form.date} onChange={(event) => updateForm('date', event.target.value)} className="w-full rounded border border-[#D9D0C0] px-4 py-3 font-sans text-sm outline-none focus:border-[#C9A96E]" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-2 block font-sans text-xs uppercase tracking-wider text-[#7A7268]">Tags</label>
                            <input value={form.tags} onChange={(event) => updateForm('tags', event.target.value)} className="w-full rounded border border-[#D9D0C0] px-4 py-3 font-sans text-sm outline-none focus:border-[#C9A96E]" placeholder="Pune, RERA, NRI investment" />
                        </div>

                        <div className="flex flex-wrap gap-4 md:col-span-2">
                            <label className="flex items-center gap-3 rounded border border-[#D9D0C0] px-4 py-3 font-sans text-sm text-[#1A1714]">
                                <input type="checkbox" checked={form.featured} onChange={(event) => updateForm('featured', event.target.checked)} className="accent-[#C9A96E]" />
                                Featured Article
                            </label>
                            <label className="flex items-center gap-3 rounded border border-[#D9D0C0] px-4 py-3 font-sans text-sm text-[#1A1714]">
                                <span>Status</span>
                                <select value={form.status} onChange={(event) => updateForm('status', event.target.value)} className="rounded border border-[#D9D0C0] bg-white px-3 py-1.5 outline-none">
                                    <option>Draft</option>
                                    <option>Published</option>
                                    <option>Archived</option>
                                </select>
                            </label>
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-2 block font-sans text-xs uppercase tracking-wider text-[#7A7268]">Article Content *</label>
                            <textarea
                                value={form.content}
                                onChange={(event) => updateForm('content', event.target.value)}
                                rows={18}
                                className="w-full resize-y rounded border border-[#D9D0C0] px-4 py-3 font-mono text-sm leading-relaxed outline-none focus:border-[#C9A96E]"
                                placeholder={"Opening paragraph...\n\n## Section Heading\n\n- Bullet point\n- Another point"}
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3 border-t border-[#D9D0C0] pt-6">
                        <button
                            onClick={() => handleSave('Draft')}
                            disabled={isSaving}
                            className="flex items-center rounded border border-[#7A7268] px-5 py-2.5 font-sans text-xs uppercase tracking-wider text-[#7A7268] transition-colors hover:border-[#C9A96E] disabled:opacity-50"
                        >
                            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Save Draft
                        </button>
                        <button
                            onClick={() => handleSave('Published')}
                            disabled={isSaving}
                            className="flex items-center rounded bg-[#C9A96E] px-5 py-2.5 font-sans text-xs uppercase tracking-wider text-[#0D0B09] transition-colors hover:bg-[#F5F0E8] disabled:opacity-50"
                        >
                            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Publish
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <h2 className="font-serif text-2xl text-[#1A1714] sm:text-3xl">Journal</h2>
                    <p className="mt-1 font-sans text-sm text-[#7A7268]">{articles.length} live CMS articles in Firestore.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button onClick={loadArticles} disabled={isLoading} className="flex items-center rounded border border-[#D9D0C0] px-4 py-2 font-sans text-xs uppercase tracking-wider text-[#7A7268] transition-colors hover:border-[#C9A96E] disabled:opacity-50">
                        <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                    <button onClick={startNew} className="flex items-center rounded bg-[#C9A96E] px-5 py-2.5 font-sans text-xs uppercase tracking-wider text-[#0D0B09] transition-colors hover:bg-[#F5F0E8]">
                        <Plus className="mr-2 h-4 w-4" />
                        New Article
                    </button>
                </div>
            </div>

            {error && <div className="mb-5 rounded border border-red-200 bg-red-50 p-3 font-sans text-sm text-red-700">{error}</div>}

            <div className="mb-6 grid grid-cols-1 gap-3 rounded border border-[#D9D0C0] bg-white p-4 shadow md:grid-cols-[1fr_180px_220px]">
                <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A7268]" />
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search title, slug, tags, author..."
                        className="w-full rounded border border-[#D9D0C0] py-2.5 pl-10 pr-3 font-sans text-sm outline-none focus:border-[#C9A96E]"
                    />
                </div>
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded border border-[#D9D0C0] bg-white px-3 py-2.5 font-sans text-sm outline-none focus:border-[#C9A96E]">
                    {['All', 'Published', 'Draft', 'Archived'].map((status) => <option key={status}>{status}</option>)}
                </select>
                <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="rounded border border-[#D9D0C0] bg-white px-3 py-2.5 font-sans text-sm outline-none focus:border-[#C9A96E]">
                    <option>All</option>
                    {categories.map((category) => <option key={category}>{category}</option>)}
                </select>
            </div>

            {isLoading ? (
                <div className="flex h-64 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-[#C9A96E]" />
                </div>
            ) : filteredArticles.length ? (
                <div className="space-y-4">
                    {filteredArticles.map((article) => (
                        <div key={article.id} className="overflow-hidden rounded border border-[#D9D0C0] bg-white shadow transition-colors hover:border-[#C9A96E]">
                            <div className="flex flex-col md:flex-row">
                                <div className="h-40 shrink-0 bg-[#F5F0E8] md:h-auto md:w-52">
                                    {article.imageUrl || article.image ? (
                                        <img src={article.imageUrl || article.image} alt={article.title} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <FileText className="h-10 w-10 text-[#D9D0C0]" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-1 flex-col justify-between p-5">
                                    <div>
                                        <div className="mb-3 flex flex-wrap items-center gap-2">
                                            <span className="rounded-full bg-[#8B4A2F] px-2 py-0.5 font-sans text-[10px] uppercase tracking-wider text-[#F5F0E8]">{article.category}</span>
                                            <span className={`rounded-full px-2 py-0.5 font-sans text-[10px] uppercase tracking-wider ${article.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{article.status}</span>
                                            {article.featured && <span className="rounded-full bg-[#C9A96E] px-2 py-0.5 font-sans text-[10px] uppercase tracking-wider text-[#0D0B09]">Featured</span>}
                                        </div>
                                        <h3 className="font-serif text-xl leading-snug text-[#1A1714]">{article.title}</h3>
                                        <p className="mt-1 font-mono text-xs text-[#7A7268]">/journal/{article.slug}</p>
                                        <p className="mt-3 line-clamp-2 font-sans text-sm leading-relaxed text-[#7A7268]">{article.excerpt}</p>
                                    </div>
                                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#D9D0C0] pt-4">
                                        <div className="flex flex-wrap gap-4 font-sans text-xs text-[#7A7268]">
                                            <span>{formatDate(article.date || article.createdAt)}</span>
                                            <span>{article.readTime || '5 min read'}</span>
                                            <span>{article.tags?.length || 0} tags</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {article.status === 'Published' && article.slug && (
                                                <Link href={`/journal/${article.slug}`} target="_blank" className="rounded p-2 text-[#7A7268] hover:bg-[#F5F0E8] hover:text-[#C9A96E]" title="Preview">
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            )}
                                            <button onClick={() => startEdit(article)} className="rounded p-2 text-[#7A7268] hover:bg-[#F5F0E8] hover:text-[#C9A96E]" title="Edit">
                                                <Edit3 className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => handleDelete(article)} className="rounded p-2 text-[#7A7268] hover:bg-red-50 hover:text-red-600" title="Delete">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded border border-[#D9D0C0] bg-white p-12 text-center shadow">
                    <FileText className="mx-auto mb-4 h-12 w-12 text-[#D9D0C0]" />
                    <h3 className="mb-2 font-serif text-xl text-[#1A1714]">No Journal Articles</h3>
                    <p className="mb-6 font-sans text-sm text-[#7A7268]">Create your first market article, buyer guide, or locality insight.</p>
                    <button onClick={startNew} className="rounded bg-[#C9A96E] px-6 py-3 font-sans text-xs uppercase tracking-wider text-[#0D0B09] transition-colors hover:bg-[#F5F0E8]">
                        Create First Article
                    </button>
                </div>
            )}
        </div>
    );
}
