import { RootState } from "@/redux/store";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const BannerCarousel = () => {
  const currentTheme = useSelector((state: RootState) => state.theme)
	const colorTheme = currentTheme === "light" ? "black" : "white"
  return (
    <View style={styles.banner}>
      <Image
        source={{
          uri: "https://www.placeholderimage.online/placeholder/420/310/f3f4f6/1f2937?font=Lato.svg",
        }}
        style={styles.image}
      />
      <View style={styles.overlay}>
        <Text style={[styles.title, {color: colorTheme}]}>Winter Collection</Text>
        <Text style={[styles.subtitle, {color: colorTheme}]}>New arrivals designed for the cold.</Text>
      </View>
    </View>
  );
};

export default BannerCarousel;

const styles = StyleSheet.create({
  banner: {
    position: "relative",
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: { width: "100%", height: 200, borderColor: 'white', borderWidth: 2, borderRadius: 10 },
  overlay: { position: "absolute", top: 20, left: 20 },
  title: { fontSize: 22, fontWeight: "bold"},
  subtitle: { fontSize: 14},
});
