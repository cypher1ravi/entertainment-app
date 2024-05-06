import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SkeletonLoaderMovies from "../components/SkeletonLoaderMovies";
import Movie from "../components/Movie";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingMovies, setMovies, setSearchTermMovies } from "../store/slices/moviesSlice";

const Movies = () => {

  const { movies, loadingMovies, searchTermMovies } = useSelector(state => state.moviesSlice)
  const dispatch = useDispatch();
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


  const handleSearch = (term) => dispatch(setSearchTermMovies(term))

  useEffect(() => {
    dispatch(setLoadingMovies(true));

    // GET MOVIES SEARCH RESULTS
    if (searchTermMovies !== "") {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTermMovies}&include_adult=false`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(setMovies(data.results));
          dispatch(setLoadingMovies(false));
        })
        .catch((err) => {
          console.error(err);
        });
    }
    // GET POPULAR MOVIES at first and if search term empty
    else {
      fetch(
        `http://localhost:3001/movies?page=1&limit=8`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(setMovies(data.movies));
          dispatch(setLoadingMovies(false));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchTermMovies]);

  // useEffect(() => {
  //   dispatch(setLoadingMovies(true));
  //   fetch(
  //     `http://localhost:3001/movies?page=1&limit=8`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       dispatch(setMovies(data.movies));
  //       dispatch(setLoadingMovies(false));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    document.title = "Popular Movies"; //Modify Func Later
  });


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
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Map through movies and show Skeleton Loader when loading  */}
        {loadingMovies
          ? [...Array(20)].map((_, i) => <SkeletonLoaderMovies key={i} />)
          : movies.map((movie) => (
            <Link key={movie.id} to={`/movies/movie/${movie.id}`}>

              <Movie movie={movie} />
            </Link>
          ))}
      </div>
    </section>
  );
};

export default Movies;
