/** @format */

import React from "react";
import { SetState } from "../../interfaces/general";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSendOtpRequest } from "../../hooks/signupHooks";
import LoadAndErr from "../../ui/Spinner";
import { Link } from "react-router-dom";

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
  const { mutate, isPending, isError, error } = useSendOtpRequest();

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
      }
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* input email */}
      <div>
        <label className="label">*Email</label>
        <input
          {...register("email")}
          type="email"
          className={`input w-[30rem] ${isPending && "input-disable"}`}
          placeholder="you@example.com"
          disabled={isPending}
        />

        {errors.email && (
          <p className="error-message">*{errors.email.message}</p>
        )}
      </div>

      {/* err message */}
      {isError && <p className="error-message">*{(error as Error).message}</p>}

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
      <button
        type="submit"
        className={`btn primary-btn w-full ${
          isPending && "primary-btn-disable"
        }`}>
        {isPending ? <LoadAndErr isLoading={isPending} /> : "Send OTP"}
      </button>
    </form>
  );
};

export default RequestOtpForm;
