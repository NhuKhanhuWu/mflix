/** @format */

import { useSelector } from "react-redux";
import { CmtByMovieProps } from "../../interfaces/commentInterface";
import formatDate from "../../services/formatDate";
import SmallAvartar from "../../ui/common/SmallAvartar";
import { RootState } from "../../redux/store";
import { HiOutlineDotsVertical } from "react-icons/hi";
import * as yup from "yup";
import Cookies from "js-cookie";

import { Menu } from "@headlessui/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextAreaField } from "../../ui/common/Input";
import SubmitBtn from "../../ui/common/SubmitBtn";
import { useUpdateCmt } from "../../hooks/cmt/useUpdateCmt";
import React, { ReactNode, useState } from "react";
import Modal from "../../ui/common/Modal";
import { useDeleteCmt } from "../../hooks/cmt/useDeleteCmt";
import LoadAndErr from "../../ui/common/Spinner";
import { useLocation } from "react-router-dom";

const token = Cookies.get("loginToken") || "";

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

const DeleteCmtBtn: React.FC<{ cmt_id: string }> = ({ cmt_id }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  // set up send request
  const { mutate, isPending, isError } = useDeleteCmt({ setIsDeleting });

  function onDelete() {
    mutate({ cmt_id, token });
  }

  return (
    <>
      <div className="py-1">
        <Menu>
          <button className="dot-menu-item" onClick={() => setIsDeleting(true)}>
            <FaRegTrashAlt className="text-2xl" /> Delete
          </button>
        </Menu>
      </div>

      <Modal open={isDeleting} setOpen={setIsDeleting}>
        <div className="p-6 text-center">
          {/* message */}
          <p className="text-2xl mb-8">
            Do you really want to delete this comment forever?
          </p>

          {/* btns */}
          <div className="flex gap-4 justify-center">
            {/* cancel */}
            <button
              className="btn secondary-btn"
              onClick={() => setIsDeleting(false)}>
              Cancel
            </button>

            {/* delete */}
            <button
              onClick={() => onDelete()}
              className={`btn ${
                isPending ? "secondary-btn-disable" : "secondary-btn"
              }`}
              disabled={isPending}>
              Delete
            </button>
          </div>

          {/* err message */}
          <LoadAndErr isLoading={isPending} isError={isError} />
        </div>
      </Modal>
    </>
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

const CmtTxt: React.FC<CmtByMovieProps> = ({ comment }) => {
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

const CmtEditForm: React.FC<CmtByMovieProps & SetStateProps> = ({
  comment,
  setIsEditing,
}) => {
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

const CmtItem: React.FC<CmtByMovieProps> = ({ comment }) => {
  const logged_user = useSelector((state: RootState) => state.auth.id);
  const [isEditing, setIsEditing] = useState(false);

  // highlight cmt if it's id in the url
  const location = useLocation();
  const urlCmt = location.hash.slice(1);

  return (
    <div
      className={`relative min-h-20 flex gap-6 justify-between grown ${
        comment._id === urlCmt && "bg-[#303030]"
      }`}
      id={comment._id}>
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
            deleteBtn={<DeleteCmtBtn cmt_id={comment._id} />}
          />
        </div>
      )}
    </div>
  );
};

export default CmtItem;
