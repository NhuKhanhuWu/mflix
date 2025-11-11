/** @format */

import ChangeEmailForm from "../features/user/ChangeEmailForm";

function ChangeEmail() {
  return (
    <div>
      <div className="form-container m-auto">
        <h1 className="form-header">Change Email</h1>
        <p className="text-xl italic text-center">
          *You can only change email every{" "}
          <span className="font-bold">24 hours</span>
        </p>

        <ChangeEmailForm />
      </div>
    </div>
  );
}

export default ChangeEmail;
