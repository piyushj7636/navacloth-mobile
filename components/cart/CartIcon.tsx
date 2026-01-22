// components/CartIcon.tsx
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Pressable } from "react-native";
import { router } from "expo-router";

export default function CartIcon() {
  const theme = useSelector((state: RootState) => state.theme);
  const iconColor = theme === "dark" ? "#fff" : "#000";

  return (
    <Pressable style={{ marginLeft: 10 }} onPress={() => router.push("/cart")}>
      <Ionicons name="cart-outline" size={24} color={iconColor} />
    </Pressable>
  );
}