/** @format */
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useForgotPassword } from "../../hooks/changePasswordHooks";
import { useState } from "react";
import { SendOtpButton } from "./SendOtpButton";
import { FaArrowLeft } from "react-icons/fa";
import { emailSchema } from "../../constaint/formSchema";

const forgotPasswordSchema = yup.object().shape({
  email: emailSchema,
});

interface EmailSendedMessageProps {
  email: string;
  setIsEmailSended: React.Dispatch<React.SetStateAction<boolean>>;
}
const EmailSendedMessage: React.FC<EmailSendedMessageProps> = ({
  email,
  setIsEmailSended,
}) => {
  return (
    <>
      {/* re-enter email */}
      <button
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => setIsEmailSended(false)}>
        <FaArrowLeft />
        Re-enter email
      </button>
      {/* message */}
      <p className="text-brand-red">
        Check your email to get reset password link
      </p>
      {/* send otp again */}
      <p className="text-xl text-center space-y-1">
        Didn't receive email?{" "}
        <SendOtpButton email={email} hook={useForgotPassword} />
      </p>
    </>
  );
};

function ForgotPasswordForm() {
  // 1. set up from
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgotPasswordSchema) });
  const [isEmailSended, setIsEmailSended] = useState(false);
  const [email, setEmail] = useState("");

  // 2. set up send forget pass request
  const { mutate, isPending, isError, error } = useForgotPassword();

  // 3. hanlde form submit
  function onSubmit(data: { email: string }) {
    setEmail(data.email);
    mutate(
      {
        email: data.email,
      },
      {
        onSuccess: () => {
          setIsEmailSended(true);
        },
      }
    );
  }

  if (isEmailSended)
    return (
      <EmailSendedMessage email={email} setIsEmailSended={setIsEmailSended} />
    );

  return (
    <>
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <p className="w-[30rem] text-xl">
          Provide the email address associated with your account to recover your
          password.
        </p>

        <div>
          <label className="label">*Email</label>
          <input
            {...register("email")}
            placeholder="you@example.com"
            className={`input w-[30rem] ${isPending && "input-disable"}`}
            disabled={isPending}
          />
          {errors.email && (
            <p className="error-message">*{errors.email.message}</p>
          )}
        </div>

        {isError && (
          <p className="error-message w-[30rem]">*{(error as Error).message}</p>
        )}

        <button
          disabled={isPending}
          className={`btn primary-btn w-full ${
            isPending && "primary-btn-disable"
          }`}>
          Submit
        </button>
      </form>
    </>
  );
}

export default ForgotPasswordForm;
