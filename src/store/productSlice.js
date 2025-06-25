import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Base Firebase Realtime DB URL
const BASE_URL = 'https://furniture-app-by-kiran-default-rtdb.firebaseio.com/products';

// Fetch all products
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}.json`);
      const data = await res.json();
      if (!data) return [];
      return Object.entries(data).map(([id, product]) => ({ id, ...product }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch products by category or subcategory
export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}.json`);
      const data = await res.json();
      if (!data) return [];

      const filtered = Object.entries(data)
        .map(([id, product]) => ({ id, ...product }))
        .filter(
          (product) =>
            product.category?.toLowerCase() === category.toLowerCase() ||
            product.subCategory?.toLowerCase() === category.toLowerCase()
        );

      return filtered;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update product quantity
export const updateProductQuantity = createAsyncThunk(
  'products/updateQuantity',
  async ({ productId, newQuantity }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/${productId}.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity.toString() }),
      });

      if (!res.ok) throw new Error('Failed to update product quantity');

      return { productId, newQuantity };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice definition
const productSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProductQuantity.fulfilled, (state, action) => {
        const { productId, newQuantity } = action.payload;
        const product = state.allProducts.find((p) => p.id === productId);
        if (product) {
          product.quantity = newQuantity.toString();
        }
      });
  },
});

export default productSlice.reducer;
