import ReduxThemeProvider from "@/components/common/ReduxThemeProvider";
import ThemeInitializer from "@/components/common/ThemeInitialiser";
import { store } from "@/redux/store";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "@/redux/features/user/authSlice";
import InitialAppLoad from "@/components/common/InitialAppLoad";
import { apiSlice } from "@/redux/apiSlice";

SplashScreen.preventAutoHideAsync();

function AppBootstrap({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function bootstrap() {
      try {
        // 🔥 fetch startup data
        const user = await store.dispatch(apiSlice.endpoints.getUser.initiate()).unwrap()

        // store in redux
        dispatch(setUser(user));
      } catch (err) {
        console.log("bootstrap error", err);
      } finally {
        setReady(true);
        await SplashScreen.hideAsync();
      }
    }

    bootstrap();
  }, []);

  if (!ready) return <InitialAppLoad />;

  return <>{children}</>;
}

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
            <AppBootstrap>
              <Stack screenOptions={{ headerShown: false }} />
              <StatusBar style="auto" />
            </AppBootstrap>
          </ReduxThemeProvider>
        </PaperProvider>
      </SafeAreaProvider>
      {/* </PersistGate> */}
    </Provider>
  );
}
