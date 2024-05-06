import { useDispatch, useSelector } from "react-redux";
import { setBookmark, setLoadingBookmark, setSearchTermBookmark } from "../store/slices/bookmarkSlice";
import { useEffect } from "react";

const Boookmarks = () => {

  const { bookmark, searchTermBookmark, loadingBookmark } = useSelector(state => state.bookmarkSlice)
  const dispatch = useDispatch()

  console.log(bookmark);



  return (
    <div className="px-4 pb-12 pt-20 flex justify-center items-center text-2xl uppercase animate-pulse lg:pl-32">
      Boookmarks coming soon ...
    </div>
  );
};

export default Boookmarks;
