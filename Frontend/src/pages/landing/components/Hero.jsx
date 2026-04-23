import React from "react";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-12 pb-24 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 bg-error-container text-on-error-container px-6 py-2 font-bold text-sm rounded-full">
            <Zap size={16} />
            Immediate Help Available
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold font-display leading-[1.1] text-on-surface tracking-tight">
            When home life <br /> gets{" "}
            <span className="text-primary italic">hectic</span>, we step in.
          </h1>

          <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed">
            Emergency housekeeping, childcare, and repair services verified by
            professionals. Because your sanctuary shouldn't be a source of
            stress.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/signup">
              <button className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-primary-dim transition-all">
                Book Help Now
              </button>
            </Link>
            <Link to="/user/listing">
              <button className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-full font-bold text-lg hover:bg-green-200 transition-all">
                View Services
              </button>
            </Link>
          </div>

          <div className="flex items-center gap-4 pt-6">
            <div className="flex -space-x-3">
              <img
                className="w-10 h-10 rounded-full border-2 border-background object-cover"
                src="https://i.pravatar.cc/150?u=11"
                alt="Helper"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-background object-cover"
                src="https://i.pravatar.cc/150?u=12"
                alt="Helper"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-background object-cover"
                src="https://i.pravatar.cc/150?u=13"
                alt="Helper"
              />
            </div>
            <p className="text-sm text-on-surface-variant font-medium">
              Joined by <span className="text-primary font-bold">1,200+</span>{" "}
              verified local helpers
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary-container/20 rounded-full -z-10 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-secondary-container/30 rounded-full -z-10 blur-2xl"></div>

          <div className="relative rounded-xl overflow-hidden shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500">
            <img
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800"
              alt="Happy family"
              className="w-full h-full object-cover aspect-[4/5]"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-white/70 backdrop-blur-md p-6 rounded-lg">
              <p className="font-display font-bold text-primary italic">
                "HomeEase saved our weekend when the pipes burst. Help arrived
                in 40 minutes!"
              </p>
              <p className="text-sm mt-2 text-on-surface-variant">
                — The Miller Family
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;