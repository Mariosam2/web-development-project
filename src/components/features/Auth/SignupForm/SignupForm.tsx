import { InputPassword } from "@src/shared/ui/InputPassword";
import "./SignupForm.css";
import { useRegisterMutation } from "@src/store/api/authApi";
import { useState } from "react";
import { RegisterSchema } from "@src/shared/schema/RegisterSchema";
import { getValidationErrors } from "@src/shared/helpers";
export const SignupForm = () => {
  const [firstname, setFirstame] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const [register, { isLoading }] = useRegisterMutation();
  const submitRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { firstname, lastname, username, email, password, confirmPassword };

    const validation = RegisterSchema.safeParse(payload);
    if (!validation.success) {
      let validationErrors;
      if (password !== confirmPassword) {
        validationErrors = { ...getValidationErrors(validation), confirmPassword: "Passwords do not match" };
      } else {
        validationErrors = getValidationErrors(validation);
      }
      setValidationErrors(validationErrors);
      return;
    }

    setValidationErrors({});

    await register(payload);
  };

  return (
    <>
      <form className="pt-8" onSubmit={submitRegister}>
        <div className="form-heading grid grid-cols-2 gap-3">
          <div className="form-group">
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium">
              Firstname
            </label>
            <input
              type="text"
              id="first_name"
              value={firstname}
              onChange={(e) => setFirstame(e.target.value)}
              className={`bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl p-3 focus:outline-none ${validationErrors.firstname ? "border-red-500" : ""}`}
              placeholder="John"
            />
            {validationErrors.firstname && <span className="text-red-500">{validationErrors.firstname}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium">
              Lastname
            </label>
            <input
              type="text"
              id="last_name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className={`bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl p-3 focus:outline-none ${validationErrors.lastname ? "border-red-500" : ""}`}
              placeholder="Doe"
            />
            {validationErrors.lastname && <span className="text-red-500">{validationErrors.lastname}</span>}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="username" className="block mb-2 text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl p-3 focus:outline-none ${validationErrors.username ? "border-red-500" : ""}`}
          />
          {validationErrors.username && <span className="text-red-500">{validationErrors.username}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl p-3 focus:outline-none ${validationErrors.email ? "border-red-500" : ""}`}
            placeholder="example@mail.com"
          />
          {validationErrors.email && <span className="text-red-500">{validationErrors.email}</span>}
        </div>

        <InputPassword
          inputName="password"
          error={validationErrors.password || validationErrors.form}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputPassword
          inputName="confirm-password"
          error={validationErrors.confirmPassword || validationErrors.form}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className={`btn-secondary w-full mt-12 rounded-2xl px-4 py-3 ${isLoading ? "loading" : ""}`}>
          Sign Up
        </button>
      </form>
    </>
  );
};
