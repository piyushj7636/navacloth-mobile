import { RootState } from '@/redux/store';
import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const products = [
  { id: '1', name: 'Black Tee', image: 'https://www.placeholderimage.online/placeholder/120/160/f3f4f6/1f2937?font=Montserrat.svg' },
  { id: '2', name: 'Beige Hoodie', image: 'https://www.placeholderimage.online/placeholder/120/160/f3f4f6/1f2937?font=Montserrat.svg' },
	{ id: '3', name: 'Beige Hoodie', image: 'https://www.placeholderimage.online/placeholder/120/160/f3f4f6/1f2937?font=Montserrat.svg' },
	{ id: '4', name: 'Beige Hoodie', image: 'https://www.placeholderimage.online/placeholder/120/160/f3f4f6/1f2937?font=Montserrat.svg' },
];

export default function NewArrivals() {
  const currentTheme = useSelector((state: RootState) => state.theme)
	const colorTheme = currentTheme === "light" ? "black" : "white"

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, {color: colorTheme}]}>New Arrivals</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.label}>{item.name}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 16, paddingHorizontal: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  title: { fontSize: 18, fontWeight: 900 },
  seeAll: { color: '#007bff' },
  card: { marginRight: 16 },
  image: { width: 120, height: 160, borderRadius: 12 },
  label: { marginTop: 4, fontSize: 14 },
});