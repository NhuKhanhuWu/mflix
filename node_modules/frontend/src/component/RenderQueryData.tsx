/** @format */
// import Loader from "./Loader/Loader";
// import NoResult from "./NoResult/NoResult.jsx";

import React, { ReactNode } from "react";

interface RenderDataProps {
  children: ReactNode;
  isLoading: boolean;
  error: string;
}

const RenderData: React.FC<RenderDataProps> = ({
  children,
  isLoading,
  error,
}) => {
  // render element acording to status
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;
  if (!children) return <div>No Result</div>;

  return <>{children}</>;
};

export default RenderData;
