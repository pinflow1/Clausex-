import { COLORS } from '@/lib/colors';
import Nav from '@/components/landing/Nav';
import Hero from '@/components/landing/Hero';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import Features from '@/components/landing/Features';
import Pricing from '@/components/landing/Pricing';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div style={{ background: COLORS.paper }}>
      <Nav />
      <Hero />
      <HowItWorksSection />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
}
