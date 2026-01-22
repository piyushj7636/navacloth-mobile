import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import * as Clipboard from "expo-clipboard";

const ReferAndEarn = () => {
  const referralCode = "SHOP123";

  const copyToClipboard = () => {
    Clipboard.setStringAsync(referralCode);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Refer & Earn</Text>
      <Text style={styles.subtitle}>Invite friends and earn ₹50 when they place their first order!</Text>

      <View style={styles.codeBox}>
        <Text style={styles.code}>{referralCode}</Text>
        <TouchableOpacity onPress={copyToClipboard}>
          <Text style={styles.copy}>Copy</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.inviteBtn}>
        <Text style={styles.inviteText}>Invite Friends</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReferAndEarn;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
  subtitle: { color: "#555", marginBottom: 20 },
  codeBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  code: { fontSize: 20, fontWeight: "700", color: "#111" },
  copy: { color: "#007AFF", fontWeight: "600" },
  inviteBtn: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  inviteText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
