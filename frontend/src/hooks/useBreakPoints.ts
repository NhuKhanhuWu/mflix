/** @format */

import { useMediaQuery } from "react-responsive";

export function useBreakpoints() {
  const isSmMobile = useMediaQuery({ query: "(max-width: 576px)" });
  const isMdMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isMdTablet = useMediaQuery({ query: "(max-width: 768px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const isLgDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  return {
    isSmMobile,
    isMdMobile,
    isMdTablet,
    isDesktop,
    isLgDesktop,
  };
}
