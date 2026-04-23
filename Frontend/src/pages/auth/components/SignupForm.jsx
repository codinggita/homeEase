import React from "react";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

const SignupForm = ({ role, setStep, formData, setFormData, handleSignup }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right duration-300">
      <div className="flex items-center gap-4">
        <button onClick={() => setStep(1)} className="text-on-surface-variant hover:text-primary">
          <ArrowRight className="rotate-180" size={24} />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-on-surface tracking-tight">Create your {role} account</h2>
          <p className="text-on-surface-variant">Fill in your details to get started.</p>
        </div>
      </div>

      <form onSubmit={handleSignup} className="space-y-6">
        <div className="space-y-1">
          <label className="block text-xs font-bold tracking-wider uppercase text-on-surface-variant ml-2 mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-60" size={20} />
            <input
              type="text"
              className="w-full bg-surface-container-lowest border-none rounded-xl py-4 pl-12 pr-4 text-on-surface focus:ring-2 focus:ring-primary/30 transition-all shadow-sm"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-bold tracking-wider uppercase text-on-surface-variant ml-2 mb-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-60" size={20} />
            <input
              type="email"
              className="w-full bg-surface-container-lowest border-none rounded-xl py-4 pl-12 pr-4 text-on-surface focus:ring-2 focus:ring-primary/30 transition-all shadow-sm"
              placeholder="name@sanctuary.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-bold tracking-wider uppercase text-on-surface-variant ml-2 mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-60" size={20} />
            <input
              type="password"
              className="w-full bg-surface-container-lowest border-none rounded-xl py-4 pl-12 pr-4 text-on-surface focus:ring-2 focus:ring-primary/30 transition-all shadow-sm"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-primary text-on-primary font-bold rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2"
        >
          Complete Registration
          <ArrowRight size={20} />
        </button>
      </form>
    </div>
  );
};

export default SignupForm;