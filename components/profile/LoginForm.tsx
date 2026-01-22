import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const LoginForm = () => {

  return (
    <View style={styles.container}>
      {/* Banner */}
      <Image
        source={{ uri: 'https://www.placeholderimage.online/placeholder/400/200/f3f4f6/1f2937?font=Montserrat.svg' }}
        style={styles.banner}
      />

      {/* Title */}
      <Text style={styles.title}>Login / Signup</Text>
      <Text style={styles.subtitle}>Join us now to be a part of the family.</Text>

      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialBtn} onPress={() => router.push('/(tabs)/profile/auth/login')}>
          <Text style={styles.socialText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn} onPress={() => router.push('/(tabs)/profile/auth/signup')}>
          <Text style={styles.socialText}>Signup</Text>
        </TouchableOpacity>
      </View>

      {/* Checkbox */}
      <View style={styles.checkboxRow}>
        <Text style={styles.checkboxLabel}>
          Fetch my address for blazing fast checkout
        </Text>
      </View>

      {/* Disclaimer */}
      <Text style={styles.disclaimer}>
        By creating an account or logging in, you agree to our{' '}
        <Text style={styles.link}>T&C</Text> and <Text style={styles.link}>Privacy Policy</Text>.
      </Text>
    </View>
  );
}

export default LoginForm

const styles = StyleSheet.create({
  container: { padding: 16 },
  banner: { width: '100%', height: 200, borderRadius: 12, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  socialRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  socialBtn: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  socialText: { fontWeight: 'bold' },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  iosCheckbox: { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] },
  checkboxLabel: { marginLeft: 8, fontSize: 14 },
  disclaimer: { fontSize: 12, color: '#666', textAlign: 'center' },
  link: { color: '#007bff', textDecorationLine: 'underline' },
});