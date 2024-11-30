/** @format */

import React from "react";
import MediaQuery from "react-responsive";
import { MobileBanner } from "./MobileBanner";

interface BannerProps {
  banner?: {
    id: string;
    poster: string;
    title: string;
    imdb: {
      rating: number;
    };
    genres: string[];
    plot: string;
  } | null;
}

export const BannerContainer: React.FC<BannerProps> = ({ banner }) => {
  return (
    <>
      {/* responsive */}
      <MediaQuery minWidth={320}>
        <MobileBanner banner={banner}></MobileBanner>
      </MediaQuery>
    </>
  );
};
