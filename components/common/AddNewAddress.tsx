import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useStoreAddressMutation } from "@/redux/apiSlice";

const addressTypes = ["Home", "Office", "Other"];

const AddressFormSchema = Yup.object().shape({
	name: Yup.string().required("Required"),
	phone: Yup.number().required("Required"),
  pinCode: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  houseNumber: Yup.string().required("Required"),
  locality: Yup.string().required("Required"),
  landmark: Yup.string(),
  country: Yup.string().required("Required"),
});

export default function AddNewAddress({
  visible,
  onClose,
  userData,
  setShowModal,
}) {
  const [selectedType, setSelectedType] = useState("Home");
  const [storeAddress] = useStoreAddressMutation();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      {/* Overlay */}
      <View style={styles.overlay}>
        {/* Modal Card */}
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Add New Address</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scroll}>
            <Formik
              initialValues={{
								name: userData?.name || "",
								phone: userData?.phone || "",
                pinCode: "",
                city: "",
                state: "",
                houseNumber: "",
                locality: "",
                landmark: "",
                country: "",
              }}
              validationSchema={AddressFormSchema}
              onSubmit={(values) => {
                console.log({ ...values, addressType: selectedType });
                onClose(); // close modal after save
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  <Text style={styles.label}>Name</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange("name")}
										onBlur={handleBlur("name")}
                    value={values.name}
                  />
									{touched.name && errors.name && (
                    <Text style={styles.error}>{errors.name}</Text>
                  )}

                  <Text style={styles.label}>Mobile Number</Text>
                  <TextInput
                    style={styles.input}
										onChangeText={handleChange("phone")}
										onBlur={handleBlur("phone")}
                    value={values.phone}
                  />
									{touched.phone && errors.phone && (
                    <Text style={styles.error}>{errors.phone}</Text>
                  )}

                  <Text style={styles.label}>
                    Flat no/Building, Street name *
                  </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange("houseNumber")}
                    onBlur={handleBlur("houseNumber")}
                    value={values.houseNumber}
                  />
                  {touched.houseNumber && errors.houseNumber && (
                    <Text style={styles.error}>{errors.houseNumber}</Text>
                  )}

                  <Text style={styles.label}>Area/Locality *</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange("locality")}
                    onBlur={handleBlur("locality")}
                    value={values.locality}
                  />
                  {touched.locality && errors.locality && (
                    <Text style={styles.error}>{errors.locality}</Text>
                  )}

                  <Text style={styles.label}>City *</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange("city")}
                    onBlur={handleBlur("city")}
                    value={values.city}
                  />
                  {touched.city && errors.city && (
                    <Text style={styles.error}>{errors.city}</Text>
                  )}

                  <Text style={styles.label}>State *</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange("state")}
                    onBlur={handleBlur("state")}
                    value={values.state}
                  />
                  {touched.state && errors.state && (
                    <Text style={styles.error}>{errors.state}</Text>
                  )}

                  <Text style={styles.label}>PIN Code *</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={handleChange("pinCode")}
                    onBlur={handleBlur("pinCode")}
                    value={values.pinCode}
                  />
                  {touched.pinCode && errors.pinCode && (
                    <Text style={styles.error}>{errors.pinCode}</Text>
                  )}

                  <Text style={styles.label}>Landmark</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange("landmark")}
                    onBlur={handleBlur("landmark")}
                    value={values.landmark}
                  />

                  <Text style={styles.label}>Country *</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange("country")}
                    onBlur={handleBlur("country")}
                    value={values.country}
                  />
                  {touched.country && errors.country && (
                    <Text style={styles.error}>{errors.country}</Text>
                  )}

                  {/* Address Type Buttons */}
                  <View style={styles.typeRow}>
                    {addressTypes.map((type) => (
                      <TouchableOpacity
                        key={type}
                        style={[
                          styles.typeBtn,
                          selectedType === type && styles.typeBtnSelected,
                        ]}
                        onPress={() => setSelectedType(type)}
                      >
                        <Text
                          style={[
                            styles.typeText,
                            selectedType === type && styles.typeTextSelected,
                          ]}
                        >
                          {type}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Submit */}
                  <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={async () => {
                      try {
                        await storeAddress({
                          ...values,
                          selectedType,
                        }).unwrap();

                        setShowModal(false); // close only after success
                      } catch (err) {
                        console.log("Save failed:", err);
                      }
                    }}
                  >
                    <Text style={styles.saveText}>SAVE ADDRESS</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // dim background
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "100%",
    maxHeight: "90%",
    overflow: "hidden",
    elevation: 5, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  closeBtn: {
    fontSize: 20,
    color: "#333",
  },
  scroll: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
  },
  static: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
  },
  error: {
    fontSize: 12,
    color: "red",
    marginTop: 4,
  },
  typeRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  typeBtn: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  typeBtnSelected: {
    backgroundColor: "#f7c948",
    borderColor: "#f7c948",
  },
  typeText: {
    fontSize: 14,
    color: "#333",
  },
  typeTextSelected: {
    fontWeight: "700",
    color: "#000",
  },
  saveBtn: {
    backgroundColor: "#f7c948",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 40,
  },
  saveText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
});
