import React from "react";
import { Apple } from "lucide-react";

const LoginSocialButtons = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        className="flex items-center justify-center gap-2 py-3 px-4 bg-surface-container rounded-full font-bold text-sm text-on-surface-variant hover:bg-surface-variant transition-colors"
        type="button"
      >
        <img
          alt="Google"
          className="w-5 h-5 grayscale opacity-70"
          src="https://www.google.com/favicon.ico"
        />
        Google
      </button>
      <button
        className="flex items-center justify-center gap-2 py-3 px-4 bg-surface-container rounded-full font-bold text-sm text-on-surface-variant hover:bg-surface-variant transition-colors"
        type="button"
      >
        <Apple className="text-lg" size={18} />
        Apple
      </button>
    </div>
  );
};

export default LoginSocialButtons;