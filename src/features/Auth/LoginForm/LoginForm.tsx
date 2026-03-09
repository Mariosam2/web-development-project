import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useLoginMutation } from "@src/store/api/authApi";
import { InputPassword } from "@src/shared/components/InputPassword/InputPassword";
import "./LoginForm.css";
import { NavLink } from "react-router";
import { GoogleButton } from "@src/shared/components/GoogleButton/GoogleButton";
import { useEffect, useState } from "react";

const LoginSchema = z.object({
  identifier: z.string().min(1, "Email or username is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
});

type LoginForm = z.infer<typeof LoginSchema>;

export const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [showLoading, setShowLoading] = useState(false);
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
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

  const onSubmit = async (data: LoginForm) => {
    try {
      const isEmail = data.identifier.includes("@");
      const payload = isEmail
        ? { email: data.identifier, password: data.password }
        : { username: data.identifier, password: data.password };

      await login(payload).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="pt-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="identifier" className="block mb-2 text-sm font-medium">
          Email or Username
        </label>
        <input
          type="text"
          id="identifier"
          {...register("identifier")}
          onChange={() => clearErrors("identifier")}
          placeholder="example@mail.com or username"
          className={`bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl p-2.5 focus:outline-none ${errors.identifier ? "border-red-500" : ""}`}
        />
        <span
          className={`block h-4 text-red-500 text-xs transition-opacity duration-200 ${errors.identifier ? "opacity-100" : "opacity-0"}`}>
          {errors.identifier?.message ?? "\u00A0"}
        </span>
      </div>
      <InputPassword
        inputname="password"
        {...register("password")}
        onChange={() => clearErrors("password")}
        error={errors.password}
      />
      <NavLink
        to="/forgot-password"
        className="text-sm text-c-dark-gray underline text-left inline-block cursor-pointer mt-1.5">
        Forgot Password
      </NavLink>
      <button
        type="submit"
        disabled={showLoading}
        className={`btn-secondary w-full mt-12 rounded-2xl px-4 py-3 ${showLoading ? "loading" : ""}`}>
        Sign In
      </button>
      <div className="auth-divider">
        <span>or</span>
      </div>
      <GoogleButton />
    </form>
  );
};
