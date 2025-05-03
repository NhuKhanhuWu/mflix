/** @format */

import { NavLink } from "react-router-dom";

import logo from "../../public/logo.png";
import { SearchBar } from "./SearchBar";

interface NavItemProps {
  to: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, label }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${
          isActive
            ? "text-[#df2143] "
            : "text-white hover:text-[#df2143] transition"
        } uppercase text-2xl font-medium`
      }>
      {label}
    </NavLink>
  </li>
);

function NavBar() {
  return (
    <nav className="flex items-center justify-between h-24 px-6 bg-[#303030] border-b-2 border-[#df2143] sticky top-0 z-[15]">
      {/* logo */}
      <NavLink to="/" className="text-[#df2143] text-2xl font-bold">
        <img src={logo} alt="Logo" className="h-10" />
      </NavLink>

      {/* nav links */}
      <ul className="flex gap-16 text-white font-medium">
        <NavItem to="/" label="Home" />
        <NavItem to="/movies" label="Movies" />
        <NavItem to="/theaters" label="Theaters" />
        <NavItem to="/about" label="About" />
      </ul>

      <div className="flex gap-2">
        {/* search bar */}
        <SearchBar></SearchBar>

        {/* login/signup */}
        {/* <Button type="primary"> */}
        <NavLink to="/login" className="primary-btn btn">
          Login
        </NavLink>
        {/* </Button> */}
        <NavLink to="/login" className="secondary-btn btn">
          Signup
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
