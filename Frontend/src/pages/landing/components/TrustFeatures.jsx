import React from "react";
import { ShieldCheck, Zap, Heart } from "lucide-react";

const TrustFeatures = () => {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-extrabold font-display tracking-tight">
            Trust Built on Reliability
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg italic">
            We focus on the human element of home services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-surface-container-lowest p-10 rounded-xl hover:bg-surface-container-highest transition-all flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-primary-container rounded-xl flex items-center justify-center mb-8">
              <ShieldCheck size={40} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold font-display mb-4">
              Vetted Expertise
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              Every helper undergoes a rigorous 5-step background check and
              skill assessment. Only 5% of applicants make the cut.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-10 rounded-xl hover:bg-surface-container-highest transition-all flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-secondary-container rounded-xl flex items-center justify-center mb-8">
              <Zap size={40} className="text-secondary" />
            </div>
            <h3 className="text-2xl font-bold font-display mb-4">
              60-Min Response
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              Our local network ensures that most emergency requests are
              fulfilled within an hour of booking. Speed without compromise.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-10 rounded-xl hover:bg-surface-container-highest transition-all flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-tertiary-container rounded-xl flex items-center justify-center mb-8">
              <Heart size={40} className="text-orange-700" />
            </div>
            <h3 className="text-2xl font-bold font-display mb-4">
              Quality Guaranteed
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              If you're not absolutely delighted with the service, we'll make
              it right. Our 100% Satisfaction Guarantee is non-negotiable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustFeatures;