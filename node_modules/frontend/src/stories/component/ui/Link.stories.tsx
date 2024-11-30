/** @format */
import { BrowserRouter } from "react-router-dom";
import { UrlLink } from "../../../component/ui/link/Link";

export default {
  title: "Component/UI/Link",
  component: UrlLink,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export const NavLink = {
  args: { txt: "Nav Link", url: "#", isNav: true, isActive: true },
};

export const Link = {
  args: { txt: "Nav Link", url: "#", isNav: false },
};
