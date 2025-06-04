/** @format */

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logOutSuccess } from "../../redux/authSlide";

function LogOut() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    Cookies.remove("loginToken");
    dispatch(logOutSuccess());
    navigate("/"); // Navigate to homepage
  };

  return <button onClick={logOut}>Log Out</button>;
}

export default LogOut;
