import Header from "@/components/common/Header";
import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerTitle: "APPAREL", headerShown: true, headerRight: () => <Header/>}} />
      <Stack.Screen name="editprofile" options={{headerShown: false}} />
      <Stack.Screen name="deleteaccount" options={{headerShown: false}} />
      <Stack.Screen name="address" options={{headerShown: false}} />
      <Stack.Screen name="auth" options={{headerShown: false}} />
      <Stack.Screen name="giftcards" options={{headerShown: false}} />
      <Stack.Screen name="orders" options={{headerShown: false}} />
      <Stack.Screen name="purchasehistory" options={{headerShown: false}} />
      <Stack.Screen name="referandearn" options={{headerShown: false}} />
      <Stack.Screen name="rewards" options={{headerShown: false}} />
      <Stack.Screen name="support" options={{headerShown: false}} />
    </Stack>
  );
}
