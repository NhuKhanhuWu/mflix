/** @format */

import { Outlet } from "react-router-dom";
import NavBar from "../navigation/NavBar/NavBar.tsx";
import Footer from "../common/Footer.tsx";
import ScrollToTop from "../common/ScrollToTop.tsx";

function AppLayout() {
  return (
    <>
      <NavBar></NavBar>

      <main>
        <Outlet></Outlet>
      </main>

      <Footer></Footer>

      <ScrollToTop />
    </>
  );
}

export default AppLayout;
