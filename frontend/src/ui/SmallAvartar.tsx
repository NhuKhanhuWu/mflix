/** @format */

import React from "react";

const SmallAvartar: React.FC<{ avartar: string }> = ({ avartar }) => {
  return (
    <img
      className="w-[35px] h-[35px] min-w-[35px] min-h-[35px] max-w-[35px] max-h-[35px] object-cover rounded-full"
      loading="lazy"
      src={avartar}
      width={40}
      height={40}
    />
  );
};

export default SmallAvartar;
