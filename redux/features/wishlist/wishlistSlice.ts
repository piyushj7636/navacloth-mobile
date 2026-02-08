import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  isLoading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<WishlistItem[]>) => {
      state.items = action.payload;
    },
    addWishlistItem: (state, action: PayloadAction<WishlistItem>) => {
      state.items.push(action.payload);
    },
    removeWishlistItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setWishlistLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setWishlistError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setWishlist,
  addWishlistItem,
  removeWishlistItem,
  setWishlistLoading,
  setWishlistError,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;