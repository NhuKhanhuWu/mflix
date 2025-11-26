/** @format */

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logOutSuccess } from "../../redux/authSlide";
import { ReactNode } from "react";
import { useLogOut } from "../../hooks/auth/useLogOut";

interface LogoutProps {
  children: ReactNode;
}

const LogOut: React.FC<LogoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate, isPending } = useLogOut();

  const logOut = () => {
    mutate(
      undefined,

      {
        onSuccess: () => {
          Cookies.remove("accessToken");
          dispatch(logOutSuccess());
          navigate("/"); // Navigate to homepage
        },
      }
    );
  };

  return (
    <button
      onClick={logOut}
      disabled={isPending}
      className={isPending ? "cursor-not-allowed" : ""}>
      {children}
    </button>
  );
};

export default LogOut;
