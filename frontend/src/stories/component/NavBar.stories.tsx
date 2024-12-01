/** @format */

import { NavBar } from "../../component/navbar/NavBar";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Component/Navbar",
  component: NavBar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export const Default = {};
