import { getApp } from "@react-native-firebase/app";
import { getAuth } from "@react-native-firebase/auth";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "http://192.168.1.5:3000/api",
});

const baseQueryWithFirebaseReauth = async (args, api, extraOptions) => {
  const app = getApp();
  const auth = getAuth(app);
  const user = auth.currentUser;
  let token;

  if (user) {
    token = await user.getIdToken();
    await SecureStore.setItemAsync("FIREBASE_TOKEN", token);
  }

  // Normalize args: convert string to object
  const normalizedArgs = typeof args === "string" ? { url: args } : args;

  let response = await rawBaseQuery(
    {
      ...normalizedArgs,
      headers: {
        ...(normalizedArgs.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
    api,
    extraOptions,
  );

  if (response.error?.status === 401 && user) {
    try {
      const freshToken = await user.getIdToken(true);
      await SecureStore.setItemAsync("FIREBASE_TOKEN", freshToken);

      response = await rawBaseQuery(
        {
          ...normalizedArgs,
          headers: {
            ...(normalizedArgs.headers || {}),
            Authorization: `Bearer ${freshToken}`,
          },
        },
        api,
        extraOptions,
      );
    } catch (error) {
      console.error("❌ Firebase reauth failed", error);
      await SecureStore.deleteItemAsync("FIREBASE_TOKEN");
    }
  }

  return response;
};

export const baseQueryWithLogging = async (args, api, extraOptions) => {
  console.log("📡 API Request:", args);

  try {
    const result = await baseQueryWithFirebaseReauth(args, api, extraOptions);
    if (result.error) {
      console.error("❌ API Error:", result.error);
    } else {
      console.log("✅ API Response:", result.data);
    }

    return result;
  } catch (error) {
    console.error("💥 Unexpected Failure:", error);
    throw error;
  }
};
