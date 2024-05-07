import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SkeletonLoaderMovies from "../components/SkeletonLoaderMovies";
import Movie from "../components/Movie";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingMovies, setMovies, setSearchTermMovies } from "../store/slices/moviesSlice";
import InfiniteScroll from 'react-infinite-scroll-component';

const Movies = () => {
  const { movies, loadingMovies, searchTermMovies } = useSelector(state => state.moviesSlice)
  const dispatch = useDispatch();
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const [page, setPage] = useState(1);
  const [totalResult, setTotalResults] = useState()

  const handleSearch = (term) => dispatch(setSearchTermMovies(term))

  useEffect(() => {
    document.title = "Popular Movies";
  }, []);

  useEffect(() => {
    dispatch(setLoadingMovies(true));
    setPage(1); // Reset page when search term changes
    fetchMovies(1);
  }, [searchTermMovies]);

  const fetchMovies = (pageNumber) => {
    fetch(
      `http://localhost:3001/movies?page=${pageNumber}&limit=8`
    )
      .then((res) => res.json())
      .then((data) => {
        if (pageNumber === 1) {
          dispatch(setMovies(data.movies));
          setTotalResults(data.totalDocuments)
        } else {
          dispatch(setMovies([...movies, ...data.movies]));
        }
        setPage(pageNumber + 1); // Increment page for the next fetch
        dispatch(setLoadingMovies(false));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchMoreData = () => {
    fetchMovies(page);
  };

  return (
    <section className="px-4 pb-12 lg:pl-32">
      <SearchBar
        searchTerm={searchTermMovies}
        setSearchTerm={handleSearch}
        placeholder="Search for movies"
      />
      <div className="my-6 font-light text-xl tracking-[-0.3125px] flex gap-x-2 items-center ">
        <h1 className="text-xl">Popular</h1>
        <p className="border font-medium py-[1px] text-xs px-2 rounded-md">
          MOVIE
        </p>
      </div>
      {/* Infinite Scroll Component */}
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreData}
        hasMore={movies.length !== totalResult} // Check if movies length is a multiple of 8 to determine if there are more items
        loader={[...Array(3)].map((_, i) => <SkeletonLoaderMovies key={i} />)}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>No more Movies</b>
          </p>
        }
      >
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie) => (
            <Link key={movie.id} to={`/movies/movie/${movie.id}`}>
              <Movie movie={movie} />
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default Movies;
