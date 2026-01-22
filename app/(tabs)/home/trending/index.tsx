import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import products from "../../../MOCK_DATA.json";

interface HeaderProps {
  search: string;
  setSearch: (text: string) => void;
  subcategories: string[];
  selectedSub: string;
  onSelectSub: (sub: string) => void;
}

const SubCategoryItem = ({
  item,
  isActive,
  onPress,
}: {
  item: string;
  isActive: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.subItem,
      isActive ? styles.subItemActive : styles.subItemInactive,
    ]}
  >
    <Text style={{ color: isActive ? "white" : "black" }}>{item}</Text>
  </TouchableOpacity>
);

const TrendingSeeAll = () => {
  const [selectedSub, setSelectedSub] = useState("All");
  const [search, setSearch] = useState("");
  // const [sort, setSort] = useState("default");
  const insets = useSafeAreaInsets();

  const subcategories = useMemo(() => {
    const newSubCat = products
      .filter((p) => p.tags?.includes("Trending"))
      .map((p) => p.category?.sub_sub)
      .filter(Boolean);
    return ["All", ...new Set(newSubCat)];
  }, []);

  const filtered = useMemo(() => {
    let data = products.filter((item) => item.tags?.includes("Trending"));

    if (selectedSub !== "All") {
      data = data.filter((i) => i.category?.sub_sub === selectedSub);
    }

    if (search.trim()) {
      data = data.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return data;
  }, [selectedSub, search]);

  const Header = React.memo(
    ({
      search,
      setSearch,
      subcategories,
      selectedSub,
      onSelectSub,
    }: HeaderProps) => {
      return (
        <View>
          <Text style={styles.headerText}>Trending</Text>

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search products..."
            style={styles.searchBar}
          />

          <FlatList
            data={subcategories}
            horizontal
            style={{marginVertical: 12}}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <SubCategoryItem
                item={item}
                isActive={item === selectedSub}
                onPress={() => onSelectSub(item)}
              />
            )}
          />
        </View>
      );
    },
  );
  Header.displayName = "Header";

  return (
    <FlatList
      data={filtered}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      ListHeaderComponent={
        <Header
          search={search}
          setSearch={setSearch}
          subcategories={subcategories}
          selectedSub={selectedSub}
          onSelectSub={setSelectedSub}
        />
      }
      columnWrapperStyle={{
        justifyContent: "flex-start",
        gap: 12,
      }}
      contentContainerStyle={{ paddingBottom: insets.bottom + 60 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => router.push(`/(tabs)/home/trending/${item.id}`)}
          style={styles.card}
        >
          <Image source={{ uri: item.media?.images[0] }} style={styles.image} />

          <Text style={styles.name}>{item.name}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.discount}>₹{item.pricing?.selling_price}</Text>
            <Text style={styles.original}>₹{item.pricing?.mrp}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default React.memo(TrendingSeeAll);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "black",
  },
  searchBar: {
    backgroundColor: "#e5e5e5",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    // marginBottom: 16,
    color: "black",
  },
  subList: {
    height: 50,
    marginVertical: 15,
  },
  subItem: {
    marginRight: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    fontSize: 14,
  },
  subItemActive: {
    backgroundColor: "black",
    color: "white",
    borderColor: "black",
  },
  subItemInactive: {
    backgroundColor: "white",
    color: "black",
    borderColor: "#ccc",
  },
  sortRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  sortBtn: {
    borderWidth: 1,
    borderColor: "#888",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  sortText: {
    color: "black",
  },
  card: {
    width: "48%",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    marginBottom: 8,
  },
  name: {
    fontWeight: "600",
    fontSize: 14,
    color: "black",
  },
  brand: {
    color: "#666",
    fontSize: 12,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  discount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  original: {
    marginLeft: 8,
    color: "#888",
    textDecorationLine: "line-through",
  },
});
