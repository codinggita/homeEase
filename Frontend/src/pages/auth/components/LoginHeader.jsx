import React from "react";
import { Home } from "lucide-react";

const LoginHeader = () => {
  return (
    <div className="pt-12 pb-8 px-10 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-container rounded-full mb-6">
        <Home className="text-primary" size={32} />
      </div>
      <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-primary-fixed mb-2">
        HomeEase
      </h1>
      <p className="text-on-surface-variant font-medium">
        Welcome back to your tactile hearth.
      </p>
    </div>
  );
};

export default LoginHeader;