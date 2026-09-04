import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import Contact from '@/components/sections/Contact';

export const metadata = {
    title: 'Contact Aurevon Realty',
    description: 'Contact Aurevon Realty for property buying, renting, selling, commercial investment, NRI advisory, and real estate documentation support in Pune.',
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#0D0B09]">
            <Navbar />
            <Contact standalone />
            <Footer />
            <WhatsAppCTA />
        </div>
    );
}
