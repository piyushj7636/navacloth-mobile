import * as SecureStore from "expo-secure-store";

export const getAccessToken = () => SecureStore.getItemAsync("accessToken");
export const getRefreshToken = () => SecureStore.getItemAsync("refreshToken");

export const saveTokens = async (access: string, refresh: string) => {
  await SecureStore.setItemAsync("accessToken", access);
  await SecureStore.setItemAsync("refreshToken", refresh);
};

export const clearTokens = async () => {
  await SecureStore.deleteItemAsync("accessToken");
  await SecureStore.deleteItemAsync("refreshToken");
};
