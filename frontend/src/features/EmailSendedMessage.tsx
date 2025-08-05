/** @format */

import { FaArrowLeft } from "react-icons/fa";

interface EmailSendedMessageProps {
  email: string;
  setIsEmailSended: (value: boolean) => void;
  resendButton: React.ReactNode;
  message?: string;
}

const EmailSendedMessage: React.FC<EmailSendedMessageProps> = ({
  setIsEmailSended,
  resendButton,
  message = "Check your email to get the link",
}) => {
  return (
    <>
      {/* Back button */}
      <button
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => setIsEmailSended(false)}>
        <FaArrowLeft />
        Re-enter email
      </button>

      {/* Message */}
      <p className="text-brand-red">{message}</p>

      {/* Resend option */}
      <p className="text-xl text-center">
        Didn't receive email? {resendButton}
      </p>
    </>
  );
};

export default EmailSendedMessage;
