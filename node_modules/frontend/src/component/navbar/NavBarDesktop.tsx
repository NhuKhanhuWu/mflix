/** @format */
import Logo from "./Logo";
import { links } from "./navData";
import { InputTxt } from "../ui/input/Input";
import { Btn } from "../ui/button/Btn";

// NavBar Desktop: start
export const NavBarDesktop: React.FC = () => {
  return (
    <nav>
      <Logo></Logo>

      {/* links */}
      {links.map((link) => (
        <a href={link.url}>{link.txt}</a>
      ))}

      {/* search bar */}
      <InputTxt isRound={true} placeholder="Search your movie"></InputTxt>

      {/* login/signup */}
      <Btn isPrimary={true}>Login</Btn>
      <Btn>Signup</Btn>
    </nav>
  );
};
// NavBar Desktop: end
