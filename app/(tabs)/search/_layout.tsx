import Header from "@/components/common/Header";
import { Stack } from "expo-router";

export default function SearchLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerTitle: "APPAREL", headerShown: true, headerRight: () => <Header/>}} />
		</Stack>
  );
}
