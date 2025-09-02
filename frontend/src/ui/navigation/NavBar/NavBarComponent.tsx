/** @format */

import { NavLink } from "react-router-dom";
import { getNavLinkClass } from "../../../utils/getNavLinkClass";
import SmallAvartar from "../../common/SmallAvartar";

const navLinksMap = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Movies" },
  { to: "/theaters", label: "Theaters" },
  { to: "/about", label: "About" },
];

interface ProfileProps {
  isLogin: boolean;
  avatar: string;
}

export function Logo() {
  return (
    <NavLink
      to="/"
      className="text-[#df2143] text-6xl font-train-one font-medium">
      MFLIX
    </NavLink>
  );
}

export function NavLinks() {
  return (
    <>
      {navLinksMap.map(({ to, label }) => (
        <li>
          <NavLink
            to={to}
            className={({ isActive }) =>
              `${getNavLinkClass({ isActive })} uppercase text-3xl font-medium`
            }>
            {label}
          </NavLink>
        </li>
      ))}
    </>
  );
}

export const ProflieAvartar: React.FC<ProfileProps> = ({ isLogin, avatar }) => {
  return (
    <>
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
    </>
  );
};
