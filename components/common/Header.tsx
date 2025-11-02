import { setNewTheme } from "@/redux/features/common/themeSlice";
import { RootState } from "@/redux/store";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const dispatch = useDispatch();
	const currentTheme = useSelector((state: RootState) => state.theme)
	const colorTheme = currentTheme === "light" ? "black" : "white"

  const toggleTheme = () => {
    dispatch(setNewTheme(currentTheme === 'light' ? 'dark' : 'light'));
  };
  return (
    <View style={[styles.container]}>
      <Text
        style={{
          color: colorTheme,
          fontSize: 20,
          fontWeight: 900,
        }}
      >
        APPAREL
      </Text>
      <View style={styles.icons}>
        {/* <Pressable>
          <Ionicons name="notifications-outline" size={24} color={newTheme === "light" ? "black" : "white"} />
        </Pressable> */}
				<Pressable onPress={toggleTheme}>
          <Text style={{ color: colorTheme }}>
            <Fontisto
              name={currentTheme === "light" ? "day-sunny" : "night-clear"}
              size={20}
            />
          </Text>
        </Pressable>
        <Pressable style={{ marginLeft: 16 }}>
          <Ionicons
            name="cart-outline"
            size={24}
            color={colorTheme}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
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
