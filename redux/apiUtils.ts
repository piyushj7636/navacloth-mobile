import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from "../redux/token";

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://192.168.1.2:3000/api",
  prepareHeaders: async (headers) => {
    const token = await getAccessToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// WRAPPER to handle refresh token automatically
export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let response = await baseQuery(args, api, extraOptions);

  // If expired token
  if (response.error?.status === 401) {
    const refresh = await getRefreshToken();
    if (!refresh) {
      await clearTokens();
      return response;
    }

    // Try to refresh tokens
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        body: { refreshToken: refresh },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { accessToken, refreshToken } = refreshResult.data;
      await saveTokens(accessToken, refreshToken);

      // retry original request
      response = await baseQuery(args, api, extraOptions);
    } else {
      await clearTokens();
    }
  }

  return response;
};


