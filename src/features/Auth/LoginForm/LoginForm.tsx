import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useLoginMutation } from "@src/store/api/authApi";
import { InputPassword } from "@src/shared/components/InputPassword/InputPassword";
import "./LoginForm.css";
import { NavLink } from "react-router";

const LoginSchema = z.object({
  identifier: z.string().min(1, "Email or username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof LoginSchema>;

export const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

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
          placeholder="example@mail.com or username"
          className={`bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl p-3 focus:outline-none ${errors.identifier ? "border-red-500" : ""}`}
        />
        {errors.identifier && <span className="text-red-500">{errors.identifier.message}</span>}
      </div>
      <InputPassword inputname="password" {...register("password")} error={errors.password} />
      <NavLink
        to="/forgot-password"
        className="text-sm text-c-dark-gray underline text-left inline-block cursor-pointer mt-1.5">
        Forgot Password
      </NavLink>
      <button
        type="submit"
        className={`btn-secondary w-full mt-12 rounded-2xl px-4 py-3 ${isLoading ? "loading" : ""}`}>
        Sign In
      </button>
    </form>
  );
};
