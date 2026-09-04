'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Check,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    GitCompareArrows,
    Heart,
    MapPin,
    Phone,
    Play,
    Send,
    Share2,
    ShieldCheck,
    SquareStack,
    X,
} from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { BUSINESS, isAdminEmail } from '@/lib/config';
import {
    addLead,
    getContentSettings,
    getProperties,
    getProperty,
    incrementPropertyInquiries,
    logWhatsAppClick,
} from '@/lib/firebaseUtils';
import {
    DEFAULT_CONTENT_SETTINGS,
    createWhatsAppUrl,
    getPrimaryWhatsapp,
    getSimilarProperties,
    normalizeProperty,
    propertyWhatsAppMessage,
    trackConversion,
} from '@/lib/realEstate';
import { useAuth } from '@/context/AuthContext';

function toEmbedUrl(url) {
    if (!url) return '';
    try {
        const parsed = new URL(url);
        if (parsed.hostname.includes('youtu.be')) {
            return `https://www.youtube.com/embed/${parsed.pathname.replace('/', '')}`;
        }
        if (parsed.hostname.includes('youtube.com')) {
            if (parsed.pathname.includes('/shorts/')) return `https://www.youtube.com/embed/${parsed.pathname.split('/shorts/')[1]}`;
            const videoId = parsed.searchParams.get('v');
            if (videoId) return `https://www.youtube.com/embed/${videoId}`;
            if (parsed.pathname.includes('/embed/')) return url;
        }
        if (parsed.hostname.includes('drive.google.com') && parsed.pathname.includes('/file/d/')) {
            const fileId = parsed.pathname.split('/file/d/')[1]?.split('/')[0];
            if (fileId) return `https://drive.google.com/file/d/${fileId}/preview`;
        }
        if (['www.youtube.com', 'youtube.com', 'drive.google.com', 'player.vimeo.com'].some((host) => parsed.hostname.includes(host))) {
            return url;
        }
    } catch {
        return '';
    }
    return '';
}

function DetailRow({ label, value }) {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-[#2E2A25] px-5 py-4 last:border-b-0">
            <span className="font-sans text-sm text-[#7A7268]">{label}</span>
            <span className="text-right font-sans text-sm font-medium text-[#F5F0E8]">{value || 'On Request'}</span>
        </div>
    );
}

function leadSourceForMode(mode) {
    if (mode === 'Home Loan') return 'Loan Enquiry - Property Page';
    if (mode === 'Site Visit') return 'Site Visit - Property Page';
    return 'Enquiry - Property Page';
}

function conversionEventForMode(mode) {
    if (mode === 'Home Loan') return 'loan_lead_submitted';
    if (mode === 'Site Visit') return 'site_visit_lead_submitted';
    return 'property_lead_submitted';
}

