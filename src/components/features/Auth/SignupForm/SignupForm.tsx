import "./SignupForm.css";
import { useNavigate } from "react-router";
export const SignupForm = () => {
  const navigate = useNavigate();
  const signup = () => {
    console.log("login");
    navigate("/dashboard");
  };

  return (
    <>
      <form className="container-xs pt-8" action="">
        <div className="form-heading grid grid-cols-2 gap-3">
          <div className="form-group">
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium ">
              Firstname
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl p-3 focus:outline-none"
              placeholder="John"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium ">
              Lastname
            </label>
            <input
              type="text"
              id="last_name"
              className="bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl p-3 focus:outline-none"
              placeholder="Doe"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email" className="block mb-2 text-sm font-medium ">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl p-3 focus:outline-none"
            placeholder="example@mail.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="block mb-2 text-sm font-medium ">
            Password
          </label>
          <input
            type="text"
            id="password"
            className="bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl p-3 focus:outline-none"
            required
          />
        </div>
        <button type="submit" onClick={signup} className="btn-secondary w-full mt-12 rounded-2xl px-4 py-3">
          Sign Up
        </button>
      </form>
    </>
  );
};
