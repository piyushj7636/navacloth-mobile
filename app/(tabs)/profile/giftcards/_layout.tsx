import { Stack } from "expo-router";

export default function GiftsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
				headerTitle: "Gifts and Vouchers"
      }}
    />
  );
}
