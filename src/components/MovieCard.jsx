import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import fav from "../assets/love.png";
import bookmark from "../assets/save.png";
import liked from "../assets/liked.jpg";
import saved from "../assets/saved.png";
import { getPosterUrl } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite, addToWatchlist, removeFromWatchlist } from "../store/slices/userSlice";
// import { useState } from "react";
function MovieCard({ movie }) {
    const navigate = useNavigate();
    const [favourite, setFavourite]=useState(fav);
    const [watchlist, setWatchlist]=useState(bookmark);
    const dispatch = useDispatch();
    const handlefav=(id)=>{
        dispatch(toggleFavorite(id));
        favourite===fav?setFavourite(liked):setFavourite(fav);
    }
    const handlewatch=(id)=>{
        dispatch(addToWatchlist(id));
        watchlist===bookmark?setWatchlist(saved):setWatchlist(bookmark);
    }
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 cursor-pointer transition hover:shadow-xl">
        <img
          className="w-full h-64 object-cover cursor-pointer"
          src={getPosterUrl(movie?.Poster)}
          alt={movie?.Title || "Movie Poster"}
          onClick={() => navigate(`/movie/${movie.imdbID}`)}
        />
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 cursor-pointer hover:text-blue-600" onClick={() => navigate(`/movie/${movie.imdbID}`)}>{movie.Title}</div> 
            <p className="text-gray-700 text-base">Year: {movie.Year}</p>
            <div className="mt-3 flex items-center gap-3">
              <button onClick={() => handlefav(movie.imdbID)}><img
                src={favourite}
                alt="Favorite"
                className="h-8 w-8 rounded-full bg-pink-50 p-1 shadow-sm transition hover:scale-105"
              />
              </button>
              <button onClick={()=>handlewatch(movie.imdbID)}>
              <img
                src={watchlist}
                alt="Bookmark"
                className="h-8 w-8 rounded-full bg-indigo-50 p-1 shadow-sm transition hover:scale-105"
              /> </button>
            </div>
        </div>
    </div>
  );
}
export default MovieCard;
