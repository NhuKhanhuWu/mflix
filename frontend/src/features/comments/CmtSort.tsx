/** @format */

import React from "react";
import { MdOutlineSort } from "react-icons/md";

interface CmtSort {
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  // showOnlyMyCmt: boolean;
}

const CmtSort: React.FC<CmtSort> = ({ setSortOrder }) => {
  return (
    <div className="flex gap-2 items-center cursor-pointer border border-[rgb(134,134,134)] px-6 py-1 rounded-full">
      <MdOutlineSort className="text-5xl" />{" "}
      {/* <label className="label">Sort by</label> */}
      {/* select */}
      <select
        onChange={(e) => setSortOrder(e.target.value)}
        className="ml-2 bg-[rgb(48,48,48)] text-white px-3 py-2 rounded focus:outline-none">
        <option value="-date">Latest</option>
        <option value="date">Oldest</option>
      </select>
    </div>
  );
};

export default CmtSort;
