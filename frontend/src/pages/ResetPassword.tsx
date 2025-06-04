/** @format */

import ResetPasswordForm from "../features/auth/ResetPasswordForm";

function ResetPassword() {
  return (
    <div className="my-24 flex items-center justify-center">
      <div className="form-container">
        <h2 className="text-3xl text-center flex flex-col gap-4">
          Reset your password
        </h2>

        <p className="text-xl  w-[30rem]">
          *After reset successfully, you will be redirect to "Login" page to
          login again.
        </p>

        <ResetPasswordForm />
      </div>
    </div>
  );
}

export default ResetPassword;
