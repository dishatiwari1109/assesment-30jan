import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import { getPosterUrl } from "../utils/helpers";
import { useDispatch } from "react-redux";
import { toggleFavorite, addToWatchlist } from "../store/slices/userSlice";
import fav from "../assets/love.png";
import bookmark from "../assets/save.png";
import liked from "../assets/liked.jpg";
import saved from "../assets/saved.png";
import LoadingSkeleton from "../components/LoadingSkeleton";

export default function MovieDetails() {
  const { imdbID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourite, setFavourite] = useState(fav);
  const [watchlist, setWatchlist] = useState(bookmark);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(imdbID);
        setMovie(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  const handleFav = (id) => {
    dispatch(toggleFavorite(id));
    setFavourite(favourite === fav ? liked : fav);
  };

  const handleWatch = (id) => {
    dispatch(addToWatchlist(id));
    setWatchlist(watchlist === bookmark ? saved : bookmark);
  };

  if (loading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-xl mb-4">Error: {error}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-500 text-xl mb-4">Movie not found</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        ← Back
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
          {/* Poster */}
          <div className="md:col-span-1">
            <img
              src={getPosterUrl(movie.Poster)}
              alt={movie.Title}
              className="w-full rounded-lg shadow-md"
            />
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => handleFav(movie.imdbID)}
                className="flex-1 flex items-center justify-center bg-pink-100 hover:bg-pink-200 rounded-lg p-3 transition"
              >
                <img
                  src={favourite}
                  alt="Favorite"
                  className="h-8 w-8"
                />
              </button>
              <button
                onClick={() => handleWatch(movie.imdbID)}
                className="flex-1 flex items-center justify-center bg-indigo-100 hover:bg-indigo-200 rounded-lg p-3 transition"
              >
                <img
                  src={watchlist}
                  alt="Watchlist"
                  className="h-8 w-8"
                />
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{movie.Title}</h1>
            <p className="text-gray-600 text-lg mb-4">
              {movie.Year} • {movie.Rated} • {movie.Runtime}
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Genre</h3>
              <p className="text-gray-700">{movie.Genre}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Plot</h3>
              <p className="text-gray-700 leading-relaxed">{movie.Plot}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Director</h3>
                <p className="text-gray-700">{movie.Director}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Writer</h3>
                <p className="text-gray-700">{movie.Writer}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Actors</h3>
                <p className="text-gray-700">{movie.Actors}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">IMDB Rating</h3>
                <p className="text-xl font-bold text-yellow-600">{movie.imdbRating} / 10</p>
              </div>
            </div>

            {movie.BoxOffice && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Box Office</h3>
                <p className="text-gray-700">{movie.BoxOffice}</p>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Awards</h3>
              <p className="text-gray-700">{movie.Awards}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}