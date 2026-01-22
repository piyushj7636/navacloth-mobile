import { HapticTab } from '@/components/haptic-tab';
import { RootState } from '@/redux/store';
import { AntDesign, Feather, FontAwesome, Fontisto, Foundation, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useSelector } from 'react-redux';

export default function TabLayout() {
  const currentTheme = useSelector((state: RootState) => state.theme)
	const colorTheme = currentTheme === "light" ? "#6562fff5" : "#fff"
  const inactiveColorTheme = currentTheme === "light" ? "#be2a9eff" : "#7c7c7c"
  const visible = useSelector((state: RootState) => state.tab);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorTheme,
        tabBarInactiveTintColor: inactiveColorTheme,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: visible
          ? {
              height: 60,
              borderTopWidth: 0,
              borderRadius: 30,
              marginHorizontal: 20,
              marginBottom: 20,
              position: 'absolute',
            }
          : {
              display: "none",
            },
        tabBarIconStyle: {height: 32},
      }}>
      <Tabs.Screen

        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => focused ? <Foundation name='home' color={color} size={24} /> : <Feather size={24} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => focused ? <AntDesign name='search' color={color} size={24} /> : <Fontisto size={24} name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color, focused }) => <FontAwesome size={24} name={focused ? "heart" : "heart-o"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => <Ionicons size={24} name={focused ? "person" : "person-outline"} color={color} />,
        }}
      />
    </Tabs>
  );
}