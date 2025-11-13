/** @format */

import { useQuery } from "@tanstack/react-query";
import { getMyCmt } from "../../api/comment/getMyCmt";
import LoadAndErr from "../../ui/common/Spinner";
import {
  CmtByUser,
  CmtByUserProps,
  CmtList,
} from "../../interfaces/commentInterface";
import { Link } from "react-router-dom";

const CmtItem: React.FC<CmtByUserProps> = ({ comment }) => {
  const cmtDate = new Date(comment.date);

  return (
    <div className="flex gap-4 py-4">
      {/* poster */}
      <img
        src={comment.movie.poster}
        loading="lazy"
        alt={comment.movie.title}
        className="w-[8rem]"
      />

      {/* text */}
      <div>
        {/* cmt infor (date, movie) */}
        <p className="mb-4">
          At <span className="font-bold">{cmtDate.toLocaleString()}</span> in
          movie{" "}
          <Link to={`/movie/${comment.movie.slug}`} className="link">
            "{comment.movie.title}"
          </Link>{" "}
          you had commented:
        </p>

        <p>{comment.text}</p>
      </div>

      {/* menu */}
      <Link
        to={`/movie/${comment.movie.slug}#${comment._id}`}
        className="ml-auto mr-2 btn primary-btn h-fit">
        See
      </Link>
    </div>
  );
};

function MyCmt() {
  const { data, isPending, isError } = useQuery<CmtList<CmtByUser>>({
    queryKey: ["my-cmt"],
    queryFn: () => getMyCmt(),
  });

  return (
    <div className="w-[80rem] ">
      <h1 className="text-5xl font-bold text-center text-brand-red mb-12">
        Your Comments
      </h1>
      <LoadAndErr isLoading={isPending} isError={isError} />

      <div className="flex flex-col divide-y divide-gray-300 h-[80vh] overflow-auto">
        {data?.data.map((cmt) => (
          <CmtItem comment={cmt} />
        ))}
      </div>
    </div>
  );
}

export default MyCmt;
