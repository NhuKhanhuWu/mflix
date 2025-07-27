/** @format */

import { useSelector } from "react-redux";
import { CommentProps } from "../../interfaces/commentInterface";
import formatDate from "../../services/formatDate";
import SmallAvartar from "../../ui/SmallAvartar";
import { RootState } from "../../redux/store";
import { HiOutlineDotsVertical } from "react-icons/hi";
import * as yup from "yup";
import Cookies from "js-cookie";

import { Menu } from "@headlessui/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextAreaField } from "../../ui/Input";
import SubmitBtn from "../../ui/SubmitBtn";
import { useUpdateCmt } from "../../hooks/cmt/useUpdateCmt";
import React, { ReactNode, useState } from "react";

interface SetStateProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CmtMenuProps {
  editBtn: ReactNode;
  deleteBtn: ReactNode;
}

const formSchema = yup.object().shape({
  text: yup.string().required("Comment's content required!"),
});

const EditCmtBtn: React.FC<SetStateProps> = ({ setIsEditing }) => {
  return (
    <Menu>
      <button className="dot-menu-item" onClick={() => setIsEditing(true)}>
        <TiPencil className="text-3xl" />
        Edit
      </button>
    </Menu>
  );
};

const DeleteCmtBtn: React.FC = () => {
  return (
    <div className="py-1">
      <Menu>
        <button className="dot-menu-item">
          <FaRegTrashAlt className="text-2xl" /> Delete
        </button>
      </Menu>
    </div>
  );
};

const CmtMenu: React.FC<CmtMenuProps> = ({ editBtn, deleteBtn }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {/* cmt's menu open/close btn */}
      <div>
        <Menu.Button className="dots-menu-btn">
          <HiOutlineDotsVertical />
        </Menu.Button>
      </div>

      {/* cmt's menu items */}
      <Menu.Items className="dot-menu-items-container">
        {editBtn} {deleteBtn}
      </Menu.Items>
    </Menu>
  );
};

const CmtTxt: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div>
      <div className="mb-2 grow">
        <span className="font-bold text-[var(--color-red-600)]">
          {comment.user.name}
        </span>{" "}
        -<span className="font-light"> {formatDate(comment.date)}</span>
      </div>
      <p>{comment.text}</p>
    </div>
  );
};

const CmtEditForm: React.FC<CommentProps & SetStateProps> = ({
  comment,
  setIsEditing,
}) => {
  const token = Cookies.get("loginToken") || "";

  // set up form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  // set up send request
  const { mutate, isPending, isError } = useUpdateCmt({
    setIsEditing,
  });

  function onSubmit(data: { text: string }) {
    mutate({ cmt_id: comment._id, text: data.text, token });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-8 flex gap-2 grow">
      <div className="flex-1">
        <TextAreaField
          value={comment.text}
          errors={errors}
          isPending={false}
          name="text"
          register={register}
          placeholder="Type your comment"
        />

        {/* err from backend (no login,text required) */}
        {isError && <p className="error-message">*Failed to post comment.</p>}
      </div>

      <button
        className="btn secondary-btn h-fit"
        onClick={() => setIsEditing(false)}>
        Cancel
      </button>
      <SubmitBtn btnTxt="Send" isPending={isPending} width="fit-content" />
    </form>
  );
};

const CmtItem: React.FC<CommentProps> = ({ comment }) => {
  const logged_user = useSelector((state: RootState) => state.auth.id);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="relative min-h-20 flex gap-6 justify-between grown">
      {/* avatar and text */}
      <div className="flex gap-4 w-full">
        {/* avatar */}
        <div className="h-full">
          <SmallAvartar avartar={comment.user.avatar} />
        </div>

        {/* text */}
        {!isEditing && <CmtTxt comment={comment} />}

        {/* edit form */}
        {isEditing && (
          <CmtEditForm comment={comment} setIsEditing={setIsEditing} />
        )}
      </div>

      {/* dropdown menu at top-right */}
      {logged_user === comment.user_id && (
        <div className="self-center">
          <CmtMenu
            editBtn={<EditCmtBtn setIsEditing={setIsEditing} />}
            deleteBtn={<DeleteCmtBtn />}
          />
        </div>
      )}
    </div>
  );
};

export default CmtItem;
