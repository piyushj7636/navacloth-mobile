import { View, Text, StyleSheet } from 'react-native';

export default function PriceTag({ price, discount }: { price: number; discount?: number }) {
  const discountedPrice = discount ? price - (price * discount) / 100 : price;

  return (
    <View style={styles.container}>
      <Text style={styles.price}>₹{discountedPrice.toFixed(0)}</Text>
      {discount && (
        <>
          <Text style={styles.original}>₹{price}</Text>
          <Text style={styles.discount}>{discount}% OFF</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  price: { fontSize: 20, fontWeight: 'bold', color: '#222' },
  original: { textDecorationLine: 'line-through', color: '#888' },
  discount: { color: '#e53935', fontWeight: '600' },
});