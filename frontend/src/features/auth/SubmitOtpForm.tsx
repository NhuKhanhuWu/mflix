/** @format */

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { SetState } from "../../interfaces/general";
import { useSendOtpRequest, useSubmitOtp } from "../../hooks/auth/signupHooks";
import { SendOtpButton } from "./SendOtpButton";
import SubmitBtn from "../../ui/common/SubmitBtn";
import { InputField } from "../../ui/common/Input";
import { toast } from "react-toastify";

// move to next step func
interface setStepFuncInterface {
  setStep: SetState<number>;
  setJwt: SetState<string>;
  email: string;
}

// form schema
const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .required("OTP required")
    .length(6, "OTP lenght is 6 characters"),
});

const SubmitOtpForm: React.FC<setStepFuncInterface> = ({
  setStep,
  email,
  setJwt,
}) => {
  // 1. set up form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(otpSchema) });

  //  2. set up submit otp
  const { mutate, isPending } = useSubmitOtp();

  function onSubmit(data: { otp: string }) {
    mutate(
      {
        email: email,
        otp: data.otp,
      },
      //   2.1. if success => move to next step
      {
        onSuccess: (data) => {
          // set jwt
          setJwt(data.token);

          // move to next state
          setStep(3);
        },
        onError: (error) => {
          toast.error(error.message || "Something went wrong 😢");
        },
      }
    );
  }

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* otp input */}
        <p className="text-center">Your code was sent to you via email</p>
        <InputField
          errors={errors}
          isPending={isPending}
          name="otp"
          register={register}
          label="6-digits OTP"
          placeholder="your otp"
          type="text"
        />

        {/* submit btn */}
        <SubmitBtn btnTxt="Send OTP" isPending={isPending} />
      </form>

      {/* send otp again */}
      <p className="text-xl text-center space-y-1">
        Didn't receive OTP?{" "}
        <SendOtpButton email={email} hook={useSendOtpRequest} />
      </p>
    </>
  );
};

export default SubmitOtpForm;
