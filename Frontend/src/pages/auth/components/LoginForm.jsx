import React from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import LoginSocialButtons from "./LoginSocialButtons";

const LoginForm = ({ email, setEmail, password, setPassword, handleLogin }) => {
  return (
    <form onSubmit={handleLogin} className="px-10 pb-12 space-y-6">
      <div className="space-y-1">
        <label className="block text-xs font-bold tracking-wider uppercase text-on-surface-variant ml-2 mb-1">
          Email Address
        </label>
        <div className="relative">
          <input
            className="w-full bg-surface-container-highest border-none rounded-md py-4 pl-12 pr-4 text-on-surface focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-outline-variant"
            placeholder="name@sanctuary.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Mail
            className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-60"
            size={20}
          />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-center ml-2 mb-1">
          <label className="block text-xs font-bold tracking-wider uppercase text-on-surface-variant">
            Password
          </label>
          <Link
            className="text-xs font-bold text-primary hover:text-primary-dim transition-colors"
            to="/forgot-password"
          >
            Forgot?
          </Link>
        </div>
        <div className="relative">
          <input
            className="w-full bg-surface-container-highest border-none rounded-md py-4 pl-12 pr-4 text-on-surface focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-outline-variant"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Lock
            className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-60"
            size={20}
          />
        </div>
      </div>

      <div className="flex items-center space-x-3 ml-2">
        <input
          className="w-5 h-5 rounded bg-surface-container-highest border-none text-primary focus:ring-primary/30"
          id="remember"
          type="checkbox"
        />
        <label
          className="text-sm font-medium text-on-surface-variant"
          htmlFor="remember"
        >
          Keep me signed in
        </label>
      </div>

      <button
        className="w-full py-4 bg-primary text-on-primary font-bold rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2"
        type="submit"
      >
        Sign In to My Home
        <ArrowRight size={20} />
      </button>

      <div className="relative flex items-center justify-center py-4">
        <div className="w-full border-t border-outline-variant/20"></div>
        <span className="absolute bg-surface-container-lowest px-4 text-xs font-bold text-outline-variant uppercase tracking-widest">
          Or continue with
        </span>
      </div>

      <LoginSocialButtons />
    </form>
  );
};

export default LoginForm;