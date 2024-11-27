import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  fruitsData: [],
  cart: [],
  productDetails: JSON.parse(localStorage.getItem("productDetails")) || null,
};

export const getFruitsData = createAsyncThunk(
  "products/getFruits",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/cms/products?page=${page}`);
      return {
        products: response?.data?.products,
        totalPages: response?.data?.totalPages,
        totalResults: response?.data?.totalResults,
      };
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Failed to fetch data");
    }
  }
);

const fruitSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }
    },
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
      localStorage.setItem("productDetails", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFruitsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFruitsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fruitsData = action?.payload?.products;
      })
      .addCase(getFruitsData.rejected, (state) => {
        state.isLoading = true;
        state.fruitsData = [];
      });
  },
});

export const { addToCart, setProductDetails } = fruitSlice.actions; 
export default fruitSlice.reducer;
