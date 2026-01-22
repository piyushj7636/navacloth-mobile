import { Stack } from "expo-router";

export default function AddAddressLayout() {
  return (
    <Stack>
			<Stack.Screen name="index" options={{ headerShown: true, headerTitle: "Add Address" }} />
		</Stack>
  );
}
