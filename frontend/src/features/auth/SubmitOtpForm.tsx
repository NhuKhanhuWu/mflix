/** @format */

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { SetState } from "../../interfaces/general";
import { useSendOtpRequest, useSubmitOtp } from "../../hooks/signupHooks";
import LoadAndErr from "../../ui/Spinner";
import { useEffect, useState } from "react";

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

const SendOtpButton = ({ email }: { email: string }) => {
  const [otpCountdown, setOtpCountdown] = useState(3 * 60);
  const { mutate: sendOtp, isPending } = useSendOtpRequest();

  // Countdown effect
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  // Click handler
  const handleSendAgain = () => {
    if (otpCountdown === 0) {
      sendOtp(
        { email },
        {
          onSuccess: () => {
            setOtpCountdown(3 * 60); // set 60s countdown
          },
        }
      );
    }
  };

  return (
    <button
      onClick={handleSendAgain}
      disabled={otpCountdown !== 0 || isPending}
      className={`link ${otpCountdown ? "link-disable" : ""}`}>
      {isPending
        ? "Sending..."
        : otpCountdown
        ? `Send again (${otpCountdown}s)`
        : "Send again"}
    </button>
  );
};

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
  const { mutate, isPending, isError, error } = useSubmitOtp();

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
      }
    );
  }

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* otp input */}
        <p className="text-center">Your code was sent to you via email</p>
        <div>
          <label className="label">*OTP</label>
          <input
            {...register("otp")}
            maxLength={6}
            type="string"
            className={`input w-[30rem] ${isPending && "input-disable"}`}
            placeholder="••••••"
            disabled={isPending}
          />

          {errors.otp && <p className="error-message">*{errors.otp.message}</p>}
        </div>

        {/* err mess */}
        {isError && (
          <p className="error-message">*{(error as Error).message}</p>
        )}

        {/* submit btn */}
        <button
          type="submit"
          className={`btn primary-btn w-full ${
            isPending && "primary-btn-disable"
          }`}>
          {isPending ? <LoadAndErr isLoading={isPending} /> : "Submit OTP"}
        </button>
      </form>

      {/* send otp again */}
      <p className="text-xl text-center space-y-1">
        Didn't receive OTP? <SendOtpButton email={email} />
      </p>
    </>
  );
};

export default SubmitOtpForm;
