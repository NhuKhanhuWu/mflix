/** @format */

import { useEffect, useRef, useState } from "react";
import CustomModal from "../ui/common/Modal";
import DesktopFilter from "../features/movies/MovieFilter";
import { getMovieList } from "../api/movie/getMovieList";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { resetMovieFilter, changePage } from "../redux/movieFilterSlide";
import MovieList from "../features/movies/MovieList";
import SectionHeader from "../ui/common/SectionHeader";
import Paginate from "../ui/common/Paginate";
import useSyncMovieFiltersFromURL from "../hooks/useSyncMovieFiltersFromURL ";
import { RootState } from "../redux/store";

function Movies() {
  // set filter by url
  useSyncMovieFiltersFromURL();

  const [isOpenModal, setOpenModal] = useState(false);
  const queryString = useSelector(
    (state: RootState) => state.movieFilter.queryString
  );
  const page = useSelector((state: RootState) => state.movieFilter.page);
  const dispatch = useDispatch();

  // movie list
  const { data: moviesObj } = useQuery({
    queryKey: ["movies", `page=${page}&${queryString}`],
    queryFn: () => getMovieList(`page=${page}&${queryString}`),
  });

  // scroll to top when change page
  const scrollRef = useRef<HTMLDivElement>(null);

  // clear redux state when leaves page
  useEffect(() => {
    return () => {
      dispatch(resetMovieFilter());
    };
  }, []);

  return (
    <div ref={scrollRef}>
      {/* filter/sorter sidebar */}
      <div>
        <button
          className="primary-btn btn mt-4 ml-4 mb-12 sticky top-0"
          onClick={() => setOpenModal(!isOpenModal)}>
          Filter/Sort
        </button>
        <CustomModal open={isOpenModal} setOpen={setOpenModal}>
          <DesktopFilter setOpen={setOpenModal}></DesktopFilter>
        </CustomModal>
      </div>

      {/* movies */}
      <SectionHeader title="Result"></SectionHeader>

      <MovieList
        queryKey={["movies", `page=${page}&${queryString}`]}
        queryFn={() => getMovieList(`page=${page}&${queryString}`)}></MovieList>

      {/* pagination */}
      <Paginate
        targetRef={scrollRef}
        pageAmount={moviesObj?.totalPage}
        currPage={page}
        changePageFunc={(page: number) => dispatch(changePage(page))}
      />
    </div>
  );
}

export default Movies;
