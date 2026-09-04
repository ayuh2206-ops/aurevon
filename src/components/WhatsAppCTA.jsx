'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { getContentSettings, logWhatsAppClick } from '@/lib/firebaseUtils';
import {
    createWhatsAppUrl,
    getPrimaryWhatsapp,
    propertyWhatsAppMessage,
    trackConversion,
} from '@/lib/realEstate';
import { useAuth } from '@/context/AuthContext';

export default function WhatsAppCTA({ currentProperty = null, source = 'Floating WhatsApp' }) {
    const pathname = usePathname();
    const { user } = useAuth();
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        if (pathname?.startsWith('/admin')) return;
        getContentSettings().then(setSettings).catch(() => {});
    }, [pathname]);

    if (pathname?.startsWith('/admin')) return null;

    const phone = getPrimaryWhatsapp(settings || {});
    const message = currentProperty
        ? propertyWhatsAppMessage(currentProperty)
        : 'I would like to know more about your properties.';

    const handleClick = () => {
        trackConversion('whatsapp_clicked', {
            propertyId: currentProperty?.id || '',
            source,
        });
        logWhatsAppClick({
            propertyId: currentProperty?.id || '',
            propertyTitle: currentProperty?.title || currentProperty?.name || '',
            source,
            path: pathname || '',
            userId: user?.uid || '',
        });
        window.open(createWhatsAppUrl({ phone, message }), '_blank');
    };

    return (
        <div className="group fixed bottom-24 right-7 z-40 flex items-center">
            <div className="pointer-events-none mr-4 translate-x-4 rounded-full border border-[#2E2A25] bg-[#1A1714] px-4 py-2 font-sans text-sm text-[#F5F0E8] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                WhatsApp Aurevon
            </div>
            <button
                onClick={handleClick}
                aria-label="Chat with Aurevon on WhatsApp"
                className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-110"
            >
                <div className="absolute inset-0 animate-ping rounded-full border-2 border-[#25D366] opacity-20" />
                <MessageCircle className="h-7 w-7 text-white" fill="currentColor" />
            </button>
        </div>
    );
}
