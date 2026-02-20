'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { addProperty, uploadPropertyImage } from '@/lib/firebaseUtils';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const amenitiesList = [
    'Security (24/7)', 'CCTV', 'Intercom', 'Power Backup',
    'Lift', 'Covered Parking', 'Visitor Parking', 'Conference Room',
    'Cafeteria', 'Fire Safety', 'Server Room', 'UPS/Generator',
    'High-Speed Internet', 'Reception/Lobby', 'Air Conditioning', 'Pantry',
    'Loading Dock', 'Signage Rights', 'ATM', 'Metro Nearby',
    'Swimming Pool', 'Gym', 'Clubhouse', 'Children Play Area', 'Garden', 'Balcony'
];

const subtypes = {
    'Office Space': ['Bare Shell', 'Warm Shell', 'Fully Fitted', 'Co-Working', 'Managed Office'],
    'Retail': ['High Street Shop', 'Mall Space', 'Showroom', 'Kiosk', 'Food Court'],
    'Industrial': ['Warehouse', 'Factory', 'Cold Storage', 'Godown'],
    'IT Park': ['Grade A', 'Grade B', 'SEZ', 'IT/ITES'],
    'Residential': ['Apartment', 'Villa', 'Independent House', 'Builder Floor', 'Studio'],
    'Plots & Lands': ['Agricultural', 'NA Plot', 'Commercial Land', 'Industrial Land', 'Residential Plot']
};

export default function SubmitPropertyPageWrapper() {
    return (
        <Suspense fallback={<div className="p-12 text-center text-[#7A7268]">Loading form...</div>}>
            <SubmitPropertyPage />
        </Suspense>
    );
}

