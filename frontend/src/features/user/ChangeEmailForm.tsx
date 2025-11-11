/** @format */
import * as yup from "yup";
import { emailSchema, passwordSchema } from "../../constaint/formSchema";
import { InputField } from "../../ui/common/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SubmitBtn from "../../ui/common/SubmitBtn";
import { useChangeEmailReq } from "../../hooks/user/changeEmail";
import { useState } from "react";
import EmailSendedMessage from "../EmailSendedMessage";
import { SendOtpButton } from "../auth/SendOtpButton";
import { toast } from "react-toastify";

const formSchema = yup.object().shape({
  password: passwordSchema,
  email: emailSchema,
});

function ChangeEmailForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });
  const { mutate, isPending } = useChangeEmailReq();
  const [isEmailSended, setIsEmailSended] = useState(false);
  const [email, setEmail] = useState("");

  function onSubmit(data: { email: string; password: string }) {
    setEmail(data.email);
    mutate(
      { ...data },
      {
        onSuccess: () => {
          setIsEmailSended(true);
          reset();
        },
        onError: (error) => {
          toast.error(error.message || "Something went wrong 😢");
        },
      }
    );
  }

  if (isEmailSended) {
    return (
      <EmailSendedMessage
        email={email}
        setIsEmailSended={setIsEmailSended}
        resendButton={<SendOtpButton email={email} hook={useChangeEmailReq} />}
      />
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        type="password"
        label="Password*"
        placeholder="*******"
        register={register}
        name="password"
        isPending={false}
        errors={errors}
      />
      <InputField
        label="New Email*"
        placeholder="example@gmail.com"
        register={register}
        name="email"
        isPending={false}
        errors={errors}
      />

      <SubmitBtn btnTxt="Send request" isPending={isPending} />
    </form>
  );
}

export default ChangeEmailForm;
