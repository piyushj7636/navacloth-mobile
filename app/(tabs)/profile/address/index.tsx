import AddNewAddress from "@/components/common/AddNewAddress";
import { useGetAllAddressesQuery } from "@/redux/apiSlice";
import { RootState } from "@/redux/store";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function AddressPage() {
  const [showModal, setShowModal] = useState(false);
  const { data: userAddresses } = useGetAllAddressesQuery();
  const userData = useSelector((state: RootState) => state.auth.auth.user);
  console.log("Address in addreess: ", userAddresses);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Address Card */}
        <View>
          {userAddresses && userAddresses.length > 0 ? (
            userAddresses.map((addr, idx) => (
              <View style={styles.addressCard} key={idx}>
                <View style={styles.addressHeader}>
                  <Text style={styles.name}>{addr?.addressee_name}</Text>
                </View>

                <Text style={styles.addressText}>
                  {addr.house_number} {addr.locality} {addr.city}{" "}
                  {addr.postal_code} {addr.state} {addr.country}
                </Text>
                <Text style={styles.contact}>
                  Contact number: {addr.addressee_phone}
                </Text>
                {/* Action Buttons */}
                <View style={styles.actions}>
                  <TouchableOpacity style={styles.editBtn}>
                    <Text style={styles.btnText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.removeBtn}>
                    <Text style={styles.btnText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text>Add new address</Text>
          )}
        </View>

        {/* Add New Address */}
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.addText}>ADD NEW ADDRESS</Text>
        </TouchableOpacity>
        <AddNewAddress
          visible={showModal}
          onClose={() => setShowModal(false)}
          setShowModal={setShowModal}
          userData={userData}
        />
        {/* Footer Note */}
        <Text style={styles.note}>
          Pre-filled addresses from Shiprocket for quicker checkout
        </Text>
        <View style={styles.links}>
          <Text style={styles.link}>T&C</Text>
          <Text style={styles.link}>Privacy Policy</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  scroll: {
    padding: 16,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  address: {
    fontSize: 16,
    color: "#444",
    marginBottom: 4,
  },
  phone: {
    fontSize: 16,
    color: "#444",
    marginBottom: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  editBtn: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  removeBtn: {
    backgroundColor: "#dc3545",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  btnText: {
    color: "#fff",
    fontWeight: "500",
  },
  tag: {
    alignSelf: "flex-start",
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    color: "#555",
  },
  addBtn: {
    backgroundColor: "#f7c948",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  addText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  note: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  links: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  link: {
    fontSize: 13,
    color: "#007bff",
    textDecorationLine: "underline",
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
  contact: {
    color: "#555",
    fontSize: 13,
    marginBottom: 8,
  },
  addressText: {
    color: "#444",
    fontSize: 14,
    marginBottom: 4,
  },
});
