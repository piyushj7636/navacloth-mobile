import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const currentTheme = useSelector((state: RootState) => state.theme)
	const colorTheme = currentTheme === "light" ? "blue" : "#2b2929ff"
  const inactiveColorTheme = currentTheme === "light" ? "gray" : "lightgrey"

  return (
    <View style={[styles.container, {backgroundColor: colorTheme}]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          navigation.navigate(route.name);
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.8}
          >
            {options.tabBarIcon &&
						options.tabBarIcon({
              focused: isFocused,
              size: 28,
              color: isFocused ? "#fff" : "#7c7c7c",
            })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    // left: 20,
    // right: 20,
    bottom: 20,
    // height: 200,
    borderRadius: 40,
    backgroundColor: "#1A1A1A",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    // Floating effect
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  tab: {
    flex: 1,
    alignItems: "center",
  },
});
