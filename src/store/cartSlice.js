// src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : { items: {} };
  } catch {
    return { items: {} };
  }
};

// Save cart to localStorage
const saveCartToStorage = (cartState) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cartState));
  } catch {}
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart(state, { payload: product }) {
      const item = state.items[product.id];
      if (!item) state.items[product.id] = { product, qty: 1 };
      else if (item.qty < product.quantity) item.qty += 1;
      saveCartToStorage(state);
    },
    removeFromCart(state, { payload: productId }) {
      delete state.items[productId];
      saveCartToStorage(state);
    },
    incrementQty(state, { payload: productId }) {
      const item = state.items[productId];
      if (item && item.qty < item.product.quantity) item.qty += 1;
      saveCartToStorage(state);
    },
    decrementQty(state, { payload: productId }) {
      const item = state.items[productId];
      if (item && item.qty > 1) item.qty -= 1;
      saveCartToStorage(state);
    },
    clearCart(state) {
      state.items = {};
      saveCartToStorage(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQty,
  decrementQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
