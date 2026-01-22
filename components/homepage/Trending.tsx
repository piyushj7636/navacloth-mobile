import { RootState } from '@/redux/store';
import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { router } from 'expo-router';
import products from "../../app/MOCK_DATA.json"

export default function Trending() {
  const currentTheme = useSelector((state: RootState) => state.theme)
	const colorTheme = currentTheme === "light" ? "black" : "white"
  const trendingProducts = products.filter((item) => item.tags?.includes("Trending")).slice(0, 10)
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, {color: colorTheme}]}>Trending</Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/home/trending/")}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={trendingProducts}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/(tabs)/home/trending/${item.id}`)}>
            <View style={styles.card}>
              <View>
                <Image source={{ uri: item.media?.images[0] }} style={styles.image} />
                <Text style={styles.label}>{item.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10, paddingHorizontal: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  title: { fontSize: 18, fontWeight: 900 },
  seeAll: { color: '#007bff' },
  card: { marginRight: 16, width: 130 },
  image: { width: 120, height: 160, borderRadius: 12 },
  label: { marginTop: 4, fontSize: 14 },
});