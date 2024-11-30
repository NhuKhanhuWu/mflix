/** @format */

import React from "react";
import { BannerContainer } from "../../component/banner/Banner";
import { useGetData } from "../../component/hook/useGetData";
import RenderData from "../../component/RenderQueryData";

export const Homepage: React.FC = () => {
  const {
    dataRes: dataBanner,
    isLoading: loadBanner,
    error: bannerErr,
  } = useGetData("movies?limit=1");
  const banners: [] = dataBanner?.data;

  return (
    <>
      <RenderData isLoading={loadBanner} error={bannerErr}>
        {banners?.map((banner) => (
          <BannerContainer
            banner={banner}
            key={`banner-${banner.id}`}></BannerContainer>
        ))}
      </RenderData>
    </>
  );
};
