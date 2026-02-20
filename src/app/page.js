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
import { getProperties } from '@/lib/firebaseUtils';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [featuredProps, setFeaturedProps] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getProperties();
        // Filter only active and featured properties
        const featured = data.filter(p => p.active && p.featured).slice(0, 6);
        setFeaturedProps(featured);
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
        <Featured properties={featuredProps} />
        <About />
        <Services />
        <Locations />
        <Testimonials />
        <NRIDesk />
        <Blog />
        <Contact />
      </main>

      <Footer />
      <WhatsAppCTA currentProperty={null} />
    </div>
  );
}
