import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import React from "react";

const Rewards = () => {
  const history = [
    { id: "1", title: "Order #1234", points: "+200" },
    { id: "2", title: "Voucher Redemption", points: "-100" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rewards & Loyalty</Text>
      <View style={styles.tierCard}>
        <Text style={styles.tier}>Gold Tier</Text>
        <Text style={styles.points}>1250 pts</Text>
        <TouchableOpacity style={styles.redeemBtn}>
          <Text style={styles.redeemText}>Redeem Points</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.historyTitle}>History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={[styles.itemPoints, { color: item.points.startsWith("+") ? "#34C759" : "#FF3B30" }]}>
              {item.points}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Rewards;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  tierCard: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tier: { fontSize: 18, fontWeight: "600", marginBottom: 6 },
  points: { fontSize: 28, fontWeight: "700", color: "#007AFF" },
  redeemBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  redeemText: { color: "#fff", fontWeight: "600" },
  historyTitle: { marginTop: 20, fontSize: 18, fontWeight: "600", marginBottom: 8 },
  item: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 },
  itemTitle: { fontSize: 15, color: "#333" },
  itemPoints: { fontWeight: "600", fontSize: 15 },
});
