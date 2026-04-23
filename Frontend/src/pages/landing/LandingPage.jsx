import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import Hero from "./components/Hero";
import TrustFeatures from "./components/TrustFeatures";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import LandingFooter from "./components/LandingFooter";

const LandingPage = () => {
  return (
    <div className="overflow-x-hidden bg-background">
      <Hero />
      <TrustFeatures />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <LandingFooter />

      {/* FAB */}
      <Link
        to="/user/booking"
        className="fixed bottom-8 right-8 bg-primary text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40"
      >
        <Plus size={32} />
      </Link>
    </div>
  );
};

export default LandingPage;