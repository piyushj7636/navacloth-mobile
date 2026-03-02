import {
  addItemToWishlist,
  markItemPendingRemoval,
  markWishlistItemPendingSync,
  removeItemFromWishlist,
  replaceWishlistItemInSQLite,
} from "@/features/wishlist/wishlist.db.js";
import { userLocalData } from "@/features/user/user.db.js";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithLogging } from "./apiUtils";
import {
  addItemToCart,
  getCartItems,
  markCartItemPendingSync,
  mergeBackendCartIntoSQLite,
  removeItemFromCart,
  replaceCartItemInSQLite,
  updateCartQuantity,
} from "@/features/cart/cart.db.js";
import {
  addCartItem,
  removeCartItem,
  setCartFromSQLite,
  updateCartItem,
} from "./features/cart/cartSlice";

type User = {
  user_id: number;
  name: string;
  email: string;
  phone: string;
  phone_verified: boolean;
  email_verified: boolean;
  street_address: string | null;
  city: string | null;
  state: string | null;
  landmark: string | null;
  postal_code: string | null;
  country: string | null;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithLogging,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["Auth", "Wishlist", "Cart"],
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (formattedPhone) => ({
        url: "/auth/signup",
        method: "POST",
        body: formattedPhone,
      }),
      transformResponse: (response: { data: User }) => response.data,
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
      invalidatesTags: ["Auth"],
    }),
    verifyOtp: build.mutation<User, any>({
      query: (body) => ({
        url: "/auth/verify-signup",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: User }) => response.data,
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
      invalidatesTags: ["Auth"],
    }),
    login: build.mutation<User, any>({
      query: (formattedPhone) => ({
        url: "/auth/login",
        method: "POST",
        body: formattedPhone,
      }),
      transformResponse: (response: { data: User }) => response.data,
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
      invalidatesTags: ["Auth"],
    }),
    verifyLogin: build.mutation<User, any>({
      query: (body) => ({
        url: "/auth/verify-login",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: User }) => response.data,
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
      invalidatesTags: ["Auth"],
    }),
    getUser: build.query<User, void>({
      query: () => "/auth/user",
      providesTags: ["Auth"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await userLocalData(data);
        } catch (error) {
          console.error("❌ Failed to fetch user or save locally", error);
        }
      },
    }),
    getAllAddresses: build.query<User, void>({
      query: () => "/auth/user/all-addresses",
      providesTags: ["Auth"]
    }),
    storeAddress: build.mutation({
      query: (body) => ({
        url: "/auth/user/save-address",
        method: "POST",
        body
      }),
      invalidatesTags: ["Auth"]
    }),
    profileImageSignedUrl: build.mutation({
      query: (body) => ({
        url: "/auth/user/profile-image",
        method: "POST",
        body
      }),
      invalidatesTags: ["Auth"]
    }),
    updateProfile: build.mutation({
      query: (body) => ({
        url: "/auth/user/update-profile",
        method: "POST",
        body
      }),
      invalidatesTags: ["Auth"]
    }),
    userLogout: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    getWishlist: build.query({
      query: () => "/wishlist/all",
      transformResponse: (response) => {
        console.log("✅ Wishlist response received:", response);
        // The backend returns { data: [...] }, so extract it
        return response.data || response.wishlist || response;
      },
      providesTags: ["Wishlist"],
    }),
    addToWishlist: build.mutation({
      query: (item) => ({
        url: "/wishlist/add",
        method: "POST",
        body: item,
      }),
      async onQueryStarted(item, { queryFulfilled }) {
        try {
          // 1️⃣ Optimistic local update (SQLite)
          await addItemToWishlist(item);
          // 2️⃣ Wait for server response
          const { data: updatedItem } = await queryFulfilled;

          // 3️⃣ Reconcile SQLite with server copy
          await replaceWishlistItemInSQLite(updatedItem);
        } catch (error) {
          // 4️⃣ Rollback or mark as pending sync
          await markWishlistItemPendingSync(item);
          console.error("❌ Wishlist sync failed", error);
        }
      },
      invalidatesTags: ["Wishlist"],
    }),
    removeFromWishlist: build.mutation({
      query: (id) => ({
        url: `/wishlist/remove/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          // 1️⃣ Optimistic local removal (SQLite + RTK cache)
          await removeItemFromWishlist(id);

          // Optionally update RTK cache directly
          dispatch(
            apiSlice.util.updateQueryData("getWishlist", undefined, (draft) => {
              return draft.filter((item) => item.wishlist_item_id !== id);
            }),
          );

          // 2️⃣ Wait for server confirmation
          await queryFulfilled;
        } catch (error) {
          // 3️⃣ Rollback or mark as pending removal
          await markItemPendingRemoval(id);
          console.error("❌ Wishlist removal failed", error);
        }
      },

      invalidatesTags: ["Wishlist"],
    }),
    getCart: build.query({
      query: () => "/cart/all",
      transformResponse: (response) => {
        console.log("✅ Cart response received:", response);
        // The backend returns { data: [...] }, so extract it
        return response.data || response.cart || response;
      },
      providesTags: ["Cart"],
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        const { data } = await queryFulfilled;
        console.log("Logging data: ", data)
        // 1️⃣ Merge backend → SQLite
        await mergeBackendCartIntoSQLite(data);

        // 2️⃣ Reload SQLite → Redux
        const updatedSQLiteItems = await getCartItems();
        console.log("Logging data updated: ", updatedSQLiteItems)
        dispatch(setCartFromSQLite(updatedSQLiteItems));
      },
    }),
    addToCart: build.mutation({
      query: (item) => ({
        url: "/cart/add",
        method: "POST",
        body: item,
      }),
      async onQueryStarted(item, { dispatch, queryFulfilled }) {
        try {
          dispatch(addCartItem(item));
          // 1️⃣ Optimistic local update (SQLite)
          await addItemToCart(item);
          // 2️⃣ Wait for server response
          const { data: updatedItem } = await queryFulfilled;

          // 3️⃣ Reconcile SQLite with server copy
          await replaceCartItemInSQLite(updatedItem);
        } catch (error) {
          // 4️⃣ Rollback or mark as pending sync
          await markCartItemPendingSync(item);
          console.error("❌ Cart sync failed", error);
        }
      },
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: build.mutation({
      query: ({ cart_item_id }) => ({
        url: `/cart/remove/${cart_item_id}`,
        method: "DELETE",
      }),
      async onQueryStarted(item, { dispatch, queryFulfilled }) {
        try {
          dispatch(removeCartItem(item.id));
          // 1️⃣ Optimistic local update (SQLite)
          await removeItemFromCart(item.variant_code);
          // 2️⃣ Wait for server response
          await queryFulfilled;
          console.log("✅ Cart item removed from backend and local DB");
        } catch (error) {
          // 4️⃣ Rollback or mark as pending sync
          await markCartItemPendingSync(item);
          console.error("❌ Cart sync failed", error);
        }
      },
      invalidatesTags: ["Cart"],
    }),
    updateCartQuantity: build.mutation({
      query: ({ id, quantity }) => ({
        url: `/cart/update`,
        method: "PUT",
        body: { id, quantity },
      }),
      async onQueryStarted(item, { dispatch, queryFulfilled }) {
        try {
          // dispatch(updateCartItem({ id: item.id, quantity: item.quantity }))
          // 1️⃣ Optimistic local update (SQLite)
          await updateCartQuantity(item.variant_code, item.quantity);
          // 2️⃣ Wait for server response
          const { data: updatedItem } = await queryFulfilled;

          // 3️⃣ Reconcile SQLite with server copy
          await replaceCartItemInSQLite(updatedItem);
        } catch (error) {
          // 4️⃣ Rollback or mark as pending sync
          await markCartItemPendingSync(item);
          console.error("❌ Cart sync failed", error);
        }
      },
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useVerifyOtpMutation,
  useGetUserQuery,
  useLoginMutation,
  useVerifyLoginMutation,
  useUserLogoutMutation,
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation,
  useProfileImageSignedUrlMutation,
  useUpdateProfileMutation,
  useGetAllAddressesQuery,
  useStoreAddressMutation
} = apiSlice;
