/** @format */

import { useQuery } from "@tanstack/react-query";
import { getCommentByMovie } from "../../api/comment/getComment";
import SectionHeader from "../../ui/SectionHeader";
import { CommnentList } from "../../interfaces/commentInterface";
import LoadAndErr from "../../ui/Spinner";
import Paginate from "../../ui/Paginate";
import { useMemo, useRef, useState } from "react";
import CommentItem from "./CommentItem";
import AddCmtForm from "./AddCmtForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CmtFilter from "./CmtFilter";

const MovieComment: React.FC<{ movieId?: string; sectionId: string }> = ({
  movieId,
  sectionId,
}) => {
  // mangage page state
  const [commentPage, setCommentPage] = useState(1);
  const user_id = useSelector((state: RootState) => state.auth.id);
  const [showOnlyMyCmt, setShowOnlyMyCmt] = useState<true | false>(false);

  //   manage comment
  const {
    data: commentsObj,
    isLoading,
    isError,
  } = useQuery<CommnentList>({
    queryKey: ["comments", movieId, commentPage],
    queryFn: () =>
      getCommentByMovie({
        movie_id: movieId,
        page: commentPage,
        user_id,
      }),
  });

  // memorize filter cmt to improve performent
  const comments = useMemo(() => {
    if (!commentsObj) return [];

    if (showOnlyMyCmt) {
      return commentsObj.data.filter((cmt) => cmt.user_id._id === user_id);
    }

    return commentsObj.data;
  }, [showOnlyMyCmt, commentsObj, user_id]);

  //   scroll to top
  const scrollRef = useRef(null);

  return (
    <div ref={scrollRef} className="w-[60%] pl-6">
      <SectionHeader title="comment" id={sectionId} />

      {/* total cmt, filter */}
      <div className="flex gap-16 items-center mb-8">
        <p className="text-3xl font-bold">
          {commentsObj?.totalResult} comment(s)
        </p>
        <CmtFilter setShowOnlyMyCmt={setShowOnlyMyCmt} />
      </div>

      {/* add cmt form */}
      <AddCmtForm movieId={movieId} />

      {commentsObj?.totalResult ? (
        <>
          <div className="p-6 flex flex-col gap-6 bg-[var(--color-gray-800)] rounded-2xl">
            {comments.map((cmt) => (
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
        <LoadAndErr isLoading={isLoading} isError={isError} />
      )}
    </div>
  );
};

export default MovieComment;
