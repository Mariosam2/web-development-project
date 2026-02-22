import { useState, type ReactElement } from "react";
import { EyeClosed } from "./EyeClosed";
import { EyeOpen } from "./EyeOpen";
import { capitalize } from "../helpers";
import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";

interface ShowEyeProps {
  closed: boolean;
  className: string;
  size: number;
  onClick: () => void;
}
const ShowEye = ({ closed, className, size, onClick }: ShowEyeProps): ReactElement => {
  return (
    <div className="eye-wrapper cursor-pointer" onClick={onClick}>
      {closed ? <EyeClosed size={size} className={className} /> : <EyeOpen size={size} className={className} />}
    </div>
  );
};

interface InputPasswordProps {
  inputname: string;
  error: FieldError | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(({ error, ...rest }, ref) => {
  const [closed, setClosed] = useState(true);
  const type = closed ? "password" : "text";

  return (
    <div className="form-group">
      <label htmlFor={rest.inputname} className="block mb-2 text-sm font-medium ">
        {capitalize(rest.inputname).replace("-", " ")}
      </label>
      <div
        className={`input-wrapper bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl relative ${error ? "border-red-500" : ""} `}>
        <input type={type} id={rest.inputname} className=" focus:outline-none  p-3" ref={ref} {...rest} />
        <ShowEye closed={closed} className="absolute top-3 right-3" size={6} onClick={() => setClosed(!closed)} />
      </div>
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
});
