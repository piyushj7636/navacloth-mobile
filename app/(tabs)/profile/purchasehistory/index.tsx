import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";

const PurchaseHistory = () => {
  const orders = [
    { id: "1023", amount: "₹599", status: "Delivered", date: "05 Nov 2025" },
    { id: "1031", amount: "₹1,299", status: "Returned", date: "03 Nov 2025" },
    { id: "1032", amount: "₹850", status: "Pending", date: "07 Nov 2025" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Purchase History</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.orderId}>Order #{item.id}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.amount}>{item.amount}</Text>
              <Text
                style={[
                  styles.status,
                  {
                    color:
                      item.status === "Delivered"
                        ? "#34C759"
                        : item.status === "Returned"
                        ? "#FF3B30"
                        : "#FFA500",
                  },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default PurchaseHistory;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  orderId: { fontWeight: "600", fontSize: 16 },
  date: { color: "#666", fontSize: 13 },
  amount: { fontWeight: "700", fontSize: 16, color: "#007AFF" },
  status: { fontSize: 13, marginTop: 4 },
});
