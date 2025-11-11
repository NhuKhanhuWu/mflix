/** @format */

import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

import SidebarWrapper from "../navigation/sidebar/SidebarWrapper";
import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import SidebarSection from "../navigation/sidebar/SidebarSection";
import SidebarItem from "../navigation/sidebar/SidebarItem";

import { FaPowerOff, FaRegUserCircle } from "react-icons/fa";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { AiOutlineProfile } from "react-icons/ai";
import LogOut from "../../features/auth/LogOut";

const sectionMap = [
  {
    id: 1,
    title: "Account",
    icon: <FaRegUserCircle className="h-8 w-8" />,
    items: [
      {
        label: "Profile",
        to: "/profile",
        icon: <AiOutlineProfile className="h-8 w-8" />,
      },
      {
        label: "Change Email",
        to: "/change-email",
        icon: <MdOutlineEmail className="h-8 w-8" />,
      },
      {
        label: "Change Password",
        to: "/change-password",
        icon: <MdOutlinePassword className="h-8 w-8" />,
      },
    ],
  },
  // Add more sections if needed
];

function SideBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const getInitialOpen = () => {
    const found = sectionMap.find((section) =>
      section.items.some((item) => currentPath.startsWith(item.to))
    );
    return found?.id ?? 0;
  };

  const [open, setOpen] = useState<number>(getInitialOpen());

  const handleOpen = (value: number) => {
    setOpen((prev) => (prev === value ? 0 : value));
  };

  return (
    <SidebarWrapper>
      <List
        className="text-white gap-3"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}>
        {sectionMap.map((section) => (
          <SidebarSection
            key={section.id}
            open={open === section.id}
            icon={section.icon}
            title={section.title}
            onClick={() => handleOpen(section.id)}>
            {section.items.map((item) => (
              <NavLink to={item.to}>
                <SidebarItem icon={item.icon} key={item.to}>
                  {item.label}
                </SidebarItem>
              </NavLink>
            ))}
          </SidebarSection>
        ))}

        {/* LOGOUT: START */}
        <LogOut>
          <ListItem
            className="bg-[#656565] rounded-full text-2xl flex"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}>
            <ListItemPrefix
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}>
              <FaPowerOff className="h-8 w-8" />
            </ListItemPrefix>
            Logout
          </ListItem>
        </LogOut>
        {/* LOGOUT: END */}
      </List>
    </SidebarWrapper>
  );
}

function ProfileLayout() {
  return (
    <div className="flex gap-12">
      {/* side bar */}
      <SideBar />

      <main className="pt-8 grow">
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default ProfileLayout;
