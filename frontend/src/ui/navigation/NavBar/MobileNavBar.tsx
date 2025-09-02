/** @format */
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

import { useState } from "react";
import { Logo, NavLinks } from "./NavBarComponent";

/** @format */
function MobileNavBar({ profile }: { profile: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-20 px-4 flex items-center justify-between">
      <Logo />

      {/* hamburger icon */}
      {isOpen ? (
        <IoMdClose
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-5xl cursor-pointer"
        />
      ) : (
        <GiHamburgerMenu
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-5xl cursor-pointer"
        />
      )}

      {/* collap part */}
      <div
        className={`h-screen absolute top-[100%] right-0 bg-[#303030] border-l-2 border-t-2 border-[#df2143] py-5 px-12 flex flex-col items-center gap-8 ${
          isOpen ? "block" : "hidden"
        }`}>
        {profile}
        <ul className="list-none flex flex-col gap-8 items-center">
          <NavLinks />
        </ul>
      </div>
    </div>
  );
}

export default MobileNavBar;
