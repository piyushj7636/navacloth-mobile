import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from '@/components/searchpage/SearchBar'
import PopularSearches from '@/components/searchpage/PopularSearches'
import Header from '@/components/common/Header'

export default function SearchScreen() {
	return (
		<SafeAreaProvider>
      <SafeAreaView>
				{/* <Header /> */}
        <SearchBar />
				<PopularSearches/>
      </SafeAreaView>
    </SafeAreaProvider>
	)
}

const styles = StyleSheet.create({})