/** @format */

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useSignUp } from "../../hooks/auth/signupHooks";
import { useLogin } from "../../hooks/auth/useLogin";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlide";
import { useNavigate } from "react-router-dom";
import {
  passwordConfirmSchema,
  passwordSchema,
} from "../../constaint/formSchema";
import { InputField } from "../../ui/common/Input";
import SubmitBtn from "../../ui/common/SubmitBtn";

// form schema
const otpSchema = yup.object().shape({
  name: yup.string().required("Name required"),
  password: passwordSchema,
  passwordConfirm: passwordConfirmSchema,
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
  const { mutate: signUpMutate, isPending, isError, error } = useSignUp();
  const { mutate: loginMutate } = useLogin();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(data: formDataProps) {
    signUpMutate(
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
      {/* name */}
      <InputField
        errors={errors}
        isPending={isPending}
        name="name"
        register={register}
        label="Name"
        placeholder="Your name"
        type="text"
      />

      {/* password */}
      <InputField
        errors={errors}
        isPending={isPending}
        label="*Password"
        name="password"
        register={register}
        placeholder="Your password"
        type="password"
      />

      {/* password confirm */}
      <InputField
        errors={errors}
        isPending={isPending}
        label="*Password confirm"
        name="passwordConfirm"
        register={register}
        placeholder="Password confirm"
        type="password"
      />

      {isError && <p className="error-message">*{(error as Error).message}</p>}

      <SubmitBtn btnTxt="Submit" isPending={isPending} />
    </form>
  );
};

export default SignUpForm;
