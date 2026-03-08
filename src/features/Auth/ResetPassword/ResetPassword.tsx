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

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [resetPassword] = useResetPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(ResetPasswordSchema),
  });

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
            <InputPassword inputname="password" {...register("password")} error={errors.password} />
          </div>

          <div className="reset-field">
            <InputPassword
              inputname="confirmPassword"
              {...register("confirmPassword")}
              error={errors.confirmPassword}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn-secondary reset-submit ${isSubmitting ? "loading" : ""}`}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};
