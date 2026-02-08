import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
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
    removeCartItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        state.totalPrice -= item.price * item.quantity;
        state.items = state.items.filter(i => i.id !== action.payload);
      }
    },
    updateCartItem: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        state.totalPrice -= item.price * item.quantity;
        item.quantity = quantity;
        state.totalPrice += item.price * item.quantity;
      }
    },
    setCartLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCartError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
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
} = cartSlice.actions;

export default cartSlice.reducer;