'use client';

import { useEffect, useMemo, useState } from 'react';
import {
    ArrowDown,
    ArrowUp,
    Loader2,
    Plus,
    RotateCcw,
    Save,
    Search,
    Trash2,
} from 'lucide-react';
import { getSiteOptions, updateSiteOptions } from '@/lib/firebaseUtils';
import { DEFAULT_SITE_OPTIONS } from '@/lib/realEstate';

const optionGroups = [
    { key: 'localities', label: 'Localities', description: 'Primary locality dropdown and location filters.' },
    { key: 'featuredLocalities', label: 'Featured Localities', description: 'Homepage location chips and priority areas.' },
    { key: 'zoneOptions', label: 'Zones', description: 'Location grouping used on public location sections.' },
    { key: 'listingTypes', label: 'Listing Types', description: 'Buy, rent, lease, and PG style listing modes.' },
    { key: 'residentialTypes', label: 'Residential Types', description: 'Residential property sub-types.' },
    { key: 'commercialTypes', label: 'Commercial Types', description: 'Commercial property sub-types.' },
    { key: 'bhkOptions', label: 'BHK Options', description: 'Numeric bedroom filters.' },
    { key: 'furnishingOptions', label: 'Furnishing', description: 'Furnishing filters and listing form values.' },
    { key: 'areaUnits', label: 'Area Units', description: 'Units accepted in admin area conversion.' },
    { key: 'facingOptions', label: 'Facing', description: 'Direction values shown on detail pages.' },
    { key: 'ageOptions', label: 'Age', description: 'Property age filters and admin inputs.' },
    { key: 'possessionOptions', label: 'Possession', description: 'Availability timeline options.' },
    { key: 'cardBadgeOptions', label: 'Card Badges', description: 'Badges shown on listing cards.' },
    { key: 'amenities', label: 'Amenities', description: 'Amenity checkboxes and detail page features.' },
    { key: 'buyBudgets', label: 'Buy Budgets', description: 'Budget ranges for buy searches.' },
    { key: 'rentBudgets', label: 'Rent Budgets', description: 'Budget ranges for rent searches.' },
    { key: 'areas', label: 'Area Ranges', description: 'Legacy area search ranges.' },
    { key: 'yields', label: 'Yield Ranges', description: 'Legacy investment yield ranges.' },
    { key: 'constructionStatuses', label: 'Construction Status', description: 'Legacy construction status filters.' },
];

function normalizeOptions(data = {}) {
    return {
        ...DEFAULT_SITE_OPTIONS,
        ...data,
        localityZones: data.localityZones || DEFAULT_SITE_OPTIONS.localityZones,
    };
}

function toText(value) {
    return value === null || value === undefined ? '' : String(value);
}

