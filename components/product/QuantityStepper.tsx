import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";

export default function QuantityStepper() {
  const [qty, setQty] = useState(1);

  const decrease = () => setQty(prev => Math.max(1, prev - 1));
  const increase = () => setQty(prev => prev + 1);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={decrease}>
        <Text style={styles.btnText}>−</Text>
      </TouchableOpacity>

      <View style={styles.qtyBox}>
        <Text style={styles.qtyText}>{qty}</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={increase}>
        <Text style={styles.btnText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  btn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },

  btnText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
  },

  qtyBox: {
    minWidth: 50,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  qtyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
});
