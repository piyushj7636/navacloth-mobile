import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import StatusBadge from "./StatusBadge";

const OrderCard = ({order, onPress}) => {
	const formatCurrency = (n: number) => `₹ ${n.toFixed(2)}`;
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(order)}>
      <Image source={{ uri: order.items[0].image }} style={styles.thumb} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.orderId}>{order.id}</Text>
        <Text style={styles.small}>
          {order.items[0].title}
          {order.items.length > 1 ? ` + ${order.items.length - 1} more` : ""}
        </Text>
        <Text style={styles.small}>
          {order.date} • {formatCurrency(order.total)}
        </Text>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <StatusBadge status={order.status} />
        <TouchableOpacity style={styles.viewBtn} onPress={() => onPress(order)}>
          <Text style={styles.viewBtnText}>View</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
	card: { flexDirection: 'row', backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, alignItems: 'center', elevation: 1 },
thumb: { width: 64, height: 64, borderRadius: 8, backgroundColor: '#f2f2f2' },
orderId: { fontWeight: '700' },
orderIdLarge: { fontWeight: '800', fontSize: 18 },
small: { color: '#555', fontSize: 13, marginTop: 4 },
section: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginTop: 12 },
sectionTitle: { fontWeight: '700', marginBottom: 8 },
badge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16 },
badgeText: { color: '#fff', fontWeight: '700' },
viewBtn: { marginTop: 8, backgroundColor: '#f5f5f5', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
viewBtnText: { color: '#333' },
});
