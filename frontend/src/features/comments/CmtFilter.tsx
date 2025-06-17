/** @format */

import React from "react";
import { MdOutlineSort } from "react-icons/md";

interface CmtFilter {
  setShowOnlyMyCmt: React.Dispatch<React.SetStateAction<boolean>>;
  // showOnlyMyCmt: boolean;
}

const CmtFilter: React.FC<CmtFilter> = ({ setShowOnlyMyCmt }) => {
  return (
    <>
      <div className="flex gap-2 items-center">
        <MdOutlineSort className="text-5xl" />{" "}
        <label className="label">Sort by</label>
      </div>

      <div className="flex gap-2 items-center">
        <input
          onClick={() => setShowOnlyMyCmt((prev: boolean) => !prev)}
          type="checkbox"
          className="w-8 h-8 accent-[var(--color-red-600)]"
          id="my-cmt-checkbox"
        />
        <label className="label" htmlFor="my-cmt-checkbox">
          My comment
        </label>
      </div>
    </>
  );
};

export default CmtFilter;
