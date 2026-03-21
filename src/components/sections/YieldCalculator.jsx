'use client';
import { useState } from 'react';
import { TrendingUp, Calculator, IndianRupee } from 'lucide-react';

export default function YieldCalculator() {
    const [investment, setInvestment] = useState('');
    const [monthlyRent, setMonthlyRent] = useState('');
    const [expenses, setExpenses] = useState('');

    const inv = parseFloat(investment) || 0;
    const rent = parseFloat(monthlyRent) || 0;
    const exp = parseFloat(expenses) || 0;

    const annualRent = rent * 12;
    const annualExpenses = exp * 12;
    const grossYield = inv > 0 ? ((annualRent / inv) * 100).toFixed(2) : '—';
    const netYield = inv > 0 ? (((annualRent - annualExpenses) / inv) * 100).toFixed(2) : '—';

    const formatCr = (val) => {
        if (!val) return '—';
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
        if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
        return `₹${val.toLocaleString('en-IN')}`;
    };

    return (
        <section id="yield-calc" className="py-24 bg-[#1A1714] border-t border-[#2E2A25]">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                    <span className="block font-sans text-xs text-[#C9A96E] uppercase tracking-[0.2em] mb-4">Investment Tools</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-[#F5F0E8] mb-3">Yield Calculator</h2>
                    <p className="text-[#7A7268] font-sans text-sm max-w-lg mx-auto">
                        Instantly estimate your Gross and Net Yield on any commercial property investment.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                    {/* Inputs */}
                    <div className="space-y-6 bg-[#0D0B09] border border-[#2E2A25] rounded-2xl p-8">
                        <div>
                            <label className="block text-xs font-sans text-[#7A7268] uppercase tracking-wider mb-2">
                                Total Investment (₹)
                            </label>
                            <div className="relative">
                                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A96E]" />
                                <input
                                    type="number"
                                    min="0"
                                    value={investment}
                                    onChange={e => setInvestment(e.target.value)}
                                    placeholder="e.g. 10000000"
                                    className="w-full bg-[#1A1714] border border-[#2E2A25] rounded-lg pl-9 pr-4 py-3 text-[#F5F0E8] font-sans text-sm focus:outline-none focus:border-[#C9A96E] placeholder:text-[#3E3A35]"
                                />
                            </div>
                            {inv > 0 && <p className="text-xs text-[#7A7268] mt-1">{formatCr(inv)}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-sans text-[#7A7268] uppercase tracking-wider mb-2">
                                Monthly Rental Income (₹)
                            </label>
                            <div className="relative">
                                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A96E]" />
                                <input
                                    type="number"
                                    min="0"
                                    value={monthlyRent}
                                    onChange={e => setMonthlyRent(e.target.value)}
                                    placeholder="e.g. 85000"
                                    className="w-full bg-[#1A1714] border border-[#2E2A25] rounded-lg pl-9 pr-4 py-3 text-[#F5F0E8] font-sans text-sm focus:outline-none focus:border-[#C9A96E] placeholder:text-[#3E3A35]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-sans text-[#7A7268] uppercase tracking-wider mb-2">
                                Monthly Expenses — Maintenance, Tax (₹) <span className="lowercase normal-case">(optional)</span>
                            </label>
                            <div className="relative">
                                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A96E]" />
                                <input
                                    type="number"
                                    min="0"
                                    value={expenses}
                                    onChange={e => setExpenses(e.target.value)}
                                    placeholder="e.g. 5000"
                                    className="w-full bg-[#1A1714] border border-[#2E2A25] rounded-lg pl-9 pr-4 py-3 text-[#F5F0E8] font-sans text-sm focus:outline-none focus:border-[#C9A96E] placeholder:text-[#3E3A35]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="space-y-6">
                        <div className="bg-[#0D0B09] border border-[#C9A96E]/30 rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <TrendingUp className="w-5 h-5 text-[#C9A96E]" />
                                <span className="font-sans text-xs text-[#C9A96E] uppercase tracking-widest">Results</span>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs text-[#7A7268] font-sans uppercase tracking-wider mb-1">Gross Yield</p>
                                    <p className={`font-serif text-5xl ${grossYield !== '—' ? 'text-[#C9A96E]' : 'text-[#2E2A25]'}`}>
                                        {grossYield !== '—' ? `${grossYield}%` : '—'}
                                    </p>
                                    <p className="text-xs text-[#7A7268] mt-1">Annual Rent ÷ Total Investment</p>
                                </div>

                                <div className="w-full h-px bg-[#2E2A25]" />

                                <div>
                                    <p className="text-xs text-[#7A7268] font-sans uppercase tracking-wider mb-1">Net Yield</p>
                                    <p className={`font-serif text-5xl ${netYield !== '—' ? 'text-[#F5F0E8]' : 'text-[#2E2A25]'}`}>
                                        {netYield !== '—' ? `${netYield}%` : '—'}
                                    </p>
                                    <p className="text-xs text-[#7A7268] mt-1">(Annual Rent − Expenses) ÷ Investment</p>
                                </div>

                                {inv > 0 && rent > 0 && (
                                    <>
                                        <div className="w-full h-px bg-[#2E2A25]" />
                                        <div className="grid grid-cols-2 gap-4 text-sm font-sans">
                                            <div>
                                                <p className="text-[#7A7268] text-xs mb-1">Annual Rental Income</p>
                                                <p className="text-[#F5F0E8] font-medium">{formatCr(annualRent)}</p>
                                            </div>
                                            <div>
                                                <p className="text-[#7A7268] text-xs mb-1">Annual Net Income</p>
                                                <p className="text-[#F5F0E8] font-medium">{formatCr(annualRent - annualExpenses)}</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <p className="text-xs text-[#7A7268] font-sans leading-relaxed px-1">
                            * This tool provides an estimate only. Actual returns may vary based on market conditions, taxes, vacancy periods, and other factors. Consult with our advisors for a comprehensive analysis.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
