/** @format */

import { ListItem, ListItemPrefix } from "@material-tailwind/react";
import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  children: ReactNode;
}

const SidebarItem = ({ icon, children }: Props) => {
  return (
    <ListItem
      className="text-xl transition-colors duration-300 hover:bg-[rgb(134,134,134)] rounded-full"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}>
      <ListItemPrefix
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}>
        {icon}
      </ListItemPrefix>
      {children}
    </ListItem>
  );
};

export default SidebarItem;
