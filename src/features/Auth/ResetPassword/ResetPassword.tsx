import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ResetPasswordForm } from "@src/shared/types";
import { ResetPasswordSchema } from "@src/shared/schema/ResetPasswordSchema";
import LogoIcon from "@assets/logo-icon.svg";
import "./ResetPassword.css";
import { useNavigate, useSearchParams } from "react-router";
import { useResetPasswordMutation } from "@src/store/api/authApi";
import { InputPassword } from "@src/shared/components/InputPassword/InputPassword";
import { showToast } from "@src/shared/helpers";
import { ToastType } from "@src/shared/enums/ToastType.enum";
import { useEffect, useState } from "react";

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [showLoading, setShowLoading] = useState(false);
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isLoading || isSubmitting) {
      timer = setTimeout(() => setShowLoading(true), 0);
    } else if (!isLoading && !isSubmitting) {
      timer = setTimeout(() => setShowLoading(false), 500);
    }

    return () => clearTimeout(timer);
  }, [isLoading, isSubmitting]);

  const onSubmit = async (data: ResetPasswordForm) => {
    try {
      if (!token) {
        showToast("Error", "Token not found", ToastType.DANGER);
        return;
      }
      await resetPassword({ token, password: data.password }).unwrap();
      navigate("/login");
    } catch (err) {
      console.error("error", err);
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-card">
        <div className="reset-logo max-w-max rounded-2xl mx-auto">
          <img id="logo-icon" className="max-w-full h-auto" width={60} height={60} src={LogoIcon} alt="logo icon" />
        </div>

        <h1 className="reset-title">New password</h1>
        <p className="reset-subtitle">Choose a strong password for your account.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="reset-form">
          <div className="reset-field">
            <InputPassword
              inputname="password"
              {...register("password")}
              onChange={() => clearErrors("password")}
              error={errors.password}
            />
          </div>

          <div className="reset-field">
            <InputPassword
              inputname="confirmPassword"
              {...register("confirmPassword")}
              onChange={() => clearErrors("confirmPassword")}
              error={errors.confirmPassword}
            />
          </div>

          <button
            type="submit"
            disabled={showLoading}
            className={`btn-secondary reset-submit ${showLoading ? "loading" : ""}`}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};
