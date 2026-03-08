import { useState } from "react";
import "./ForgotPassword.css";
import { useForgotPasswordMutation } from "@src/store/api/authApi";
import { NavLink } from "react-router";
import LogoIcon from "@assets/logo-icon.svg";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await forgotPassword({ email }).unwrap();
      setEmail("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-card">
        <div className="reset-logo max-w-max rounded-2xl mx-auto">
          <img id="logo-icon" className="max-w-full h-auto" width={60} height={60} src={LogoIcon} alt="logo icon" />
        </div>
        <h1 className="reset-title">Forgot password</h1>
        <p className="reset-subtitle">Enter your email and we'll send you a reset link.</p>

        <form onSubmit={handleSubmit} className="reset-form">
          <div className="reset-field">
            <label className="reset-label">Email</label>
            <div className="input-wrapper bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="focus:outline-none  p-3 w-full"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`btn-secondary reset-submit ${isLoading ? "loading" : ""}`}>
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
