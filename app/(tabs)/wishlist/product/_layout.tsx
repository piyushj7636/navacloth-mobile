import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable, View } from "react-native";
import { useSelector } from "react-redux";

export default function ProductLayout() {
	const currentTheme = useSelector((state: RootState) => state.theme);
  const colorTheme = currentTheme === "light" ? "black" : "white";
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "Product Info",
        headerRight: () => (
          <View>
            <Pressable
              style={{ marginLeft: 10 }}
              onPress={() => router.push("/(tabs)/home/cart")}
            >
              <Ionicons name="cart-outline" size={24} color={colorTheme} />
            </Pressable>
          </View>
        ),
      }}
    />
  );
}
