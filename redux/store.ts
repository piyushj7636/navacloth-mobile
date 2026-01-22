// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { persistReducer, persistStore, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist"
// import themeSlice from './features/common/themeSlice'
// import { apiSlice } from "./apiSlice";
// import reducer from "./features/user";

// const persistConfig = {
//   key: 'root',
//   AsyncStorage,
//   whitelist: ['auth']
// }

// const rootReducer = combineReducers({
//   theme: themeSlice,
//   auth: reducer,
//   [apiSlice.reducerPath]: apiSlice.reducer,
// })

// // const persistedReducer = persistReducer(persistConfig, rootReducer)

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
//       }
//     })
//     .concat(apiSlice.middleware)
// })

// setupListeners(store.dispatch)

// export const persistor = persistStore(store);
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import themeSlice from './features/common/themeSlice';
import { apiSlice } from "./apiSlice";
import tabSlice from './features/common/tabSlice'
import reducer from "./features/user";

const rootReducer = combineReducers({
  theme: themeSlice,
  tab: tabSlice,
  auth: reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;