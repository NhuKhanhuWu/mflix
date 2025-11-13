/** @format */

import { ReactNode } from "react";

/** @format */
interface ContentBlockProps {
  title: string;
  children: ReactNode;
}

export const ContentBlock: React.FC<ContentBlockProps> = ({
  title,
  children,
}) => {
  return (
    <div className="py-36 px-28 text-center bg-[rgb(75, 75, 75)]">
      <h1 className="text-brand-red font-train-one text-[5rem] uppercase">
        {title}
      </h1>
      {children}
    </div>
  );
};
