/** @format */

import { Btn } from "../ui/button/Btn";
import { InputTxt } from "../ui/input/Input";
import Logo from "./Logo";

interface Link {
  txt: string; // Text for the link
  url: string; // URL for the link
}

const links: Link[] = [
  {
    txt: "Home",
    url: "",
  },
  {
    txt: "Movie",
    url: "/movies",
  },
  {
    txt: "TV Series",
    url: "/series",
  },
  {
    txt: "About",
    url: "about",
  },
];

const Header: React.FC = () => {
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
      <Btn isPrimary={true} txt="Login"></Btn>
      <Btn txt="Signup"></Btn>
    </nav>
  );
};

export default Header;
