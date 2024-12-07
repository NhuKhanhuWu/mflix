/** @format */

import { Carousel } from "@material-tailwind/react";
import React, { ReactElement } from "react";

import styles from "./CustomCarousel.module.css";

interface CustomCarouselProps {
  children: ReactElement[];
}

const preBtn = (
  callback: React.MouseEventHandler<HTMLDivElement> | undefined
) => (
  <div onClick={callback} className={`absolute top-1/2 left-5 text-5xl`}>
    <span className="material-symbols-outlined">arrow_back</span>
  </div>
);

const nextBtn = (
  callback: React.MouseEventHandler<HTMLDivElement> | undefined
) => (
  <div onClick={callback} className={`absolute top-1/2 right-5 text-5xl`}>
    <span className="material-symbols-outlined">arrow_forward</span>
  </div>
);

const carousel_nav = (
  activeIndex: number,
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>,
  length: number
) => {
  return (
    <div className="absolute bottom-8 left-2/4 z-20 flex -translate-x-2/4 gap-2">
      {new Array(length).fill("").map((_, i) => (
        <span
          key={i}
          className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
            activeIndex === i ? styles.indicateActive : styles.indicator
          }`}
          onClick={() => setActiveIndex(i)}
        />
      ))}
    </div>
  );
};

export const CustomCarousel: React.FC<CustomCarouselProps> = ({ children }) => {
  return (
    <Carousel
      navigation={({ setActiveIndex, activeIndex, length }) =>
        carousel_nav(activeIndex, setActiveIndex, length)
      }
      className={`overflow-hidden ${styles.carousel}`}
      prevArrow={({ handlePrev }) => preBtn(handlePrev)}
      nextArrow={({ handleNext }) => nextBtn(handleNext)}>
      {children}
    </Carousel>
  );
};
