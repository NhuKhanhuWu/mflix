/** @format */

import React from "react";

interface TagProps {
  children: React.Component | string;
}

export const Tag: React.FC<TagProps> = ({ children }) => {
  const style = { border: "solid 1px rgb(234, 179, 8)" };

  return (
    <div style={style} className={`bg-gray-700 rounded-lg px-4 py-1`}>
      {children}
    </div>
  );
};
