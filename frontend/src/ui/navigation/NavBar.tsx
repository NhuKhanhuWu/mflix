/** @format */

import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";
import SmallAvartar from "../common/SmallAvartar.tsx";
import { getNavLinkClass } from "../../utils/getNavLinkClass.ts";

interface NavItemProps {
  to: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, label }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${getNavLinkClass({ isActive })} uppercase text-3xl font-medium`
      }>
      {label}
    </NavLink>
  </li>
);

function NavBar() {
  // check if login
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const avatar = useSelector((state: RootState) => state.auth.avartar);

  return (
    <nav className="flex items-center justify-between h-24 px-6 bg-[#303030] border-b-2 border-[#df2143] sticky top-0 z-[15]">
      {/* logo */}
      <NavLink
        to="/"
        className="text-[#df2143] text-6xl font-train-one font-medium">
        MFLIX
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
        {/* <SearchBar></SearchBar> */}

        {/* login/signup */}
        {isLogin ? (
          <NavLink
            to="/profile"
            className="text-5xl text-[var(--color-gray-300)] hover:text-[var(--color-red-900)]">
            <SmallAvartar avartar={avatar} />
          </NavLink>
        ) : (
          <>
            <NavLink to="/login" className="primary-btn btn">
              Login
            </NavLink>
            <NavLink to="/signup" className="secondary-btn btn">
              Signup
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
