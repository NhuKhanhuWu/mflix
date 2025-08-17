/** @format */

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useResetPassword } from "../../hooks/auth/changePasswordHooks";
import {
  passwordConfirmSchema,
  passwordSchema,
} from "../../constaint/formSchema";
import { InputField } from "../../ui/common/Input";
import SubmitBtn from "../../ui/common/SubmitBtn";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const resetPassSchema = yup.object().shape({
  password: passwordSchema,
  passwordConfirm: passwordConfirmSchema,
});

interface resetPassFormProps {
  password: string;
  passwordConfirm: string;
}

function ResetPasswordForm() {
  // 1. set up form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetPassSchema) });

  // set up send request
  const { token } = useParams();
  const { mutate, isPending } = useResetPassword();
  const navigate = useNavigate();

  //  handle submit form
  function onSubmit(data: resetPassFormProps) {
    mutate(
      { password: data.password, passwordConfirm: data.passwordConfirm, token },
      {
        onSuccess: () => {
          // redirect to login page
          navigate("/login");
        },
        onError: (error) => {
          toast.error(error.message || "Something went wrong 😢");
        },
      }
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        errors={errors}
        isPending={isPending}
        label="*Password"
        name="password"
        register={register}
        placeholder="Your password"
        type="password"
      />

      <InputField
        errors={errors}
        isPending={isPending}
        label="*Password confirm"
        name="passwordConfirm"
        register={register}
        placeholder="Password confirm"
        type="password"
      />

      <SubmitBtn btnTxt="Submit" isPending={isPending} />
    </form>
  );
}

export default ResetPasswordForm;
