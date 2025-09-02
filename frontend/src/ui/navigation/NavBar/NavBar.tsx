/** @format */

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import DesktopNavBar from "./DesktopNavBar.tsx";
import MobileNavBar from "./MobileNavBar.tsx";
import { ProflieAvartar } from "./NavBarComponent.tsx";
import { useBreakpoints } from "../../../hooks/useBreakPoints.ts";

function NavBar() {
  // check if login
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const avatar = useSelector((state: RootState) => state.auth.avartar);

  const { isDesktop, isMdMobile } = useBreakpoints();

  return (
    <nav className="flex items-center justify-between h-24 px-6 bg-[#303030] border-b-2 border-[#df2143] sticky top-0 z-[15]">
      {isDesktop && (
        <DesktopNavBar
          profile={<ProflieAvartar isLogin={isLogin} avatar={avatar} />}
        />
      )}

      {/* navbar for <=  */}
      {isMdMobile && !isDesktop && (
        <MobileNavBar
          profile={<ProflieAvartar isLogin={isLogin} avatar={avatar} />}
        />
      )}
    </nav>
  );
}

export default NavBar;