export default function SearchOptionsPage() {
    const [options, setOptions] = useState(normalizeOptions(DEFAULT_SITE_OPTIONS));
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [activeKey, setActiveKey] = useState('localities');
    const [newValue, setNewValue] = useState('');
    const [newZone, setNewZone] = useState('');
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');

    const activeGroup = optionGroups.find((group) => group.key === activeKey) || optionGroups[0];

    const loadOptions = async () => {
        setIsLoading(true);
        setError('');
        try {
            const data = await getSiteOptions();
            setOptions(normalizeOptions(data));
        } catch (loadError) {
            console.error(loadError);
            setError('Failed to load options.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadOptions();
    }, []);

    const activeItems = useMemo(() => {
        const items = Array.isArray(options[activeKey]) ? options[activeKey] : [];
        const term = search.trim().toLowerCase();
        if (!term) return items.map((item, index) => ({ item, index }));
        return items
            .map((item, index) => ({ item, index }))
            .filter(({ item }) => toText(item).toLowerCase().includes(term) || toText(options.localityZones?.[item]).toLowerCase().includes(term));
    }, [activeKey, options, search]);

    const updateArray = (key, nextItems, nextZones = options.localityZones) => {
        setOptions((prev) => ({
            ...prev,
            [key]: nextItems,
            ...(key === 'localities' ? { locations: nextItems, localityZones: nextZones } : {}),
        }));
        setSaved(false);
    };

    const coerceValue = (key, value) => {
        const text = value.trim();
        if (!text) return '';
        if (key === 'bhkOptions') {
            const number = Number(text);
            if (!Number.isFinite(number) || number <= 0) {
                setError('BHK options must be positive numbers.');
                return '';
            }
            return number;
        }
        return text;
    };

    const addItem = () => {
        setError('');
        const value = coerceValue(activeKey, newValue);
        if (!value) return;

        const current = Array.isArray(options[activeKey]) ? options[activeKey] : [];
        const duplicate = current.some((item) => toText(item).toLowerCase() === toText(value).toLowerCase());
        if (duplicate) {
            setError('That option already exists.');
            return;
        }

        if (activeKey === 'localities') {
            updateArray('localities', [...current, value], {
                ...(options.localityZones || {}),
                [value]: newZone.trim(),
            });
        } else {
            updateArray(activeKey, [...current, value]);
        }
        setNewValue('');
        setNewZone('');
    };

    const removeItem = (index) => {
        const current = Array.isArray(options[activeKey]) ? [...options[activeKey]] : [];
        const [removed] = current.splice(index, 1);
        if (activeKey === 'localities') {
            const nextZones = { ...(options.localityZones || {}) };
            delete nextZones[removed];
            updateArray(activeKey, current, nextZones);
        } else {
            updateArray(activeKey, current);
        }
    };

    const updateItem = (index, value) => {
        setError('');
        const current = Array.isArray(options[activeKey]) ? [...options[activeKey]] : [];
        const parsed = activeKey === 'bhkOptions' ? coerceValue(activeKey, value) : value;
        if (activeKey === 'bhkOptions' && !parsed) return;
        const duplicate = current.some((item, itemIndex) => itemIndex !== index && toText(item).toLowerCase() === toText(parsed).toLowerCase());
        if (duplicate) {
            setError('Duplicate options are not allowed.');
            return;
        }

        const previous = current[index];
        current[index] = parsed;
        if (activeKey === 'localities') {
            const nextZones = { ...(options.localityZones || {}) };
            nextZones[parsed] = nextZones[previous] || '';
            if (previous !== parsed) delete nextZones[previous];
            updateArray(activeKey, current, nextZones);
        } else {
            updateArray(activeKey, current);
        }
    };

    const updateLocalityZone = (locality, zone) => {
        setOptions((prev) => ({
            ...prev,
            localityZones: {
                ...(prev.localityZones || {}),
                [locality]: zone,
            },
        }));
        setSaved(false);
    };

    const moveItem = (index, direction) => {
        const current = Array.isArray(options[activeKey]) ? [...options[activeKey]] : [];
        const target = index + direction;
        if (target < 0 || target >= current.length) return;
        const [moved] = current.splice(index, 1);
        current.splice(target, 0, moved);
        updateArray(activeKey, current);
    };

    const resetActiveGroup = () => {
        const defaults = DEFAULT_SITE_OPTIONS[activeKey] || [];
        updateArray(activeKey, [...defaults], activeKey === 'localities' ? { ...DEFAULT_SITE_OPTIONS.localityZones } : options.localityZones);
    };

    const handleSave = async () => {
        setIsSaving(true);
        setError('');
        try {
            await updateSiteOptions(options);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (saveError) {
            console.error(saveError);
            setError('Failed to save options. Check Firestore permissions.');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#C9A96E]" />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <h2 className="font-serif text-2xl text-[#1A1714] sm:text-3xl">Search Options</h2>
                    <p className="mt-1 font-sans text-sm text-[#7A7268]">Manage every dropdown, filter option, badge, amenity, and locality zone.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button onClick={loadOptions} disabled={isLoading} className="rounded border border-[#D9D0C0] px-4 py-2 font-sans text-xs uppercase tracking-wider text-[#7A7268] hover:border-[#C9A96E] disabled:opacity-50">
                        Reload
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`flex items-center rounded px-6 py-2.5 font-sans text-xs uppercase tracking-wider transition-colors disabled:opacity-50 ${saved ? 'bg-green-600 text-white' : 'bg-[#C9A96E] text-[#0D0B09] hover:bg-[#F5F0E8]'}`}
                    >
                        {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        {saved ? 'Saved' : 'Save Changes'}
                    </button>
                </div>
            </div>

            {error && <div className="mb-5 rounded border border-red-200 bg-red-50 p-3 font-sans text-sm text-red-700">{error}</div>}

            <div className="flex flex-col gap-6 lg:flex-row">
                <div className="w-full shrink-0 lg:w-72">
                    <div className="overflow-hidden rounded border border-[#D9D0C0] bg-white shadow">
                        {optionGroups.map((group) => (
                            <button
                                key={group.key}
                                onClick={() => { setActiveKey(group.key); setSearch(''); setError(''); }}
                                className={`flex w-full items-center justify-between gap-3 border-b border-[#D9D0C0] px-4 py-3 text-left transition-colors last:border-b-0 ${activeKey === group.key ? 'border-l-2 border-l-[#C9A96E] bg-[#C9A96E]/10' : 'hover:bg-[#F5F0E8]/50'}`}
                            >
                                <span>
                                    <span className="block font-sans text-sm font-medium text-[#1A1714]">{group.label}</span>
                                    <span className="block truncate font-sans text-[11px] text-[#7A7268]">{group.description}</span>
                                </span>
                                <span className="shrink-0 rounded-full bg-[#F5F0E8] px-2 py-0.5 font-sans text-xs text-[#7A7268]">
                                    {Array.isArray(options[group.key]) ? options[group.key].length : 0}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="min-w-0 flex-1 rounded border border-[#D9D0C0] bg-white p-6 shadow sm:p-8">
                    <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#D9D0C0] pb-5 md:flex-row md:items-start">
                        <div>
                            <h3 className="font-serif text-xl text-[#1A1714]">{activeGroup.label}</h3>
                            <p className="mt-1 font-sans text-sm text-[#7A7268]">{activeGroup.description}</p>
                        </div>
                        <button onClick={resetActiveGroup} className="flex items-center rounded border border-[#D9D0C0] px-3 py-2 font-sans text-xs uppercase tracking-wider text-[#7A7268] hover:border-[#C9A96E] hover:text-[#1A1714]">
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Reset Category
                        </button>
                    </div>

                    <div className={`mb-6 grid gap-3 ${activeKey === 'localities' ? 'md:grid-cols-[1fr_220px_auto]' : 'md:grid-cols-[1fr_auto]'}`}>
                        <input
                            value={newValue}
                            onChange={(event) => setNewValue(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    addItem();
                                }
                            }}
                            placeholder={`Add ${activeGroup.label.toLowerCase()} option`}
                            className="rounded border border-[#D9D0C0] px-4 py-3 font-sans text-sm outline-none focus:border-[#C9A96E]"
                        />
                        {activeKey === 'localities' && (
                            <>
                                <input
                                    value={newZone}
                                    onChange={(event) => setNewZone(event.target.value)}
                                    list="zone-options"
                                    placeholder="Zone"
                                    className="rounded border border-[#D9D0C0] px-4 py-3 font-sans text-sm outline-none focus:border-[#C9A96E]"
                                />
                                <datalist id="zone-options">
                                    {(options.zoneOptions || []).map((zone) => <option key={zone} value={zone} />)}
                                </datalist>
                            </>
                        )}
                        <button onClick={addItem} className="flex items-center justify-center rounded bg-[#0D0B09] px-5 py-3 font-sans text-xs uppercase tracking-wider text-[#C9A96E] hover:bg-[#1A1714]">
                            <Plus className="mr-2 h-4 w-4" />
                            Add
                        </button>
                    </div>

                    <div className="mb-5">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A7268]" />
                            <input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search this category..."
                                className="w-full rounded border border-[#D9D0C0] py-2.5 pl-10 pr-3 font-sans text-sm outline-none focus:border-[#C9A96E]"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        {activeItems.map(({ item, index }) => (
                            <div key={`${activeKey}-${index}-${item}`} className={`grid items-center gap-3 rounded border border-[#D9D0C0] bg-[#F5F0E8]/30 p-3 ${activeKey === 'localities' ? 'md:grid-cols-[1fr_220px_auto]' : 'md:grid-cols-[1fr_auto]'}`}>
                                <input
                                    value={toText(item)}
                                    onChange={(event) => updateItem(index, event.target.value)}
                                    className="min-w-0 rounded border border-transparent bg-transparent px-2 py-2 font-sans text-sm text-[#1A1714] outline-none focus:border-[#C9A96E] focus:bg-white"
                                />
                                {activeKey === 'localities' && (
                                    <input
                                        value={options.localityZones?.[item] || ''}
                                        onChange={(event) => updateLocalityZone(item, event.target.value)}
                                        list="zone-options-existing"
                                        placeholder="Zone"
                                        className="rounded border border-[#D9D0C0] bg-white px-3 py-2 font-sans text-sm outline-none focus:border-[#C9A96E]"
                                    />
                                )}
                                <div className="flex justify-end gap-1">
                                    <button onClick={() => moveItem(index, -1)} disabled={index === 0 || Boolean(search)} className="rounded p-2 text-[#7A7268] hover:bg-white hover:text-[#C9A96E] disabled:opacity-30" title="Move up">
                                        <ArrowUp className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => moveItem(index, 1)} disabled={index === (options[activeKey]?.length || 1) - 1 || Boolean(search)} className="rounded p-2 text-[#7A7268] hover:bg-white hover:text-[#C9A96E] disabled:opacity-30" title="Move down">
                                        <ArrowDown className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => removeItem(index)} className="rounded p-2 text-[#7A7268] hover:bg-red-50 hover:text-red-600" title="Remove">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <datalist id="zone-options-existing">
                            {(options.zoneOptions || []).map((zone) => <option key={zone} value={zone} />)}
                        </datalist>

                        {!activeItems.length && (
                            <div className="rounded border-2 border-dashed border-[#D9D0C0] p-10 text-center">
                                <p className="font-sans text-sm text-[#7A7268]">No matching options found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
