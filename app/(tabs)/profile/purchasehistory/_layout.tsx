import { Stack } from "expo-router";

export default function PurchaseHistoryLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
				headerTitle: "Purchase History"
      }}
    />
  );
}
