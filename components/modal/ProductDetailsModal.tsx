import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";

export default function ProductDetailsModal({ visible, onClose, description }) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.sheet}>
        <View style={styles.handle} />

        <Text style={styles.heading}>Product Details</Text>

        <Text style={styles.desc}>{description}</Text>

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
    marginBottom: 10,
  },

  desc: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
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
