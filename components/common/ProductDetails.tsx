import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import products from "../../app/MOCK_DATA.json";
import { addItemToCart } from "@/features/cart/cart.db.js";
import { useAddToCartMutation, useAddToWishlistMutation } from "@/redux/apiSlice";
import { hideTab, showTab } from "@/redux/features/common/tabSlice";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import ProductDetailsModal from "../modal/ProductDetailsModal";
import SizeChartModal from "../modal/SizeChartModal";
import StarRating from "../product/StarRating";
import VariantSelector from "../product/VariantSelector";
import DeliveryDetailsCard from "./DeliveryDetails";
import ProductHighlights from "./ProductHighlights";

const { width } = Dimensions.get("window");

const ProductDetails = ({ productId }) => {
  const product = products.find((p) => p.id === Number(productId));
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isSizeChartModalVisible, setIsSizeChartModalVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [addToWishlist] = useAddToWishlistMutation();
  const [addToCart] = useAddToCartMutation()
  const dispatch = useDispatch();
  const last = useRef(0);
  const insets = useSafeAreaInsets();
  const handleScroll = (e) => {
    const y = e.nativeEvent.contentOffset.y;

    // hide when scrolling down
    if (y > last.current + 8) {
      dispatch(hideTab());
    }

    // show when scrolling up
    if (y < last.current - 8) {
      dispatch(showTab());
    }

    last.current = y;
  };
  const visibleReviews = showAll
    ? product?.rating_summary.reviews
    : product?.rating_summary.reviews.slice(0, 3);
  if (!product) return <Text>Product not found</Text>;

  const variantsForSelector = product.variants.map((v) => ({
    size: v.size,
    color: v.color.name, // use color name
    stock: v.stock,
  }));

  // Get variant ID by filtering on color name and size
  const getVariantCode = (colorName: string, size: string) => {
    const variant = product.variants.find(
      (v) => v.color.name === colorName && v.size === size,
    );
    return variant?.variant_code || null;
  };

  const handleAddToWishlist = async () => {
    try {
      if (!selectedColor || !selectedSize) {
        console.error("❌ Please select size and color");
        return;
      }
      const variantCode = getVariantCode(selectedColor, selectedSize);
      if (!variantCode) {
        console.error("❌ Variant not found");
        return;
      }
      const item = {
        product_id: product.id,
        variant_code: variantCode,
        title: product.name,
        size: selectedSize,
        color: selectedColor,
        image: product?.media.images[0],
        average_rating: product?.rating_summary?.average_rating,
      };
      await addToWishlist(item);
      console.log("💖 Added to wishlist");
    } catch (error) {
      console.log("❌ Error adding to wishlist", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      if (!selectedColor || !selectedSize) {
        console.error("❌ Please select size and color");
        return;
      }
      const variantCode = getVariantCode(selectedColor, selectedSize);
      if (!variantCode) {
        console.error("❌ Variant not found");
        return;
      }

      const item = {
        product_id: product.id,
        variant_code: variantCode,
        title: product.name,
        size: selectedSize,
        color: selectedColor,
        price: product.pricing.mrp,
        selling_price: product.pricing.selling_price,
        image: product?.media.images[0],
        discount: product?.pricing.discount_percent,
      }
      await addToCart(item)
    } catch (error) {
      console.log("❌ Error adding to cart", error);
    }
  };

  return (
    <SafeAreaView
      style={{ marginBottom: insets.bottom + 60 }}
      edges={["bottom"]}
    >
      <FlatList
        onScroll={handleScroll}
        scrollEventThrottle={16}
        data={visibleReviews}
        keyExtractor={(item, index) => item.user_id + "-" + index}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <StarRating rating={item.rating} />
            <Text style={styles.reviewBody}>{item.comment}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View>
            <Carousel
              width={width}
              height={width * 1.2}
              data={product?.media?.images}
              loop
              autoPlay
              scrollAnimationDuration={1000}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.image} />
              )}
            />
            {/* TITLE */}
            <View style={styles.container}>
              <View style={styles.innerContainer}>
                <Text style={styles.title}>{product.name}</Text>
              </View>
              <View style={styles.row}>
                <View style={styles.ratingRow}>
                  <StarRating rating={product.rating_summary?.average_rating} />
                </View>
                <Text style={styles.reviewCount}>
                  ({product?.rating_summary?.total_reviews})
                </Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>
                  ₹{product?.pricing?.selling_price}
                </Text>
                <View>
                  {product?.pricing?.mrp && (
                    <Text style={styles.originalPrice}>
                      ₹{product?.pricing?.mrp}
                    </Text>
                  )}
                </View>
              </View>

              {/* SALE TEXT */}
              {/* {product.sale_text && (
                  <Text style={styles.saleText}>{product.sale_text}</Text>
                )} */}

              {/* SIZE SELECTOR */}
              <View style={styles.sizeContainer}>
                <Text style={styles.sectionTitle}>Size</Text>
                <TouchableOpacity
                  onPress={() => setIsSizeChartModalVisible(true)}
                >
                  <Text style={styles.sizeChartText}>View Size chart</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.sizeRow}>
                {/* {product.variants.map((item) => (
                  <TouchableOpacity
                    key={item.variant_id}
                    style={styles.sizeBtn}
                  >
                    <Text style={styles.sizeText}>{item.size}</Text>
                  </TouchableOpacity>
                ))} */}
                <VariantSelector
                  variants={variantsForSelector}
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                  onSizeSelect={setSelectedSize}
                  onColorSelect={setSelectedColor}
                />
              </View>
            </View>

            {/* PRODUCT DETAILS BUTTON */}
            <TouchableOpacity
              style={styles.productDetailsRow}
              onPress={() => setModalVisible(true)}
            >
              <View style={styles.detailsLeft}>
                <FontAwesome name="info-circle" size={18} color="#333" />
                <Text style={styles.detailsText}>Product Details</Text>
              </View>
              <FontAwesome name="chevron-right" size={18} color="#555" />
            </TouchableOpacity>

            {/* DELIVERY DETAILS */}
            <DeliveryDetailsCard />

            {/* PRODUCT HIGHLIGHTS */}
            <ProductHighlights product={product} />

            {/* BOTTOM SHEET MODAL */}
            <ProductDetailsModal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              description={product.description}
            />
            <SizeChartModal
              visible={isSizeChartModalVisible}
              onClose={() => setIsSizeChartModalVisible(false)}
            />
            <View style={styles.headerRow}>
              <Text style={styles.heading}>Reviews & Ratings</Text>
              <TouchableOpacity style={styles.seeAllBtn}>
                <Text style={styles.seeAllText}>See all reviews</Text>
              </TouchableOpacity>
            </View>

            {/* --- FIXED ADD TO CART BUTTON --- */}
            <TouchableOpacity>
              <Text></Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.button, styles.wishlistBtn]}
              onPress={handleAddToWishlist}
            >
              <Ionicons name="heart-outline" size={18} color="#111" />
              <Text style={styles.wishlistText}>Add to Wishlist</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.addToBagBtn]}
              onPress={handleAddToCart}
            >
              <Ionicons name="cart-outline" size={18} color="#FFF" />
              <Text style={styles.addToBagText}>Add To Bag</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {/* <View style={styles.fixedAddToBag}>
        <Button
          mode="contained"
          style={{ backgroundColor: "black", borderRadius: 30 }}
        >
          Add to Bag
        </Button>
      </View> */}
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  fixedAddToBag: {
    position: "absolute",
    bottom: 20, // stays above tab bar
    left: 16,
    right: 16,
    zIndex: 10,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sizeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    width: "100%",
    marginBottom: 10,
  },
  sizeChartText: {
    fontSize: 12,
  },
  image: {
    width: width,
    height: width * 1.2,
    resizeMode: "cover",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 6,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  ratingRow: {
    flexDirection: "row",
  },

  reviewCount: {
    marginLeft: 6,
    fontSize: 15,
    color: "#555",
  },

  price: {
    fontSize: 20,
    color: "#D81A1A",
    fontWeight: "700",
  },

  originalPrice: {
    fontSize: 16,
    color: "#999",
    textDecorationLine: "line-through",
  },

  saleText: {
    marginTop: 8,
    color: "#D81A1A",
    fontSize: 14,
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
  },

  sizeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  sizeBtn: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  sizeText: {
    fontSize: 15,
    color: "#333",
  },

  colorRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 6,
    marginBottom: 20,
  },

  colorDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  selectedDot: {
    borderColor: "#000",
    borderWidth: 2,
  },

  productDetailsRow: {
    marginTop: 18,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f9f9f9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },

  detailsLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  detailsText: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
  },
  heading: { fontSize: 18, fontWeight: "700", marginBottom: 12, padding: 14 },

  reviewCard: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
  },

  reviewBody: { marginTop: 6 },

  seeAllBtn: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
    padding: 10,
  },
  seeAllText: { fontSize: 12, fontWeight: "600" },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 12,
    marginTop: 16,
  },

  footer: {
    flexDirection: "row",
    gap: 12, // use marginRight if older RN
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#FFF",
  },

  button: {
    flex: 1, // ⭐ THIS makes widths equal
    height: 48,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  wishlistBtn: {
    backgroundColor: "#F5F5F5",
  },

  addToBagBtn: {
    backgroundColor: "#111",
  },

  wishlistText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#111",
    marginLeft: 6,
  },

  addToBagText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFF",
    marginLeft: 8,
  },
});
