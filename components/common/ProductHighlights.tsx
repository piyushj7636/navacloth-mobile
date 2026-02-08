import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

const DATA = [
  { label: "Primary Color", value: "Beige Gold" },
  { label: "Model Chest Size", value: '39"' },
  { label: "Package Contains", value: "1 Men's Shirt" },
  { label: "Wash Care", value: "Machine wash warm" },
  { label: "Transparency", value: "Opaque" },
  { label: "Model Height", value: `6'1"` },
  { label: "Size worn by Model", value: "M" },
  { label: "Fabric Composition", value: "100% Cotton" },
  { label: "Length", value: "Medium" },
  { label: "Fabric", value: "100% Cotton" },
  { label: "Sleeve", value: "Full-Length" },
]

const ProductHighlights = ({product}) => {
  const [expanded, setExpanded] = useState(false)
  console.log(product)

  // 3 rows = 6 items (2 columns)
  const visibleData = expanded ? DATA : DATA.slice(0, 6)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Details</Text>

      <View style={styles.grid}>
        {visibleData.map((item, index) => (
          <DetailItem
            key={index}
            label={item.label}
            value={item.value}
          />
        ))}
      </View>

      {/* Toggle button */}
      {DATA.length > 6 && (
        <TouchableOpacity
          style={styles.toggleBtn}
          onPress={() => setExpanded(!expanded)}
        >
          <Text style={styles.toggleText}>
            {expanded ? "Less details" : "See more"}
          </Text>
          <Text style={styles.arrow}>
            {expanded ? "⌃" : "⌄"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const DetailItem = ({ label, value }) => (
  <View style={styles.item}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
)

export default ProductHighlights

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 14,
    // margin: 12,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  item: {
    width: "48%",
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111",
  },
  toggleBtn: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 4,
  },
  toggleText: {
    fontSize: 13,
    color: "#2874F0",
    marginRight: 4,
  },
  arrow: {
    fontSize: 14,
    color: "#2874F0",
  },
})
