/** @format */

import { useState } from "react";
import RequestOtpForm from "../features/auth/RequestOtpForm";
import SubmitOtpForm from "../features/auth/SubmitOtpForm";
import SignUpForm from "../features/auth/SignUpForm";

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [jwt, setJwt] = useState("");

  return (
    <div className="min-h-96 my-24 flex items-center justify-center space-y-8">
      <div className="form-container">
        <h2 className="text-3xl text-center flex flex-col gap-4">
          Signup to
          <span className="text-6xl font-train-one text-brand-red">MFLIX</span>
        </h2>

        {step === 1 && <RequestOtpForm setStep={setStep} setEmail={setEmail} />}

        {step === 2 && (
          <SubmitOtpForm setStep={setStep} email={email} setJwt={setJwt} />
        )}

        {step === 3 && <SignUpForm jwt={jwt} email={email} />}
      </div>
    </div>
  );
}
