/** @format */

import { useForm } from "react-hook-form";
import {
  passwordConfirmSchema,
  passwordSchema,
} from "../../constaint/formSchema";
import { useChangePassword } from "../../hooks/user/useChangePassword";
import { InputField } from "../../ui/common/Input";
import * as yup from "yup";
import SubmitBtn from "../../ui/common/SubmitBtn";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const formSchema = yup.object().shape({
  currPassword: passwordSchema,
  password: passwordSchema,
  passwordConfirm: passwordConfirmSchema,
});

interface formProps {
  currPassword: string;
  password: string;
  passwordConfirm: string;
}

function ChangePasswordForm() {
  const { mutate, isPending } = useChangePassword(); // call api

  // manage form
  const {
    register,
    handleSubmit,
    formState: { errors: formErr },
    reset,
  } = useForm({ resolver: yupResolver(formSchema) });

  // form submit handler
  function onSubmit(data: formProps) {
    mutate(
      { ...data },
      {
        onSuccess: () => {
          toast.success("Password changed successfully!"); // show message
          reset(); // reset form
        },
        onError: (error) => {
          toast.error(error.message || "Something went wrong 😢");
        },
      }
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {/* current password */}
      <InputField
        type="password"
        placeholder="********"
        label="*Password"
        register={register}
        name="currPassword"
        errors={formErr}
        isPending={isPending}></InputField>

      {/* new password */}
      <InputField
        type="password"
        placeholder="********"
        label="*New Password"
        register={register}
        name="password"
        errors={formErr}
        isPending={isPending}></InputField>

      {/* new password confirm */}
      <InputField
        type="password"
        placeholder="********"
        label="*New Password Confirm"
        register={register}
        name="passwordConfirm"
        errors={formErr}
        isPending={isPending}></InputField>

      <SubmitBtn btnTxt="submit" isPending={isPending} />
    </form>
  );
}

export default ChangePasswordForm;
