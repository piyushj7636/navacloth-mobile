import Header from "@/components/common/Header";
import LoginForm from "@/components/profile/LoginForm";
import ProfilePage from "@/components/profile/ProfilePage";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useGetUserQuery } from "@/redux/apiSlice";
import { setUser } from "@/redux/features/user/authSlice";
import NetInfo from "@react-native-community/netinfo";

const ProfileScreen = () => {
  const [isOnline, setIsOnline] = useState(true);
  const dispatch = useDispatch();
  const [offlineIndicator, setOfflineIndicator] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.auth.isUserLoggedIn,
  );
  // const { data: userData } = useGetUserQuery(undefined, {
  //   skip: !isOnline || !isAuthenticated,
  // });
  const userData = useSelector((state: RootState) => state.auth.auth.user)
  console.log(isAuthenticated);

  useEffect(() => {
    const unsub = NetInfo.addEventListener((state) => {
      const online = Boolean(state.isConnected);
      setIsOnline(online);
      if (!online) {
        setOfflineIndicator(true);
      }
    });
    return unsub;
  }, []);

  // useEffect(() => {
  //   if (isOnline && isAuthenticated && userData) {
  //     dispatch(setUser(userData));
  //   }
  // }, [isOnline, isAuthenticated, userData, dispatch]);

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
