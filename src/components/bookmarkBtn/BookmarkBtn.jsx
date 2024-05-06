import { useDispatch, useSelector } from "react-redux";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { addBookmark, removeBookmark } from "../../firebase-config";
import { addBookmarkToStore, removeBookmarkFromStore } from "../../store/slices/bookmarkSlice";


const BookmarkBtn = ({ movieId, mediaType }) => {

    const { bookmark } = useSelector(state => state.bookmarkSlice)
    const dispatch = useDispatch()

    const addedBookmarked = bookmark.find(e => e.movieId === movieId)

    const handleBookmark = async (e) => {
        e.preventDefault()
        if (addedBookmarked) {
            removeBookmark(movieId, mediaType)
            dispatch(removeBookmarkFromStore(movieId))
        } else {
            addBookmark(movieId, mediaType)
            dispatch(addBookmarkToStore({ movieId, mediaType }))
        }
    }


    return (
        <i className="absolute top-2 right-2 cursor-pointer bookmark-icon"
            onClick={handleBookmark}>
            {
                (addedBookmarked) ? <FaBookmark color="blue" /> : <FaRegBookmark />
            }

        </i>
    )
}

export default BookmarkBtn