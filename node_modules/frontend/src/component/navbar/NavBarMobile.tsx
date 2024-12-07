/** @format */

import React from "react";
import { useState, useEffect } from "react";

import styles from "./NavBar.module.css";

interface MenuBtnProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  width: number;
  transTop?: number;
  transBot?: number;
}

// open, close menu btn: start
function MenuBtn({
  isOpen,
  setOpen,
  width,
  transTop = 0.6,
  transBot = 1.4,
}: MenuBtnProps) {
  // btn animation
  const transFormTop = isOpen
    ? `translate(0, ${transTop}rem) rotate(-45deg)`
    : "";

  const transFormBot = isOpen
    ? `translate(0, ${transBot}rem) rotate(45deg)`
    : "";

  return (
    // 3 bars of btn
    <div
      className={`${styles.container} ${isOpen ? styles.change : ""}`}
      onClick={() => setOpen(!isOpen)}>
      <div
        className={`${styles.bar1}`}
        style={{ width: `${width}rem`, transform: transFormTop }}></div>
      <div className={`${styles.bar2}`} style={{ width: `${width}rem` }}></div>
      <div
        className={`${styles.bar3}`}
        style={{ width: `${width}rem`, transform: transFormBot }}></div>
    </div>
  );
}
// open, close menu btn: end

// navbar moblie: start
interface NavBarMobileProps {
  hiddenChild?: React.ReactNode;
  visiChild?: React.ReactNode;
  width?: number;
  transTop?: number;
  transBot?: number;
}

export function NavBarMobile({
  hiddenChild = null,
  visiChild = null,
  width = 2,
  transTop = 0.6,
  transBot = 1.4,
}: NavBarMobileProps) {
  const [isOpen, setOpen] = useState<boolean>(false); //open, close state
  const [navHeight, setNavHeight] = useState<number | null>(null); // get visible nav height

  useEffect(() => {
    const nav = document.querySelector(".nav") as HTMLElement | null;
    if (nav) {
      setNavHeight(nav.clientHeight);
    }
  }, []);

  return (
    <>
      {/* visible navbar: start */}
      <div className={`nav flex justify-between px-5 py-5 align-middle`}>
        {visiChild}
        <MenuBtn
          isOpen={isOpen}
          setOpen={setOpen}
          width={width}
          transBot={transBot}
          transTop={transTop}
        />
      </div>
      {/* visible navbar: end */}

      {/* hidden navbar: start */}
      <div
        style={{ top: `${navHeight || 0}px` }}
        className={`${styles.sideBar} ${isOpen ? styles.open : ""} z-50`}>
        {hiddenChild}
      </div>
      {/* hidden navbar: end */}
    </>
  );
}
// navbar moblie: end
