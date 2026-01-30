import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { searchMovies } from "../services/api";

export default function SearchBar({ onSearch }) {
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
    <input
      type="text"
      placeholder="Search Movie"
      className="border px-3 py-2 rounded w-64"
      value={val}
      onChange={(e) => setVal(e.target.value)}
      disabled={loading}
    />

  );
}
