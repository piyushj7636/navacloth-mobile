import { RootState } from '@/redux/store';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Pressable, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function SaleLayout() {
	const currentTheme = useSelector((state: RootState) => state.theme);
  const colorTheme = currentTheme === "light" ? "black" : "white";
  return (
    <Stack>
      <Stack.Screen name='index' options={{headerTitle: "Sale", headerShown: true, headerRight: () => (
          <View>
            <Pressable
              style={{ marginLeft: 10 }}
              onPress={() => router.push("/(tabs)/home/cart")}
            >
              <Ionicons name="cart-outline" size={24} color={colorTheme} />
            </Pressable>
          </View>
        ),}} />
      <Stack.Screen name='[id]' options={{headerTitle: "Product Info", headerShown: true, headerRight: () => (
          <View>
            <Pressable
              style={{ marginLeft: 10 }}
              onPress={() => router.push("/(tabs)/home/cart")}
            >
              <Ionicons name="cart-outline" size={24} color={colorTheme} />
            </Pressable>
          </View>
        ),}}  />
    </Stack>
  );
}