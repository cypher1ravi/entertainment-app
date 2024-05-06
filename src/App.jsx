import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import Series from "./pages/Series";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./PrivateRoute";
import Movies from "./pages/Movies";
import Boookmarks from "./pages/Boookmarks";
import Header from "./components/Header";
import MovieDetails from "./pages/MovieDetails";
import Footer from "./components/Footer";
import Error404 from "./pages/Error404";

function App() {

  return (
    <div className="relative bg-background w-full min-h-screen text-primaryColor pb-8 font-[Outfit]">
      <ErrorBoundary>

        <Header />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route index path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/bookmark" element={<Boookmarks />} />
            <Route path="/movies/movie/:id" element={<MovieDetails />} />
            <Route path="/trending/:id" element={<MovieDetails />} />
            <Route path="/series/tv/:id" element={<MovieDetails />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        {/* <Footer /> */}

      </ErrorBoundary>
    </div>
  );
}

export default App;
