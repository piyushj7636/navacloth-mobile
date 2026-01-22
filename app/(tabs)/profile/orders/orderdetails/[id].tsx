import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import OrderDetails from "@/components/orders/OrderDetails";

export default function OrderDetailPage() {
  const { id } = useLocalSearchParams();

  // Handle case where ID might not be loaded yet
  if (!id) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1e90ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <OrderDetails orderId={id.toString()} />
    </View>
  );
}
