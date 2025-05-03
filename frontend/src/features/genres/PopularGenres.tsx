/** @format */

import { Link } from "react-router-dom";
import { GenreListProps } from "../../interfaces/genreInterface";
import { ContentBlock } from "../../ui/ContentBlock";
import Spinner from "../../ui/Spinner";

// Predefined column start values to center items in each row (7-column grid)
const colStartClasses = [
  "col-start-3",
  "col-start-4",
  "col-start-5", // Row 1 (3 items)
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6", // Row 2 (5 items)
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7", // Row 3 (7 items)
];

const PopularGernes: React.FC<GenreListProps> = ({ genres, isLoading }) => {
  if (isLoading) return <Spinner />;

  return (
    <ContentBlock title="popular genres">
      <div
        className="grid justify-center gap-2"
        style={{ gridTemplateColumns: "repeat(7, min-content)" }}>
        {genres?.slice(0, 15).map((genre, index) => (
          <div
            key={genre._id}
            className={`${colStartClasses[index]} flex justify-center`}>
            <Link
              to={`genres/${genre._id}`}
              className="flex gap-3 secondary-btn btn">
              <span>{genre._id}</span>
              <span className="text-[var(--color-gray-600)] text-xl self-end">
                {genre.count}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </ContentBlock>
  );
};

export default PopularGernes;
