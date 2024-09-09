import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzas',
  async (params, { rejectWithValue }) => {
    const { activeCategory, activeSort, sortOrder, searchValue, currentPage } = params;
    const API_URL = 'https://665d6310e88051d604065b54.mockapi.io/items';

    try {
      const { data } = await axios.get(API_URL, {
        params: {
          category: activeCategory !== 0 ? activeCategory : undefined,
          sortBy: activeSort.sort,
          order: sortOrder,
          search: searchValue || undefined,
          page: currentPage + 1,
          limit: 4,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue('Something went wrong while fetching pizzas');
    }
  },
);

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: {
    items: [],
    isLoaded: false,
    error: null,
    pageCount: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.isLoaded = false;
        state.error = null;
        state.items = []; // Clear items when fetching starts
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoaded = true;
        state.pageCount = action.payload.pageCount || 3;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.isLoaded = true;
        state.error = action.payload;
      });
  },
});

export default pizzaSlice.reducer;
