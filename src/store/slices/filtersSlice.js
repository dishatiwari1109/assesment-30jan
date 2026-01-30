import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    searchTerm: "",
    type: "all",
    year: "all",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
    clearFilters: (state) => {
      state.searchTerm = "";
      state.type = "all";
      state.year = "all";
    },
  },
});

export const { setSearchTerm, setType, setYear, clearFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
