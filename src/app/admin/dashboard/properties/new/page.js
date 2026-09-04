'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Check, ImagePlus, Loader2, Plus, Trash2 } from 'lucide-react';
import { addProperty, getProperty, getSiteOptions, updateProperty } from '@/lib/firebaseUtils';
import { uploadToCloudinary } from '@/lib/cloudinary';
import {
    AVAILABILITY_OPTIONS,
    DEFAULT_SITE_OPTIONS,
    formatINR,
    normalizeProperty,
    parsePriceToNumber,
} from '@/lib/realEstate';

const areaFactors = {
    'sq.ft': 1,
    'sq.m': 10.7639,
    'sq.yd': 9,
    acre: 43560,
    hectare: 107639,
    guntha: 1089,
};

export default function AddPropertyPage() {
    return (
        <Suspense fallback={<div className="p-12 text-center text-[#7A7268]">Loading form...</div>}>
            <PropertyForm />
        </Suspense>
    );
}

function emptyForm(options = DEFAULT_SITE_OPTIONS) {
    return {
        listingId: '',
        listingType: 'Sell',
        category: 'Commercial',
        type: options.commercialTypes[0],
        title: '',
        bhk: '',
        bedrooms: '',
        bathrooms: '',
        parking: '',
        locality: '',
        zone: '',
        city: 'Pune',
        carpetArea: '',
        builtUpArea: '',
        area: '',
        areaUnit: 'sq.ft',
        floor: '',
        facing: '',
        age: '',
        furnishing: '',
        possession: '',
        availability: 'Available',
        thumbnail: '',
        images: [],
        newImageUrl: '',
        floorPlan: '',
        videoUrl: '',
        price: '',
        priceLabel: '',
        priceNegotiable: false,
        cardBadge: 'Verified',
        status: 'Published',
        featured: false,
        verified: true,
        legalClear: true,
        reraRegistered: true,
        description: '',
        neighborhood: '',
        amenities: [],
        tags: [],
        newTag: '',
        reraId: '',
    };
}

function roundArea(value) {
    const numeric = Number(value);
    return numeric ? String(Math.round(numeric)) : '';
}

function convertArea(value, fromUnit, toUnit) {
    const numeric = Number(value);
    if (!numeric || !areaFactors[fromUnit] || !areaFactors[toUnit]) return value;
    return roundArea((numeric * areaFactors[fromUnit]) / areaFactors[toUnit]);
}

function PropertyForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get('id');
    const [step, setStep] = useState(1);
    const [options, setOptions] = useState(DEFAULT_SITE_OPTIONS);
    const [formData, setFormData] = useState(emptyForm(DEFAULT_SITE_OPTIONS));
    const [isSaving, setIsSaving] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(Boolean(editId));
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        getSiteOptions().then((data) => {
            setOptions(data);
            setFormData((prev) => ({
                ...prev,
                type: prev.type || data.commercialTypes?.[0] || DEFAULT_SITE_OPTIONS.commercialTypes[0],
            }));
        }).catch(() => {});
    }, []);

    useEffect(() => {
        if (!editId) return;
        getProperty(editId).then((data) => {
            if (!data) return;
            const p = normalizeProperty(data);
            setFormData((prev) => ({
                ...prev,
                ...p,
                title: p.title,
                price: p.price || '',
                priceLabel: p.priceLabel || '',
                thumbnail: p.thumbnail || '',
                images: p.images || [],
                tags: p.tags || [],
                amenities: p.amenities || [],
                area: p.area || '',
                carpetArea: p.carpetArea || '',
                builtUpArea: p.builtUpArea || '',
                videoUrl: p.videoUrl || '',
                floorPlan: p.floorPlan || '',
                newTag: '',
                newImageUrl: '',
            }));
        }).catch(console.error).finally(() => setIsLoadingData(false));
    }, [editId]);

    const typeOptions = formData.category === 'Commercial' ? options.commercialTypes : options.residentialTypes;
    const selectedZone = options.localityZones?.[formData.locality] || '';

    const update = (field, value) => {
        setFormData((prev) => {
            const next = { ...prev, [field]: value };
            if (field === 'category') {
                next.type = value === 'Commercial' ? options.commercialTypes?.[0] : options.residentialTypes?.[0];
            }
            if (field === 'locality') {
                next.zone = options.localityZones?.[value] || prev.zone;
            }
            if (field === 'carpetArea') {
                next.builtUpArea = roundArea(Number(value) * 1.2);
                next.area = roundArea(Number(value) * 1.35);
            }
            if (field === 'price') {
                next.priceLabel = formatINR(parsePriceToNumber(value));
            }
            if (field === 'areaUnit') {
                next.carpetArea = convertArea(prev.carpetArea, prev.areaUnit, value);
                next.builtUpArea = convertArea(prev.builtUpArea, prev.areaUnit, value);
                next.area = convertArea(prev.area, prev.areaUnit, value);
            }
            return next;
        });
    };

    const toggleAmenity = (amenity) => {
        setFormData((prev) => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter((item) => item !== amenity)
                : [...prev.amenities, amenity],
        }));
    };

    const addTag = () => {
        const tag = formData.newTag.trim();
        if (!tag || formData.tags.includes(tag)) return;
        setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag], newTag: '' }));
    };

    const addImageUrl = () => {
        const url = formData.newImageUrl.trim();
        if (!url || formData.images.includes(url)) return;
        setFormData((prev) => ({
            ...prev,
            thumbnail: prev.thumbnail || url,
            images: [...prev.images, url],
            newImageUrl: '',
        }));
    };

    const validate = () => {
        if (!formData.title.trim()) return 'Property title is required.';
        if (!formData.locality.trim()) return 'Locality is required.';
        if (!parsePriceToNumber(formData.price) && !formData.priceLabel.trim()) return 'Numeric price or price label is required.';
        return '';
    };

    const handleSave = async (statusOverride = formData.status) => {
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsSaving(true);
        setError('');
        try {
            let thumbnail = formData.thumbnail;
            if (imageFile) {
                thumbnail = await uploadToCloudinary(imageFile);
            }
            const images = [...new Set([thumbnail, ...formData.images].filter(Boolean))];
            const payload = {
                ...formData,
                title: formData.title.trim(),
                name: formData.title.trim(),
                zone: formData.zone || selectedZone,
                thumbnail,
                image: thumbnail,
                images,
                price: parsePriceToNumber(formData.price),
                priceLabel: formData.priceLabel || formatINR(parsePriceToNumber(formData.price)),
                priceDisplay: formData.priceLabel || formatINR(parsePriceToNumber(formData.price)),
                status: statusOverride,
                active: statusOverride === 'Published',
                updatedAt: new Date().toISOString(),
            };

            if (editId) await updateProperty(editId, payload);
            else await addProperty(payload);
            router.push('/admin/dashboard/properties');
        } catch (saveError) {
            console.error('Failed to save property:', saveError);
            setError(saveError.message || 'Failed to save property. Check permissions and credentials.');
        } finally {
            setIsSaving(false);
        }
    };

    const steps = [
        'Basic',
        'Location',
        'Profile',
        'Photos',
        'Pricing',
        'Features',
        'Legal',
    ];

    const reviewItems = useMemo(() => [
        ['Title', formData.title],
        ['Listing Type', formData.listingType],
        ['Category', formData.category],
        ['Type', formData.type],
        ['Location', `${formData.locality || 'Locality'}, ${formData.city}`],
        ['Zone', formData.zone || selectedZone || 'On Request'],
        ['Price', formData.priceLabel || formData.price],
        ['Area', formData.area ? `${formData.area} ${formData.areaUnit}` : 'On Request'],
        ['Status', formData.status],
        ['Availability', formData.availability],
        ['Badge', formData.cardBadge],
        ['Amenities', formData.amenities.join(', ') || 'None selected'],
        ['Images', `${[formData.thumbnail, ...formData.images].filter(Boolean).length} image(s)`],
    ], [formData, selectedZone]);

    if (isLoadingData) {
        return <div className="p-12 text-center text-[#7A7268]">Loading property details...</div>;
    }

    return (
        <div>
            <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                    <h2 className="font-serif text-2xl text-[#1A1714] sm:text-3xl">{editId ? 'Edit Property' : 'Add New Property'}</h2>
                    <p className="mt-1 font-sans text-sm text-[#7A7268]">Seven-step listing workflow with reusable property data fields.</p>
                </div>
                <button onClick={() => router.push('/admin/dashboard/properties')} className="font-sans text-sm uppercase tracking-wider text-[#7A7268] hover:text-[#1A1714]">Cancel</button>
            </div>

            <div className="mb-6 flex gap-2 overflow-x-auto rounded border border-[#D9D0C0] bg-white p-2 scrollbar-hide">
                {steps.map((label, index) => {
                    const stepNo = index + 1;
                    return (
                        <button
                            key={label}
                            onClick={() => setStep(stepNo)}
                            className={`flex shrink-0 items-center gap-2 rounded px-4 py-2 font-sans text-xs uppercase tracking-wider ${step === stepNo ? 'bg-[#0D0B09] text-[#C9A96E]' : 'text-[#7A7268] hover:bg-[#F5F0E8]'}`}
                        >
                            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-[10px]">{stepNo}</span>
                            {label}
                        </button>
                    );
                })}
            </div>

            <div className="max-w-5xl rounded border border-[#D9D0C0] bg-white p-4 shadow sm:p-8">
                {error && <div className="mb-6 rounded border border-red-200 bg-red-50 p-3 font-sans text-sm text-red-700">{error}</div>}

                {step === 1 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">Listing Type</label>
                            <select value={formData.listingType} onChange={(event) => update('listingType', event.target.value)} className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]">
                                {(options.listingTypes || []).map((item) => <option key={item}>{item}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">Category</label>
                            <select value={formData.category} onChange={(event) => update('category', event.target.value)} className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]">
                                <option>Residential</option>
                                <option>Commercial</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">Sub-type</label>
                            <select value={formData.type} onChange={(event) => update('type', event.target.value)} className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]">
                                {typeOptions.map((item) => <option key={item}>{item}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">Property Title *</label>
                            <input value={formData.title} onChange={(event) => update('title', event.target.value)} className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]" />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">BHK</label>
                            <select value={formData.bhk} onChange={(event) => update('bhk', event.target.value)} className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]">
                                <option value="">Select</option>
                                {(options.bhkOptions || []).map((item) => <option key={item} value={item}>{item} BHK</option>)}
                            </select>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {['bedrooms', 'bathrooms', 'parking'].map((field) => (
                                <div key={field}>
                                    <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">{field}</label>
                                    <input value={formData[field]} onChange={(event) => update(field, event.target.value)} className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">Locality *</label>
                            <input value={formData.locality} onChange={(event) => update('locality', event.target.value)} list="admin-localities" className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]" />
                            <datalist id="admin-localities">
                                {(options.localities || []).map((item) => <option key={item} value={item} />)}
                            </datalist>
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">Zone</label>
                            <input value={formData.zone || selectedZone} onChange={(event) => update('zone', event.target.value)} className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]" />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">City</label>
                            <input value={formData.city} onChange={(event) => update('city', event.target.value)} className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]" />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">Neighborhood / Landmark</label>
                            <input value={formData.neighborhood} onChange={(event) => update('neighborhood', event.target.value)} className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]" />
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">Carpet Area</label>
                            <input value={formData.carpetArea} onChange={(event) => update('carpetArea', event.target.value)} className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]" />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">Built-up Area</label>
                            <input value={formData.builtUpArea} onChange={(event) => update('builtUpArea', event.target.value)} className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]" />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">Super Built-up / Plot Area</label>
                            <input value={formData.area} onChange={(event) => update('area', event.target.value)} className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]" />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">Area Unit</label>
                            <select value={formData.areaUnit} onChange={(event) => update('areaUnit', event.target.value)} className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]">
                                {(options.areaUnits || []).map((item) => <option key={item}>{item}</option>)}
                            </select>
                        </div>
                        {[
                            ['floor', 'Floor'],
                            ['facing', 'Facing'],
                            ['age', 'Age'],
                            ['furnishing', 'Furnishing'],
                            ['possession', 'Possession'],
                            ['availability', 'Availability'],
                        ].map(([field, label]) => (
                            <div key={field}>
                                <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">{label}</label>
                                {field === 'availability' ? (
                                    <select value={formData.availability} onChange={(event) => update(field, event.target.value)} className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]">
                                        {AVAILABILITY_OPTIONS.map((item) => <option key={item}>{item}</option>)}
                                    </select>
                                ) : field === 'facing' ? (
                                    <select value={formData.facing} onChange={(event) => update(field, event.target.value)} className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]">
                                        <option value="">Select</option>
                                        {(options.facingOptions || []).map((item) => <option key={item}>{item}</option>)}
                                    </select>
                                ) : field === 'furnishing' ? (
                                    <select value={formData.furnishing} onChange={(event) => update(field, event.target.value)} className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]">
                                        <option value="">Select</option>
                                        {(options.furnishingOptions || []).map((item) => <option key={item}>{item}</option>)}
                                    </select>
                                ) : (
                                    <input value={formData[field]} onChange={(event) => update(field, event.target.value)} className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]" />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-6">
                        <div>
                            <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">Thumbnail / Main Image Upload</label>
                            <input type="file" accept="image/*" onChange={(event) => setImageFile(event.target.files?.[0] || null)} className="w-full rounded border border-[#D9D0C0] p-2.5 text-sm outline-none focus:border-[#C9A96E]" />
                            {imageFile && <p className="mt-1 text-xs text-green-700">Selected: {imageFile.name}</p>}
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">Thumbnail URL</label>
                            <input value={formData.thumbnail} onChange={(event) => update('thumbnail', event.target.value)} className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]" />
                        </div>
                        <div className="flex gap-3">
                            <input value={formData.newImageUrl} onChange={(event) => update('newImageUrl', event.target.value)} placeholder="Paste gallery image URL" className="flex-1 rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]" />
                            <button onClick={addImageUrl} className="flex items-center rounded bg-[#0D0B09] px-4 py-2 text-sm text-[#C9A96E]"><ImagePlus className="mr-2 h-4 w-4" /> Add</button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            {[formData.thumbnail, ...formData.images].filter(Boolean).map((image, index) => (
                                <div key={`${image}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded border border-[#D9D0C0]">
                                    <img src={image} alt="" className="h-full w-full object-cover" />
                                    {index > 0 && (
                                        <button onClick={() => setFormData((prev) => ({ ...prev, images: prev.images.filter((item) => item !== image) }))} className="absolute right-2 top-2 rounded-full bg-[#0D0B09]/80 p-1 text-white">
                                            <Trash2 className="h-3 w-3" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">Floor Plan URL</label>
                                <input value={formData.floorPlan} onChange={(event) => update('floorPlan', event.target.value)} className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]" />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">Video URL</label>
                                <input value={formData.videoUrl} onChange={(event) => update('videoUrl', event.target.value)} className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]" />
                            </div>
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">Numeric Price *</label>
                            <input value={formData.price} onChange={(event) => update('price', event.target.value)} placeholder="e.g. 12000000 or 1.2Cr" className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]" />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">Price Label</label>
                            <input value={formData.priceLabel} onChange={(event) => update('priceLabel', event.target.value)} className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]" />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">Card Badge</label>
                            <select value={formData.cardBadge} onChange={(event) => update('cardBadge', event.target.value)} className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]">
                                {(options.cardBadgeOptions || []).map((item) => <option key={item}>{item}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">Listing Status</label>
                            <select value={formData.status} onChange={(event) => update('status', event.target.value)} className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]">
                                {['Draft', 'Published', 'Archived'].map((item) => <option key={item}>{item}</option>)}
                            </select>
                        </div>
                        {[
                            ['priceNegotiable', 'Price Negotiable'],
                            ['featured', 'Featured'],
                            ['verified', 'Verified'],
                            ['legalClear', 'Legal Clear'],
                            ['reraRegistered', 'License/RERA Registered'],
                        ].map(([field, label]) => (
                            <label key={field} className="flex items-center gap-3 rounded border border-[#D9D0C0] p-3 text-sm text-[#1A1714]">
                                <input type="checkbox" checked={Boolean(formData[field])} onChange={(event) => update(field, event.target.checked)} className="accent-[#C9A96E]" />
                                {label}
                            </label>
                        ))}
                    </div>
                )}

                {step === 6 && (
                    <div className="space-y-6">
                        <div>
                            <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">Full Description</label>
                            <textarea value={formData.description} onChange={(event) => update('description', event.target.value)} rows={6} className="w-full resize-y rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]" />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">Neighborhood Description</label>
                            <textarea value={formData.neighborhood} onChange={(event) => update('neighborhood', event.target.value)} rows={3} className="w-full resize-y rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]" />
                        </div>
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                            {(options.amenities || []).map((amenity) => (
                                <label key={amenity} className="flex items-center gap-2 rounded border border-[#D9D0C0] p-2 text-sm text-[#7A7268]">
                                    <input type="checkbox" checked={formData.amenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} className="accent-[#C9A96E]" />
                                    {amenity}
                                </label>
                            ))}
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">Tags</label>
                            <div className="mb-3 flex gap-3">
                                <input value={formData.newTag} onChange={(event) => update('newTag', event.target.value)} onKeyDown={(event) => event.key === 'Enter' && (event.preventDefault(), addTag())} className="flex-1 rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]" />
                                <button onClick={addTag} className="flex items-center rounded bg-[#0D0B09] px-4 py-2 text-sm text-[#C9A96E]"><Plus className="mr-2 h-4 w-4" /> Add</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.tags.map((tag) => (
                                    <button key={tag} onClick={() => setFormData((prev) => ({ ...prev, tags: prev.tags.filter((item) => item !== tag) }))} className="rounded-full border border-[#D9D0C0] px-3 py-1 text-xs text-[#7A7268]">
                                        {tag} x
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {step === 7 && (
                    <div className="space-y-6">
                        <div>
                            <label className="mb-1 block text-xs font-medium uppercase text-[#7A7268]">License / RERA / Project Registration ID</label>
                            <input value={formData.reraId} onChange={(event) => update('reraId', event.target.value)} className="w-full rounded border border-[#D9D0C0] p-2.5 outline-none focus:border-[#C9A96E]" />
                        </div>
                        <div className="rounded border border-[#D9D0C0] bg-[#F5F0E8]/50">
                            {reviewItems.map(([label, value]) => (
                                <div key={label} className="flex justify-between gap-4 border-b border-[#D9D0C0] p-4 last:border-b-0">
                                    <span className="font-sans text-sm text-[#7A7268]">{label}</span>
                                    <span className="max-w-[60%] text-right font-sans text-sm font-medium text-[#1A1714]">{value || 'On Request'}</span>
                                </div>
                            ))}
                        </div>
                        <div className="rounded border border-[#C9A96E]/40 bg-[#C9A96E]/10 p-4 text-sm leading-relaxed text-[#7A7268]">
                            <Check className="mb-2 h-5 w-5 text-[#C9A96E]" />
                            Confirm listing IDs, RERA details, availability, images, price, and enum values before publishing. Public pages show only Published properties.
                        </div>
                    </div>
                )}

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#D9D0C0] pt-6">
                    <div className="flex gap-3">
                        <button onClick={() => setStep((value) => Math.max(1, value - 1))} disabled={step === 1} className="rounded border border-[#D9D0C0] px-5 py-2.5 font-sans text-sm text-[#7A7268] disabled:opacity-40">
                            Previous
                        </button>
                        <button onClick={() => setStep((value) => Math.min(7, value + 1))} disabled={step === 7} className="rounded border border-[#D9D0C0] px-5 py-2.5 font-sans text-sm text-[#7A7268] disabled:opacity-40">
                            Next
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button onClick={() => handleSave('Draft')} disabled={isSaving} className="rounded border border-[#7A7268] px-6 py-2.5 font-sans text-sm uppercase tracking-wider text-[#7A7268] hover:border-[#C9A96E] disabled:opacity-50">
                            Save Draft
                        </button>
                        <button onClick={() => handleSave('Published')} disabled={isSaving} className="flex items-center rounded bg-[#C9A96E] px-6 py-2.5 font-sans text-sm uppercase tracking-wider text-[#0D0B09] hover:bg-[#F5F0E8] disabled:opacity-50">
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {editId ? 'Update Listing' : 'Publish Listing'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
