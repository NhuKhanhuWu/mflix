/** @format */

import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextAreaField } from "../../ui/Input";
import SubmitBtn from "../../ui/SubmitBtn";
import SmallAvartar from "../../ui/SmallAvartar";
import { useNewCmt } from "../../hooks/cmt/useNewCmt";
import LoadAndErr from "../../ui/Spinner";
import Cookies from "js-cookie";
import { useState } from "react";

const formSchema = yup.object().shape({
  text: yup.string().required("Comment's content required!"),
});

const AddCmtForm: React.FC<{ movieId?: string }> = ({ movieId = "" }) => {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const avartar = useSelector((state: RootState) => state.auth.avartar);
  const [isFormFocus, setIsFormFocus] = useState(false);
  const token = Cookies.get("loginToken") || "";

  // set up form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  // set up send request
  const { mutate, isPending, isError } = useNewCmt({ reset, movieId });

  function onSubmit(data: { text: string }) {
    mutate({
      movie_id: movieId,
      text: data.text,
      token,
    });
  }

  function onClearForm() {
    reset();
    setIsFormFocus(false);
  }

  if (!movieId) return <LoadAndErr isLoading={false} isError={true} />;

  if (!isLogin)
    return (
      <p className="mb-8 text-2xl">
        Please{" "}
        <Link to="/login" className="link">
          Login
        </Link>{" "}
        to comment
      </p>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-8 flex gap-2">
      <SmallAvartar avartar={avartar} />

      <div className="flex-1" onFocus={() => setIsFormFocus(true)}>
        <TextAreaField
          errors={errors}
          isPending={isPending}
          name="text"
          register={register}
          placeholder="Type your comment"
        />

        {/* err from backend (no login,text required) */}
        {isError && <p className="error-message">*Failed to post comment.</p>}
      </div>

      {isFormFocus && (
        <>
          <button
            className="btn secondary-btn h-fit"
            onClick={() => onClearForm()}>
            Cancel
          </button>
          <SubmitBtn btnTxt="Send" isPending={isPending} width="fit-content" />
        </>
      )}
    </form>
  );
};

export default AddCmtForm;
