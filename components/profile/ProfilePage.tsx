import { setIsUserLoggedIn, setUser } from "@/redux/features/user/authSlice";
import { deleteFromSecureStore, saveToSecureStore } from "@/redux/token";
import { Entypo } from "@expo/vector-icons";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";

type User = {
  user_id: number;
  name: string;
  email: string;
  phone: string;
  phone_verified: boolean;
  email_verified: boolean;
  street_address: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  landmark: string | null;
  country: string | null;
  image_url?: string;
};

const ProfilePage = ({ userData }: { userData: User }) => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    await deleteFromSecureStore("FIREBASE_TOKEN");
    await saveToSecureStore("LOGIN_STATE", false);
    dispatch(setIsUserLoggedIn(false));
    dispatch(setUser(null));
    router.replace("/(tabs)/home");
  };
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <ScrollView style={[styles.container, { marginBottom: tabBarHeight }]}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          {userData && userData.image_url ? (
          <Image
            source={{
              uri: userData?.image_url,
            }}
            style={styles.avatar}
          />
          ) : (
            <Text style={styles.avatarText}>{userData?.name?.slice(0, 1)}</Text>
          )}
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.name}>{userData?.name}</Text>
          <Text style={styles.email}>{userData?.email}</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/profile/editprofile")}
        >
          <Text style={styles.editText}>EDIT</Text>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => router.push("/(tabs)/profile/orders")}
        >
          <Text style={styles.sectionTitle}>My Orders</Text>
          <Entypo name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => router.push("/(tabs)/profile/giftcards")}
        >
          <Text style={styles.sectionTitle}>Gifts</Text>
          <Entypo name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => router.push("/(tabs)/profile/rewards")}
        >
          <Text style={styles.sectionTitle}>Rewards</Text>
          <Entypo name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => router.push("/(tabs)/profile/purchasehistory")}
        >
          <Text style={styles.sectionTitle}>Purchase History</Text>
          <Entypo name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => router.push("/(tabs)/profile/referandearn")}
        >
          <Text style={styles.sectionTitle}>Refer and Earn</Text>
          <Entypo name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      {/* My Addresses */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => router.push("/(tabs)/profile/address")}
        >
          <Text style={styles.sectionTitle}>My Addresses</Text>
          <Entypo name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
        <Text style={styles.subText}>Manage your addresses here</Text>
      </View>

      {/* Contact Us */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>CONTACT US</Text>

        <TouchableOpacity
          style={styles.row}
          onPress={() => router.push("/(tabs)/profile/support/help")}
        >
          <Text style={styles.sectionTitle}>Help & Support</Text>
          <Entypo name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => router.push("/(tabs)/profile/support/feedback")}
        >
          <Text style={styles.sectionTitle}>Feedback & Suggestion</Text>
          <Entypo name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      {/* About Us */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>ABOUT US</Text>

        <TouchableOpacity style={styles.row}>
          <Text style={styles.sectionTitle}>Our Story</Text>
          <Entypo name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.sectionTitle}>Delete Account</Text>
          <Entypo name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
        <Button
          mode="contained"
          buttonColor="red"
          labelStyle={{ color: "white", fontSize: 16, fontWeight: 900 }}
          onPress={handleLogout}
        >
          Logout
        </Button>
      </View>
    </ScrollView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#FFD54F",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  editText: {
    color: "#007BFF",
    fontWeight: "600",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: "#fff8e1",
    marginHorizontal: 10,
    borderRadius: 12,
  },
  actionItem: {
    alignItems: "center",
  },
  actionText: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  section: {
    marginTop: 18,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  sectionHeader: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "600",
    color: "#777",
  },
  sectionTitle: {
    fontSize: 15,
    color: "#000",
  },
  subText: {
    fontSize: 12,
    color: "#888",
    marginBottom: 6,
    marginLeft: 2,
  },
});
