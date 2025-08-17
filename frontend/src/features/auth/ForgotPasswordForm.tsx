/** @format */
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useForgotPassword } from "../../hooks/auth/changePasswordHooks";
import { useState } from "react";
import { SendOtpButton } from "./SendOtpButton";
import { emailSchema } from "../../constaint/formSchema";
import EmailSendedMessage from "../EmailSendedMessage";
import { InputField } from "../../ui/common/Input";
import { toast } from "react-toastify";

const forgotPasswordSchema = yup.object().shape({
  email: emailSchema,
});

function ForgotPasswordForm() {
  // 1. set up from
  const {
    register,
    handleSubmit,
    formState: { errors: formErr },
  } = useForm({ resolver: yupResolver(forgotPasswordSchema) });
  const [isEmailSended, setIsEmailSended] = useState(false);
  const [email, setEmail] = useState("");

  // 2. set up send forget pass request
  const { mutate, isPending } = useForgotPassword();

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
        onError: (error) => {
          toast.error(error.message || "Something went wrong 😢");
        },
      }
    );
  }

  if (isEmailSended)
    return (
      <EmailSendedMessage
        resendButton={<SendOtpButton email={email} hook={useForgotPassword} />}
        email={email}
        setIsEmailSended={setIsEmailSended}
      />
    );

  return (
    <>
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <p className="w-[30rem] text-xl">
          Provide the email address associated with your account to recover your
          password.
        </p>

        <InputField
          errors={formErr}
          isPending={isPending}
          name="email"
          register={register}
          label="*Email"
          placeholder="example@gmail.com"
        />

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
