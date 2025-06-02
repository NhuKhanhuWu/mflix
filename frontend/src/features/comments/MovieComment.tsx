/** @format */

import { useQuery } from "@tanstack/react-query";
import { getCommentByMovie } from "../../api/getComment";
import SectionHeader from "../../ui/SectionHeader";
import { CommentProps, CommnentList } from "../../interfaces/commentInterface";
import formatDate from "../../services/formatDate";
import LoadAndErr from "../../ui/Spinner";
import Paginate from "../../ui/Paginate";
import { useRef, useState } from "react";
import { data } from "react-router-dom";

const CommentItem: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="min-h-20 p-4 bg-[var(--color-gray-800)] rounded-2xl">
      <div className="mb-2">
        <span className="font-bold text-[var(--color-red-600)]">
          {comment.user_id.name}
        </span>{" "}
        -<span className="font-light"> {formatDate(comment.date)}</span>
      </div>
      <p>{comment.text}</p>
    </div>
  );
};

const MovieComment: React.FC<{ movieId?: string; sectionId: string }> = ({
  movieId,
  sectionId,
}) => {
  // mangage page state
  const [commentPage, setCommentPage] = useState(1);

  //   manage comment
  const {
    data: commentsObj,
    isLoading,
    isError,
  } = useQuery<CommnentList>({
    queryKey: ["comments", movieId, commentPage],
    queryFn: () => getCommentByMovie(movieId, commentPage),
  });

  //   scroll to top
  const scrollRef = useRef(null);

  return (
    <div ref={scrollRef}>
      <SectionHeader title="comment" id={sectionId} />

      {commentsObj ? (
        commentsObj.data.length > 0 ? (
          <>
            <div className="mx-8 grid grid-cols-2 gap-6">
              {commentsObj.data.map((cmt) => (
                <CommentItem comment={cmt} key={cmt._id} />
              ))}
            </div>

            <Paginate
              targetRef={scrollRef}
              pageAmount={commentsObj.totalPages}
              currPage={commentPage}
              changePageFunc={setCommentPage}
            />
          </>
        ) : (
          <p className="mx-8 ">No comment yet</p>
        )
      ) : (
        <LoadAndErr isLoading={isLoading} isError={isError} />
      )}
    </div>
  );
};

export default MovieComment;
