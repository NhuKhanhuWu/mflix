/** @format */

import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

import SidebarWrapper from "../navigation/sidebar/SidebarWrapper";
import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import SidebarSection from "../navigation/sidebar/SidebarSection";
import SidebarItem from "../navigation/sidebar/SidebarItem";

import { FaPowerOff, FaRegUserCircle } from "react-icons/fa";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { AiOutlineProfile } from "react-icons/ai";
import LogOut from "../../features/auth/LogOut";

function SideBar() {
  const [open, setOpen] = useState(0);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <SidebarWrapper>
      <List
        className="text-white gap-3"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}>
        {/* ACCOUNT: START */}
        <SidebarSection
          open={open === 1}
          icon={<FaRegUserCircle className="h-8 w-8" />}
          title="Account"
          onClick={() => handleOpen(1)}>
          {/* profile */}
          <SidebarItem icon={<AiOutlineProfile className="h-8 w-8" />}>
            <Link to={"/profile"}>Profile</Link>
          </SidebarItem>

          {/* change email */}
          <SidebarItem icon={<MdOutlineEmail className="h-8 w-8" />}>
            <Link to={"change-email"}>Change Email</Link>
          </SidebarItem>

          {/* change password */}
          <SidebarItem icon={<MdOutlinePassword className="h-8 w-8" />}>
            <Link to={"change-password"}>Change Password</Link>
          </SidebarItem>
        </SidebarSection>
        {/* ACCOUNT: END */}

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

      <main className="pt-8">
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default ProfileLayout;
