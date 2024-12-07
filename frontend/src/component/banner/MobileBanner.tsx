/** @format */
import styles from "./Banner.module.css";
import { Tag } from "../ui/tag/Tag";

import imdb_icon from "../../../public/imdb_icon.svg";
import no_img_mobile from "../../../public/no_img_mobile.jpg";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface BannerProps {
  banner?: {
    id: string;
    poster: string | undefined;
    title: string;
    imdb: {
      rating: number;
    };
    genres: string[];
    plot: string;
    runtime: number | null;
  } | null;
}

const Poster: React.FC<BannerProps> = ({ banner }) => {
  return (
    <>
      <img
        src={banner?.poster || no_img_mobile}
        alt={banner?.title}
        className="absolute top-0 -z-10"
      />
    </>
  );
};

interface BannerDetailProps {
  banner: BannerProps["banner"];
  inView?: boolean;
}

const Title: React.FC<BannerDetailProps> = ({ banner, inView }) => {
  const ref = useRef(null);

  useEffect(
    function () {
      handlePopup(ref, inView);
    },
    [inView]
  );

  return (
    <p
      ref={ref}
      className={`text-5xl mb-4 text font-bold text-center mx-14 ${styles.outView}`}
      style={{ transition: "all 1s" }}>
      {banner?.title}
    </p>
  );
};

const BannerDetail: React.FC<BannerDetailProps> = ({ banner, inView }) => {
  const ref = useRef(null);

  useEffect(
    function () {
      handlePopup(ref, inView);
    },
    [inView]
  );

  return (
    <div
      ref={ref}
      style={{ transition: "all 1s" }}
      className={`w-full flex gap-8 justify-center mb-14 items-center ${styles.outView}`}>
      <div>
        {/* rating: start */}
        <div className="flex items-center gap-3 text-2xl mb-2">
          <img className="w-10" src={imdb_icon} />{" "}
          <span>
            <span className="font-bold text-4xl text-yellow-400 m-0">
              {banner?.imdb.rating}
            </span>
            /10
          </span>
        </div>
        {/* rating: end */}

        {/* runtime: start */}
        {banner?.runtime && (
          <div className="flex items-center gap-2 text-2xl">
            <span className="material-symbols-outlined text-yellow-400">
              schedule
            </span>
            {banner?.runtime} mins
          </div>
        )}
        {/* runtime: end */}
      </div>

      {/* gerne: start */}
      <div className="flex gap-8">
        {banner?.genres.slice(0, 2).map((gerne, i) => (
          <Tag key={`gerne-${i}-${banner.id}`}>{gerne}</Tag>
        ))}
      </div>
      {/* gerne: end */}
    </div>
  );
};

export const MobileBanner: React.FC<BannerProps> = ({ banner }) => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${styles.mobileBanner} justify-end flex relative flex-col gap-2 h-full w-full object-cover`}>
      {/* poster */}
      <Poster banner={banner}></Poster>

      {/* title & plot */}
      <Title banner={banner} inView={inView}></Title>

      {/* banner detail */}
      <BannerDetail banner={banner} inView={inView}></BannerDetail>
    </div>
  );
};

// handle function
const handlePopup = (
  el: React.RefObject<HTMLElement>,
  inView: boolean | undefined
) => {
  if (!el.current) return;

  if (inView) {
    el.current.classList.remove(styles.outView);
    el.current.classList.add(styles.inView);
  } else {
    el.current.classList.add(styles.outView);
    el.current.classList.remove(styles.inView);
  }
};
