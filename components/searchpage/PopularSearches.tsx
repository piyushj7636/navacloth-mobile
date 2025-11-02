import { RootState } from '@/redux/store';
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const tags = [
  'T-Shirts', 'Vests', 'Printed T-shirts', 'Oversized T-shirts',
  'Joggers', 'Anime', 'New & Popular', 'Customize',
  'Buy 3 for 1199', 'Buy 3 for 999', 'Buy 1 get 1',
  'Bags', 'Sliders',
];

const PopularSearches = ({ onTagPress }: { onTagPress: (tag: string) => void }) => {
  const currentTheme = useSelector((state: RootState) => state.theme)
	const colorTheme = currentTheme === "light" ? "black" : "white"
  const outerTheme = currentTheme === "light" ? "white" : "black"

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {color: colorTheme}]}>Popular Searches</Text>
      <FlatList
        data={tags}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.tag, {backgroundColor: outerTheme, borderColor: colorTheme}]} onPress={() => onTagPress(item)}>
            <Text style={[styles.tagText, {color: colorTheme}]}>{item}</Text>
          </TouchableOpacity>
        )}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ gap: 12 }}
      />
    </View>
  );
}

export default PopularSearches

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, marginTop: 8 },
  title: { fontSize: 18, fontWeight: 600, marginBottom: 12 },
  tag: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1
  },
  tagText: { fontSize: 14 },
});