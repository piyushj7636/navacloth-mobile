import SelectAddressModal from "@/components/modal/SelectAddressModal";
import {
  getCartItems,
  getCartTotal,
} from "@/features/cart/cart.db.js";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { useGetCartQuery, useRemoveFromCartMutation, useUpdateCartQuantityMutation } from "@/redux/apiSlice";
import { RootState } from "@/redux/store";
import { Feather, Ionicons } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import {
  useSafeAreaInsets
} from "react-native-safe-area-context";
import { useSelector } from "react-redux";

interface CartItem {
  variant_id: string | number;
  image: string;
  title: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
}

const Cart = () => {
  const [localCart, setLocalCart] = useState<CartItem[]>([]);
  const [isOnline, setIsOnline] = useState(true);
  const [offlineIndicator, setOfflineIndicator] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.auth.isUserLoggedIn,
  );
  const [showModal, setShowModal] = useState(false);
  const [total, setTotal] = useState({
    totalMrp: 0,
    totalSelling: 0,
    totalSavings: 0,
  });
  const insets = useSafeAreaInsets();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [updateCartQuantity] = useUpdateCartQuantityMutation()

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
          const data = await getCartItems();
          console.log("Local cart database: ", data)
          const total = await getCartTotal();
          setLocalCart(data);
          setTotal(total);
          console.log("📦 Loaded cart from SQLite (offline mode)");
        } catch (error) {
          console.error("❌ Error loading offline cart", error);
        }
      })();
    }
  }, [isOnline, isAuthenticated]);

  // ✅ Fetch cart from server only when online
  const {
    data: cartData,
    isLoading,
    refetch,
  } = useGetCartQuery(undefined, {
    skip: !isAuthenticated || !isOnline, // skip when offline or not authenticated
  });

  // ✅ Auto-refetch when back online
  useEffect(() => {
    if (isOnline && isAuthenticated && offlineIndicator) {
      console.log("🔄 Back online — refetching cart");
      refetch();
      setOfflineIndicator(false);
    }
  }, [isOnline, isAuthenticated, refetch, offlineIndicator]);

  const handleRemoveItem = async (variant_code, cart_item_id) => {
    try {
      await removeFromCart({variant_code, cart_item_id});
      try {
        await refetch();
      } catch {}
    } catch (error) {
      console.error("❌ Failed to remove item", error);
    }
    // setLocalCart((prev) => prev.filter((i) => i.variant_id !== item.variant_id));
  };

  const handleUpdateQuantity = useDebouncedCallback(
  (id, quantity, variant_code) => {
    updateCartQuantity({id, quantity, variant_code});
  },
  500
);

  const displayData = !isOnline ? localCart : cartData || [];

  return (
    <View style={{ paddingBottom: insets.bottom + 60 }}>
      {isAuthenticated ? (
        isLoading && !displayData.length ? (
          // 🔹 Loading state
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
            {/* 🔹 Offline banner */}
            {!isOnline && (
              <View style={styles.offlineBanner}>
                <Feather name="wifi-off" size={14} color="#fff" />
                <Text style={styles.offlineBannerText}>
                  {" "}
                  Offline mode — showing cached data
                </Text>
              </View>
            )}

            {/* 🔹 FlatList for cart items */}
            <FlatList
              data={displayData}
              keyExtractor={(item) =>
                item.cart_item_id?.toString() ??
                item.variant_id ??
                String(item.id)
              }
              renderItem={({ item }) => (
                <View style={styles.itemCard}>
                  {/* Left: Product Image */}
                  <Image
                    source={{ uri: item.image }}
                    style={styles.itemImage}
                  />

                  {/* Right: Product Details */}
                  <View style={styles.itemDetails}>
                    <View style={styles.topRow}>
                      <Text style={styles.itemTitle} numberOfLines={2}>
                        {item.title}
                      </Text>

                      <TouchableOpacity onPress={() => handleRemoveItem(item.variant_code, item.cart_item_id)}>
                        <Ionicons
                          name="trash-outline"
                          size={18}
                          color="#ff4d4f"
                        />
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.variantText}>
                      {item.color}, Size {item.size}
                    </Text>

                    <View style={styles.bottomRow}>
                      <Text style={styles.price}>₹{item.selling_price}</Text>

                      {/* Quantity controls */}
                      <View style={styles.qtyContainer}>
                        <TouchableOpacity
                          style={styles.qtyBtn}
                          onPress={() => {
                            const newQty = item.quantity - 1;
                            if (newQty === 0) {
                              handleRemoveItem(item.variant_code, item.cart_item_id);
                            } else {
                              setLocalCart((prev) =>
                                prev.map((cartItem) =>
                                  cartItem.variant_id === item.variant_id
                                    ? { ...cartItem, quantity: newQty }
                                    : cartItem,
                                ),
                              );
                              handleUpdateQuantity(item.cart_item_id, newQty, item.variant_code);
                            }
                          }}
                        >
                          <Ionicons name="remove" size={14} color="#2563eb" />
                        </TouchableOpacity>

                        <Text style={styles.qtyText}>{item.quantity}</Text>

                        <TouchableOpacity
                          style={styles.qtyBtn}
                          onPress={() => {
                            const newQty = item.quantity + 1;
                            setLocalCart((prev) =>
                              prev.map((cartItem) =>
                                cartItem.variant_id === item.variant_id
                                  ? { ...cartItem, quantity: newQty }
                                  : cartItem,
                              ),
                            );
                            handleUpdateQuantity(item.cart_item_id, newQty, item.variant_code);
                          }}
                        >
                          <Ionicons name="add" size={14} color="#2563eb" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              ListFooterComponent={({item}) => (
                <View>
                  <View style={styles.summary}>
              <Text style={styles.summaryTitle}>Price Summary</Text>
              <View style={styles.row}>
                <Text>Total MRP:</Text>
                <Text>₹{total.totalMrp ?? 0}</Text>
              </View>
              <View style={styles.row}>
                <Text>Discount:</Text>
                <Text style={styles.discount}>-₹{total.totalSavings ?? 0}</Text>
              </View>
              <View style={styles.row}>
                <Text>Delivery Fee:</Text>
                <Text>₹0</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.total}>₹{total.totalSelling ?? 0}</Text>
              </View>
            </View>

            <Text style={styles.freeDelivery}>
              🎉 Yay! You get FREE delivery on this order
            </Text>
            <Text style={styles.savings}>
              You are saving ₹{total.totalSavings} on this order
            </Text>

            {/* 🔹 Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>VIEW DETAILS</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.proceed]}
                onPress={() => setShowModal(true)}
              >
                <Text style={styles.buttonText}>PROCEED</Text>
              </TouchableOpacity>
              <SelectAddressModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                setShowModal={setShowModal}
              />
            </View>
                </View>
              )}
              contentContainerStyle={styles.container}
            />

            {/* 🔹 Price Summary */}
            
          </>
        ) : (
          // 🔹 Empty state
          <View style={styles.container}>
            <Image
              source={{
                uri: "https://www.placeholderimage.online/placeholder/150/150/f3f4f6/1f2937?font=Montserrat.svg",
              }}
              style={styles.image}
            />
            <Text style={styles.title}>Your Cart is Empty</Text>
            <Text style={styles.subtitle}>
              Add items to your cart and shop them anytime.
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        )
      ) : (
        <Text>Please log in to view your cart.</Text>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  delivery: {
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
  },
  coupon: {
    fontSize: 13,
    color: "#007BFF",
    marginBottom: 12,
  },
  offer: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },
  deliveryDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  saved: {
    fontSize: 13,
    color: "#4CAF50",
  },
  summary: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#fff8e1",
    borderRadius: 8,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  discount: {
    color: "#E53935",
  },
  totalLabel: {
    fontWeight: "600",
  },
  total: {
    fontWeight: "600",
    fontSize: 16,
  },
  freeDelivery: {
    marginTop: 16,
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "600",
  },
  savings: {
    fontSize: 13,
    color: "#777",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 12,
    backgroundColor: "#FFC107",
    borderRadius: 6,
    marginRight: 10,
    alignItems: "center",
  },
  proceed: {
    backgroundColor: "#FF5722",
    marginRight: 0,
  },
  buttonText: {
    fontWeight: "600",
    color: "#fff",
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 24,
  },
  itemCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  itemImage: {
    width: 80,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },

  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  itemTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111",
    flex: 1,
    marginRight: 8,
  },

  variantText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },

  price: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    paddingHorizontal: 6,
  },

  qtyBtn: {
    padding: 6,
  },

  qtyText: {
    fontSize: 13,
    fontWeight: "600",
    marginHorizontal: 6,
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
