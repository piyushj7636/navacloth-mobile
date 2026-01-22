import React from "react";
import { StyleSheet, Text, View } from "react-native";

const StatusBadge = ({ status }) => {
  const color =
    status === "Delivered"
      ? "#4CAF50"
      : status === "Shipped"
      ? "#2196F3"
      : status === "Cancelled"
      ? "#F44336"
      : "#FFC107";
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.badgeText}>{status}</Text>
    </View>
  );
};

export default StatusBadge;

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16 },
  badgeText: { color: "#fff", fontWeight: "700" },
});
