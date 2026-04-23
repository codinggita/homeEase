import React from "react";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

const LoginFooter = () => {
  return (
    <>
      <div className="bg-surface-container-low py-6 px-10 text-center">
        <p className="text-sm font-medium text-on-surface-variant">
          New to HomeEase?
          <Link
            className="text-primary font-bold underline underline-offset-4 decoration-4 decoration-primary/20 hover:decoration-primary/60 transition-all ml-1"
            to="/signup"
          >
            Create an account
          </Link>
        </p>
      </div>

      {/* Floating Decorative Element */}
      <div className="absolute -right-12 -top-12 w-32 h-32 hidden lg:block opacity-80 -z-10">
        <div className="w-full h-full bg-tertiary-container rounded-xl flex items-center justify-center rotate-12 shadow-sm">
          <Leaf className="text-tertiary" size={32} />
        </div>
      </div>
    </>
  );
};

export default LoginFooter;