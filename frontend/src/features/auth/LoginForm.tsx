/** @format */

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Cookies from "js-cookie";
import { loginSuccess } from "../../redux/authSlide";
import { emailSchema, passwordSchema } from "../../constaint/formSchema";
import { InputField } from "../../ui/common/Input";
import SubmitBtn from "../../ui/common/SubmitBtn";

const loginSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
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
          navigate("/");
        },
      }
    );
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      {/* email */}
      <InputField
        errors={errors}
        isPending={isPending}
        label="*Email"
        name="email"
        register={register}
        type="text"
        placeholder="youremail@gmail.com"
      />

      {/* password */}
      <InputField
        errors={errors}
        isPending={isPending}
        label="*Password"
        name="password"
        register={register}
        type="password"
        placeholder="Your password"
      />

      {isError && <p className="error-message">*{(error as Error).message}</p>}

      <div className="flex justify-center">
        <SubmitBtn btnTxt="Login" isPending={isPending} />
      </div>
    </form>
  );
};

export default LoginForm;
