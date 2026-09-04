import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Stats from '@/components/sections/Stats';

export const metadata = {
    title: 'About Aurevon Realty',
    description: 'Meet Aurevon Realty, a Pune real estate advisory team focused on verified listings, RERA-aware transactions, NRI support, and end-to-end property guidance.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#0D0B09]">
            <Navbar />
            <About standalone />
            <Stats />
            <Services />
            <Footer />
            <WhatsAppCTA />
        </div>
    );
}
