import React from "react";
import { BadgeCheck, Heart, ShieldAlert } from "lucide-react";

const SignupTrustBadges = () => {
  return (
    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
      <div className="flex items-center gap-2">
        <BadgeCheck className="text-primary" size={20} />
        <span className="text-xs font-bold tracking-widest uppercase">
          Secure ID
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Heart className="text-primary" size={20} />
        <span className="text-xs font-bold tracking-widest uppercase">
          Trusted Hub
        </span>
      </div>
      <div className="flex items-center gap-2">
        <ShieldAlert className="text-primary" size={20} />
        <span className="text-xs font-bold tracking-widest uppercase">
          Privacy First
        </span>
      </div>
    </div>
  );
};

export default SignupTrustBadges;