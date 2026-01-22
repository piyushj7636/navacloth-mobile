import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

export default function SizeChartModal({ visible, onClose }) {
  const [unit, setUnit] = useState("in");

  const inchData = [
    { size: "S", top: "34-36", chest: "35-37" },
    { size: "M", top: "38-40", chest: "38-40" },
    { size: "L", top: "42", chest: "42-44" },
    { size: "XL", top: "46", chest: "45-48" },
    { size: "XXL", top: "48", chest: "50-52" },
    { size: "XXXL", top: "50", chest: "54-56" },
  ];

  const cmData = [
    { size: "S", top: "86-91", chest: "89-94" },
    { size: "M", top: "96-102", chest: "96-102" },
    { size: "L", top: "106", chest: "106-112" },
    { size: "XL", top: "116", chest: "114-122" },
    { size: "XXL", top: "122", chest: "127-132" },
    { size: "XXXL", top: "127", chest: "137-142" },
  ];

  const data = unit === "in" ? inchData : cmData;

  return (
    <Modal visible={visible} transparent animationType="slide">
      {/* Background Close */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* Bottom Sheet */}
      <View style={styles.sheet}>
        <View style={styles.handle} />

        {/* Title */}
        <Text style={styles.heading}>{`Men's Top Size Guide`}</Text>

        {/* Toggle Switch */}
        <View style={styles.switchContainer}>
          <TouchableOpacity
            style={[styles.switchBtn, unit === "in" && styles.switchActive]}
            onPress={() => setUnit("in")}
          >
            <Text
              style={[
                styles.switchText,
                unit === "in" && styles.switchTextActive,
              ]}
            >
              in.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.switchBtn, unit === "cm" && styles.switchActive]}
            onPress={() => setUnit("cm")}
          >
            <Text
              style={[
                styles.switchText,
                unit === "cm" && styles.switchTextActive,
              ]}
            >
              cm
            </Text>
          </TouchableOpacity>
        </View>

        {/* Table */}
        <ScrollView style={{ marginTop: 20 }}>
          <View style={styles.tableRowHeader}>
            <Text style={styles.headerCell}>Size</Text>
            <Text style={styles.headerCell}>Top ({unit})</Text>
            <Text style={styles.headerCell}>Chest ({unit})</Text>
          </View>

          {data.map((row) => (
            <View key={row.size} style={styles.tableRow}>
              <Text style={styles.cell}>{row.size}</Text>
              <Text style={styles.cell}>{row.top}</Text>
              <Text style={styles.cell}>{row.chest}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Close Button */}
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  sheet: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: "absolute",
    bottom: 0,
    width: "100%",
    maxHeight: "85%",
  },

  handle: {
    width: 50,
    height: 6,
    backgroundColor: "#ddd",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 14,
  },

  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
    textAlign: "center",
  },

  switchContainer: {
    flexDirection: "row",
    backgroundColor: "#eee",
    borderRadius: 40,
    padding: 5,
    alignSelf: "flex-start",
  },

  switchBtn: {
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 40,
  },

  switchActive: {
    backgroundColor: "#fff",
    elevation: 3,
  },

  switchText: {
    color: "#555",
    fontSize: 14,
  },

  switchTextActive: {
    color: "#000",
    fontWeight: "700",
  },

  tableRowHeader: {
    flexDirection: "row",
    backgroundColor: "#f4f4f4",
    paddingVertical: 12,
  },

  headerCell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "700",
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  cell: {
    flex: 1,
    textAlign: "center",
  },

  closeBtn: {
    marginTop: 18,
    paddingVertical: 12,
    backgroundColor: "#000",
    borderRadius: 10,
    alignItems: "center",
  },

  closeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
