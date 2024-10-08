import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 0,
  activeSort: { name: 'Rating', sort: 'rating' },
  currentPage: 0,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setActiveSort(state, action) {
      state.activeSort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setActiveCategory, setActiveSort, setCurrentPage, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
