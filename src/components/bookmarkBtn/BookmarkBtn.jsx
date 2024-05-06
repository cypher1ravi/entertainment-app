import { useSelector } from "react-redux";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { addBookmark, removeBookmark } from "../../firebase-config";


const BookmarkBtn = ({ movieId, mediaType }) => {

    const handleBookmark = (e) => {
        e.preventDefault()
        addBookmark(movieId, mediaType)
        // removeBookmark(movie.id, "movies")
    }

    // const bookmark= useSelector(state=> state.bookmark)
    //duummy data for now
    const bookmark = []

    return (
        <i className="absolute top-2 right-2 cursor-pointer bookmark-icon"
            onClick={handleBookmark}>
            {
                (bookmark.includes(movieId)) ? <FaBookmark color="blue" /> : <FaRegBookmark />
            }

        </i>
    )
}

export default BookmarkBtn