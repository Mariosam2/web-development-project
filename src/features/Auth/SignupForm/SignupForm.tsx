import { InputPassword } from "@src/shared/components/InputPassword/InputPassword";
import "./SignupForm.css";
import { useRegisterMutation } from "@src/store/api/authApi";
import { RegisterSchema } from "@src/shared/schema/RegisterSchema";
import type { RegisterForm } from "@src/shared/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const SignupForm = () => {
  const [signup, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
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

  const onSubmit = async (data: RegisterForm) => {
    try {
      await signup(data).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="pt-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-heading grid grid-cols-2 gap-3">
          <div className="form-group">
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium">
              Firstname
            </label>
            <input
              type="text"
              id="first_name"
              {...register("firstname")}
              className={`bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl p-3 focus:outline-none ${errors.firstname ? "border-red-500" : ""}`}
              placeholder="John"
            />
            {errors.firstname && <span className="text-red-500">{errors.firstname.message}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium">
              Lastname
            </label>
            <input
              type="text"
              id="last_name"
              {...register("lastname")}
              className={`bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl p-3 focus:outline-none ${errors.lastname ? "border-red-500" : ""}`}
              placeholder="Doe"
            />
            {errors.lastname && <span className="text-red-500">{errors.lastname.message}</span>}
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
            className={`bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl p-3 focus:outline-none ${errors.username ? "border-red-500" : ""}`}
          />
          {errors.username && <span className="text-red-500">{errors.username.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email
          </label>
          <input
            type="text"
            id="email"
            {...register("email")}
            className={`bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl p-3 focus:outline-none ${errors.email ? "border-red-500" : ""}`}
            placeholder="example@mail.com"
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>

        <InputPassword
          inputname="password"
          {...register("password")}
          error={errors.password || errors.confirmPassword}
        />
        <InputPassword
          inputname="confirm-password"
          {...register("confirmPassword")}
          error={errors.confirmPassword || errors.confirmPassword}
        />
        <button
          type="submit"
          className={`btn-secondary w-full mt-12 rounded-2xl px-4 py-3 ${isLoading || isSubmitting ? "loading" : ""}`}>
          Sign Up
        </button>
      </form>
    </>
  );
};