export default function PropertyDetailClient({ id }) {
    const router = useRouter();
    const { user, userProfile, openAuthModal, toggleSaved } = useAuth();
    const [property, setProperty] = useState(null);
    const [allProperties, setAllProperties] = useState([]);
    const [settings, setSettings] = useState(DEFAULT_CONTENT_SETTINGS);
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [activeImage, setActiveImage] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [videoOpen, setVideoOpen] = useState(false);
    const [enquiryMode, setEnquiryMode] = useState('Property Enquiry');
    const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
    const [status, setStatus] = useState({ sending: false, sent: false, error: '' });

    useEffect(() => {
        let cancelled = false;
        async function loadProperty() {
            setIsLoading(true);
            try {
                const [propertyData, propertyList, contentSettings] = await Promise.all([
                    getProperty(id),
                    getProperties(),
                    getContentSettings(),
                ]);
                if (cancelled) return;
                if (!propertyData || propertyData.status !== 'Published') {
                    setNotFound(true);
                    return;
                }
                setProperty(normalizeProperty(propertyData));
                setAllProperties(propertyList.map(normalizeProperty));
                setSettings(contentSettings);
            } catch (error) {
                console.error('Property detail load failed:', error);
                if (!cancelled) setNotFound(true);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }
        loadProperty();
        return () => {
            cancelled = true;
        };
    }, [id]);

    useEffect(() => {
        if (!userProfile && !user) return;
        setForm((prev) => ({
            ...prev,
            name: prev.name || userProfile?.name || user?.displayName || '',
            phone: prev.phone || userProfile?.phone || '',
            email: prev.email || userProfile?.email || user?.email || '',
        }));
    }, [user, userProfile]);

    useEffect(() => {
        if (lightboxIndex === null || !property) return undefined;
        const onKeyDown = (event) => {
            if (event.key === 'Escape') setLightboxIndex(null);
            if (event.key === 'ArrowLeft') setLightboxIndex((index) => (index - 1 + property.images.length) % property.images.length);
            if (event.key === 'ArrowRight') setLightboxIndex((index) => (index + 1) % property.images.length);
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [lightboxIndex, property]);

    const similar = useMemo(() => property ? getSimilarProperties(property, allProperties, 3) : [], [allProperties, property]);
    const embedUrl = useMemo(() => toEmbedUrl(property?.videoUrl), [property?.videoUrl]);
    const whatsapp = getPrimaryWhatsapp(settings);

    const handleShare = async (item = property) => {
        const p = normalizeProperty(item);
        const url = `${window.location.origin}/property/${p.listingId || p.id}`;
        trackConversion('property_shared', { propertyId: p.id, source: 'Property Detail' });
        if (navigator.share) {
            await navigator.share({ title: p.title, text: p.shortDescription, url }).catch(() => {});
        } else {
            await navigator.clipboard.writeText(url);
            alert('Property link copied.');
        }
    };

    const handleSave = (item = property) => {
        const p = normalizeProperty(item);
        openAuthModal('save', async () => {
            try {
                await toggleSaved(p.id);
            } catch (error) {
                alert(error.message || 'Could not update saved properties.');
            }
        });
    };

    const handleCompare = (item = property) => {
        const p = normalizeProperty(item);
        openAuthModal('compare', () => {
            router.push(`/listings?compare=${encodeURIComponent(p.id)}`);
        });
    };

    const handleWhatsApp = () => {
        if (!property) return;
        trackConversion('whatsapp_clicked', { propertyId: property.id, source: 'Property Detail' });
        logWhatsAppClick({
            propertyId: property.id,
            propertyTitle: property.title,
            source: 'Property Detail',
            path: `/property/${property.listingId || property.id}`,
            userId: user?.uid || '',
        });
        window.open(createWhatsAppUrl({ phone: whatsapp, message: propertyWhatsAppMessage(property) }), '_blank');
    };

    const submitLead = async () => {
        if (!property) return;
        if (isAdminEmail(user?.email)) {
            setStatus({ sending: false, sent: false, error: 'Admin preview users cannot create public leads.' });
            return;
        }

        const name = form.name.trim() || userProfile?.name || user?.displayName || '';
        const phone = form.phone.trim() || userProfile?.phone || '';
        const email = form.email.trim() || userProfile?.email || user?.email || '';
        if (!name || phone.replace(/\D/g, '').length < 8) {
            setStatus({ sending: false, sent: false, error: 'Please add your name and phone number before sending.' });
            return;
        }

        const rateKey = `aurevon_property_enquiry_${property.id}_${enquiryMode}`;
        const lastSubmitted = Number(localStorage.getItem(rateKey) || 0);
        if (Date.now() - lastSubmitted < 60000) {
            setStatus({ sending: false, sent: false, error: 'This enquiry was recently sent. Please wait a minute before sending again.' });
            return;
        }

        setStatus({ sending: true, sent: false, error: '' });
        try {
            await addLead({
                name,
                phone,
                email,
                message: form.message.trim(),
                propertyId: property.id,
                propertyTitle: property.title,
                propertyLocality: property.locality,
                propertyPrice: property.priceLabel,
                source: leadSourceForMode(enquiryMode),
                requestType: enquiryMode,
                status: 'New',
                userId: user?.uid || '',
            });
            await incrementPropertyInquiries(property.id);
            localStorage.setItem(rateKey, String(Date.now()));
            trackConversion(conversionEventForMode(enquiryMode), { propertyId: property.id });
            setStatus({ sending: false, sent: true, error: '' });
        } catch (error) {
            console.error('Property enquiry failed:', error);
            setStatus({ sending: false, sent: false, error: 'Could not send the enquiry. Please try WhatsApp or call directly.' });
        }
    };

    const handleEnquirySubmit = (event) => {
        event.preventDefault();
        openAuthModal(enquiryMode === 'Home Loan' ? 'loan' : 'enquiry', submitLead);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0D0B09] pt-32 pb-20 flex items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#C9A96E] border-t-transparent" />
            </div>
        );
    }

    if (notFound || !property) {
        return (
            <div className="min-h-screen bg-[#0D0B09]">
                <Navbar />
                <div className="flex min-h-screen flex-col items-center justify-center px-4 pt-32 text-center">
                    <ShieldCheck className="mb-6 h-16 w-16 text-[#2E2A25]" />
                    <h1 className="mb-4 font-serif text-3xl text-[#F5F0E8]">Property Not Found</h1>
                    <p className="mb-8 max-w-md font-sans text-sm text-[#7A7268]">
                        The property is unavailable, unpublished, or has been removed from public listings.
                    </p>
                    <Link href="/listings" className="rounded bg-[#C9A96E] px-6 py-3 font-sans text-sm font-medium uppercase tracking-wider text-[#0D0B09] transition-colors hover:bg-[#F5F0E8]">
                        Back to Listings
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    const details = [
        ['Property ID', property.listingId || property.id],
        ['Locality', property.locality],
        ['City', property.city],
        ['Price', `${property.priceLabel}${property.priceNegotiable ? ' - negotiable' : ''}`],
        ['Property Type', property.type],
        ['BHK', property.bhk || 'On Request'],
        ['Area', property.area ? `${property.area} ${property.areaUnit}` : 'On Request'],
        ['Carpet Area', property.carpetArea ? `${property.carpetArea} ${property.areaUnit}` : 'On Request'],
        ['Built-up Area', property.builtUpArea ? `${property.builtUpArea} ${property.areaUnit}` : 'On Request'],
        ['Bedrooms', property.bedrooms || 'On Request'],
        ['Bathrooms', property.bathrooms || 'On Request'],
        ['Parking', property.parking],
        ['Floor', property.floor],
        ['Facing', property.facing],
        ['Furnishing', property.furnishing],
        ['Age', property.age],
        ['Possession', property.possession],
        ['Availability', property.availability],
        ['License/RERA', property.reraRegistered ? (property.reraId || 'Registered') : 'On Request'],
    ];

    return (
        <div className="min-h-screen bg-[#0D0B09] font-sans text-[#F5F0E8]">
            <Navbar />
            <main className="pt-24 pb-20">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                    <Link href="/listings" className="inline-flex items-center text-sm font-medium text-[#7A7268] transition-colors hover:text-[#C9A96E]">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Listings
                    </Link>
                </div>

                <div className="mx-auto mb-8 max-w-7xl px-4 sm:mb-12 sm:px-6 lg:px-8">
                    <div className="relative h-[42vh] overflow-hidden rounded-2xl border border-[#2E2A25] md:h-[60vh] md:rounded-3xl">
                        <img
                            src={property.images[activeImage] || property.thumbnail}
                            alt={property.title}
                            className="h-full w-full object-cover"
                            onError={(event) => {
                                event.currentTarget.src = property.thumbnail;
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                        <div className="absolute left-6 top-6 z-10 flex flex-wrap gap-2">
                            {[property.cardBadge, property.verified ? 'Verified' : '', property.legalClear ? 'Legal Clear' : ''].filter(Boolean).map((badge) => (
                                <span key={badge} className="rounded-full border border-[#2E2A25] bg-[#0D0B09]/80 px-3 py-1.5 text-xs font-medium text-[#F5F0E8] backdrop-blur">
                                    {badge}
                                </span>
                            ))}
                        </div>

                        <div className="absolute right-6 top-6 z-10 flex gap-3">
                            <button onClick={() => handleShare(property)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2E2A25] bg-[#0D0B09]/80 text-[#F5F0E8] backdrop-blur transition-colors hover:text-[#C9A96E]" aria-label="Share property">
                                <Share2 className="h-4 w-4" />
                            </button>
                            <button onClick={() => handleSave(property)} className={`flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur transition-colors ${userProfile?.savedProperties?.includes(property.id) ? 'border-[#C9A96E] bg-[#C9A96E] text-[#0D0B09]' : 'border-[#2E2A25] bg-[#0D0B09]/80 text-[#F5F0E8] hover:text-[#C9A96E]'}`} aria-label="Save property">
                                <Heart className="h-4 w-4" fill={userProfile?.savedProperties?.includes(property.id) ? 'currentColor' : 'none'} />
                            </button>
                            <button onClick={() => handleCompare(property)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2E2A25] bg-[#0D0B09]/80 text-[#F5F0E8] backdrop-blur transition-colors hover:text-[#C9A96E]" aria-label="Compare property">
                                <GitCompareArrows className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10">
                            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                                <div>
                                    <div className="mb-3 flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-[#C9A96E]">
                                        <span>{property.listingType}</span>
                                        <span>{property.category}</span>
                                        <span>{property.listingId || property.id}</span>
                                    </div>
                                    <h1 className="mb-2 font-serif text-3xl text-white sm:text-4xl md:text-5xl">{property.title}</h1>
                                    <div className="flex items-center text-sm text-[#D9D0C0] sm:text-base">
                                        <MapPin className="mr-1.5 h-4 w-4" />
                                        {property.locality}, {property.city}
                                    </div>
                                </div>
                                <div className="text-left md:text-right">
                                    <p className="mb-1 text-sm uppercase tracking-wider text-[#A39B8F]">Guide Price</p>
                                    <div className="font-serif text-2xl text-[#C9A96E] sm:text-3xl md:text-4xl">{property.priceLabel}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {property.images.length > 1 && (
                        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {property.images.map((image, index) => (
                                <button
                                    key={image}
                                    onClick={() => setActiveImage(index)}
                                    onDoubleClick={() => setLightboxIndex(index)}
                                    className={`h-20 w-28 shrink-0 overflow-hidden rounded border ${activeImage === index ? 'border-[#C9A96E]' : 'border-[#2E2A25]'}`}
                                >
                                    <img src={image} alt="" className="h-full w-full object-cover" />
                                </button>
                            ))}
                            <button onClick={() => setLightboxIndex(activeImage)} className="h-20 shrink-0 rounded border border-[#C9A96E] px-5 font-sans text-xs uppercase tracking-widest text-[#C9A96E]">
                                Open Gallery
                            </button>
                        </div>
                    )}
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
                        <div className="order-2 w-full lg:order-1 lg:w-[68%]">
                            <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
                                {[
                                    ['Type', property.type],
                                    ['Area', property.area ? `${property.area} ${property.areaUnit}` : 'On Request'],
                                    ['Status', property.availability],
                                    ['Verified', property.verified ? 'Yes' : 'Review'],
                                ].map(([label, value]) => (
                                    <div key={label} className="rounded-xl border border-[#2E2A25] bg-[#1A1714] p-4">
                                        <SquareStack className="mb-3 h-6 w-6 text-[#C9A96E]" />
                                        <p className="mb-1 text-xs uppercase tracking-wider text-[#7A7268]">{label}</p>
                                        <p className="font-medium text-[#F5F0E8]">{value}</p>
                                    </div>
                                ))}
                            </div>

                            <section className="mb-12">
                                <h2 className="mb-6 flex items-center gap-3 font-serif text-2xl text-[#C9A96E]">
                                    <span className="h-[1px] w-8 bg-[#C9A96E]" /> Overview
                                </h2>
                                <p className="whitespace-pre-line text-lg leading-relaxed text-[#A39B8F]">
                                    {property.description || property.shortDescription}
                                </p>
                            </section>

                            {property.amenities.length > 0 && (
                                <section className="mb-12">
                                    <h2 className="mb-6 flex items-center gap-3 font-serif text-2xl text-[#C9A96E]">
                                        <span className="h-[1px] w-8 bg-[#C9A96E]" /> Amenities
                                    </h2>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        {property.amenities.map((amenity) => (
                                            <div key={amenity} className="flex items-center rounded-lg border border-[#2E2A25] bg-[#1A1714] px-4 py-3 text-[#A39B8F]">
                                                <Check className="mr-3 h-5 w-5 shrink-0 text-[#C9A96E]" />
                                                {amenity}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {property.neighborhood && (
                                <section className="mb-12">
                                    <h2 className="mb-6 flex items-center gap-3 font-serif text-2xl text-[#C9A96E]">
                                        <span className="h-[1px] w-8 bg-[#C9A96E]" /> Neighborhood
                                    </h2>
                                    <p className="text-base leading-relaxed text-[#A39B8F]">{property.neighborhood}</p>
                                </section>
                            )}

                            {embedUrl && (
                                <section className="mb-12">
                                    <h2 className="mb-6 flex items-center gap-3 font-serif text-2xl text-[#C9A96E]">
                                        <span className="h-[1px] w-8 bg-[#C9A96E]" /> Video Tour
                                    </h2>
                                    <div className="aspect-video overflow-hidden rounded-xl border border-[#2E2A25] bg-[#1A1714]">
                                        {videoOpen ? (
                                            <iframe src={embedUrl} title={`${property.title} video tour`} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                                        ) : (
                                            <button onClick={() => setVideoOpen(true)} className="flex h-full w-full flex-col items-center justify-center gap-4 text-[#C9A96E]">
                                                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A96E]">
                                                    <Play className="h-6 w-6" fill="currentColor" />
                                                </span>
                                                <span className="font-sans text-xs uppercase tracking-widest">Play Video Tour</span>
                                            </button>
                                        )}
                                    </div>
                                </section>
                            )}

                            <section className="mb-12">
                                <h2 className="mb-6 flex items-center gap-3 font-serif text-2xl text-[#C9A96E]">
                                    <span className="h-[1px] w-8 bg-[#C9A96E]" /> Property Details
                                </h2>
                                <div className="overflow-hidden rounded-xl border border-[#2E2A25] bg-[#1A1714]">
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        {details.map(([label, value]) => <DetailRow key={label} label={label} value={value} />)}
                                    </div>
                                </div>
                            </section>

                            {similar.length > 0 && (
                                <section>
                                    <h2 className="mb-6 flex items-center gap-3 font-serif text-2xl text-[#C9A96E]">
                                        <span className="h-[1px] w-8 bg-[#C9A96E]" /> Similar Properties
                                    </h2>
                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                                        {similar.map((item) => (
                                            <PropertyCard
                                                key={item.id}
                                                property={item}
                                                isSaved={userProfile?.savedProperties?.includes(item.id)}
                                                onSave={handleSave}
                                                onCompare={handleCompare}
                                                onShare={handleShare}
                                            />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        <aside className="order-1 w-full lg:order-2 lg:w-[32%]">
                            <div className="sticky top-28 rounded-2xl border border-[#C9A96E]/30 bg-[#1A1714] p-6 shadow-2xl sm:p-8">
                                <h3 className="mb-1 font-serif text-xl text-[#F5F0E8]">Interested in this property?</h3>
                                <p className="mb-6 text-sm text-[#8B847A]">Connect with the advisory team directly.</p>
                                <div className="mb-6 font-serif text-3xl text-[#C9A96E]">{property.priceLabel}</div>

                                <div className="space-y-3">
                                    <button
                                        onClick={handleWhatsApp}
                                        className="flex w-full items-center justify-center rounded-xl bg-[#25D366] py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[#1EBE5A]"
                                    >
                                        <Send className="mr-3 h-4 w-4" /> WhatsApp Enquiry
                                    </button>
                                    <a href={`tel:${String(settings.contactPhone).replace(/\s/g, '')}`} className="flex w-full items-center justify-center rounded-xl border border-[#C9A96E] py-4 text-sm font-bold uppercase tracking-wider text-[#C9A96E] transition-colors hover:bg-[#C9A96E] hover:text-[#0D0B09]">
                                        <Phone className="mr-3 h-4 w-4" /> Request Callback
                                    </a>
                                </div>

                                <div className="mt-6 border-t border-[#2E2A25] pt-6">
                                    {status.sent ? (
                                        <div className="py-4 text-center">
                                            <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-[#C9A96E]" />
                                            <p className="font-serif text-sm text-[#F5F0E8]">Enquiry Received</p>
                                            <p className="mt-1 text-xs text-[#8B847A]">We will call you back shortly.</p>
                                            <button onClick={() => setStatus({ sending: false, sent: false, error: '' })} className="mt-4 text-xs uppercase tracking-widest text-[#C9A96E]">
                                                Send another enquiry
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleEnquirySubmit} className="space-y-3">
                                            <div className="mb-3 grid grid-cols-3 rounded border border-[#2E2A25] bg-[#0D0B09] p-1">
                                                {[
                                                    ['Property', 'Property Enquiry'],
                                                    ['Loan', 'Home Loan'],
                                                    ['Visit', 'Site Visit'],
                                                ].map(([label, mode]) => (
                                                    <button
                                                        key={mode}
                                                        type="button"
                                                        onClick={() => setEnquiryMode(mode)}
                                                        className={`rounded px-2 py-2 text-[10px] uppercase tracking-wider sm:text-xs ${enquiryMode === mode ? 'bg-[#C9A96E] text-[#0D0B09]' : 'text-[#7A7268] hover:text-[#F5F0E8]'}`}
                                                    >
                                                        {label}
                                                    </button>
                                                ))}
                                            </div>
                                            {status.error && <div className="rounded border border-red-700 bg-red-900/30 p-3 text-sm text-red-200">{status.error}</div>}
                                            <input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} required type="text" placeholder="Your Name" className="w-full rounded-lg border border-[#2E2A25] bg-[#0D0B09] px-3 py-2.5 text-sm text-[#F5F0E8] outline-none placeholder:text-[#7A7268] focus:border-[#C9A96E]" />
                                            <input value={form.phone} onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))} required type="tel" placeholder="Phone / WhatsApp" className="w-full rounded-lg border border-[#2E2A25] bg-[#0D0B09] px-3 py-2.5 text-sm text-[#F5F0E8] outline-none placeholder:text-[#7A7268] focus:border-[#C9A96E]" />
                                            <input value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} type="email" placeholder="Email (optional)" className="w-full rounded-lg border border-[#2E2A25] bg-[#0D0B09] px-3 py-2.5 text-sm text-[#F5F0E8] outline-none placeholder:text-[#7A7268] focus:border-[#C9A96E]" />
                                            <textarea value={form.message} onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))} rows={2} placeholder="Message (optional)" className="w-full resize-none rounded-lg border border-[#2E2A25] bg-[#0D0B09] px-3 py-2.5 text-sm text-[#F5F0E8] outline-none placeholder:text-[#7A7268] focus:border-[#C9A96E]" />
                                            <button type="submit" disabled={status.sending} className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#C9A96E]/40 bg-[#C9A96E]/10 py-2.5 text-sm uppercase tracking-wider text-[#C9A96E] transition-colors hover:bg-[#C9A96E] hover:text-[#0D0B09] disabled:opacity-50">
                                                <Send className="h-4 w-4" />
                                                {status.sending ? 'Sending...' : 'Send Enquiry'}
                                            </button>
                                            <p className="text-[11px] leading-relaxed text-[#7A7268]">
                                                Sign-in and phone completion are required before high-intent enquiries are sent.
                                            </p>
                                        </form>
                                    )}
                                </div>

                                <div className="mt-8 border-t border-[#2E2A25] pt-6">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#C9A96E]">
                                            <span className="font-serif text-xl text-[#C9A96E]">AR</span>
                                        </div>
                                        <div>
                                            <p className="font-serif leading-tight text-[#F5F0E8]">Aurevon Advisors</p>
                                            <p className="mt-0.5 text-xs text-[#8B847A]">{settings.contactRera ? `License: ${settings.contactRera}` : 'RERA Registered'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            {lightboxIndex !== null && (
                <div className="fixed inset-0 z-[1000] flex flex-col bg-[#0D0B09] p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <p className="font-sans text-xs uppercase tracking-widest text-[#C9A96E]">{lightboxIndex + 1} / {property.images.length}</p>
                        <button onClick={() => setLightboxIndex(null)} className="rounded-full border border-[#2E2A25] p-2 text-[#F5F0E8] hover:text-[#C9A96E]" aria-label="Close gallery">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="relative flex flex-1 items-center justify-center">
                        <button onClick={() => setLightboxIndex((index) => (index - 1 + property.images.length) % property.images.length)} className="absolute left-2 z-10 rounded-full border border-[#2E2A25] bg-[#0D0B09]/70 p-3 text-[#F5F0E8] hover:text-[#C9A96E]" aria-label="Previous image">
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <img src={property.images[lightboxIndex]} alt="" className="max-h-full max-w-full object-contain" />
                        <button onClick={() => setLightboxIndex((index) => (index + 1) % property.images.length)} className="absolute right-2 z-10 rounded-full border border-[#2E2A25] bg-[#0D0B09]/70 p-3 text-[#F5F0E8] hover:text-[#C9A96E]" aria-label="Next image">
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-4 flex justify-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {property.images.map((image, index) => (
                            <button key={image} onClick={() => setLightboxIndex(index)} className={`h-16 w-24 shrink-0 overflow-hidden rounded border ${lightboxIndex === index ? 'border-[#C9A96E]' : 'border-[#2E2A25]'}`}>
                                <img src={image} alt="" className="h-full w-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <Footer />
            <WhatsAppCTA currentProperty={property} source="Property Floating WhatsApp" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'RealEstateListing',
                        name: property.title,
                        description: property.description || property.shortDescription,
                        image: property.images,
                        url: `${BUSINESS.websiteBaseUrl}/property/${property.listingId || property.id}`,
                        offers: {
                            '@type': 'Offer',
                            priceCurrency: 'INR',
                            price: property.price,
                        },
                        address: {
                            '@type': 'PostalAddress',
                            addressLocality: property.locality,
                            addressRegion: property.city,
                            addressCountry: 'IN',
                        },
                    }),
                }}
            />
        </div>
    );
}
