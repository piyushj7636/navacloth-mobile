import BannerCarousel from "@/components/homepage/BannerCarousel";
import Categories from "@/components/homepage/Categories";
import Limited from "@/components/homepage/Limited";
import NewArrivals from "@/components/homepage/NewArrivals";
import Popular from "@/components/homepage/Popular";
import Sale from "@/components/homepage/Sale";
import Trending from "@/components/homepage/Trending";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { createTables } from "../../../database/schema.js";
import { saveToSecureStore } from "../../../redux/token.js";
import { getApp } from "@react-native-firebase/app";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { setIsUserLoggedIn } from "@/redux/features/user/authSlice";

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const app = getApp();
  const auth = getAuth(app);

  useEffect(() => {
    const initDB = async () => {
      try {
        // 1️⃣ Initialize DB
        await createTables();
        // 2️⃣ Restore auth/session
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            const token = await user.getIdToken();
            console.log("🔥 Firebase Token:", token);
            await saveToSecureStore("FIREBASE_TOKEN", token);

            dispatch(setIsUserLoggedIn(true));
            // dispatch(
            //   setUser({
            //     uid: user.uid,
            //     email: user.email,
            //     phone: user.phoneNumber,
            //   }),
            // );
          } else {
            dispatch(setIsUserLoggedIn(false));
          }
        });

        return unsubscribe;
      } catch (error) {
        console.log("❌ App init error:", error);
      }
    };

    initDB();
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{ paddingBottom: insets.bottom + 50 }}
        >
          {/* <Header /> */}
          <BannerCarousel />
          <Categories />
          <NewArrivals />
          <Trending />
          <Popular />
          <Limited />
          <Sale />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default HomeScreen;
