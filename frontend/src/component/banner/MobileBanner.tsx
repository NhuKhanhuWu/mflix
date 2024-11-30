/** @format */
import styles from "./Banner.module.css";
import imdb_icon from "../../../public/imdb_icon.svg";
import { Tag } from "../ui/tag/Tag";

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

export const MobileBanner: React.FC<BannerProps> = ({ banner }) => {
  return (
    <div
      className={`overflow-hidden ${styles.mobileBanner} items-end flex relative`}>
      {/* poster */}
      <img
        src={banner?.poster}
        alt={banner?.title}
        className="absolute top-0 -z-10"
      />

      <div
        className={`py-10 px-8 ${styles.moblieTxt} w-full flex gap-8 justify-center items-end`}>
        <div>
          {/* rating: start */}
          <div className="flex items-center gap-3 text-2xl mb-5">
            <img className="w-12" src={imdb_icon} />{" "}
            <span>
              <span className="font-bold text-5xl text-yellow-400 m-0">
                {banner?.imdb.rating}
              </span>
              /10
            </span>
          </div>
          {/* rating: end */}

          {/* gerne: start */}
          <div className="flex gap-4">
            {banner?.genres.slice(0, 2).map((gerne, i) => (
              <Tag key={`gerne-${i}-${banner.id}`}>{gerne}</Tag>
            ))}
          </div>
          {/* gerne: end */}
        </div>

        {/* title & plot: start */}
        <div>
          <p className="text-4xl mb-2 text font-bold">{banner?.title}</p>
          <p>{banner?.plot.slice(0, 80)}...</p>
        </div>
        {/* title & plot: end */}
      </div>
    </div>
  );
};
