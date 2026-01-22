// app/(tabs)/wishlist/product/_layout.tsx
import { Stack } from 'expo-router';

export default function NotificationLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
				headerTitle: "Notifications",
      }}
    />
  );
}