/** @format */

import { useState, useEffect } from "react";
import { UseMutationResult } from "@tanstack/react-query";

interface SendOtpButtonProps {
  email: string;
  hook: () => UseMutationResult<unknown, Error, { email: string }, unknown>;
}

export const SendOtpButton: React.FC<SendOtpButtonProps> = ({
  email,
  hook,
}) => {
  const [otpCountdown, setOtpCountdown] = useState(3 * 60);
  const { mutate, isPending } = hook();

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
      mutate(
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
