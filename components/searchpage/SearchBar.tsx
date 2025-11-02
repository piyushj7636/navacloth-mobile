import { RootState } from '@/redux/store';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';

const dummyProducts = [
  { id: '1', name: 'Black Tee' },
  { id: '2', name: 'Beige Hoodie' },
  { id: '3', name: 'Winter Sweatshirt' },
];

const SearchBar = () => {
  const [query, setQuery] = useState('')
	const currentTheme = useSelector((state: RootState) => state.theme)
	const colorTheme = currentTheme === "light" ? "black" : "white"

  const filtered = dummyProducts.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search products..."
        value={query}
        onChangeText={setQuery}
        style={[styles.input]}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={[styles.result, {color: colorTheme, borderColor: colorTheme}]}>{item.name}</Text>}
      />
    </View>
  );
}

export default SearchBar

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  result: {
    paddingVertical: 8,
    fontSize: 16,
    borderBottomWidth: 0.5,
  },
});