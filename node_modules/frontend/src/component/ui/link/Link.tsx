/** @format */

import { NavLink } from "react-router-dom";
import styles from "./Link.module.css";

interface LinkProps {
  txt: string; // Text for the link
  url: string; // URL for the link,
  isNav: boolean;
}

export const UrlLink: React.FC<LinkProps> = ({ txt, url, isNav }) => {
  const navClass = isNav ? styles.navLink : styles.link;

  return (
    <NavLink
      to={url}
      className={({ isActive }) =>
        `${navClass} ${isActive ? styles.navActive : ""}`
      }>
      {txt}
    </NavLink>
  );
};
