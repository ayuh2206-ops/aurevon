'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Mic, ChevronDown } from 'lucide-react';
import { useTypewriter } from '@/hooks/useTypewriter';

export default function SearchBar() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Buy');
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const [selectedType, setSelectedType] = useState('All Properties');
    const [searchQuery, setSearchQuery] = useState('');
    const [openFilter, setOpenFilter] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({
        'Location': '',
        'Budget': '',
        'Area (sqft)': '',
        'Yield %': '',
        'Construction Status': '',
    });

    const dropdownRef = useRef(null);
    const filtersRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowTypeDropdown(false);
            }
            if (filtersRef.current && !filtersRef.current.contains(event.target)) {
                setOpenFilter(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const tabs = ['Buy', 'Lease', 'New Launch', 'Pre-Leased', 'Projects'];
    const placeholders = [
        "Search 'Office space in Kharadi'",
        "Search 'Retail shop in Baner'",
        "Search 'Pre-leased office 9% yield'",
        "Search 'Co-working space Hinjewadi'"
    ];
    const placeholder = useTypewriter(placeholders);

    const propertyTypes = [
        'Office Space', 'Retail', 'Showroom', 'Co-Working',
        'Industrial', 'Warehouse', 'IT Park',
        'Apartment', 'Villa', 'Independent House',
        'Commercial Land', 'Residential Plot', 'Agricultural'
    ];

    // Comprehensive list of Pune commercial/residential locations
    const puneLocations = [
        'Akurdi', 'Aundh', 'Balewadi', 'Baner', 'Bavdhan', 'Bhosari', 'Bibwewadi', 'Camp', 'Chakan',
        'Chinchwad', 'Deccan Gymkhana', 'Dhanori', 'Erandwane', 'FC Road', 'Fatima Nagar', 'Hadapsar',
        'Hinjewadi', 'JM Road', 'Kalyani Nagar', 'Karve Nagar', 'Kharadi', 'Kondhwa', 'Koregaon Park',
        'Kothrud', 'Magarpatta City', 'Mahalunge', 'Market Yard', 'Model Colony', 'Nigdi', 'Pashan',
        'Pimpri', 'Pune Station', 'Ravet', 'Sadashiv Peth', 'SB Road', 'Shivajinagar', 'Sinhagad Road',
        'Swargate', 'Tathawade', 'Viman Nagar', 'Vishrantwadi', 'Wagholi', 'Wakad', 'Wanowrie', 'Yerwada'
    ];

    const filterOptions = {
        'Location': puneLocations,
        'Budget': ['Under ₹50 Lacs', '₹50 Lacs - ₹1 Cr', '₹1 Cr - ₹5 Cr', 'Above ₹5 Cr'],
        'Area (sqft)': ['Under 500 sqft', '500 - 1000 sqft', '1000 - 5000 sqft', 'Above 5000 sqft'],
        'Yield %': ['Up to 5%', '5% - 7%', '7% - 9%', 'Above 9%'],
        'Construction Status': ['Under Construction', 'Ready to Move', 'New Launch'],
        'Property Type': propertyTypes
    };

    const handleSearch = () => {
        const queryParams = new URLSearchParams();
        if (activeTab) queryParams.append('tab', activeTab);
        if (selectedType !== 'All Properties') queryParams.append('type', selectedType);
        if (searchQuery.trim()) queryParams.append('q', searchQuery.trim());

        Object.entries(selectedFilters).forEach(([key, value]) => {
            if (value) queryParams.append(key.toLowerCase().replace(/[^a-z0-9]/g, ''), value);
        });

        router.push(`/properties?${queryParams.toString()}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto bg-[#0D0B09]/85 backdrop-blur-xl rounded-xl border-t-2 border-[#C9A96E] shadow-[0_24px_60px_rgba(0,0,0,0.5)] p-4 md:p-6 relative z-20">
            {/* Tabs */}
            <div className="flex overflow-x-auto space-x-6 border-b border-[#2E2A25] pb-3 mb-4 scrollbar-hide">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`whitespace-nowrap font-sans text-[13px] uppercase tracking-wider relative pb-3 ${activeTab === tab ? 'text-[#F5F0E8]' : 'text-[#7A7268] hover:text-[#F5F0E8]'} transition-colors cursor-pointer`}
                    >
                        {tab}
                        {tab === 'New Launch' && <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>}
                        {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#C9A96E]"></div>}
                    </button>
                ))}
            </div>

            {/* Search Row */}
            <div className="flex flex-col md:flex-row items-center gap-4 bg-[#1A1714] p-2 rounded-lg border border-[#2E2A25]">
                {/* Property Type Dropdown */}
                <div className="relative w-full md:w-auto md:min-w-[170px] border-b md:border-b-0 md:border-r border-[#2E2A25] pb-2 md:pb-0 md:pr-4" ref={dropdownRef}>
                    <button
                        onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                        className="w-full flex items-center justify-between font-sans text-sm text-[#F5F0E8] p-2 cursor-pointer"
                        aria-label="Select property type"
                    >
                        <span className="truncate">{selectedType}</span>
                        <ChevronDown className={`w-4 h-4 text-[#C9A96E] ml-2 transition-transform duration-200 ${showTypeDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showTypeDropdown && (
                        <div className="absolute top-full left-0 mt-4 w-[280px] sm:w-[320px] md:w-[500px] bg-[#0D0B09]/95 backdrop-blur-md border border-[#2E2A25] rounded-lg p-4 md:p-6 shadow-2xl z-50">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-[#C9A96E] font-serif text-lg md:text-xl">Property Types</p>
                                <button
                                    onClick={() => setSelectedType('All Properties')}
                                    className="text-[#7A7268] hover:text-[#C9A96E] text-xs font-sans uppercase cursor-pointer transition-colors"
                                    aria-label="Clear all property type filters"
                                >
                                    Clear All
                                </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                                {propertyTypes.map(type => (
                                    <label key={type} className="flex items-center space-x-2 text-[#F5F0E8] text-sm font-sans cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="propertyType"
                                            value={type}
                                            checked={selectedType === type}
                                            onChange={(e) => {
                                                setSelectedType(e.target.value);
                                                setShowTypeDropdown(false);
                                            }}
                                            className="hidden"
                                        />
                                        <div className={`w-4 h-4 shrink-0 border ${selectedType === type ? 'border-[#C9A96E] bg-[#C9A96E]/20' : 'border-[#7A7268]'} rounded group-hover:border-[#C9A96E] flex items-center justify-center transition-colors`}>
                                            {selectedType === type && <div className="w-2 h-2 bg-[#C9A96E] rounded-sm"></div>}
                                        </div>
                                        <span className={selectedType === type ? 'text-[#C9A96E]' : 'group-hover:text-[#C9A96E] transition-colors'}>{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Search Input */}
                <div className="flex-1 flex items-center w-full px-2">
                    <Search className="w-5 h-5 text-[#C9A96E] mr-3 shrink-0" />
                    <label htmlFor="property-search" className="sr-only">Search properties</label>
                    <input
                        id="property-search"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="w-full bg-transparent border-none outline-none text-[#F5F0E8] font-sans text-[15px] placeholder:text-[#7A7268]"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 w-full md:w-auto justify-between md:justify-end">
                    <div className="flex space-x-2">
                        <button className="w-10 h-10 rounded-full bg-[#2E2A25] hover:bg-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E] transition-colors cursor-pointer" aria-label="Use my location">
                            <MapPin className="w-4 h-4" />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-[#2E2A25] hover:bg-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E] transition-colors cursor-pointer" aria-label="Voice search">
                            <Mic className="w-4 h-4" />
                        </button>
                    </div>
                    <button
                        onClick={handleSearch}
                        className="bg-[#C9A96E] text-[#0D0B09] font-sans font-medium uppercase text-sm px-6 py-3 rounded hover:bg-[#F5F0E8] transition-colors whitespace-nowrap cursor-pointer">
                        Search
                    </button>
                </div>
            </div>

            {/* Filter Pills */}
            <div className="mt-5 flex flex-wrap gap-3" ref={filtersRef}>
                {Object.keys(filterOptions).map(filter => {
                    const isOpen = openFilter === filter;
                    let displayValue = filter;

                    if (filter === 'Property Type') {
                        if (selectedType !== 'All Commercial') displayValue = selectedType;
                    } else if (selectedFilters[filter]) {
                        displayValue = selectedFilters[filter];
                    }

                    return (
                        <div key={filter} className="relative">
                            <button
                                onClick={() => setOpenFilter(isOpen ? null : filter)}
                                className={`shrink-0 flex items-center px-4 py-1.5 rounded-full border text-xs font-sans uppercase tracking-wider transition-colors cursor-pointer ${displayValue !== filter || isOpen
                                    ? 'border-[#C9A96E] bg-[#C9A96E] text-[#0D0B09]'
                                    : 'border-[#C9A96E] text-[#F5F0E8] hover:bg-[#C9A96E]/20'
                                    }`}
                            >
                                <span className="truncate max-w-[120px]">{displayValue}</span>
                                <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Pill Dropdown */}
                            {isOpen && (
                                <div className={`absolute top-full left-0 mt-2 ${filter === 'Location' ? 'w-64 max-h-80 overflow-y-auto scrollbar-hide' : 'w-48'} bg-[#0D0B09]/95 backdrop-blur-md border border-[#2E2A25] rounded-lg py-2 shadow-2xl z-50`}>
                                    <button
                                        onClick={() => {
                                            if (filter === 'Property Type') setSelectedType('All Commercial');
                                            else setSelectedFilters(prev => ({ ...prev, [filter]: '' }));
                                            setOpenFilter(null);
                                        }}
                                        className="w-full text-left px-4 py-2 text-xs font-sans text-[#7A7268] hover:text-[#C9A96E] hover:bg-[#1A1714] transition-colors sticky top-0 bg-[#0D0B09]/95 backdrop-blur-md z-10"
                                    >
                                        Clear Selection
                                    </button>
                                    <div className="w-full h-px bg-[#2E2A25] my-1"></div>
                                    {filterOptions[filter].map(option => (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                if (filter === 'Property Type') setSelectedType(option);
                                                else setSelectedFilters(prev => ({ ...prev, [filter]: option }));
                                                setOpenFilter(null);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-sm font-sans transition-colors ${(filter === 'Property Type' ? selectedType === option : selectedFilters[filter] === option)
                                                ? 'text-[#C9A96E] bg-[#1A1714]'
                                                : 'text-[#F5F0E8] hover:text-[#C9A96E] hover:bg-[#1A1714]'
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
