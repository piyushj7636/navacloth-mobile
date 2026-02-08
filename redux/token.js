import * as SecureStore from 'expo-secure-store';

// Keys
const KEYS = {
  LOGIN_STATE: 'LOGIN_STATE',
  FIREBASE_TOKEN: 'FIREBASE_TOKEN',
  USER_ID: 'USER_ID',
};

// Save data
export const saveToSecureStore = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error saving to SecureStore:', e);
  }
};

// Read data
export const getFromSecureStore = async (key) => {
try {
  const result = await SecureStore.getItemAsync(key);
  if (!result) return null;

  // Try parsing as JSON, fallback to raw string
  try {
    return JSON.parse(result);
  } catch {
    return result;
  }
} catch (e) {
  console.error('Error reading from SecureStore:', e);
  return null;
}
};


// Delete data
export const deleteFromSecureStore = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (e) {
    console.error('Error deleting from SecureStore:', e);
  }
};
