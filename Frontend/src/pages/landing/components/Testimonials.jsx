import React from "react";
import { Star } from "lucide-react";

const Testimonials = () => {
  return (
    <section className="py-24 bg-stone-100/50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
          <h2 className="text-4xl font-extrabold font-display max-w-md tracking-tight">
            Hear from our Happy Homeowners
          </h2>
          <p className="text-on-surface-variant text-lg">
            Over 50,000 homes restored to peace of mind since 2020.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface p-8 rounded-xl shadow-sm border border-outline-variant/10">
            <div className="flex text-primary mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={20} fill="currentColor" />
              ))}
            </div>
            <p className="text-lg font-medium italic mb-6 text-on-surface-variant">
              "Absolute lifesaver. Our cleaner cancelled last minute before a
              dinner party and HomeEase had a professional at our door within
              50 minutes."
            </p>
            <div className="flex items-center gap-4">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src="https://i.pravatar.cc/150?u=21"
                alt="Customer"
              />
              <div>
                <p className="font-bold text-on-surface">Sarah Jenkins</p>
                <p className="text-sm text-on-surface-variant">Chicago, IL</p>
              </div>
            </div>
          </div>

          <div className="bg-surface p-8 rounded-xl shadow-sm border border-outline-variant/10 scale-105 z-10 relative">
            <div className="flex text-primary mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={20} fill="currentColor" />
              ))}
            </div>
            <p className="text-lg font-medium italic mb-6 text-on-surface-variant">
              "As a single parent, emergency repairs are a nightmare. HomeEase
              fixed my dishwasher on a Sunday morning. Pricing was fair and
              the pro was so kind."
            </p>
            <div className="flex items-center gap-4">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src="https://i.pravatar.cc/150?u=22"
                alt="Customer"
              />
              <div>
                <p className="font-bold text-on-surface">David Chen</p>
                <p className="text-sm text-on-surface-variant">Austin, TX</p>
              </div>
            </div>
          </div>

          <div className="bg-surface p-8 rounded-xl shadow-sm border border-outline-variant/10">
            <div className="flex text-primary mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={20} fill="currentColor" />
              ))}
            </div>
            <p className="text-lg font-medium italic mb-6 text-on-surface-variant">
              "Highly recommended for elder care support. We needed urgent
              help for my mother's home and the assistant was patient and
              incredibly thorough."
            </p>
            <div className="flex items-center gap-4">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src="https://i.pravatar.cc/150?u=23"
                alt="Customer"
              />
              <div>
                <p className="font-bold text-on-surface">Elena Rodriguez</p>
                <p className="text-sm text-on-surface-variant">Miami, FL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;