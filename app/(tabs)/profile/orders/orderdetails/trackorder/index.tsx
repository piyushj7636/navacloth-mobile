import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function TrackScreen() {
  const { courier, statusHistory } = useLocalSearchParams();

  // const parsedStatusHistory = statusHistory
  //   ? JSON.parse(statusHistory as string)
  //   : [];

  let parsedStatusHistory = [];
  try {
    parsedStatusHistory = statusHistory
      ? JSON.parse(statusHistory as string)
      : [];
  } catch (e) {
    console.warn("Invalid statusHistory JSON:", statusHistory);
    parsedStatusHistory = [];
  }

  // const parsedCourier = courier ? JSON.parse(courier as string) : null;

  let parsedCourier = null;
  try {
    parsedCourier = courier ? JSON.parse(courier as string) : null;
  } catch (e) {
    console.warn("Invalid courier JSON:", courier);
    parsedCourier = null;
  }

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={styles.heading}>Live tracking</Text>
      {parsedCourier ? (
        <Text style={styles.small}>
          Courier: {parsedCourier.name} — {parsedCourier.trackingId}
        </Text>
      ) : (
        <Text style={styles.small}>Courier details unavailable</Text>
      )}

      <View style={{ marginTop: 12 }}>
        <Text style={styles.subtle}>Map placeholder</Text>
        <View
          style={{
            height: 220,
            borderRadius: 8,
            backgroundColor: "#eee",
            marginTop: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.small}>
            Map / driver location would appear here.
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 16 }}>
        <Text style={styles.sectionTitle}>Recent events</Text>
        {parsedStatusHistory.length > 0 ? (
          parsedStatusHistory.map((s, i) => (
            <View key={i} style={styles.timelineRow}>
              <View style={styles.timelineDot} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.small}>{s.step}</Text>
                <Text style={styles.subtle}>{s.time}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.subtle}>No tracking history available</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timelineRow: { flexDirection: "row", alignItems: "flex-start", marginTop: 8 },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: "#111",
    marginTop: 6,
  },
  subtle: { color: "#888", fontSize: 12 },
  small: { color: "#555", fontSize: 13, marginTop: 4 },
  sectionTitle: { fontWeight: "700", marginBottom: 8 },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginBottom: 12,
  },
});
