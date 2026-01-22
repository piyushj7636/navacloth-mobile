import Header from "@/components/common/Header";
import LoginForm from "@/components/profile/LoginForm";
import ProfilePage from "@/components/profile/ProfilePage";
import React from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store"

const ProfileScreen = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.auth.isUserLoggedIn);
  const userData = useSelector((state: RootState) => state.auth.auth.user)
	console.log(isAuthenticated)
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        {/* <Header /> */}
        {isAuthenticated === undefined ? (
          <ActivityIndicator size="large" />
        ) : isAuthenticated ? (
          <ProfilePage userData={userData} />
        ) : (
          <LoginForm />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
