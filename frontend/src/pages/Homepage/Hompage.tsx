/** @format */

import React from "react";
import { useGetData } from "../../component/hook/useGetData";

import { BannerContainer } from "../../component/banner/Banner";
import RenderData from "../../component/RenderQueryData";
import { CustomCarousel } from "../../component/ui/Carousel/CustomCarousel";

export const Homepage: React.FC = () => {
  const {
    dataRes: dataBanner,
    isLoading: loadBanner,
    error: bannerErr,
  } = useGetData("movies?limit=4&page=1");
  const banners: [] = dataBanner?.data;

  return (
    <>
      {/* banner */}
      <RenderData isLoading={loadBanner} error={bannerErr}>
        <CustomCarousel>
          {banners?.map((banner) => (
            <BannerContainer banner={banner} key={banner.id}></BannerContainer>
          ))}
        </CustomCarousel>
      </RenderData>
      {/* banner */}
    </>
  );
};
