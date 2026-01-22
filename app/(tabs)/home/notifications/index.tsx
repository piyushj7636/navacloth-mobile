import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
const PANEL_WIDTH = width * 0.75;

const notifications = [
  {
    title: "Order Shipped 🚚",
    message: "Your order #1023 is on the way!",
    time: "2h ago",
    link: "/(tabs)/profile/orders/[id]?id=1023",
  },
  {
    title: "Reward Earned 🏅",
    message: "You earned 50 loyalty points.",
    time: "5h ago",
    link: "/(tabs)/profile/settings/rewards",
  },
];

export default function NotificationScreen({ onClose }) {
  const router = useRouter();
  const translateX = useRef(new Animated.Value(PANEL_WIDTH)).current;
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {notifications.length === 0 ? (
          <Text style={styles.empty}>No new notifications</Text>
        ) : (
          notifications.map((n, i) => (
            <Pressable
              key={i}
              style={styles.card}
              onPress={() => {
                onClose();
                setTimeout(() => router.push(n.link), 150);
              }}
            >
              <Text style={styles.cardTitle}>{n.title}</Text>
              <Text style={styles.cardDesc}>{n.message}</Text>
              <Text style={styles.time}>{n.time}</Text>
            </Pressable>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    zIndex: 9999,
    height: height,
  },
  overlay: {
    flex: 1,
  },
  panel: {
    width: PANEL_WIDTH,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: -2, height: 2 },
    shadowRadius: 8,
    elevation: 10,
    right: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: "600" },
  list: { flex: 1 },
  card: {
    backgroundColor: "#f7f7f8",
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
  },
  cardTitle: { fontWeight: "600", fontSize: 15, marginBottom: 4 },
  cardDesc: { color: "#555", fontSize: 13, marginBottom: 4 },
  time: { color: "#999", fontSize: 12 },
  empty: { textAlign: "center", color: "#888", paddingVertical: 30 },
  clearButton: { alignItems: "center", paddingVertical: 10 },
  clearText: { color: "#007AFF", fontWeight: "600" },
});
