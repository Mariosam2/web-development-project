import React, { useState } from "react";
import "./LoginForm.css";

import { useLoginMutation } from "@src/store/api/authApi";
import { LoginSchema } from "@src/shared/schema/LoginSchema";
import { getValidationErrors } from "@src/shared/helpers";
export const LoginForm = () => {
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const [login, { isLoading }] = useLoginMutation();
  const submitLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmail = identifier.includes("@");
    console.log("password", password);
    const payload = isEmail
      ? { email: identifier || undefined, password }
      : { username: identifier || undefined, password };

    const validation = LoginSchema.safeParse(payload);

    if (!validation.success) {
      setValidationErrors(getValidationErrors(validation));
      return;
    }

    setValidationErrors({});

    await login(payload);
  };

  return (
    <>
      <form className="pt-8" onSubmit={(e) => submitLogin(e)}>
        <div className="form-group">
          <label htmlFor="identifier" className="block mb-2 text-sm font-medium">
            Email or Username
          </label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value.trim())}
            placeholder="example@mail.com or username"
            className={`bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl p-3 focus:outline-none ${validationErrors.identifier || validationErrors.form ? "border-red-500" : ""}`}
          />
          {validationErrors.identifier ||
            (validationErrors.form && (
              <span className="text-red-500">{validationErrors.identifier || validationErrors.form}</span>
            ))}
        </div>
        <div className="form-group">
          <label htmlFor="password" className="block mb-2 text-sm font-medium ">
            Password
          </label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            className={`bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl p-3 focus:outline-none ${validationErrors.password ? "border-red-500" : ""}`}
          />
          {validationErrors.password && <span className="text-red-500">{validationErrors.password}</span>}
        </div>
        <button
          type="submit"
          className={`btn-secondary w-full mt-12 rounded-2xl px-4 py-3 ${isLoading ? "loading" : ""}`}>
          Sign In
        </button>
      </form>
    </>
  );
};
