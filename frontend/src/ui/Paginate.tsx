/** @format */

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  FaArrowLeft as PrePage,
  FaArrowRight as NextPage,
} from "react-icons/fa";
import { useEffect } from "react";

interface PaginateProps {
  pageAmount: number;
  currPage: number;
  changePageFunc: (page: number) => void;
  targetRef: React.RefObject<HTMLElement>;
}

function pageSchema(pageAmount: number) {
  return yup.object({
    page: yup
      .number()
      .typeError("Page must be a number")
      .required("Page is required")
      .min(1, "Minimum page is 1")
      .max(pageAmount, "Maximum page is " + pageAmount)
      .integer("Page must be an integer"),
  });
}

const Paginate: React.FC<PaginateProps> = ({
  pageAmount,
  currPage,
  changePageFunc,
  targetRef,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(pageSchema(pageAmount)) });

  // update page value in input field
  useEffect(
    function () {
      setValue("page", currPage);
    },
    [currPage, setValue]
  );

  function onSubmit(data: { page: number }) {
    changePageFunc(data.page);

    // scroll to top when change page
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="flex flex-col items-center my-8">
      <div className="flex w-fit gap-6  items-center">
        {/* pre page btn */}
        {currPage > 1 && (
          <PrePage
            onClick={() => {
              changePageFunc(currPage - 1);
              targetRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-circle-hover"
          />
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
          {/* current page, pages total */}
          <div>
            <input
              {...register("page")}
              type="number"
              defaultValue={currPage}
              name="page"
              className="input w-32"
            />
            of {pageAmount}
          </div>

          {/* submit btn */}
          <button type="submit" className="btn secondary-btn">
            Go
          </button>
        </form>

        {/* next page btn */}
        {currPage < pageAmount && (
          <NextPage
            onClick={() => {
              changePageFunc(currPage + 1);
              targetRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-circle-hover"
          />
        )}
      </div>

      {errors.page && (
        <p className="text-[var(--color-red-800)]">{errors.page.message}</p>
      )}
    </div>
  );
};

export default Paginate;
