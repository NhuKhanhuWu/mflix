/** @format */

import { NavLinks } from "./NavBarComponent.tsx";
import { Logo } from "./NavBarComponent";
import { ReactNode } from "react";

function DesktopNavBar({ profile }: { profile: ReactNode }) {
  return (
    <>
      {/* logo */}
      <Logo />

      {/* nav links */}
      <ul className="flex gap-16 text-white font-medium">
        <NavLinks />
      </ul>

      <div className="flex gap-2">
        {/* search bar */}
        {/* <SearchBar></SearchBar> */}

        {/* login/signup */}
        {profile}
      </div>
    </>
  );
}

export default DesktopNavBar;
