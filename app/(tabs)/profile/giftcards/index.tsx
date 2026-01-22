import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import React, { useState } from "react";

const GiftCards = () => {
  const [code, setCode] = useState("");
  const giftCards = [
    { id: "1", title: "Amazon Gift Card", amount: "₹500", expiry: "Dec 12, 2025" },
    { id: "2", title: "Myntra Voucher", amount: "₹200", expiry: "Nov 30, 2025" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gift Cards & Vouchers</Text>

      <FlatList
        data={giftCards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.amount}>{item.amount}</Text>
            <Text style={styles.expiry}>Expires: {item.expiry}</Text>
          </View>
        )}
      />

      <View style={styles.redeemContainer}>
        <TextInput
          placeholder="Enter gift code"
          value={code}
          onChangeText={setCode}
          style={styles.input}
        />
        <TouchableOpacity style={styles.redeemBtn}>
          <Text style={styles.redeemText}>Redeem</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.buyBtn}>
        <Text style={styles.buyText}>Buy Gift Card</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GiftCards;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: "600" },
  amount: { fontSize: 18, color: "#007AFF", marginVertical: 4 },
  expiry: { fontSize: 12, color: "#666" },
  redeemContainer: { flexDirection: "row", marginTop: 12 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 45,
  },
  redeemBtn: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    borderRadius: 12,
    justifyContent: "center",
    marginLeft: 8,
  },
  redeemText: { color: "#fff", fontWeight: "600" },
  buyBtn: {
    backgroundColor: "#34C759",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buyText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
