import Header from '@/components/common/Header'
import BannerCarousel from '@/components/homepage/BannerCarousel'
import Categories from '@/components/homepage/Categories'
import NewArrivals from '@/components/homepage/NewArrivals'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Header/>
        <BannerCarousel/>
        <Categories/>
        <NewArrivals/>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})