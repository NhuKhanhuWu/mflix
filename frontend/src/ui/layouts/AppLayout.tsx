/** @format */

import { Outlet } from "react-router-dom";
import NavBar from "../navigation/NavBar.tsx";
import Footer from "../common/Footer.tsx";

function AppLayout() {
  return (
    <>
      <NavBar></NavBar>

      <main>
        <Outlet></Outlet>
      </main>

      <Footer></Footer>
    </>
  );
}

export default AppLayout;
