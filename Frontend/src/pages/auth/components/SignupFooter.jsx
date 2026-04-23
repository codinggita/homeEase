import React from "react";
import { Link } from "react-router-dom";

const SignupFooter = () => {
  return (
    <footer className="w-full py-12 px-8 flex flex-col items-center gap-6 mt-12 bg-surface-container-low">
      <div className="flex gap-8">
        <Link className="text-on-surface-variant hover:text-primary text-sm font-medium transition-colors" to="/privacy">Privacy Policy</Link>
        <Link className="text-on-surface-variant hover:text-primary text-sm font-medium transition-colors" to="/terms">Terms of Service</Link>
        <Link className="text-on-surface-variant hover:text-primary text-sm font-medium transition-colors" to="/contact">Contact Us</Link>
        <Link className="text-on-surface-variant hover:text-primary text-sm font-medium transition-colors" to="/careers">Careers</Link>
      </div>
      <p className="text-on-surface-variant text-sm font-medium opacity-70">
        © 2026 HomeEase. Crafted for the tactile hearth.
      </p>
    </footer>
  );
};

export default SignupFooter;