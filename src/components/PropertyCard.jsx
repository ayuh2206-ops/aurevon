'use client';

import Link from 'next/link';
import {
    ArrowRight,
    Building2,
    CheckCircle2,
    GitCompareArrows,
    Heart,
    MapPin,
    Share2,
    SquareStack,
} from 'lucide-react';
import { normalizeProperty } from '@/lib/realEstate';

export default function PropertyCard({
    property,
    isSaved = false,
    isCompared = false,
    onSave,
    onCompare,
    onShare,
    variant = 'grid',
}) {
    const p = normalizeProperty(property);
    const detailHref = `/property/${p.listingId || p.id}`;
    const badges = [p.cardBadge, p.verified ? 'Verified' : '', p.listingType === 'Rent/Lease' ? 'Rental' : '']
        .filter(Boolean)
        .slice(0, 3);

    const handleAction = (event, action) => {
        event.preventDefault();
        event.stopPropagation();
        action?.(p);
    };

    const image = (
        <Link href={detailHref} className={`relative block overflow-hidden ${variant === 'list' ? 'md:w-80 md:min-h-full' : 'aspect-[4/5]'}`}>
            <img
                src={p.thumbnail}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                onError={(event) => {
                    event.currentTarget.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80';
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                {badges.map((badge) => (
                    <span key={badge} className="rounded-full bg-[#0D0B09]/80 px-3 py-1 font-sans text-[10px] uppercase tracking-wider text-[#F5F0E8] backdrop-blur border border-[#2E2A25]">
                        {badge}
                    </span>
                ))}
            </div>
            {p.verified && (
                <span className="absolute right-4 top-4 flex items-center rounded-full border border-[#C9A96E]/60 bg-[#0D0B09]/80 px-3 py-1 font-sans text-[10px] uppercase tracking-wider text-[#C9A96E] backdrop-blur">
                    <CheckCircle2 className="mr-1 h-3 w-3" /> Clear
                </span>
            )}
            <div className="absolute bottom-0 left-0 w-full p-5">
                <p className="font-sans text-[11px] uppercase tracking-wider text-[#C9A96E]">{p.locality}, {p.city}</p>
                <h3 className="mt-1 font-serif text-2xl leading-tight text-[#F5F0E8]">{p.title}</h3>
            </div>
        </Link>
    );

    const body = (
        <div className="flex flex-1 flex-col bg-[#F5F0E8] p-5">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="font-serif text-2xl text-[#1A1714]">{p.priceLabel}</p>
                    <p className="mt-1 flex items-center font-sans text-xs text-[#7A7268]">
                        <MapPin className="mr-1 h-3.5 w-3.5" /> {p.locality} - {p.zone || p.city}
                    </p>
                </div>
                <div className="flex shrink-0 gap-2">
                    <button
                        type="button"
                        onClick={(event) => handleAction(event, onSave)}
                        className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${isSaved ? 'border-[#C9A96E] bg-[#C9A96E] text-[#0D0B09]' : 'border-[#D9D0C0] text-[#7A7268] hover:border-[#C9A96E] hover:text-[#C9A96E]'}`}
                        aria-label={isSaved ? 'Remove saved property' : 'Save property'}
                    >
                        <Heart className="h-4 w-4" fill={isSaved ? 'currentColor' : 'none'} />
                    </button>
                    <button
                        type="button"
                        onClick={(event) => handleAction(event, onCompare)}
                        className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${isCompared ? 'border-[#1A1714] bg-[#1A1714] text-[#C9A96E]' : 'border-[#D9D0C0] text-[#7A7268] hover:border-[#C9A96E] hover:text-[#C9A96E]'}`}
                        aria-label={isCompared ? 'Remove from comparison' : 'Compare property'}
                    >
                        <GitCompareArrows className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={(event) => handleAction(event, onShare)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D9D0C0] text-[#7A7268] transition-colors hover:border-[#C9A96E] hover:text-[#C9A96E]"
                        aria-label="Share property"
                    >
                        <Share2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <p className="mt-4 line-clamp-2 flex-1 font-sans text-sm leading-relaxed text-[#7A7268]">{p.shortDescription || p.description}</p>

            <div className="my-5 grid grid-cols-3 gap-2 border-y border-[#D9D0C0] py-4">
                <div>
                    <Building2 className="mb-1 h-4 w-4 text-[#C9A96E]" />
                    <p className="truncate font-sans text-xs text-[#1A1714]">{p.type}</p>
                </div>
                <div className="border-x border-[#D9D0C0] px-2">
                    <SquareStack className="mb-1 h-4 w-4 text-[#C9A96E]" />
                    <p className="truncate font-sans text-xs text-[#1A1714]">{p.area ? `${p.area} ${p.areaUnit}` : 'Area on request'}</p>
                </div>
                <div>
                    <CheckCircle2 className="mb-1 h-4 w-4 text-[#C9A96E]" />
                    <p className="truncate font-sans text-xs text-[#1A1714]">{p.availability}</p>
                </div>
            </div>

            <Link
                href={detailHref}
                className="mt-auto flex items-center justify-between rounded border border-[#C9A96E] px-4 py-3 font-sans text-xs uppercase tracking-widest text-[#8B4A2F] transition-colors hover:bg-[#C9A96E] hover:text-[#0D0B09]"
            >
                View Details <ArrowRight className="h-4 w-4" />
            </Link>
        </div>
    );

    if (variant === 'list') {
        return (
            <article className="group flex flex-col overflow-hidden rounded border border-[#D9D0C0] bg-white transition-colors hover:border-[#C9A96E] md:flex-row">
                {image}
                {body}
            </article>
        );
    }

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded border border-[#D9D0C0] bg-white transition-colors hover:border-[#C9A96E]">
            {image}
            {body}
        </article>
    );
}
