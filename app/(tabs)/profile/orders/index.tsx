import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderCard from "@/components/orders/OrderCard";
import mockOrders from "../../../orders.js";
import { router } from "expo-router";

const OrderListScreen = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [orders] = useState(mockOrders);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (filter !== "All" && o.status !== filter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.items.some((it) => it.title.toLowerCase().includes(q))
      );
    });
  }, [orders, query, filter]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerRow}>
        <TextInput
          placeholder="Search by order ID or product"
          value={query}
          onChangeText={setQuery}
          style={styles.search}
        />
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => {
            const next =
              filter === "All"
                ? "Shipped"
                : filter === "Shipped"
                ? "Delivered"
                : filter === "Delivered"
                ? "Cancelled"
                : "All";
            setFilter(next);
          }}
        >
          <Text style={{ color: "#fff" }}>{filter}</Text>
        </TouchableOpacity>
      </View>

      {filtered.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.heading}>No orders yet</Text>
          <Text style={styles.small}>
            {`Looks like you haven't placed any orders. Start shopping!`}
          </Text>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => Alert.alert("Go shopping")}
          >
            <Text style={styles.primaryBtnText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <OrderCard
              order={item}
              onPress={(order) =>
                router.push({
                  pathname: "/(tabs)/profile/orders/orderdetails/[id]",
                  params: { id: String(order.id) },
                })
              }
            />
          )}
          contentContainerStyle={{ padding: 12 }}
        />
      )}
    </SafeAreaView>
  );
};

export default OrderListScreen;

const styles = StyleSheet.create({
  headerRow: { flexDirection: "row", padding: 12, alignItems: "center" },
  search: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    borderRadius: 8,
  },
  filterBtn: {
    marginLeft: 8,
    backgroundColor: "#333",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  primaryBtn: {
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontWeight: "700" },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#111",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  secondaryBtnText: { color: "#111", fontWeight: "600" },
  small: { color: "#555", fontSize: 13, marginTop: 4 },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginBottom: 12,
  },
});
