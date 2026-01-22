import Header from '@/components/common/Header'
import Wishlist from '@/components/wishlistpage/Wishlist'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
// import Wishlist from '../wishlist'

const WishlistScreen = () => {
	return (
		<SafeAreaProvider>
      <SafeAreaView>
				{/* <Header /> */}
				<Wishlist />
      </SafeAreaView>
    </SafeAreaProvider>
	)
}

export default WishlistScreen