import ReduxThemeProvider from "@/components/common/ReduxThemeProvider";
import ThemeInitializer from "@/components/common/ThemeInitialiser";
import { store } from "@/redux/store";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <SafeAreaProvider>
        <PaperProvider>
          <ThemeInitializer />
          <ReduxThemeProvider>
            <Stack screenOptions={{ headerShown: false }} />
            <StatusBar style="auto" />
          </ReduxThemeProvider>
        </PaperProvider>
      </SafeAreaProvider>
      {/* </PersistGate> */}
    </Provider>
  );
}
