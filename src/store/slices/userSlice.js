import { createSlice } from "@reduxjs/toolkit";
import { loadFromStorage, saveToStorage } from "../../services/localStorage";
const userSlice = createSlice({
  name: "user",
  initialState: {
    watchlist: loadFromStorage("watchlist", []),
    favorites: loadFromStorage("favorites", []),
  },
  reducers: {
    addToWatchlist: (state, action) => {
      const movieId = action.payload;
      if (!state.watchlist.includes(movieId)) {
        state.watchlist.push(movieId);
        saveToStorage("watchlist", state.watchlist);
      }
    },
    removeFromWatchlist: (state, action) => {
      const movieId = action.payload;
      state.watchlist = state.watchlist.filter((id) => id !== movieId);
      saveToStorage("watchlist", state.watchlist);
    },
    toggleFavorite: (state, action) => {
      const movieId = action.payload;
      if (state.favorites.includes(movieId)) {
        state.favorites = state.favorites.filter((id) => id !== movieId);
        state.fav=false;
      } else {
        state.favorites.push(movieId);
        state.fav=true;
      }
      saveToStorage("favorites", state.favorites);
    },
  },
});

export const { addToWatchlist, removeFromWatchlist, toggleFavorite } =
  userSlice.actions;
export default userSlice.reducer;
