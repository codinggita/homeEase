import React from "react";
import { ArrowRight, Home, Wrench } from "lucide-react";

const SignupRoleSelection = ({ setRole, setStep }) => {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-on-surface tracking-tight">How will you use HomeEase?</h2>
        <p className="text-on-surface-variant">Choose the path that fits your needs today.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <button
          onClick={() => { setRole("user"); setStep(2); }}
          className="group relative flex flex-col items-start p-8 bg-surface-container-lowest rounded-xl text-left transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl active:scale-95 focus:ring-2 focus:ring-primary/20"
        >
          <div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container mb-6 group-hover:bg-secondary transition-colors">
            <Home size={32} />
          </div>
          <h3 className="text-xl font-extrabold text-on-surface mb-2">I need help</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Find trusted neighbors for cleaning, gardening, or odd jobs around your sanctuary.
          </p>
          <div className="mt-6 flex items-center gap-2 text-primary font-bold text-sm">
            Start Exploring
            <ArrowRight size={16} />
          </div>
        </button>
        <button
          onClick={() => { setRole("worker"); setStep(2); }}
          className="group relative flex flex-col items-start p-8 bg-surface-container-lowest rounded-xl text-left transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl active:scale-95 focus:ring-2 focus:ring-primary/20"
        >
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-700 mb-6 group-hover:bg-green-500 group-hover:text-white transition-colors">
            <Wrench size={32} />
          </div>
          <h3 className="text-xl font-extrabold text-on-surface mb-2">I want to help</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Share your skills, set your own schedule, and earn while helping your local community.
          </p>
          <div className="mt-6 flex items-center gap-2 text-primary font-bold text-sm">
            Become a Helper
            <ArrowRight size={16} />
          </div>
        </button>
      </div>
      <div className="pt-6 border-t border-outline-variant/15">
        <p className="text-center text-sm font-medium text-on-surface-variant mb-6">Or continue with</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="flex items-center gap-3 px-6 py-3 rounded-full bg-surface-container-high hover:bg-surface-variant transition-colors font-semibold text-sm">
            <img alt="Google" className="w-5 h-5" src="https://www.google.com/favicon.ico" />
            Google
          </button>
          <button className="flex items-center gap-3 px-6 py-3 rounded-full bg-surface-container-high hover:bg-surface-variant transition-colors font-semibold text-sm">
            <img alt="Facebook" className="w-5 h-5" src="https://www.facebook.com/favicon.ico" />
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupRoleSelection;