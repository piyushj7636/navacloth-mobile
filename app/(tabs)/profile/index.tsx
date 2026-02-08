import Header from "@/components/common/Header";
import LoginForm from "@/components/profile/LoginForm";
import ProfilePage from "@/components/profile/ProfilePage";
import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store"
import { useGetUserQuery } from "@/redux/apiSlice";
import { setUser } from "@/redux/features/user/authSlice";

const ProfileScreen = () => {
  const {data: userData} = useGetUserQuery()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state: RootState) => state.auth.auth.isUserLoggedIn);
  // const userData = useSelector((state: RootState) => state.auth.auth.user)
	console.log(isAuthenticated)
  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData));
    }
  }, []);


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

