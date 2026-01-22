import { Stack } from "expo-router";

export default function TrackOrderLayout() {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: true, headerTitle: "My Orders" }} />
      <Stack.Screen
        name="trackorder"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
