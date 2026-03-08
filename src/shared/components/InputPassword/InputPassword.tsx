import { useState, type ReactElement } from "react";
import { EyeClosed } from "../../ui/EyeClosed";
import { EyeOpen } from "../../ui/EyeOpen";
import { capitalize } from "../../helpers";
import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";
import "./InputPassword.css";

interface ShowEyeProps {
  closed: boolean;
  className: string;
  onClick: () => void;
}
const ShowEye = ({ closed, className, onClick }: ShowEyeProps): ReactElement => {
  return (
    <div className="eye-wrapper cursor-pointer" onClick={onClick}>
      {closed ? <EyeClosed className={className} /> : <EyeOpen className={className} />}
    </div>
  );
};

interface InputPasswordProps {
  inputname: string;
  error: FieldError | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(({ error, onChange, ...rest }, ref) => {
  const [closed, setClosed] = useState(true);
  const type = closed ? "password" : "text";

  return (
    <div className="form-group">
      <label htmlFor={rest.inputname} className="block mb-2 text-sm font-medium ">
        {capitalize(rest.inputname).replace("-", " ")}
      </label>
      <div
        className={`input-wrapper bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl relative ${error ? "border-red-500" : ""} `}>
        <input
          type={type}
          id={rest.inputname}
          onChange={onChange}
          className=" focus:outline-none  p-3 w-full"
          ref={ref}
          {...rest}
        />
        <ShowEye closed={closed} className="absolute top-3 right-3 size-6" onClick={() => setClosed(!closed)} />
      </div>
      <span
        className={`block h-4 text-red-500 text-xs transition-opacity duration-200 ${error ? "opacity-100" : "opacity-0"}`}>
        {error?.message ?? "\u00A0"}
      </span>
    </div>
  );
});
