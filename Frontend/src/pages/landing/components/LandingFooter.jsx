import React from "react";
import { Link } from "react-router-dom";
import { Share2, Globe } from "lucide-react";

const LandingFooter = () => {
  return (
    <footer className="w-full py-12 px-8 flex flex-col items-center gap-6 bg-surface border-t border-outline-variant/15">
      <div className="text-lg font-bold text-primary font-display">
        HomeEase
      </div>
      <div className="flex flex-wrap justify-center gap-8 text-sm">
        <Link
          className="text-on-surface-variant hover:text-primary transition-colors"
          to="/privacy"
        >
          Privacy Policy
        </Link>
        <Link
          className="text-on-surface-variant hover:text-primary transition-colors"
          to="/terms"
        >
          Terms of Service
        </Link>
        <Link
          className="text-on-surface-variant hover:text-primary transition-colors"
          to="/contact"
        >
          Contact Us
        </Link>
        <Link
          className="text-on-surface-variant hover:text-primary transition-colors"
          to="/careers"
        >
          Careers
        </Link>
      </div>
      <p className="text-on-surface-variant text-sm text-center">
        © 2026 HomeEase. Crafted for the tactile hearth.
      </p>
      <div className="flex gap-4 mt-4">
        <a
          className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary-container transition-colors"
          href="#"
        >
          <Share2 size={20} className="text-primary" />
        </a>
        <a
          className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary-container transition-colors"
          href="#"
        >
          <Globe size={20} className="text-primary" />
        </a>
      </div>
    </footer>
  );
};

export default LandingFooter;