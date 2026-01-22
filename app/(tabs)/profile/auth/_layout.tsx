import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
			<Stack.Screen name="signup" options={{headerTitle: "Signup", headerShown: true}} />
			<Stack.Screen name="login" options={{headerTitle: "Login", headerShown: true}} />
		</Stack>
  );
}
