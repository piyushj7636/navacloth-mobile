import ProductDetails from "@/components/common/ProductDetails";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function ProductDetailPage() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ProductDetails productId={id} />
    </View>
  );
}