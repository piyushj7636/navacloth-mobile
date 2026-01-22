import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

const SupportScreen = ({ route }) => {
  const [messages, setMessages] = useState([
    { id: 1, from: "agent", text: "Hi — how can we help you with your order?" },
  ]);
  const [text, setText] = useState("");
  const orderId = route.params?.orderId;

  const send = () => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), from: "user", text };
    setMessages((m) => [...m, userMsg]);
    setText("");
    // fake AI / support reply
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          from: "agent",
          text: `Thanks — we received your message about ${
            orderId || "your order"
          }. Our team will respond shortly.`,
        },
      ]);
    }, 800);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        keyExtractor={(i) => String(i.id)}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.chatBubble,
              item.from === "user" ? styles.chatUser : styles.chatAgent,
            ]}
          >
            <Text
              style={
                item.from === "user"
                  ? styles.chatUserText
                  : styles.chatAgentText
              }
            >
              {item.text}
            </Text>
          </View>
        )}
      />

      <View
        style={{
          flexDirection: "row",
          padding: 8,
          borderTopWidth: 1,
          borderTopColor: "#eee",
        }}
      >
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type your message"
          style={{
            flex: 1,
            padding: 8,
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 6,
          }}
        />
        <TouchableOpacity
          style={[
            styles.primaryBtn,
            { marginLeft: 8, paddingHorizontal: 12, justifyContent: "center" },
          ]}
          onPress={send}
        >
          <Text style={styles.primaryBtnText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  chatBubble: {
    padding: 10,
    marginVertical: 6,
    borderRadius: 8,
    maxWidth: "80%",
  },
  chatUser: { alignSelf: "flex-end", backgroundColor: "#111" },
  chatAgent: { alignSelf: "flex-start", backgroundColor: "#f2f2f2" },
  chatUserText: { color: "#fff" },
  chatAgentText: { color: "#111" },
  primaryBtn: {
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontWeight: "700" },
});
