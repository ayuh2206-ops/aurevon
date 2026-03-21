'use client';
import { useState, useEffect } from 'react';
import { getSearchOptions, updateSearchOptions } from '@/lib/firebaseUtils';
import { Save, Plus, Trash2, GripVertical } from 'lucide-react';

export default function SearchOptionsPage() {
    const [options, setOptions] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('locations');
    const [newItemTexts, setNewItemTexts] = useState({});

    useEffect(() => {
        async function loadOptions() {
            const data = await getSearchOptions();
            setOptions(data);
            setIsLoading(false);
        }
        loadOptions();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateSearchOptions(options);
            alert('Settings saved successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to save settings.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddItem = (key) => {
        const text = newItemTexts[key]?.trim();
        if (!text) return;

        setOptions(prev => ({
            ...prev,
            [key]: [...(prev[key] || []), text]
        }));

        setNewItemTexts(prev => ({ ...prev, [key]: '' }));
    };

    const handleRemoveItem = (key, index) => {
        setOptions(prev => {
            const newArray = [...prev[key]];
            newArray.splice(index, 1);
            return { ...prev, [key]: newArray };
        });
    };

    const handleUpdateItem = (key, index, newValue) => {
        setOptions(prev => {
            const newArray = [...prev[key]];
            newArray[index] = newValue;
            return { ...prev, [key]: newArray };
        });
    };

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const tabs = [
        { id: 'locations', label: 'Locations' },
        { id: 'commercialTypes', label: 'Commercial Types' },
        { id: 'residentialTypes', label: 'Residential Types' },
        { id: 'budgets', label: 'Budgets' },
        { id: 'areas', label: 'Areas (Sqft)' },
        { id: 'yields', label: 'Yields %' },
        { id: 'constructionStatuses', label: 'Construction Status' },
    ];

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1714] mb-2">Search Options</h2>
                    <p className="text-[#7A7268] text-sm">Manage the dropdown options available in the homepage Search Bar.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center px-6 py-2.5 rounded text-sm uppercase tracking-wider cursor-pointer transition-all bg-[#C9A96E] text-[#0D0B09] hover:bg-[#F5F0E8] disabled:opacity-50"
                >
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Tabs Sidebar */}
                <div className="w-full lg:w-64 shrink-0 bg-white rounded shadow border border-[#D9D0C0] overflow-hidden">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full text-left px-4 py-3 text-sm font-sans border-b border-[#D9D0C0] last:border-b-0 cursor-pointer transition-colors ${activeTab === tab.id
                                    ? 'bg-[#C9A96E]/10 text-[#1A1714] font-medium border-l-2 border-l-[#C9A96E]'
                                    : 'text-[#7A7268] hover:text-[#1A1714] hover:bg-[#F5F0E8]/50'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* List Manager */}
                <div className="flex-1 bg-white rounded shadow border border-[#D9D0C0] p-6 sm:p-8">
                    <h3 className="font-serif text-xl text-[#1A1714] mb-6 capitalize">{tabs.find(t => t.id === activeTab)?.label}</h3>

                    {/* Add New Item */}
                    <div className="flex gap-3 mb-8 pb-8 border-b border-[#D9D0C0]">
                        <input
                            type="text"
                            placeholder={`Add new ${activeTab.replace(/([A-Z])/g, ' $1').toLowerCase()}...`}
                            className="flex-1 border border-[#D9D0C0] p-2.5 rounded focus:border-[#C9A96E] outline-none text-sm font-sans"
                            value={newItemTexts[activeTab] || ''}
                            onChange={(e) => setNewItemTexts(prev => ({ ...prev, [activeTab]: e.target.value }))}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddItem(activeTab)}
                        />
                        <button
                            onClick={() => handleAddItem(activeTab)}
                            className="bg-[#1A1714] text-[#F5F0E8] px-4 py-2.5 rounded hover:bg-[#C9A96E] transition-colors flex items-center text-sm font-medium"
                        >
                            <Plus className="w-4 h-4 mr-2" /> Add
                        </button>
                    </div>

                    {/* Items List */}
                    <div className="space-y-3">
                        {options[activeTab]?.map((item, index) => (
                            <div 
                                key={index} 
                                draggable={true}
                                onDragStart={(e) => e.dataTransfer.setData('text/plain', index.toString())}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
                                    if (draggedIndex === index) return;
                                    setOptions(prev => {
                                        const newArray = [...prev[activeTab]];
                                        const [movedItem] = newArray.splice(draggedIndex, 1);
                                        newArray.splice(index, 0, movedItem);
                                        return { ...prev, [activeTab]: newArray };
                                    });
                                }}
                                className="flex items-center gap-3 bg-[#F5F0E8]/30 p-2 rounded border border-[#D9D0C0]/50 group transition-colors hover:border-[#D9D0C0]"
                            >
                                <GripVertical className="w-5 h-5 text-[#AAAAAA] cursor-grab active:cursor-grabbing" />
                                <input
                                    className="flex-1 bg-transparent outline-none font-sans text-sm text-[#1A1714]"
                                    value={item}
                                    onChange={(e) => handleUpdateItem(activeTab, index, e.target.value)}
                                />
                                <button
                                    onClick={() => handleRemoveItem(activeTab, index)}
                                    className="p-2 text-[#7A7268] hover:text-red-500 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                                    title="Remove Item"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        {(!options[activeTab] || options[activeTab].length === 0) && (
                            <p className="text-center text-[#7A7268] text-sm py-8 font-sans border-2 border-dashed border-[#D9D0C0] rounded">
                                No items found. Add some above.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
