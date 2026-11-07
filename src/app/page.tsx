import React from 'react';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Manifesto from '@/components/Manifesto';
import MethodSection from '@/components/MethodSection';
import SimulatorSection from '@/components/SimulatorSection';
import RoiCalculator from '@/components/RoiCalculator';
import PlansSection from '@/components/PlansSection';
import FaqSection from '@/components/FaqSection';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <main id="top" className="flex flex-col">
        <Hero />
        <Marquee />
        <Manifesto />
        <MethodSection />
        <SimulatorSection />
        <RoiCalculator />
        <PlansSection />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

