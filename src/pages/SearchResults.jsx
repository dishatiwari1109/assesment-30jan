import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { searchMovies } from "../services/api";

export default function SearchResults({ onSearch }) {
  const [val, setVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData]=useState([]);
  const debouncedSearchTerm = useDebounce(val, 500);

  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      onSearch?.({ Search: [], totalResults: "0" });
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        const dataa = await searchMovies(debouncedSearchTerm, 1);
        console.log(dataa);
        setData(dataa);
        onSearch?.(dataa);
      } catch (error) {
        console.error("Search error:", error);
        onSearch?.({ Search: [], totalResults: "0", error: error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedSearchTerm, onSearch]);

  return (
    <>
    {data.map((movie) => (
      <div key={movie.imdbID}>
        <MovieCard movie={movie} />
      </div>
    ))}
    </>
  );
}
