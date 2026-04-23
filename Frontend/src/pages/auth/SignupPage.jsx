import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignupHeader from "./components/SignupHeader";
import SignupEditorial from "./components/SignupEditorial";
import SignupRoleSelection from "./components/SignupRoleSelection";
import SignupForm from "./components/SignupForm";
import SignupTrustBadges from "./components/SignupTrustBadges";
import SignupFooter from "./components/SignupFooter";

const SignupPage = () => {
  const [role, setRole] = useState("user");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get("role");
    if (roleParam === "worker" || roleParam === "user") {
      setRole(roleParam);
    }
  }, [location]);

  const handleSignup = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    sessionStorage.setItem("user", JSON.stringify({
      id: "1",
      name: formData.name,
      email: formData.email,
      role: role,
    }));
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-background">
      <SignupHeader />

      <main className="flex-grow flex items-center justify-center relative px-6 py-12">
        <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-secondary-container opacity-20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[35rem] h-[35rem] bg-primary-container opacity-10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <SignupEditorial />

          <div className="md:col-span-7">
            <div className="bg-surface-container-low p-8 md:p-12 rounded-xl shadow-atmospheric relative">
              <div className="flex gap-2 mb-10">
                <div className={`h-1.5 w-16 rounded-full ${step >= 1 ? "bg-primary" : "bg-surface-variant"}`}></div>
                <div className={`h-1.5 w-16 rounded-full ${step >= 2 ? "bg-primary" : "bg-surface-variant"}`}></div>
                <div className={`h-1.5 w-16 rounded-full ${step >= 3 ? "bg-primary" : "bg-surface-variant"}`}></div>
              </div>

              {step === 1 ? (
                <SignupRoleSelection setRole={setRole} setStep={setStep} />
              ) : (
                <SignupForm
                  role={role}
                  setStep={setStep}
                  formData={formData}
                  setFormData={setFormData}
                  handleSignup={handleSignup}
                />
              )}
            </div>
          </div>
        </div>

        <SignupTrustBadges />
      </main>

      <SignupFooter />
    </div>
  );
};

export default SignupPage;