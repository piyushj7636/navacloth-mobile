import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import React, { useState } from "react";

const DeleteAccount = () => {
  const [confirm, setConfirm] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delete Account</Text>
      <Text style={styles.warning}>
        ⚠️ Deleting your account will permanently remove your data, orders, and saved preferences.
      </Text>

      <View style={styles.switchContainer}>
        <Switch value={confirm} onValueChange={setConfirm} />
        <Text style={styles.switchText}>I understand the consequences</Text>
      </View>

      <TouchableOpacity
        disabled={!confirm}
        style={[styles.deleteBtn, { opacity: confirm ? 1 : 0.5 }]}
      >
        <Text style={styles.deleteText}>Delete My Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  warning: { fontSize: 15, color: "#333", marginBottom: 20, lineHeight: 22 },
  switchContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  switchText: { marginLeft: 10, fontSize: 15 },
  deleteBtn: {
    backgroundColor: "#FF3B30",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  deleteText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
