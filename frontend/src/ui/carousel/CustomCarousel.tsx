/** @format */
import { ReactNode, MouseEventHandler, Dispatch, SetStateAction } from "react";
import { Carousel } from "@material-tailwind/react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

interface CustomCarouselProps {
  children?: ReactNode;
}

const PrevButton = ({
  onClick,
}: {
  onClick?: MouseEventHandler<HTMLDivElement>;
}) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 left-5 -translate-y-1/2 text-white text-4xl cursor-pointer z-10">
    <FaArrowLeft />
  </div>
);

const NextButton = ({
  onClick,
}: {
  onClick?: MouseEventHandler<HTMLDivElement>;
}) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 right-5 -translate-y-1/2 text-white text-4xl cursor-pointer z-10">
    <FaArrowRight />
  </div>
);

const Navigator = ({
  activeIndex,
  setActiveIndex,
  length,
}: {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  length: number;
}) => (
  <div className="absolute bottom-8 left-1/2 z-[5] flex -translate-x-1/2 gap-2">
    {Array.from({ length }).map((_, i) => (
      <span
        key={i}
        className={`block h-3 rounded-2xl cursor-pointer transition-all ${
          activeIndex === i ? "w-16 bg-white" : "w-10 bg-gray-500"
        }`}
        onClick={() => setActiveIndex(i)}
      />
    ))}
  </div>
);

const CustomCarousel: React.FC<CustomCarouselProps> = ({ children }) => {
  return (
    <Carousel
      className="overflow-hidden carousel"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <Navigator
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          length={length}
        />
      )}
      prevArrow={({ handlePrev }) => <PrevButton onClick={handlePrev} />}
      nextArrow={({ handleNext }) => <NextButton onClick={handleNext} />}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}>
      {children}
    </Carousel>
  );
};

export default CustomCarousel;
