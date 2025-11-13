/** @format */

import { useParams } from "react-router-dom";
import { useChangeEmail } from "../hooks/user/changeEmail";
import { useEffect } from "react";

function ChangeEmailResult() {
  // get token
  const { token } = useParams();
  const { mutate, error, isPending } = useChangeEmail();

  useEffect(
    function () {
      mutate({ token });
    },
    [mutate, token]
  );

  if (isPending)
    return (
      <div>
        <p>Updating your email...</p>
      </div>
    );

  if (error)
    return (
      <div>
        <p>Something went wrong</p>
      </div>
    );

  return (
    <div>
      <p>Your email has been updated</p>
    </div>
  );
}

export default ChangeEmailResult;
