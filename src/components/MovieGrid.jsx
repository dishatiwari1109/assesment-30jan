import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import { searchMovies } from "../services/api";

function MovieGrid() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await searchMovies("avengers", currentPage);
        setMovies(data.Search || []);
        setTotalResults(parseInt(data.totalResults) || 0);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 ml-3">
        {movies.map((movie) => (
          <div key={movie.imdbID}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default MovieGrid;
