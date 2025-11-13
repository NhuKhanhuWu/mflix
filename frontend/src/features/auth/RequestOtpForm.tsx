/** @format */

import React from "react";
import { SetState } from "../../interfaces/general";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSendOtpRequest } from "../../hooks/auth/signupHooks";
import { Link } from "react-router-dom";
import { InputField } from "../../ui/common/Input";
import SubmitBtn from "../../ui/common/SubmitBtn";
import { toast } from "react-toastify";

interface setStepFuncInterface {
  setStep: SetState<number>;
  setEmail: SetState<string>;
}

const requestOtpSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
});

const RequestOtpForm: React.FC<setStepFuncInterface> = ({
  setStep,
  setEmail,
}) => {
  // 1. set up form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(requestOtpSchema) });

  //   2. send request
  const { mutate, isPending } = useSendOtpRequest();

  function onSubmit(data: { email: string }) {
    mutate(
      {
        email: data.email,
      },
      //   2.1. if success => update email state, move to next step
      {
        onSuccess: () => {
          setEmail(data.email);
          setStep(2);
        },
        onError: (error) => {
          toast.error(error.message || "Something went wrong 😢");
        },
      }
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* input email */}
      <InputField
        errors={errors}
        isPending={isPending}
        label="*Email"
        name="email"
        register={register}
        type="text"
        placeholder="youremail@gmail.com"
      />

      {/* link to log in */}
      <div className="text-xl text-center space-y-1">
        <p>
          Already have an account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
      </div>

      {/* submit btn */}
      <SubmitBtn btnTxt="Send OTP" isPending={isPending} />
    </form>
  );
};

export default RequestOtpForm;
