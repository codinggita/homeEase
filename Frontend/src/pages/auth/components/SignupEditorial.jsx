import React from "react";

const SignupEditorial = () => {
  return (
    <div className="md:col-span-5 flex flex-col gap-8">
      <div className="space-y-4">
        <span className="bg-secondary-container text-on-secondary-container px-4 py-1.5 text-xs font-bold tracking-wider uppercase inline-block">
          Welcome Home
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold text-on-surface leading-[1.1] tracking-tight">
          Let's start your journey.
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed font-medium">
          Whether you're looking for a helping hand or offering your skills, you're exactly where you need to be.
        </p>
      </div>
      <div className="relative w-full aspect-square rounded-xl overflow-hidden group">
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src="https://images.unsplash.com/photo-1600596542415-9e48e8f6085e?auto=format&fit=crop&q=80&w=800"
          alt="Serene home"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
        <div className="absolute bottom-8 left-8 right-8 bg-white/80 backdrop-blur-md p-6 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              <img className="w-10 h-10 rounded-full border-2 border-surface" src="https://i.pravatar.cc/150?u=1" alt="user" />
              <img className="w-10 h-10 rounded-full border-2 border-surface" src="https://i.pravatar.cc/150?u=2" alt="user" />
              <img className="w-10 h-10 rounded-full border-2 border-surface" src="https://i.pravatar.cc/150?u=3" alt="user" />
            </div>
            <p className="text-xs font-semibold text-on-surface">Joined by 2,000+ local neighbors this week</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupEditorial;