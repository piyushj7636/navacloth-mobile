import Header from "@/components/common/Header";
import BannerCarousel from "@/components/homepage/BannerCarousel";
import Categories from "@/components/homepage/Categories";
import Limited from "@/components/homepage/Limited";
import NewArrivals from "@/components/homepage/NewArrivals";
import Popular from "@/components/homepage/Popular";
import Sale from "@/components/homepage/Sale";
import Trending from "@/components/homepage/Trending";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen = () => {
  const insets = useSafeAreaInsets()
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 50 }}>
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
