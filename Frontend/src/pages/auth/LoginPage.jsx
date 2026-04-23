import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get("role");
    if (roleParam === "worker" || roleParam === "user") {
      setRole(roleParam);
    }
  }, [location]);

  const handleLogin = (e) => {
    e.preventDefault();
    let userRole = role;
    let userName = role === "user" ? "John Doe" : "Jane Smith";

    if (email === "admin@homeease.com") {
      userRole = "admin";
      userName = "Alex Thompson";
    }

    sessionStorage.setItem("user", JSON.stringify({ id: "1", name: userName, email, role: userRole }));
    navigate(`/${userRole}/dashboard`);
  };

  return (
    <div className="bg-fabric font-body text-on-surface min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center px-6 py-12 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary-container opacity-40 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-container opacity-30 rounded-full blur-3xl -z-10"></div>

        <div className="relative w-full max-w-lg">
          <div className="bg-surface-container-lowest rounded-xl shadow-atmospheric overflow-hidden transition-all duration-300">
            <LoginHeader />
            <LoginRoleToggle role={role} setRole={setRole} />
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
            />
            <LoginFooter />
          </div>
        </div>
      </main>

      <footer className="w-full py-8 px-8 flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        <span className="text-sm font-medium text-on-surface-variant/60">
          © 2026 HomeEase. Crafted for the tactile hearth.
        </span>
        <div className="flex gap-8">
          <Link className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest hover:text-primary transition-colors" to="/privacy">
            Privacy
          </Link>
          <Link className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest hover:text-primary transition-colors" to="/terms">
            Terms
          </Link>
          <Link className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest hover:text-primary transition-colors" to="/contact">
            Contact
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;