/** @format */

import {
  FieldValues,
  FieldErrors,
  UseFormRegister,
  Path,
} from "react-hook-form";

interface GeneralInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  isPending: boolean;
  errors: FieldErrors<T>;
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "email";
  width?: string;
  value?: string;
}

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

  return (
    <div>
      {label && <label className="label">{label}</label>}
      <input
        {...register(name)}
        type={type}
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
      {error && (
        <p className="error-message">
          *{(error.message as string) || "Invalid input"}
        </p>
      )}
    </div>
  );
};

export const TextAreaField = <T extends FieldValues>({
  register,
  name,
  isPending,
  errors,
  label = "",
  placeholder = "",
  value = "",
}: GeneralInputProps<T>) => {
  const error = errors[name];

  return (
    <div className="flex-1">
      {label && <label className="label">{label}</label>}
      <textarea
        defaultValue={value}
        {...register(name)}
        placeholder={placeholder}
        className={`input rounded-4xl resize-none overflow-hidden ${
          isPending ? "input-disable" : ""
        }`}
        disabled={isPending}
        // auto expland heigh
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto";
          target.style.height = `${target.scrollHeight}px`;
        }}
        rows={1}
      />
      {error && (
        <p className="error-message">
          *{(error.message as string) || "Invalid input"}
        </p>
      )}
    </div>
  );
};
