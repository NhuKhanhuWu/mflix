/** @format */

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logOutSuccess } from "../../redux/authSlide";
import { ReactNode } from "react";

interface LogoutProps {
  children: ReactNode;
}

const LogOut: React.FC<LogoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    Cookies.remove("loginToken");
    dispatch(logOutSuccess());
    navigate("/"); // Navigate to homepage
  };

  return <button onClick={logOut}>{children}</button>;
};

export default LogOut;
