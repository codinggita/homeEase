import React from "react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-16 items-center">
        <div className="w-full md:w-1/2 relative">
          <div className="bg-surface-variant aspect-square rounded-xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800"
              alt="Home service"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-12">
          <h2 className="text-4xl font-extrabold font-display leading-tight">
            From Chaos to Calm <br /> in 3 Steps
          </h2>

          <div className="space-y-10">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-black text-xl shadow-lg">
                1
              </div>
              <div>
                <h4 className="text-xl font-bold font-display mb-2 text-on-surface">
                  Select Your Need
                </h4>
                <p className="text-on-surface-variant leading-relaxed">
                  Choose from cleaning, repairs, or emergency support. Tell us
                  what's wrong and how soon you need help.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-black text-xl shadow-lg">
                2
              </div>
              <div>
                <h4 className="text-xl font-bold font-display mb-2 text-on-surface">
                  Book Instantly
                </h4>
                <p className="text-on-surface-variant leading-relaxed">
                  We match you with the nearest top-rated pro. Secure
                  transparent pricing—no hidden "emergency" fees.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-black text-xl shadow-lg">
                3
              </div>
              <div>
                <h4 className="text-xl font-bold font-display mb-2 text-on-surface">
                  Relax & Restore
                </h4>
                <p className="text-on-surface-variant leading-relaxed">
                  Your helper arrives and handles the heavy lifting while you
                  get back to what matters most.
                </p>
              </div>
            </div>
          </div>

          <Link to="/signup">
            <button className="bg-primary text-white px-10 py-5 rounded-full font-black text-xl shadow-lg hover:shadow-xl transition-all">
              Start My Request
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;