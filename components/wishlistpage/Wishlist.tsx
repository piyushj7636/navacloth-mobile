import { getWishlistItems } from "@/features/wishlist/wishlist.db.js";
import {
  useAddToCartMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/redux/apiSlice";
import { RootState } from "@/redux/store";
import { Feather, Ionicons } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

const Wishlist = () => {
  const [localWishlist, setLocalWishlist] = useState([]);
  const [isOnline, setIsOnline] = useState(true);
  const [offlineIndicator, setOfflineIndicator] = useState(false);
  const [addToCart] = useAddToCartMutation()

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.auth.isUserLoggedIn,
  );
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // ✅ Listen to network connectivity
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

  
  // ✅ Load SQLite when offline
  useEffect(() => {
    if (!isOnline && isAuthenticated) {
      (async () => {
        try {
          const data = await getWishlistItems();
          setLocalWishlist(data);
          console.log("📦 Loaded wishlist from SQLite (offline mode)");
        } catch (error) {
          console.error("❌ Error loading offline wishlist", error);
        }
      })();
    }
  }, [isOnline, isAuthenticated]);

  // ✅ Fetch wishlist from server only when online
  const {
    data: wishlistData,
    isLoading,
    refetch,
  } = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated || !isOnline, // skip when offline or not authenticated
  });

  const handleAddToCart = async (item) => {
    try {
      console.log("Wishlist data: ",item)
      const cartItem = {
        product_id: item.product_id,
        variant_code: item.variant_code,
        title: item.title,
        size: item.size,
        color: item.color,
        price: item.original_price,
        selling_price: item.selling_price,
        image: item.image,
        discount: item.discount_percent,
      }
      await addToCart(cartItem)
    } catch (error) {
      console.log("❌ Error adding to cart", error);
    }
  };

  // ✅ Auto-refetch when back online
  useEffect(() => {
    if (isOnline && isAuthenticated && offlineIndicator) {
      console.log("🔄 Back online — refetching wishlist");
      refetch();
      setOfflineIndicator(false);
    }
  }, [isOnline, isAuthenticated, refetch, offlineIndicator]);

  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const handleRemove = async (item) => {
    try {
      const id = item.wishlist_item_id ?? item.variant_id ?? item.id;
      await removeFromWishlist(id).unwrap();
      // optional: refetch to ensure latest server state
      try {
        await refetch();
      } catch {}
    } catch (error) {
      console.error("❌ Failed to remove item", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() =>
          router.push(`/(tabs)/wishlist/product/${item.product_id}`)
        }
      >
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => handleRemove(item)}
            accessibilityLabel="Remove from wishlist"
          >
            <Ionicons name="trash-outline" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <View>
          {/* <View style={styles.offerTag}>
            <Text style={styles.offerText}>{item.offer}</Text>
          </View> */}

          <View style={styles.content}>
            <View style={styles.ratingRow}>
              <View style={styles.rating}>
                <Ionicons name="star" size={14} color="#FFC107" />
                <Text style={styles.ratingText}>{item.average_rating}</Text>
              </View>
              <View style={styles.sizeBadge}>
                <Text style={{ fontSize: 11 }}>
                  Size: <Text style={styles.sizeText}>{item.size}</Text>
                </Text>
              </View>
            </View>

            {/* <Text style={styles.brand}>{item.brand}</Text> */}
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>

            {/* <View style={styles.priceRow}>
              <Text style={styles.price}>₹{item.price}</Text>
              <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>
              <Text style={styles.discount}>{item.discount}</Text>
            </View> */}

            <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
              <Text style={styles.addButtonText}>ADD TO BAG</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  // Decide which data source to show
  const displayData = !isOnline ? localWishlist : (wishlistData || []);

  return (
    <View style={{ paddingBottom: insets.bottom + 60 }}>
      {isAuthenticated ? (
        isLoading && !displayData.length ? (
          <View
            style={[
              styles.container,
              { justifyContent: "center", alignItems: "center", height: 200 },
            ]}
          >
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : displayData.length > 0 ? (
          <>
            {!isOnline && (
              <View style={styles.offlineBanner}>
                <Feather name="wifi-off" size={14} color="#fff" />
                <Text style={styles.offlineBannerText}>
                  {" "}
                  Offline mode — showing cached data
                </Text>
              </View>
            )}
            <FlatList
              data={displayData}
              keyExtractor={(item) =>
                item.wishlist_item_id?.toString() ??
                item.variant_id ??
                String(item.id)
              }
              renderItem={renderItem}
              numColumns={2}
              contentContainerStyle={styles.container}
              columnWrapperStyle={{ justifyContent: "space-between" }}
            />
          </>
        ) : (
          //Empty state
          <View style={styles.container}>
            <Image
              source={{
                uri: "https://www.placeholderimage.online/placeholder/150/150/f3f4f6/1f2937?font=Montserrat.svg",
              }}
              style={styles.image}
            />
            <Text style={styles.title}>Your Wishlist is Empty</Text>
            <Text style={styles.subtitle}>
              Save your favorite items here and shop them anytime.
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        )
      ) : (
        <Text>Please log in to view your wishlist.</Text>
      )}
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: "#f5f5f5",
  },

  card: {
    width: cardWidth,
    backgroundColor: "#fff",
    borderRadius: 14,
    margin: 6,
    // flex: 1,

    // Android
    elevation: 4,

    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,

    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 180,
    backgroundColor: "#f0f0f0",
  },

  imageWrapper: {
    position: "relative",
  },

  deleteBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 6,
    borderRadius: 16,
    zIndex: 2,
  },

  details: {
    padding: 10,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  ratingText: {
    fontSize: 12,
    marginLeft: 4,
    color: "#444",
    fontWeight: "500",
  },

  title: {
    fontSize: 13,
    color: "#222",
    marginTop: 4,
    lineHeight: 16,
    minHeight: 32, // 🔥 IMPORTANT (2 lines space)
  },

  addButton: {
    backgroundColor: "#111",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  addButtonText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  /* Empty state styles */
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 16,
  },

  button: {
    backgroundColor: "#111",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  content: {
    padding: 10,
    flex: 1,
    justifyContent: "space-between",
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sizeBadge: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },

  sizeText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#333",
  },
  offlineBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF9800",
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  offlineBannerText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
