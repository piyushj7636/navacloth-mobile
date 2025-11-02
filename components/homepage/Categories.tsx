import { RootState } from '@/redux/store';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const categories = [
  { id: '1', name: 'T-Shirts', image: 'https://www.placeholderimage.online/placeholder/60/60/f3f4f6/1f2937?font=Montserrat.svg' },
  { id: '2', name: 'Hoodies', image: 'https://www.placeholderimage.online/placeholder/60/60/f3f4f6/1f2937?font=Montserrat.svg' },
  { id: '3', name: 'Sweatshirts', image: 'https://www.placeholderimage.online/placeholder/60/60/f3f4f6/1f2937?font=Montserrat.svg' },
	{ id: '4', name: 'Sweatshirts', image: 'https://www.placeholderimage.online/placeholder/60/60/f3f4f6/1f2937?font=Montserrat.svg' },
	{ id: '5', name: 'Sweatshirts', image: 'https://www.placeholderimage.online/placeholder/60/60/f3f4f6/1f2937?font=Montserrat.svg' },
	{ id: '6', name: 'Sweatshirts', image: 'https://www.placeholderimage.online/placeholder/60/60/f3f4f6/1f2937?font=Montserrat.svg' },
	{ id: '7', name: 'Sweatshirts', image: 'https://www.placeholderimage.online/placeholder/60/60/f3f4f6/1f2937?font=Montserrat.svg' }
];

const Categories = () => {
  const currentTheme = useSelector((state: RootState) => state.theme)
	const colorTheme = currentTheme === "light" ? "black" : "white"

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {color: colorTheme}]}>Categories</Text>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={[styles.label, {color: colorTheme}]}>{item.name}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

export default Categories

const styles = StyleSheet.create({
  container: { marginVertical: 16, paddingHorizontal: 16 },
  title: { fontSize: 18, fontWeight: 900, marginBottom: 8 },
  item: { alignItems: 'center', marginRight: 16 },
  image: { width: 60, height: 60, borderRadius: 8 },
  label: { marginTop: 4, fontSize: 14 },
});