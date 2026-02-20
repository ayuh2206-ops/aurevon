'use client';
import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function WhatsAppCTA({ currentProperty }) {
    const handleClick = () => {
        let message = "Hi Arun, I visited the Aurevon Realty website and would like to enquire about commercial properties. Could you please assist me?";
        if (currentProperty) {
            message = `Hi Arun, I'm interested in the following commercial property listed on Aurevon Realty:\n\n🏢 *${currentProperty.name}*\n📍 ${currentProperty.locality}, ${currentProperty.city}\n📐 ${currentProperty.sqft} sqft\n💰 ${currentProperty.priceDisplay}\n📈 Yield: ${currentProperty.yield || 'N/A'}\n✅ ${currentProperty.status}\n🔖 Listing ID: ${currentProperty.id}\n\nCould you please share more details?`;
        }
        window.open(`https://wa.me/${SITE_CONFIG.ARUN_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="fixed bottom-7 right-7 z-40 group flex items-center">
            <div className="mr-4 px-4 py-2 bg-[#1A1714] text-[#F5F0E8] text-sm font-sans rounded-full opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none border border-[#2E2A25]">
                Chat with Arun
            </div>
            <button
                onClick={handleClick}
                aria-label="Chat with Arun on WhatsApp"
                className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative cursor-pointer"
            >
                <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-20"></div>
                <MessageCircle className="w-7 h-7 text-white" fill="currentColor" />
            </button>
        </div>
    );
}
