import { InputPassword } from "@src/shared/components/InputPassword/InputPassword";
import "./SignupForm.css";
import { useRegisterMutation } from "@src/store/api/authApi";
import { RegisterSchema } from "@src/shared/schema/RegisterSchema";
import type { RegisterForm } from "@src/shared/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleButton } from "@src/shared/components/GoogleButton/GoogleButton";
import { useEffect, useState } from "react";

export const SignupForm = () => {
  const [signup, { isLoading }] = useRegisterMutation();
  const [showLoading, setShowLoading] = useState(false);
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
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

  const onSubmit = async (data: RegisterForm) => {
    try {
      await signup(data).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="pt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-heading grid  grid-cols-1 sm:grid-cols-2 gap-x-3">
          <div className="form-group">
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium">
              Firstname
            </label>
            <input
              type="text"
              id="first_name"
              {...register("firstname")}
              onChange={() => clearErrors("firstname")}
              className={`bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl p-2.5 focus:outline-none ${errors.firstname ? "border-red-500" : ""}`}
              placeholder="John"
            />
            <span
              className={`block h-4 text-red-500 text-xs transition-opacity duration-200 ${errors.firstname ? "opacity-100" : "opacity-0"}`}>
              {errors.firstname?.message ?? "\u00A0"}
            </span>
          </div>
          <div className="form-group">
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium">
              Lastname
            </label>
            <input
              type="text"
              id="last_name"
              {...register("lastname")}
              onChange={() => clearErrors("lastname")}
              className={`bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl p-2.5 focus:outline-none ${errors.lastname ? "border-red-500" : ""}`}
              placeholder="Doe"
            />
            <span
              className={`block h-4 text-red-500 text-xs transition-opacity duration-200 ${errors.lastname ? "opacity-100" : "opacity-0"}`}>
              {errors.lastname?.message ?? "\u00A0"}
            </span>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="username" className="block mb-2 text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register("username")}
            onChange={() => clearErrors("username")}
            className={`bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl p-2.5 focus:outline-none ${errors.username ? "border-red-500" : ""}`}
          />
          <span
            className={`block h-4 text-red-500 text-xs transition-opacity duration-200 ${errors.username ? "opacity-100" : "opacity-0"}`}>
            {errors.username?.message ?? "\u00A0"}
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email
          </label>
          <input
            type="text"
            id="email"
            {...register("email")}
            onChange={() => clearErrors("username")}
            className={`bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl p-2.5 focus:outline-none ${errors.email ? "border-red-500" : ""}`}
            placeholder="example@mail.com"
          />
          <span
            className={`block h-4 text-red-500 text-xs transition-opacity duration-200 ${errors.email ? "opacity-100" : "opacity-0"}`}>
            {errors.email?.message ?? "\u00A0"}
          </span>
        </div>

        <InputPassword
          inputname="password"
          {...register("password")}
          onChange={() => clearErrors("password")}
          error={errors.password || errors.confirmPassword}
        />
        <InputPassword
          inputname="confirm-password"
          {...register("confirmPassword")}
          onChange={() => clearErrors("confirmPassword")}
          error={errors.confirmPassword || errors.confirmPassword}
        />
        <button
          type="submit"
          disabled={showLoading}
          className={`btn-secondary w-full mt-4 rounded-2xl px-4 py-3 ${showLoading ? "loading" : ""}`}>
          Signup
        </button>
        <div className="auth-divider">
          <span>or</span>
        </div>
        <GoogleButton />
      </form>
    </>
  );
};
