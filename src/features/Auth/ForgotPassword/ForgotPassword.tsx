import { useEffect, useState } from "react";
import "./ForgotPassword.css";
import { useForgotPasswordMutation } from "@src/store/api/authApi";
import { NavLink } from "react-router";
import LogoIcon from "@assets/logo-icon.svg";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [showLoading, setShowLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email format");
      return;
    }
    try {
      setEmailError("");
      await forgotPassword({ email }).unwrap();
      setEmail("");
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isLoading) {
      timer = setTimeout(() => setShowLoading(true), 0);
    } else if (!isLoading) {
      timer = setTimeout(() => setShowLoading(false), 500);
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div className="reset-page p-3">
      <div className="reset-card p-6 md:p-8">
        <div className="reset-logo max-w-max rounded-2xl mx-auto">
          <img id="logo-icon" className="max-w-full h-auto" width={60} height={60} src={LogoIcon} alt="logo icon" />
        </div>
        <h1 className="reset-title">Forgot password</h1>
        <p className="reset-subtitle">Enter your email and we'll send you a reset link.</p>

        <form onSubmit={handleSubmit} className="reset-form">
          <div className="reset-field">
            <label className="reset-label">Email</label>
            <div
              className={`input-wrapper bg-white border w-full c-shadow-premium text-c-dark text-base rounded-xl relative transition-all duration-200 focus-within:border-c-yellow-500 focus-within:shadow-[0_0_0_3px_rgba(243,255,150,0.2)] ${emailError ? "border-red-500" : "border-c-gray"}`}>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(undefined);
                }}
                placeholder="example@mail.com"
                className="focus:outline-none p-3 w-full"
              />
            </div>
            <span
              className={`block h-4 text-red-500 text-xs transition-opacity duration-200 ${emailError ? "opacity-100" : "opacity-0"}`}>
              {emailError ?? "\u00A0"}
            </span>
          </div>

          <button
            type="submit"
            disabled={showLoading}
            className={`btn-secondary reset-submit ${showLoading ? "loading" : ""}`}>
            Send reset link
          </button>
          <div className="reset-divider">
            <span>or</span>
          </div>

          <NavLink to="/login" className="reset-back">
            Back to login
          </NavLink>
        </form>
      </div>
    </div>
  );
};
