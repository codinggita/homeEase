import React from "react";
import { Link } from "react-router-dom";

const SignupHeader = () => {
  return (
    <header className="w-full px-8 py-6 max-w-7xl mx-auto flex justify-between items-center z-50">
      <div className="flex items-center gap-2">
        <Link to="/" className="text-2xl font-bold text-primary tracking-tight">HomeEase</Link>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-on-surface-variant text-sm font-medium">Already have an account?</span>
        <Link to="/login" className="text-primary font-bold border-b-4 border-primary-container pb-0.5 hover:border-primary transition-all">
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default SignupHeader;