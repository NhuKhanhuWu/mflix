/** @format */

import { Link } from "react-router-dom";
import ForgotPasswordForm from "../features/auth/ForgotPasswordForm";

function ForgotPassword() {
  return (
    <div className="my-24 flex items-center justify-center">
      <div className="form-container">
        <h2 className="text-3xl text-center flex flex-col gap-4">
          Password reset
        </h2>

        <ForgotPasswordForm />

        <div className="text-xl space-y-1 flex gap-4 justify-center">
          <p>
            <Link to="/login" className="link">
              Login
            </Link>
          </p>
          |
          <p>
            <Link to="/signup" className="link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
