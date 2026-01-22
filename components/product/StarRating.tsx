import React from "react";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const decimal = rating - fullStars;

  const halfStar =
    decimal >= 0.25 && decimal <= 0.75 ? 1 : 0;

  const extraFullStar = decimal > 0.75 ? 1 : 0;

  const totalFullStars = fullStars + extraFullStar;

  const emptyStars = 5 - totalFullStars - halfStar;

  return (
    <View style={{ flexDirection: "row" }}>
      {/* Full stars */}
      {[...Array(totalFullStars)].map((_, i) => (
        <FontAwesome key={`full-${i}`} name="star" size={20} color="#FFD700" />
      ))}

      {/* Half star */}
      {halfStar === 1 && (
        <FontAwesome name="star-half-full" size={20} color="#FFD700" />
      )}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <FontAwesome key={`empty-${i}`} name="star-o" size={20} color="#FFD700" />
      ))}
    </View>
  );
}
