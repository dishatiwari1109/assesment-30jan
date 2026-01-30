import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { searchMovies } from "../services/api";

function MovieGrid() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const data = await searchMovies();
    //   console.log(data); 
      setMovies(data.Search);
    };
    fetchMovies();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-4 ml-3">
      {movies.map((movie) => (
        <div key={movie.imdbID}>
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}

export default MovieGrid;
