import React, { useEffect, useState } from "react";
import { loadFromStorage } from "../services/localStorage";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../services/api";
function Favourites (){
  const [movies, setMovies] = useState([]);
    useEffect(() => {
      const fetchMovies = async () => {
        const moviees = await searchMovies();
        setMovies(moviees.Search);
      };
      fetchMovies();
    }, []);
    const data=loadFromStorage("favorites", []);
    console.log(data);
  return(
    <div>
        {
          data.map((movieId)=>(
            movies.filter((movie)=>movie.imdbID===movieId)).map((movie)=>(
            <div key={movie.imdbID}>
              <MovieCard movie={movie} />
            </div>
            )))
        }
    </div>
  )
}
export default Favourites;
