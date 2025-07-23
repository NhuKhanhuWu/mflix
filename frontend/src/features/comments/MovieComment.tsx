/** @format */

import {
  useInfiniteQuery,
  InfiniteData,
  QueryFunctionContext,
} from "@tanstack/react-query";
import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";

import { getCommentByMovie } from "../../api/comment/getComment";
import { RootState } from "../../redux/store";
import { Comment, CommentPage } from "../../interfaces/commentInterface";
import SectionHeader from "../../ui/SectionHeader";
import LoadAndErr from "../../ui/Spinner";
import CommentItem from "./CommentItem";
import AddCmtForm from "./AddCmtForm";
import CmtSort from "./CmtSort";

interface MovieCommentProps {
  movieId: string;
  sectionId: string;
}

const MovieComment: React.FC<MovieCommentProps> = ({ movieId, sectionId }) => {
  const userId = useSelector((state: RootState) => state.auth.id);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<
    CommentPage,
    Error,
    InfiniteData<CommentPage, number>,
    [string, string, string | undefined],
    number
  >({
    queryKey: ["comments", movieId, userId],
    queryFn: ({
      pageParam = 1,
    }: QueryFunctionContext<[string, string, string | undefined], number>) =>
      getCommentByMovie({
        movie_id: movieId,
        page: pageParam,
        user_id: userId,
      }),
    getNextPageParam: (lastPage, allPages) =>
      allPages.length < lastPage.totalPages ? allPages.length + 1 : undefined,
    initialPageParam: 1,
  });

  const allComments = useMemo<Comment[]>(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  const totalResult = data?.pages[0]?.totalResult ?? 0;

  return (
    <div ref={scrollRef} className="w-[60%] pl-6">
      <SectionHeader title="Comments" id={sectionId} />

      {/* sort */}
      <div className="mb-8 flex items-center gap-16">
        <p className="text-3xl font-bold">{totalResult} comment(s)</p>
        <CmtSort />
      </div>

      {/* add cmt */}
      <AddCmtForm movieId={movieId} />

      {/* cmt */}
      {isLoading || isError ? (
        <LoadAndErr isLoading={isLoading} isError={isError} />
      ) : (
        <InfiniteScroll
          pageStart={0}
          loadMore={() => fetchNextPage()}
          hasMore={hasNextPage && !isFetchingNextPage}
          loader={<div className="loader">Loading more comments...</div>}>
          <div className="flex flex-col gap-6 rounded-2xl bg-[var(--color-gray-800)] p-6">
            {allComments.map((comment) => (
              <CommentItem key={comment._id} comment={comment} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default MovieComment;
