/** @format */

import React from "react";
import { MdOutlineSort } from "react-icons/md";

interface CmtSort {
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  // showOnlyMyCmt: boolean;
}

const CmtSort: React.FC<CmtSort> = ({ setSortOrder }) => {
  return (
    <div className="flex gap-2 items-center cursor-pointer">
      <MdOutlineSort className="text-5xl" />{" "}
      <label className="label">Sort by</label>
    </div>
  );
};

export default CmtSort;
