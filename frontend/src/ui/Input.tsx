/** @format */

import { useState } from "react";
import {
  FieldValues,
  FieldErrors,
  UseFormRegister,
  Path,
} from "react-hook-form";
import { SetState } from "../interfaces/general";

interface ShowPassBtnProps {
  isShowPass: boolean;
  setIsShowPass: SetState<boolean>;
}

interface GeneralInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  isPending: boolean;
  errors: FieldErrors<T>;
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "email";
}

const ShowPassBtn: React.FC<ShowPassBtnProps> = ({
  isShowPass,
  setIsShowPass,
}) => {
  return (
    <button
      type="button"
      className="link block text-xl"
      onClick={() => setIsShowPass(!isShowPass)}>
      {isShowPass ? "Hide password" : "Show password"}
    </button>
  );
};

export const InputField = <T extends FieldValues>({
  register,
  name,
  isPending,
  errors,
  label = "",
  placeholder = "",
  type = "text",
}: GeneralInputProps<T>) => {
  const error = errors[name];
  const [isShowPass, setIsShowPass] = useState(false);
  const inputType = type === "password" && isShowPass ? "text" : type;

  return (
    <div>
      {label && <label className="label">{label}</label>}
      <input
        {...register(name)}
        type={inputType}
        placeholder={placeholder}
        className={`input w-[30rem] ${isPending ? "input-disable" : ""}`}
        disabled={isPending}
        {...(type === "password" && {
          autoComplete: "off",
          autoCorrect: "off",
          autoCapitalize: "off",
          spellCheck: false,
        })}
      />

      {/* show pass btn */}
      {type === "password" && (
        <ShowPassBtn isShowPass={isShowPass} setIsShowPass={setIsShowPass} />
      )}

      {/* error message */}
      {error && (
        <p className="error-message">
          *{(error.message as string) || "Invalid input"}
        </p>
      )}
    </div>
  );
};
