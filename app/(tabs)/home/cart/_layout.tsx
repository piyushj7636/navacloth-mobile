import { Stack } from "expo-router";

export default function CartLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{title: "My Cart"}} />
      <Stack.Screen name="payment" options={{title: "Payment"}} />
    </Stack>
  );
}
