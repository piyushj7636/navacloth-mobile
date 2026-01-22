import SelectAddressModal from "@/components/modal/SelectAddressModal";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const cartItems = [
  {
    title: "Men's Off White Curated Graphic Printed T-shirt",
    price: 599,
    saved: 800,
    offer: "Buy 3 for 1099 offer applicable",
    delivery: "Delivery by 09 Nov 2023",
  },
  {
    title: "Men's Moon Most Wanted Graphic Printed Oversized T-shirt",
    price: 599,
    saved: 700,
    offer: "Buy 3 for 1099 offer applicable",
    delivery: "Delivery by 09 Nov 2023",
  },
  {
    title: "Men's Moon Most Wanted Graphic Printed Oversized T-shirt",
    price: 599,
    saved: 700,
    offer: "Buy 3 for 1099 offer applicable",
    delivery: "Delivery by 09 Nov 2023",
  },
];

const Cart = () => {
  const totalMRP = 2998;
  const discount = 1800;
  const total = 1198;
  const isAuthenticated = true;
  const [showModal, setShowModal] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{ marginBottom: insets.bottom + 50 }}
      edges={["bottom"]}
    >
      <ScrollView
        style={{ marginVertical: 10, marginHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {isAuthenticated ? (
          <View>
            <Text style={styles.delivery}>Delivery to: 110053</Text>
            <Text style={styles.coupon}>
              Offer applied: GETCASH10 - EXTRA 10% Cashback on products above
              ₹499
            </Text>

            {cartItems.map((item, index) => (
              <View key={index} style={styles.itemCard}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.offer}>{item.offer}</Text>
                <Text style={styles.deliveryDate}>{item.delivery}</Text>
                <Text style={styles.price}>
                  ₹{item.price}{" "}
                  <Text style={styles.saved}>Saved ₹{item.saved}</Text>
                </Text>
              </View>
            ))}

            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>Price Summary</Text>
              <View style={styles.row}>
                <Text>Total MRP:</Text>
                <Text>₹{totalMRP}</Text>
              </View>
              <View style={styles.row}>
                <Text>Discount:</Text>
                <Text style={styles.discount}>-₹{discount}</Text>
              </View>
              <View style={styles.row}>
                <Text>Delivery Fee:</Text>
                <Text>₹0</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.total}>₹{total}</Text>
              </View>
            </View>

            <Text style={styles.freeDelivery}>
              🎉 Yay! You get FREE delivery on this order
            </Text>
            <Text style={styles.savings}>
              You are saving ₹1500 on this order
            </Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>VIEW DETAILS</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.proceed]}
                onPress={() => setShowModal(true)}
              >
                <Text style={styles.buttonText}>PROCEED</Text>
              </TouchableOpacity>
              <SelectAddressModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                setShowModal={setShowModal}
              />
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.container}>
              <Image
                source={{
                  uri: "https://www.placeholderimage.online/placeholder/190/220/f3f4f6/1f2937?font=Montserrat.svg", // or replace with your local image
                }}
                style={styles.image}
                resizeMode="contain"
              />

              <Text style={styles.title}>Hey, your bag feels so light!</Text>
              <Text style={styles.subtitle}>
                Let’s add some items in your bag
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/")} // optional navigation
              >
                <Text style={styles.buttonText}>START SHOPPING</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  delivery: {
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
  },
  coupon: {
    fontSize: 13,
    color: "#007BFF",
    marginBottom: 12,
  },
  itemCard: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  offer: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },
  deliveryDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 6,
  },
  saved: {
    fontSize: 13,
    color: "#4CAF50",
  },
  summary: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#fff8e1",
    borderRadius: 8,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  discount: {
    color: "#E53935",
  },
  totalLabel: {
    fontWeight: "600",
  },
  total: {
    fontWeight: "600",
    fontSize: 16,
  },
  freeDelivery: {
    marginTop: 16,
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "600",
  },
  savings: {
    fontSize: 13,
    color: "#777",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 12,
    backgroundColor: "#FFC107",
    borderRadius: 6,
    marginRight: 10,
    alignItems: "center",
  },
  proceed: {
    backgroundColor: "#FF5722",
    marginRight: 0,
  },
  buttonText: {
    fontWeight: "600",
    color: "#fff",
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 24,
  },
});
