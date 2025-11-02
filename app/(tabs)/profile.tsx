import ProfilePage from '@/components/profile/ProfilePage'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = () => {
	return (
		<SafeAreaProvider>
      <SafeAreaView>
				<ProfilePage/>
      </SafeAreaView>
    </SafeAreaProvider>
	)
}

export default ProfileScreen

const styles = StyleSheet.create({})