/** @format */

// utils/navLinkClass.ts
export const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `${
    isActive ? "text-[#e23756]" : "text-white hover:text-[#e23756] transition"
  }`;
