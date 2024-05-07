import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SkeletonLoaderMovies from "../components/SkeletonLoaderMovies";
import TV from "../components/TV";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingSeries, setSearchTermSeries, setSeries } from "../store/slices/seriesSlice";
import InfiniteScroll from 'react-infinite-scroll-component';

const Series = () => {
  const { series, searchTermSeries, loadingSeries } = useSelector(state => state.seriesSlice);
  const dispatch = useDispatch();
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const [page, setPage] = useState(1); // State to track the current page
  const [totalResult, setTotalResults] = useState()
  const handleSearch = (term) => dispatch(setSearchTermSeries(term));

  useEffect(() => {
    document.title = 'Popular TVs';
  }, []);

  useEffect(() => {
    dispatch(setLoadingSeries(true));
    setPage(1); // Reset page when search term changes
    fetchTVSeries(1);
  }, [searchTermSeries]);

  const fetchTVSeries = (pageNumber) => {
    fetch(
      `http://localhost:3001/tvseries?limit=8&page=${pageNumber}` // Modify the localhost link
    )
      .then((res) => res.json())
      .then((data) => {
        if (pageNumber === 1) {
          dispatch(setSeries(data.tvSeries));
          setTotalResults(data.totalDocuments);
          console.log(data.totalDocuments);
        } else {
          dispatch(setSeries([...series, ...data.tvSeries]));
        }
        setPage(pageNumber + 1); // Increment page for the next fetch
        dispatch(setLoadingSeries(false));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchMoreData = () => {
    fetchTVSeries(page);
  };

  return (
    <section className="px-4 pb-12 lg:pl-32">
      <SearchBar
        searchTerm={searchTermSeries}
        setSearchTerm={handleSearch}
        placeholder="Search for TV"
      />
      <div className="my-6 font-light text-xl tracking-[-0.3125px] flex gap-x-2 items-center ">
        <h1 className="text-xl">Popular</h1>
        <p className="border font-medium py-[1px] text-xs px-2 rounded-md">
          TV
        </p>
      </div>
      {/* Infinite Scroll Component */}
      <InfiniteScroll
        dataLength={series.length}
        next={fetchMoreData}
        hasMore={series.length !== totalResult}
        loader={[...Array(3)].map((_, i) => <SkeletonLoaderMovies key={i} />)}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>No more series</b>
          </p>
        }
      >
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {series.map((tv) => (
            <Link key={tv.id} to={`/series/tv/${tv.id}`}>
              <TV movie={tv} />
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default Series;
