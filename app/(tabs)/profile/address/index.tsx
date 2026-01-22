import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddressPage() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Address Card */}
        <View style={styles.card}>
          <Text style={styles.name}>Piyush Joshi</Text>
          <Text style={styles.address}>
            H No. 602/1 Krishna Street No. 7, Adarsh mohalla, East Delhi, Delhi, 110053
          </Text>
          <Text style={styles.phone}>📞 7503556736</Text>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.editBtn}>
              <Text style={styles.btnText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.removeBtn}>
              <Text style={styles.btnText}>Remove</Text>
            </TouchableOpacity>
          </View>

          {/* Tag */}
          <View style={styles.tag}>
            <Text style={styles.tagText}>Other</Text>
          </View>
        </View>

        {/* Add New Address */}
        <TouchableOpacity style={styles.addBtn} onPress={() => router.push("/(tabs)/profile/address/add")}>
          <Text style={styles.addText}>ADD NEW ADDRESS</Text>
        </TouchableOpacity>

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
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  address: {
    fontSize: 16,
    color: '#444',
    marginBottom: 4,
  },
  phone: {
    fontSize: 16,
    color: '#444',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  editBtn: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  removeBtn: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  btnText: {
    color: '#fff',
    fontWeight: '500',
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#555',
  },
  addBtn: {
    backgroundColor: '#f7c948',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  note: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  link: {
    fontSize: 13,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});