'use client';

import CTASection from "@/components/common/CTASection";
import CaseStudiesSection from "@/components/landing/CaseStudiesSection";
import HeroSection from "@/components/landing/HeroSection";
import ProcessSection from "@/components/landing/ProcessSection";
import ServicesSection from "@/components/landing/ServiceSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import WhyChooseUs from "@/components/landing/WhyChooseUs";

export default function Home() {
  return (
    <>
      
      <main className="min-h-screen overflow-hidden">
        <HeroSection />
        <ServicesSection />
        <WhyChooseUs />
        <ProcessSection />
        <CaseStudiesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
    
    </>
  );
}