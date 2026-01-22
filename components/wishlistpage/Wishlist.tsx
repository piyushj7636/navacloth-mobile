import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

const wishlistData = [
  {
    id: "1",
    offer: "BUY 3 FOR 1099",
    image:
      "https://www.placeholderimage.online/placeholder/120/160/f3f4f6/1f2937?font=Montserrat.svg",
    title: "Men's Grey Uncharted Graphic Printed T-Shirt",
    brand: "Bewakoof®",
    rating: 4.6,
    price: 599,
    oldPrice: 1399,
    discount: "57% off",
  },
  {
    id: "2",
    offer: "BUY 4 FOR 1099",
    image:
      "https://www.placeholderimage.online/placeholder/120/160/f3f4f6/1f2937?font=Montserrat.svg",
    title: "Men's Blue Dementors Graphic Printed T-Shirt",
    brand: "Bewakoof®",
    rating: 4.5,
    price: 499,
    oldPrice: 1149,
    discount: "56% off",
  },
  {
    id: "3",
    offer: "BUY 3 FOR 1099",
    image:
      "https://www.placeholderimage.online/placeholder/120/160/f3f4f6/1f2937?font=Montserrat.svg",
    title: "Men's Brick Red Marvel Graphic Printed T-Shirt",
    brand: "Bewakoof®",
    rating: 4.4,
    price: 499,
    oldPrice: 1499,
    discount: "66% off",
  },
  {
    id: "4",
    offer: "BUY 2 FOR 1099",
    image:
      "https://www.placeholderimage.online/placeholder/120/160/f3f4f6/1f2937?font=Montserrat.svg",
    title: "Men's Brown Deadpool Graphic Printed T-Shirt",
    brand: "Bewakoof®",
    rating: 4.5,
    price: 599,
    oldPrice: 1299,
    discount: "53% off",
  },
  {
    id: "5",
    offer: "BUY 2 FOR 1099",
    image:
      "https://www.placeholderimage.online/placeholder/120/160/f3f4f6/1f2937?font=Montserrat.svg",
    title: "Men's Brown Deadpool Graphic Printed T-Shirt",
    brand: "Bewakoof®",
    rating: 4.5,
    price: 599,
    oldPrice: 1299,
    discount: "53% off",
  },
  {
    id: "6",
    offer: "BUY 2 FOR 1099",
    image:
      "https://www.placeholderimage.online/placeholder/120/160/f3f4f6/1f2937?font=Montserrat.svg",
    title: "Men's Brown Deadpool Graphic Printed T-Shirt",
    brand: "Bewakoof®",
    rating: 4.5,
    price: 599,
    oldPrice: 1299,
    discount: "53% off",
  },
];

const Wishlist = () => {
  const isAuthenticated = true;
  const router = useRouter();
  const insets = useSafeAreaInsets()

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => router.push(`/(tabs)/wishlist/product/${item.id}`)}>
        <View>
          <View style={styles.offerTag}>
            <Text style={styles.offerText}>{item.offer}</Text>
          </View>

          <Image source={{ uri: item.image }} style={styles.image} />

          <View style={styles.details}>
            <View style={styles.rating}>
              <Ionicons name="star" size={14} color="#FFC107" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <Text style={styles.brand}>{item.brand}</Text>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>

            <View style={styles.priceRow}>
              <Text style={styles.price}>₹{item.price}</Text>
              <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>
              <Text style={styles.discount}>{item.discount}</Text>
            </View>

            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>ADD TO BAG</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{paddingBottom: insets.bottom + 60}}>
      {isAuthenticated ? (
        <FlatList
          data={wishlistData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          // style={{ marginBottom: tabBarHeight + 40 }}
        />
      ) : (
        <View style={styles.container}>
          <Image
            source={{
              uri: "https://www.placeholderimage.online/placeholder/150/150/f3f4f6/1f2937?font=Montserrat.svg",
            }}
            style={styles.image}
          />
          <Text style={styles.title}>Your Wishlist is Empty</Text>
          <Text style={styles.subtitle}>
            Save your favorite items here and shop them anytime.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    // backgroundColor: "#fff",
  },
  card: {
    width: cardWidth,
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 6,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  offerTag: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#00C853",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    zIndex: 1,
  },
  offerText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "600",
  },
  image: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  details: {
    padding: 8,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
    color: "#333",
  },
  brand: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    marginTop: 2,
  },
  title: {
    fontSize: 11,
    color: "#666",
    marginTop: 2,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
  },
  oldPrice: {
    fontSize: 12,
    textDecorationLine: "line-through",
    color: "#888",
    marginLeft: 6,
  },
  discount: {
    fontSize: 12,
    color: "#00C853",
    marginLeft: 6,
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 8,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: "#222",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
