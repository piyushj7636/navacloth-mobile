import Header from "@/components/common/Header";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerTitle: "APPAREL", headerShown: true, headerRight: () => <Header/>}} />
			<Stack.Screen name="cart" options={{headerShown: false}} />
			<Stack.Screen name="limited" options={{headerShown: false}} />
      <Stack.Screen name="notifications" options={{headerShown: false}} />
      <Stack.Screen name="newarrivals" options={{headerShown: false}} />
      <Stack.Screen name="popular" options={{headerShown: false}} />
      <Stack.Screen name="trending" options={{headerShown: false}} />
      <Stack.Screen name="sale" options={{headerShown: false}} />
		</Stack>
  );
}