function SubmitPropertyPage() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const searchParams = useSearchParams();

    const [openSection, setOpenSection] = useState('basic');
    const [isSaving, setIsSaving] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    const [formData, setFormData] = useState({
        name: '', type: 'Residential', subtype: 'Apartment',
        listingType: 'sale',
        city: 'Pune', locality: '', address: '', mapsUrl: '', landmark: '',
        priceMin: '', priceMax: '', priceSqft: '', negotiable: false, yieldPercent: '', maintenance: '',
        superBuiltUp: '', carpetArea: '', bhk: '', bathrooms: '', floor: '', totalFloors: '',
        facing: '', parking: 'none', furnishing: 'unfurnished', possession: '', constructionStatus: 'ready',
        amenities: [],
        featureImage: '', virtualTourUrl: '',
        tags: '',
        shortDescription: '', fullDescription: '',
    });

    const update = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
    const toggleAmenity = (a) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(a) ? prev.amenities.filter(x => x !== a) : [...prev.amenities, a]
        }));
    };

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    const handleSave = async (e) => {
        e.preventDefault();
        if (!user) return;

        setIsSaving(true);
        try {
            let uploadedImageUrl = formData.featureImage;

            // Upload image to Firebase Storage if a new file was selected
            if (imageFile) {
                const downloadUrl = await uploadPropertyImage(imageFile);
                if (downloadUrl) {
                    uploadedImageUrl = downloadUrl;
                }
            }

            const property = {
                name: formData.name,
                type: formData.type,
                subtype: formData.subtype,
                listingType: formData.listingType,
                locality: formData.locality,
                city: formData.city,
                address: formData.address,
                mapsUrl: formData.mapsUrl,
                landmark: formData.landmark,
                priceMin: formData.priceMin,
                priceMax: formData.priceMax,
                priceSqft: formData.priceSqft,
                negotiable: formData.negotiable,
                priceDisplay: formData.priceMin ? `₹${formData.priceMin}${formData.priceMax ? '–' + formData.priceMax : ''}` : '',
                bhk: formData.bhk || 'Commercial',
                sqft: formData.superBuiltUp || '0',
                superBuiltUp: formData.superBuiltUp,
                carpetArea: formData.carpetArea,
                bathrooms: formData.bathrooms,
                floor: formData.floor,
                totalFloors: formData.totalFloors,
                facing: formData.facing,
                parking: formData.parking,
                furnishing: formData.furnishing,
                possession: formData.possession,
                status: 'Under Review',
                approvalStatus: 'pending_review',
                submittedBy: user.email,
                constructionStatus: formData.constructionStatus,
                yield: formData.yieldPercent || null,
                yieldPercent: formData.yieldPercent,
                maintenanceCharge: formData.maintenance,
                image: uploadedImageUrl || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
                amenities: formData.amenities,
                tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
                virtualTourUrl: formData.virtualTourUrl,
                featured: false,
                nriFriendly: false,
                active: false,
                shortDescription: formData.shortDescription,
                fullDescription: formData.fullDescription
            };

            await addProperty(property);
            router.push('/dashboard');
        } catch (error) {
            console.error('Failed to submit property:', error);
            alert('Failed to submit property.');
        } finally {
            setIsSaving(false);
        }
    };

    const SectionHeader = ({ id, title }) => (
        <button
            type="button"
            onClick={() => setOpenSection(openSection === id ? '' : id)}
            className="w-full text-left flex justify-between items-center py-4 border-b border-[#D9D0C0] font-serif text-xl text-[#1A1714] cursor-pointer"
        >
            {title}
            <span className="text-[#C9A96E]">{openSection === id ? '−' : '+'}</span>
        </button>
    );

    if (loading || !user) {
        return <div className="min-h-screen py-32 flex justify-center bg-[#F5F0E8]"><div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin"></div></div>;
    }

    return (
        <div className="min-h-screen bg-[#F5F0E8]">
            {/* Minimal Header */}
            <header className="bg-[#0D0B09] border-b border-[#1A1714] sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link href="/" className="font-serif text-2xl tracking-wider text-[#C9A96E]">
                        AUREVON
                    </Link>
                    <Link href="/dashboard" className="text-sm font-sans text-[#D9D0C0] hover:text-white transition-colors">
                        Back to Dashboard
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1714]">List Your Property</h1>
                    <p className="mt-2 text-[#7A7268] font-sans">Reach thousands of buyers by listing your property. All submissions are reviewed by our team before going live.</p>
                </div>

                <form onSubmit={handleSave} className="bg-white rounded shadow border border-[#D9D0C0] p-4 sm:p-8">
                    {/* SECTION 1: Basic Information */}
                    <SectionHeader id="basic" title="Basic Information" />
                    {openSection === 'basic' && (
                        <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Property Title *</label>
                                <input type="text" className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none" value={formData.name} onChange={e => update('name', e.target.value)} required />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Property Type</label>
                                <select className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none" value={formData.type} onChange={e => {
                                    const newType = e.target.value;
                                    update('type', newType);
                                    update('subtype', subtypes[newType] ? subtypes[newType][0] : '');
                                }}>
                                    {Object.keys(subtypes).map(t => <option key={t}>{t}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Sub-type</label>
                                <select className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none" value={formData.subtype} onChange={e => update('subtype', e.target.value)}>
                                    {(subtypes[formData.type] || []).map(s => <option key={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Listing Type</label>
                                <div className="flex gap-4 mt-2">
                                    {['sale', 'lease', 'pre_leased', 'nri_special'].map(lt => (
                                        <label key={lt} className="flex items-center text-sm font-sans gap-2 cursor-pointer">
                                            <input type="radio" name="listingType" checked={formData.listingType === lt} onChange={() => update('listingType', lt)} className="accent-[#C9A96E]" />
                                            {lt.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 2: Location */}
                    <SectionHeader id="location" title="Location" />
                    {openSection === 'location' && (
                        <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">City</label>
                                <select className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none" value={formData.city} onChange={e => update('city', e.target.value)}>
                                    {['Pune', 'Mumbai', 'Bangalore', 'Other'].map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Locality / Area *</label>
                                <input type="text" className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none" value={formData.locality} onChange={e => update('locality', e.target.value)} placeholder="e.g. Baner, Wakad" required />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Full Address</label>
                                <textarea className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none resize-none" rows={2} value={formData.address} onChange={e => update('address', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Google Maps URL</label>
                                <input type="text" className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none" value={formData.mapsUrl} onChange={e => update('mapsUrl', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Landmark</label>
                                <input type="text" className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none" value={formData.landmark} onChange={e => update('landmark', e.target.value)} />
                            </div>
                        </div>
                    )}

                    {/* SECTION 3: Pricing */}
                    <SectionHeader id="pricing" title="Pricing" />
                    {openSection === 'pricing' && (
                        <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Min Price / Rent</label>
                                <input type="text" className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none" value={formData.priceMin} onChange={e => update('priceMin', e.target.value)} placeholder="e.g. 1.2Cr or 50,000/mo" required />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Max Price (Optional)</label>
                                <input type="text" className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none" value={formData.priceMax} onChange={e => update('priceMax', e.target.value)} placeholder="e.g. 2.8Cr" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Price per Sq.ft. (Optional)</label>
                                <input type="text" className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none" value={formData.priceSqft} onChange={e => update('priceSqft', e.target.value)} />
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" checked={formData.negotiable} onChange={e => update('negotiable', e.target.checked)} className="accent-[#C9A96E]" />
                                <label className="text-sm font-sans text-[#7A7268]">Price Negotiable</label>
                            </div>
                        </div>
                    )}

                    {/* SECTION 4: Property Details */}
                    <SectionHeader id="details" title="Property Details" />
                    {openSection === 'details' && (
                        <div className="py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Super Built-Up Area (sqft)</label>
                                <input type="text" className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none" value={formData.superBuiltUp} onChange={e => update('superBuiltUp', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Carpet Area (sqft)</label>
                                <input type="text" className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none" value={formData.carpetArea} onChange={e => update('carpetArea', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Configuration (BHK / Cabins)</label>
                                <input type="text" className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none" value={formData.bhk} onChange={e => update('bhk', e.target.value)} placeholder="e.g. 3 BHK, 4 Cabins" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Washrooms</label>
                                <input type="number" className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none" value={formData.bathrooms} onChange={e => update('bathrooms', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Floor Number</label>
                                <input type="text" className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none" value={formData.floor} onChange={e => update('floor', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Total Floors</label>
                                <input type="text" className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none" value={formData.totalFloors} onChange={e => update('totalFloors', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Facing</label>
                                <select className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none" value={formData.facing} onChange={e => update('facing', e.target.value)}>
                                    <option value="">Select</option>
                                    {['East', 'West', 'North', 'South', 'North-East', 'North-West', 'South-East', 'South-West'].map(f => <option key={f}>{f}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Parking</label>
                                <select className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none" value={formData.parking} onChange={e => update('parking', e.target.value)}>
                                    {['none', 'covered', 'open'].map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Furnishing</label>
                                <select className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none" value={formData.furnishing} onChange={e => update('furnishing', e.target.value)}>
                                    {['unfurnished', 'semi-furnished', 'fully-furnished'].map(f => <option key={f} value={f}>{f.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Possession Date</label>
                                <input type="text" className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none" value={formData.possession} onChange={e => update('possession', e.target.value)} placeholder="e.g. Dec 2025" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Construction Status</label>
                                <select className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none" value={formData.constructionStatus} onChange={e => update('constructionStatus', e.target.value)}>
                                    <option value="ready">Ready to Move</option>
                                    <option value="under">Under Construction</option>
                                    <option value="new">New Launch</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* SECTION 5: Amenities */}
                    <SectionHeader id="amenities" title="Amenities" />
                    {openSection === 'amenities' && (
                        <div className="py-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            {amenitiesList.map(a => (
                                <label key={a} className="flex items-center gap-2 text-sm font-sans text-[#7A7268] cursor-pointer">
                                    <input type="checkbox" checked={formData.amenities.includes(a)} onChange={() => toggleAmenity(a)} className="accent-[#C9A96E]" />
                                    {a}
                                </label>
                            ))}
                        </div>
                    )}

                    {/* SECTION 6: Media */}
                    <SectionHeader id="media" title="Media & Description" />
                    {openSection === 'media' && (
                        <div className="py-6 grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Feature Image (Upload) *</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    required
                                    className="w-full border border-[#D9D0C0] p-2 rounded focus:border-[#C9A96E] outline-none text-sm"
                                    onChange={e => {
                                        if (e.target.files[0]) {
                                            setImageFile(e.target.files[0]);
                                        }
                                    }}
                                />
                                {imageFile && <p className="text-xs text-green-600 mt-1">Image selected: {imageFile.name}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Short Description (150 chars)</label>
                                <textarea className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none resize-none" rows={2} maxLength={150} value={formData.shortDescription} onChange={e => update('shortDescription', e.target.value)} placeholder="A quick summary of the property..." />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#7A7268] uppercase mb-1">Full Description</label>
                                <textarea className="w-full border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none resize-none" rows={6} value={formData.fullDescription} onChange={e => update('fullDescription', e.target.value)} placeholder="Detailed description of the property features, location advantages, etc." />
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4 pt-8 border-t border-[#D9D0C0] mt-6">
                        <button type="submit" disabled={isSaving || !imageFile} className="px-6 py-2.5 bg-[#C9A96E] text-[#0D0B09] rounded text-sm uppercase tracking-wider cursor-pointer hover:bg-[#F5F0E8] transition-colors disabled:opacity-50 w-full sm:w-auto">
                            {isSaving ? 'Submitting...' : 'Submit for Review'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
