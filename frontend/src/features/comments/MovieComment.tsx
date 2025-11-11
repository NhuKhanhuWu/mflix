/** @format */

import {
  useInfiniteQuery,
  InfiniteData,
  QueryFunctionContext,
} from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";

import { getCommentByMovie } from "../../api/comment/getMovieCmt";
import { RootState } from "../../redux/store";
import { CmtByMovie, CommentPage } from "../../interfaces/commentInterface";
import SectionHeader from "../../ui/common/SectionHeader";
import LoadAndErr from "../../ui/common/Spinner";
import CmtItem from "./CommentItem";
import AddCmtForm from "./AddCmtForm";
import CmtSort from "./CmtSort";
import { useLocation } from "react-router-dom";

type queryKey = [string, string, string | undefined, string];

interface MovieCommentProps {
  movieId: string;
  sectionId: string;
}

type QueryKeyType = [string, string, string?, string?];

const MovieComment: React.FC<MovieCommentProps> = ({ movieId, sectionId }) => {
  const userId = useSelector((state: RootState) => state.auth.id);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [sortOrder, setSortOrder] = useState("-date"); // -date: desc, date: asc

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
    queryKey,
    number
  >({
    queryKey: ["comments", movieId, userId, sortOrder],
    queryFn: ({ pageParam = 1 }: QueryFunctionContext<QueryKeyType, number>) =>
      getCommentByMovie({
        movie_id: movieId,
        page: pageParam,
        user_id: userId,
        sort: sortOrder,
      }),
    getNextPageParam: (lastPage, allPages) =>
      allPages.length < lastPage.totalPages ? allPages.length + 1 : undefined,
    initialPageParam: 1,
  });

  const allComments = useMemo<CmtByMovie[]>(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  const totalResult = data?.pages[0]?.totalResult ?? 0;

  // scroll to cmt
  const location = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (location.hash) {
        const el = document.getElementById(location.hash.slice(1));
        if (el) {
          el.scrollIntoView({
            block: "start",
            inline: "nearest",
          });
        }
      }
    }, 1000); // Adjust delay if needed

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div ref={scrollRef} className="w-[60%] pl-6">
      <SectionHeader title="Comments" id={sectionId} />

      {/* sort */}
      <div className="mb-8 flex items-center gap-16">
        <p className="text-3xl font-bold">{totalResult} comment(s)</p>
        <CmtSort setSortOrder={setSortOrder} />
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
              <CmtItem key={comment._id} comment={comment} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default MovieComment;
