/** @format */

import { MobileBanner } from "../../component/banner/MobileBanner.tsx";
import RenderData from "../../component/RenderQueryData";

const testData = {
  genres: ["Crime", "Drama"],
  id: "573a1390f29313caabcd4eaf",
  imdb: { rating: 6, votes: 371, id: 3471 },
  plot: "A woman, with the aid of her police officer sweetheart, endeavors to uncover the prostitution ring that has kidnapped her sister, and the philanthropist who secretly runs it.",
  poster:
    "https://m.media-amazon.com/images/M/MV5BYzk0YWQzMGYtYTM5MC00NjM2LWE5YzYtMjgyNDVhZDg1N2YzXkEyXkFqcGdeQXVyMzE0MjY5ODA@._V1_SY1000_SX677_AL_.jpg",
  runtime: 88,
  slug: "traffic-in-souls",
  title: "Traffic in Souls",
  _id: "573a1390f29313caabcd4eaf",
};

export default {
  title: "Component/Banner",
  component: MobileBanner,
  tags: ["autodocs"],
};

export const Mobile = () => {
  return (
    <RenderData isLoading={false} error={""}>
      <MobileBanner banner={testData}></MobileBanner>
    </RenderData>
  );
};
