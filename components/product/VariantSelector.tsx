import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Variant = {
  size: string;
  color: string;
  stock: number;
};

export default function VariantSelector({ variants }: { variants: Variant[] }) {
  const sizes = Array.from(new Set(variants.map(v => v.size)));
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const colorsForSize = selectedSize
    ? variants.filter(v => v.size === selectedSize).map(v => v.color)
    : [];

  const selectedVariant = variants.find(
    v => v.size === selectedSize && v.color === selectedColor
  );

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.label}>Select Size</Text>
      <View style={styles.row}>
        {sizes.map(size => (
          <TouchableOpacity
            key={size}
            onPress={() => {
              setSelectedSize(size);
              setSelectedColor(null); // reset color when size changes
            }}
            style={[
              styles.option,
              selectedSize === size && styles.selectedOption,
            ]}
          >
            <Text style={styles.optionText}>{size}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedSize && (
        <>
          <Text style={[styles.label, { marginTop: 16 }]}>Select Color</Text>
          <View style={styles.row}>
            {colorsForSize.map(color => (
              <TouchableOpacity
                key={color}
                onPress={() => setSelectedColor(color)}
                style={[
                  styles.option,
                  selectedColor === color && styles.selectedOption,
                ]}
              >
                <Text style={styles.optionText}>{color}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {selectedVariant && (
        <Text style={styles.stock}>
          In Stock: {selectedVariant.stock}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontWeight: '600', fontSize: 16, marginBottom: 8 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedOption: {
    borderColor: '#6562ff',
    backgroundColor: '#f0f0ff',
  },
  optionText: { fontWeight: '500' },
  stock: { marginTop: 12, fontSize: 14, color: '#444' },
});