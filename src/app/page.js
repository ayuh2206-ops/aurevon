'use client';
import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import Featured from '@/components/sections/Featured';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Locations from '@/components/sections/Locations';
import Testimonials from '@/components/sections/Testimonials';
import NRIDesk from '@/components/sections/NRIDesk';
import Blog from '@/components/sections/Blog';
import Contact from '@/components/sections/Contact';
import YieldCalculator from '@/components/sections/YieldCalculator';
import { getProperties } from '@/lib/firebaseUtils';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [featuredCommProps, setFeaturedCommProps] = useState([]);
  const [featuredResProps, setFeaturedResProps] = useState([]);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getProperties();
                const featured = data.filter(p => p.status === 'Published' && p.featured);
                setFeaturedCommProps(featured.filter(p => p.category === 'Commercial').slice(0, 6));
                setFeaturedResProps(featured.filter(p => p.category === 'Residential').slice(0, 6));
            } catch (error) {
                console.error("Failed to fetch featured properties:", error);
            }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen relative">
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <Navbar />

      <main>
        <Hero isLoaded={!loading} />
        <Stats />
        <Featured
          properties={featuredCommProps}
          categoryLabel="Commercial Portfolio"
          title={"Spaces That\nDrive Business"}
          linkTo="/listings?category=Commercial"
          bgClass="bg-[#F5F0E8]"
        />
        <Featured
          properties={featuredResProps}
          categoryLabel="Residential Portfolio"
          title={"Homes That\nInspire Living"}
          linkTo="/listings?category=Residential"
          bgClass="bg-white border-t border-[#D9D0C0]"
        />
        <About />
        <Services />
        <Locations />
        <Testimonials />
        <NRIDesk />
        <YieldCalculator />
        <Blog />
        <Contact />
      </main>

      <Footer />
      <WhatsAppCTA currentProperty={null} />
    </div>
  );
}
