import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  cart_item_id: number;     // backend key
  variant_code?: string;    // local SQLite key (optional, if you want offline sync)
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  selling_price: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.totalPrice = action.payload.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
    removeCartItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.cart_item_id === action.payload);
      if (item) {
        state.totalPrice -= item.price * item.quantity;
        state.items = state.items.filter(i => i.cart_item_id !== action.payload);
      }
    },
    updateCartItem: (
      state,
      action: PayloadAction<{ variant_code: string; quantity: number }>
    ) => {
      const { variant_code, quantity } = action.payload;
      const item = state.items.find(i => i.variant_code === variant_code);
      if (item) {
        item.quantity = quantity;
      }
    },
    setCartLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCartError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCartFromSQLite: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.totalPrice = action.payload.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const {
  setCart,
  addCartItem,
  removeCartItem,
  updateCartItem,
  setCartLoading,
  setCartError,
  setCartFromSQLite,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;