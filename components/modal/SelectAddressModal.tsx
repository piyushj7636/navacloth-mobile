import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SelectAddressModal = ({ visible, onClose, setShowModal }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Select Delivery Address</Text>
            <TouchableOpacity onPress={onClose}>
              <Entypo name="cross" size={26} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Address Block */}
          <View style={styles.addressCard}>
            <View style={styles.addressHeader}>
              <Text style={styles.name}>Piyush Joshi</Text>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Other</Text>
              </View>
            </View>

            <Text style={styles.addressText}>
              H No. 602/1 Krishna Street No. 7, Adarsh mohalla, East Delhi,
              110053
            </Text>
            <Text style={styles.contact}>Contact number: 7503567636</Text>

            <TouchableOpacity>
              <Text style={styles.editText}>EDIT</Text>
            </TouchableOpacity>
          </View>

          {/* Add new address */}
          <TouchableOpacity style={styles.addAddressBtn}>
            <Text style={styles.addAddressText}>+ ADD NEW ADDRESS</Text>
          </TouchableOpacity>

          {/* Select address button */}
          <TouchableOpacity
            style={styles.selectBtn}
            onPress={() => {
              setShowModal(false);
              router.push("/(tabs)/home/cart/payment");
            }}
          >
            <Text style={styles.selectBtnText}>SELECT ADDRESS</Text>
          </TouchableOpacity>

          {/* Footer note */}
          <Text style={styles.footerText}>
            Pre-filled addresses from Shiprocket for quicker checkout{" "}
            <Text style={styles.link}>T&C</Text> and{" "}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default SelectAddressModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  backdrop: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
  addressCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginRight: 8,
  },
  tag: {
    borderWidth: 1,
    borderColor: "#FDD835",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: "#FFF9C4",
  },
  tagText: {
    color: "#FBC02D",
    fontWeight: "600",
    fontSize: 12,
  },
  addressText: {
    color: "#444",
    fontSize: 14,
    marginBottom: 4,
  },
  contact: {
    color: "#555",
    fontSize: 13,
    marginBottom: 8,
  },
  editText: {
    color: "#007BFF",
    fontWeight: "600",
    textAlign: "right",
  },
  addAddressBtn: {
    marginTop: 8,
    marginBottom: 16,
  },
  addAddressText: {
    color: "#007BFF",
    fontWeight: "600",
    textAlign: "center",
  },
  selectBtn: {
    backgroundColor: "#FFD54F",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  selectBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },
  footerText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    lineHeight: 16,
  },
  link: {
    color: "#007BFF",
    textDecorationLine: "underline",
  },
});
