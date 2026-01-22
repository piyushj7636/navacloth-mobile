import { Stack } from "expo-router";

export default function DeleteAccountLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: true, headerTitle: "Delete Account" }} />
    </Stack>
  );
}
