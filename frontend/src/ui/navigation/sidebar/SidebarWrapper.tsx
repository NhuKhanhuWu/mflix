/** @format */

import { Card } from "@material-tailwind/react";
import { ReactNode } from "react";

const SidebarWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Card
      className="h-screen w-fit max-w-[20rem] px-4 py-8 text-white bg-[#303030] border-r border-[#df2143] rounded-none"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}>
      {children}
    </Card>
  );
};

export default SidebarWrapper;
