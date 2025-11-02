import ReduxThemeProvider from "@/components/common/ReduxThemeProvider";
import ThemeInitializer from "@/components/common/ThemeInitialiser";
import { store } from "@/redux/store";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeInitializer />
      <ReduxThemeProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ReduxThemeProvider>
    </Provider>
  );
}