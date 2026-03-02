import { setNewTheme } from "@/redux/features/common/themeSlice";
import { RootState } from "@/redux/store";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.theme);
  const colorTheme = currentTheme === "light" ? "black" : "white";
  // const userData = useSelector((state: RootState) => state.auth.auth.user)
  const toggleTheme = () => {
    dispatch(setNewTheme(currentTheme === "light" ? "dark" : "light"));
  };
  return (
    <>
      <View style={[styles.container]}>
        {/* <Text
          style={{
            color: colorTheme,
            fontSize: 20,
            fontWeight: 900,
          }}
        >
          APPAREL
        </Text> */}
        <View style={styles.icons}>
          <Pressable 
          onPress={toggleTheme}
          >
            <Text style={{ color: colorTheme, marginTop: 2 }}>
              <Fontisto
                name={currentTheme === "light" ? "day-sunny" : "night-clear"}
                size={20}
              />
            </Text>
          </Pressable>
          <View>
            <Pressable
              style={{ marginLeft: 10 }}
              onPress={() => router.push("/(tabs)/home/notifications")}
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color={colorTheme}
              />
            </Pressable>
          </View>
          <Pressable
            style={{ marginLeft: 10 }}
            onPress={() => router.push("/(tabs)/home/cart")}
          >
            <Ionicons name="cart-outline" size={24} color={colorTheme} />
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // marginHorizontal: 20,
    // paddingVertical: 14,
    alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    columnGap: 5,
  },
  text: {
    color: "white",
  },
  titleBox: {
    backgroundColor: "#DFFFEF",
    borderColor: "#2E8B57",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: "auto",
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  icons: {
    flexDirection: "row",
  },
});
