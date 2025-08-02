/** @format */

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { ReactNode } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface Props {
  open: boolean;
  icon: ReactNode;
  title: string;
  onClick: () => void;
  children: ReactNode;
}

const SidebarSection = ({ open, icon, title, onClick, children }: Props) => {
  return (
    <Accordion
      open={open}
      icon={
        <IoIosArrowDown
          className={`h-4 w-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}>
          {icon}
        </IoIosArrowDown>
      }
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}>
      <ListItem
        className="p-0"
        selected={open}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}>
        <AccordionHeader
          onClick={onClick}
          className="border-b-0 p-3 bg-[#656565] rounded-full"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>
          <ListItemPrefix
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}>
            {icon}
          </ListItemPrefix>
          <Typography
            className="mr-auto font-normal text-white text-2xl"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}>
            {title}
          </Typography>
        </AccordionHeader>
      </ListItem>
      <AccordionBody className="py-1">
        <List
          className="p-0 text-white"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>
          {children}
        </List>
      </AccordionBody>
    </Accordion>
  );
};

export default SidebarSection;
