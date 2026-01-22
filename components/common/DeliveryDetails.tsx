import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const DeliveryDetailsCard = () => {
  return (
    <View style={styles.card}>
      {/* Title */}
      <Text style={styles.title}>Delivery details</Text>

      {/* Address */}
      <TouchableOpacity style={styles.row}>
        <Ionicons name="location-outline" size={18} color="#555" />
        <Text style={styles.address} numberOfLines={1}>
          223, SF 2, Shakti Khand III, Indirapuram...
        </Text>
        <Ionicons name="chevron-forward" size={18} color="#999" />
      </TouchableOpacity>

      {/* Delivery date */}
      <View style={styles.row}>
        <Ionicons name="car-outline" size={18} color="#555" />
        <Text style={styles.boldText}>Delivery by 25 Jan, Sun</Text>
      </View>

      {/* Fulfilled by */}
      {/* <View style={styles.row}>
        <Ionicons name="cube-outline" size={18} color="#555" />
        <View>
          <Text style={styles.boldText}>Fulfilled by ECOMSTORECARE</Text>
          <Text style={styles.subText}>3.9 ★ · 1 year with Navacloth</Text>
        </View>
      </View> */}

      {/* Divider */}
      <View style={styles.divider} />

      {/* Bottom features */}
      <View style={styles.featuresRow}>
        <Feature icon="refresh-outline" label="10-Day\nReturn" />
        <Feature icon="cash-outline" label="Cash on\nDelivery" />
        <Feature icon="headset-outline" label="24×7\nCustomer support" />
      </View>
    </View>
  )
}

const Feature = ({ icon, label }) => (
  <View style={styles.featureItem}>
    <Ionicons name={icon} size={22} color="#2874F0" />
    <Text style={styles.featureText}>{label}</Text>
  </View>
)

export default DeliveryDetailsCard

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    // borderRadius: 12,
    padding: 14,
    // margin: 12,
    // elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },
  address: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  boldText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },
  subText: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 10,
  },
  featuresRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  featureItem: {
    alignItems: "center",
    width: "30%",
  },
  featureText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
    color: "#333",
  },
})
