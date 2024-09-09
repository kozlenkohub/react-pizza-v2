import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice += action.payload.price;
    },
    decreaseItem(state, action) {
      const itemId = action.payload; // Ensure that the payload is the item ID
      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        item.count -= 1;
        state.totalPrice -= item.price;
      }
    },

    removeItem(state, action) {
      const itemId = action.payload; // Ensure that the payload is the item ID
      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        state.totalPrice -= item.price * item.count;
        state.items = state.items.filter((item) => item.id !== itemId);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearCart, decreaseItem } = cartSlice.actions;
export default cartSlice.reducer;
