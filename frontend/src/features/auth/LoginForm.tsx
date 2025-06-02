/** @format */

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/useLogin";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlide";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const LoginForm: React.FC = () => {
  // 1. manage form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  // 2. set up send login request
  const { mutate, isPending, isError, error } = useLogin();

  // 3. send login request
  const navigate = useNavigate(); // for navigate
  const dispatch = useDispatch(); // for update state
  function onSubmit(data: { email: string; password: string }) {
    mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: (data) => {
          // 1. get token
          const { token } = data;

          // 2. save to cookie
          Cookies.set("loginToken", token, {
            expires: 90, // 90 day
            secure: import.meta.env.NODE_ENV === "production",
            sameSite: "strict",
          });

          // 3. update redux state
          dispatch(loginSuccess());

          // 4. redirect to previous page
          navigate(-1);
        },
      }
    );
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="label">*Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          className={`input w-[30rem] ${isPending && "input-disable"}`}
          disabled={isPending}
        />
        {errors.email && (
          <p className="error-message">*{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="label">*Password</label>
        <input
          {...register("password")}
          type="password"
          placeholder="••••••••"
          className={`input w-[30rem] ${isPending && "input-disable"}`}
          disabled={isPending}
        />
        {errors.password && (
          <p className="error-message">*{errors.password.message}</p>
        )}
      </div>

      {isError && <p className="error-message">*{(error as Error).message}</p>}

      <div className="flex justify-center">
        <button
          type="submit"
          className={`btn primary-btn w-full ${
            isPending && "primary-btn-disable"
          }`}>
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
