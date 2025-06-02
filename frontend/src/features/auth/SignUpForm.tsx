/** @format */

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useSignUp } from "../../hooks/signupHooks";
import LoadAndErr from "../../ui/Spinner";
import { useLogin } from "../../hooks/useLogin";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlide";
import { useNavigate } from "react-router-dom";

// form schema
const otpSchema = yup.object().shape({
  name: yup.string().required("Name required"),
  password: yup
    .string()
    .required("Password required")
    .min(8, "Password must have at least 8 characters"),
  passwordConfirm: yup
    .string()
    .required("Password confirm required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

// form data interface
interface formDataProps {
  name: string;
  password: string;
  passwordConfirm: string;
}

const SignUpForm: React.FC<{ jwt: string; email: string }> = ({
  jwt,
  email,
}) => {
  // 1. set up form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(otpSchema) });

  //   2. set up submit otp
  const { mutate, isPending, isError, error } = useSignUp();
  const { mutate: loginMutate } = useLogin();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(data: formDataProps) {
    mutate(
      {
        name: data.name,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        jwt: jwt,
      },
      //   2.1. if success => login and move to homepage
      {
        onSuccess: () => {
          loginMutate(
            { email, password: data.password },
            {
              onSuccess: (data) => {
                const { token } = data;

                // Save token
                Cookies.set("loginToken", token, {
                  expires: 90,
                  secure: import.meta.env.NODE_ENV === "production",
                  sameSite: "strict",
                });

                // Update Redux state
                dispatch(loginSuccess());

                // Redirect to homepage
                navigate("/");
              },
            }
          );
        },
      }
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="label">Your name</label>
        <input
          {...register("name")}
          maxLength={6}
          type="string"
          className={`input w-[30rem] ${isPending && "input-disable"}`}
          placeholder="xxxxxx"
          disabled={isPending}
        />
        {errors.name && <p className="error-message">*{errors.name.message}</p>}
      </div>

      <div>
        <label className="label">Password</label>
        <input
          {...register("password")}
          type="string"
          className={`input w-[30rem] ${isPending && "input-disable"}`}
          placeholder="••••••••"
          disabled={isPending}
        />

        {errors.password && (
          <p className="error-message">*{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="label">Password confirm</label>
        <input
          {...register("passwordConfirm")}
          type="string"
          className={`input w-[30rem] ${isPending && "input-disable"}`}
          placeholder="••••••••"
          disabled={isPending}
        />

        {errors.passwordConfirm && (
          <p className="error-message">*{errors.passwordConfirm.message}</p>
        )}
      </div>

      {isError && <p className="error-message">*{(error as Error).message}</p>}

      <button
        type="submit"
        className={`btn primary-btn w-full ${
          isPending && "primary-btn-disable"
        }`}
        disabled={isPending}>
        {isPending ? <LoadAndErr isLoading={isPending} /> : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUpForm;
