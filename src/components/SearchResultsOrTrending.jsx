import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Movie from "./Movie";
import SkeletonLoaderTrending from "./SkeletonLoaderTrending";
import Trending from "./Trending";
import ScrollContainer from "react-indiana-drag-scroll";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingTrending, setTrending } from "../store/slices/trendingSlice";

const SearchResultsOrTrending = () => {
  const { searchTerm, searchResults } = useSelector(state => state.searchResultsSlice);

  const { trending, loadingTrending } = useSelector(state => state.trendingSlice)
  const dispatch = useDispatch();

  // GET TRENDING MOVIES AND TV SERIES
  useEffect(() => {
    dispatch(setLoadingTrending(true));
    fetch(`http://localhost:3001/additional/trending?limit=8&page=1`)
      .then((res) => res.json())
      .then((data) => {
        console.log("running");
        console.log(data.trending);
        dispatch(setTrending(data.trending));
        dispatch(setLoadingTrending(false));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  return (
    <>
      {searchResults.length > 0 && searchTerm !== "" ? (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {searchResults.map((result) => {
            return (
              <Link key={result.id} to={`/movies/movie/${result.id}`}>
                <Movie movie={result} />
              </Link>
            );
          })}
        </div>
      ) : (
        <ScrollContainer vertical={false} className="w-full flex gap-x-4">
          {loadingTrending
            ? [...Array(20)].map((_, i) => <SkeletonLoaderTrending key={i} />)
            : trending.map((item) => (
              <Link key={item.id} to={`/trending/${item.id}`}>
                <Trending trending={item} />
              </Link>
            ))}
        </ScrollContainer>
      )}
    </>
  );
};

export default SearchResultsOrTrending;
