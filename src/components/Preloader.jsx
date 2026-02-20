'use client';
import { useState, useEffect, useCallback } from 'react';

export default function Preloader({ onComplete }) {
    const [stage, setStage] = useState(0);

    const handleComplete = useCallback(() => {
        if (onComplete) onComplete();
    }, [onComplete]);

    useEffect(() => {
        const t1 = setTimeout(() => setStage(1), 400);
        const t2 = setTimeout(() => setStage(2), 1200);
        const t3 = setTimeout(() => {
            setStage(3);
            setTimeout(handleComplete, 1200);
        }, 3200);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [handleComplete]);

    return (
        <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0D0B09] transition-opacity duration-1000 ease-in-out ${stage === 3 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <h1
                className="text-6xl md:text-8xl text-[#C9A96E] font-serif tracking-wide opacity-0 animate-fade-in"
                style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
                AUREVON
            </h1>
            <div className={`h-[1px] bg-[#C9A96E] mt-4 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${stage >= 1 ? 'w-48 md:w-64' : 'w-0'}`} />
            <p className={`text-white font-sans text-sm tracking-[0.4em] mt-4 transition-opacity duration-700 ${stage >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                REALTY
            </p>
        </div>
    );
}
