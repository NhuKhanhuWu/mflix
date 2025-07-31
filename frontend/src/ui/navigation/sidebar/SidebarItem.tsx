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
      className="text-xl"
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
