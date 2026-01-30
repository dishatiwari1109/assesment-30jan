// src/services/api.js
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (
  searchTerm,
  page = 1,
  type = "",
  year = "",
) => {
  if (!API_KEY) {
    throw new Error("Missing OMDB API key. Set VITE_OMDB_API_KEY.");
  }

  const params = new URLSearchParams({
    apikey: API_KEY,
    s: searchTerm || "avengers",
    page: page.toString(),
    ...(type && type !== "all" && { type }),
    ...(year && year !== "all" && { y: year }),
  });

  const response = await fetch(`${BASE_URL}?${params.toString()}`);
  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data;
};

export const getMovieDetails = async (imdbID) => {
  if (!API_KEY) {
    throw new Error("Missing OMDB API key. Set VITE_OMDB_API_KEY.");
  }

  const params = new URLSearchParams({
    apikey: API_KEY,
    i: imdbID,
    plot: "full",
  });
  const response = await fetch(`${BASE_URL}?${params.toString()}`);
  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data;
};