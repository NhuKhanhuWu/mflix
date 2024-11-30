/** @format */

import MediaQuery from "react-responsive";

import { NavBarMobile } from "./NavBarMobile";
import { links } from "./navData";
import { UrlLink } from "../ui/link/Link";
import { Btn } from "../ui/button/Btn";
import Logo from "./Logo";
import { InputTxt } from "../ui/input/Input";

export function NavBar() {
  // nav link (home, about,...)
  const navLink = links.map((link, i) => (
    <UrlLink
      key={`nav-${i}`}
      txt={link.txt}
      isNav={true}
      url={link.url}></UrlLink>
  ));

  // login, signup
  const buttons = (
    <div className="flex gap-10">
      <Btn isPrimary={true}>
        <p className="text-3xl">Login</p>
      </Btn>
      <Btn>
        <p className="text-3xl">Signup</p>
      </Btn>
    </div>
  );

  return (
    <>
      {/* responsive for moblie: start */}
      <MediaQuery maxWidth={415}>
        <NavBarMobile
          width={3}
          transTop={1}
          transBot={-1}
          visiChild={<Logo width={12} />}
          hiddenChild={
            <>
              {navLink}
              <InputTxt placeholder="Search your movie" isRound={true} />
              {buttons}
            </>
          }></NavBarMobile>
      </MediaQuery>
      {/* responsive for moblie: end */}
    </>
  );
}
