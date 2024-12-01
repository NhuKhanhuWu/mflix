/** @format */

import { Btn } from "../../../component/ui/button/Btn";

export default {
  title: "Component/UI/Btn",
  tags: ["autodocs"],
  component: Btn,
};

export const Primary = {
  args: {
    children: "Primary",
    isPrimary: true,
  },
};

export const Secondary = {
  args: {
    children: "Secondary",
    isPrimary: false,
  },
};
