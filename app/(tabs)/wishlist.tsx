import Wishlist from '@/components/wishlistpage/Wishlist'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const WishlistScreen = () => {
	return (
		<SafeAreaProvider>
      <SafeAreaView>
				<Wishlist/>
      </SafeAreaView>
    </SafeAreaProvider>
	)
}

export default WishlistScreen