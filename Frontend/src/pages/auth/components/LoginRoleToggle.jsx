import React from "react";

const LoginRoleToggle = ({ role, setRole }) => {
  return (
    <div className="px-10 mb-8">
      <div className="flex p-1 bg-surface-container-high rounded-full">
        <button
          type="button"
          onClick={() => setRole("user")}
          className={`flex-1 py-3 px-4 rounded-full text-sm font-bold transition-all ${
            role === "user"
              ? "bg-primary text-on-primary shadow-sm"
              : "text-on-surface-variant hover:text-primary"
          }`}
        >
          I need help
        </button>
        <button
          type="button"
          onClick={() => setRole("worker")}
          className={`flex-1 py-3 px-4 rounded-full text-sm font-bold transition-all ${
            role === "worker"
              ? "bg-primary text-on-primary shadow-sm"
              : "text-on-surface-variant hover:text-primary"
          }`}
        >
          I want to help
        </button>
      </div>
    </div>
  );
};

export default LoginRoleToggle;