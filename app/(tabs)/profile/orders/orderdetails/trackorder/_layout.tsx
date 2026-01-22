import { Stack } from "expo-router";

export default function TrackOrderLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
				headerTitle: "My Orders"
      }}
    />
  );
}
