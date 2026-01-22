import { Stack } from "expo-router";

export default function OrdersLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: true, headerTitle: "My Orders" }} />
      <Stack.Screen
        name="orderdetails"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
