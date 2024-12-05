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
    runtime: number | null;
  } | null;
}

export const MobileBanner: React.FC<BannerProps> = ({ banner }) => {
  return (
    <div
      className={`overflow-hidden ${styles.mobileBanner} justify-end flex relative flex-col gap-2`}>
      {/* poster */}
      <img
        src={banner?.poster}
        alt={banner?.title}
        className="absolute top-0 -z-10"
      />

      {/* title & plot: start */}
      <p className="text-5xl mb-4 text font-bold text-center">
        {banner?.title}
      </p>
      {/* title & plot: end */}

      <div
        className={` ${styles.moblieTxt} w-full flex gap-8 justify-center items-end mb-6 items-center`}>
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
    </div>
  );
};
