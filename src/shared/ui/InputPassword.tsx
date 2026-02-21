import { useState, type ReactElement } from "react";
import { EyeClosed } from "./EyeClosed";
import { EyeOpen } from "./EyeOpen";
import { capitalize } from "../helpers";

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
  inputName: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputPassword = ({ inputName, error, onChange }: InputPasswordProps) => {
  const [closed, setClosed] = useState(true);
  const type = closed ? "password" : "text";

  return (
    <div className="form-group">
      <label htmlFor={inputName} className="block mb-2 text-sm font-medium ">
        {capitalize(inputName).replace("-", " ")}
      </label>
      <div
        className={`input-wrapper bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl relative ${error ? "border-red-500" : ""} `}>
        <input type={type} id={inputName} className=" focus:outline-none  p-3" onChange={onChange} />
        <ShowEye closed={closed} className="absolute top-3 right-3" size={6} onClick={() => setClosed(!closed)} />
      </div>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};
