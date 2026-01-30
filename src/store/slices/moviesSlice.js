import { createSlice } from "@reduxjs/toolkit";
import { searchMovies, getMovieDetails } from "../../services/api";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    searchResults: [],
    movieDetails: {},
    loading: false,
    error: null,
    totalResults: 0,
    currentPage: 1,
  },
  reducers: {
    clearSearch: (state) => {
      state.searchResults = [];
      state.totalResults = 0;
      state.currentPage = 1;
      state.error = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { clearSearch, setCurrentPage } = moviesSlice.actions;
export default moviesSlice.reducer;
