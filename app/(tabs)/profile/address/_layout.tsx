import { Stack } from "expo-router";

export default function MyAddressLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: true, headerTitle: "My Addresses" }} />
      <Stack.Screen
        name="add"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
