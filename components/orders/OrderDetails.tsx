import {
  Alert,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import StatusBadge from "./StatusBadge";
import { router } from "expo-router";
import orders from "../../app/orders.js"
import { Button } from "react-native-paper";

interface OrderDetailsProps {
  orderId: string;
}

const OrderDetails = ({ orderId }: OrderDetailsProps) => {
  const [showReturn, setShowReturn] = useState(false);
  const order = orders.find((o) => o.id === orderId); // ✅ find order by ID

  if (!order) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text>No order found for ID: {orderId}</Text>
      </View>
    );
  }

  const formatCurrency = (n: number) => `₹ ${n.toFixed(2)}`;

  const onShareInvoice = async () => {
    try {
      const text = `Invoice for ${order.id}\nTotal: ${formatCurrency(
        order.total
      )}\nItems:\n${order.items
        .map((it) => `${it.title} x${it.qty} - ${formatCurrency(it.price)}`)
        .join("\n")}`;
      await Share.share({ message: text, title: `Invoice ${order.id}` });
    } catch (e) {
      Alert.alert("Error sharing invoice");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", marginHorizontal: 10, marginVertical: 10 }}>
      {/* Header Section */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.orderIdLarge}>{order.id}</Text>
        <StatusBadge status={order.status} />
      </View>

      <Text style={styles.small}>Placed on {order.date}</Text>

      {/* Items Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Items</Text>
        {order.items.map((it) => (
          <View key={it.sku} style={styles.lineItem}>
            <Image source={{ uri: it.image }} style={styles.lineThumb} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.itemTitle}>{it.title}</Text>
              <Text style={styles.small}>
                Qty {it.qty} • {formatCurrency(it.price)}
              </Text>
            </View>
            <Text style={styles.itemTotal}>
              {formatCurrency(it.price * it.qty)}
            </Text>
          </View>
        ))}

        {/* Summary */}
        <View style={styles.summaryRow}>
          <Text>Subtotal</Text>
          <Text>
            {formatCurrency(
              order.items.reduce((s, i) => s + i.price * i.qty, 0)
            )}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Delivery</Text>
          <Text>{formatCurrency(order.shipping)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Tax</Text>
          <Text>{formatCurrency(order.tax)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Discount</Text>
          <Text>-{formatCurrency(order.discount)}</Text>
        </View>
        <View style={[styles.summaryRow, { marginTop: 6 }]}>
          <Text style={{ fontWeight: "700" }}>Total</Text>
          <Text style={{ fontWeight: "700" }}>
            {formatCurrency(order.total)}
          </Text>
        </View>
      </View>

      {/* Delivery & Payment */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery & Payment</Text>
        <Text style={styles.small}>Shipping to: {order.shippingAddress}</Text>
        <Text style={styles.small}>Billing: {order.billingAddress}</Text>
        <Text style={styles.small}>Payment: {order.paymentMethod}</Text>
      </View>

      {/* Tracking Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tracking</Text>
        <Text style={styles.small}>
          Courier: {order.courier.name} (#{order.courier.trackingId})
        </Text>
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() =>
            router.push({
              pathname: "/(tabs)/profile/orders/orderdetails/trackorder",
              params: {
                courier: order.courier.name,
                trackingId: order.courier.trackingId,
                statusHistory: JSON.stringify(order.statusHistory),
              },
            })
          }
        >
          <Text style={styles.secondaryBtnText}>Track on map</Text>
        </TouchableOpacity>

        <Text style={[styles.subtle, { marginTop: 8 }]}>Status timeline</Text>
        {order.statusHistory.map((s, idx) => (
          <View key={idx} style={styles.timelineRow}>
            <View style={styles.timelineDot} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.small}>{s.step}</Text>
              <Text style={styles.subtle}>{s.time}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Buttons */}
      <View style={{ flexDirection: "row", gap: 8 }}>
        {/* <TouchableOpacity
          style={[styles.primaryBtn, { flex: 1 }]}
          onPress={onShareInvoice}
        >
          <Text style={styles.primaryBtnText}>Download / Share Invoice</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tertiaryBtn, { flex: 1 }]}
          onPress={() => setShowReturn(true)}
        >
          <Text style={styles.tertiaryBtnText}>Return / Replace</Text>
        </TouchableOpacity> */}
        <Button textColor="black" onPress={(onShareInvoice)} style={{backgroundColor: "yellow"}}>
          Download/Share Invoice
        </Button>
        <Button textColor="black" onPress={() => setShowReturn(true)} style={{backgroundColor: "orange"}}>
          Return/Replace
        </Button>
      </View>
    </ScrollView>
  );
};

export default OrderDetails;

// same style block you already had
const styles = StyleSheet.create({
  orderIdLarge: { fontWeight: "800", fontSize: 18 },
  small: { color: "#555", fontSize: 13, marginTop: 4 },
  section: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  sectionTitle: { fontWeight: "700", marginBottom: 8 },
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
  secondaryBtnText: {
    color: "#111",
    fontWeight: 600,
  },
  tertiaryBtn: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  timelineRow: { flexDirection: "row", alignItems: "flex-start", marginTop: 8 },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: "#111",
    marginTop: 6,
  },
  subtle: { color: "#888", fontSize: 12 },
  itemTitle: { fontWeight: "700" },
  itemTotal: { fontWeight: "700" },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  lineItem: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
  lineThumb: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
  },
});
