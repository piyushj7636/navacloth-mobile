import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function HelpSupport() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [botMessages, setBotMessages] = useState([
    { from: "bot", text: "Hi there! 👋 How can I help you today?" },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSend = () => {
    if (!userInput.trim()) return;

    // Add user message
    setBotMessages((prev) => [...prev, { from: "user", text: userInput }]);

    // Mock AI reply (replace with API later)
    setTimeout(() => {
      const reply = generateAIReply(userInput);
      setBotMessages((prev) => [...prev, { from: "bot", text: reply }]);
    }, 600);

    setUserInput("");
  };

  const generateAIReply = (input: string) => {
    const lower = input.toLowerCase();
    if (lower.includes("order"))
      return "You can check your order status under the 'My Orders' section.";
    if (lower.includes("refund"))
      return "Refunds are processed within 5–7 business days.";
    if (lower.includes("account"))
      return "You can update your account details in Profile → Edit Profile.";
    if (lower.includes("human") || lower.includes("agent"))
      return "Sure! Connecting you to a human representative… (feature coming soon 🤖)";
    return "I’m not sure about that, but our support team can help you further.";
  };

  const helpTopics = [
    { title: "Orders & Returns", desc: "Track, cancel or return your orders." },
    { title: "Payments & Refunds", desc: "Help with payments, refunds or billing." },
    { title: "Account & Login", desc: "Fix login or profile issues." },
    { title: "App Issues", desc: "Report bugs or technical problems." },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.heading}>Help & Support</Text>
      <Text style={styles.subtext}>
        Need assistance? We’re here to help you with anything related to your account, orders, or app experience.
      </Text>

      {/* Quick Help Topics */}
      <View style={styles.section}>
        <Text style={styles.subheading}>Quick Help Topics</Text>
        {helpTopics.map((item) => (
          <View key={item.title} style={styles.topicCard}>
            <View>
              <Text style={styles.topicTitle}>{item.title}</Text>
              <Text style={styles.topicDesc}>{item.desc}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#555" />
          </View>
        ))}
      </View>

      {/* Contact Options */}
      <View style={styles.section}>
        <Text style={styles.subheading}>Contact Options</Text>
        <Button
          icon="email-outline"
          mode="contained"
          style={styles.button}
          onPress={() => console.log("Email Support")}
        >
          Email Support
        </Button>
        <Button
          icon="chat-outline"
          mode="outlined"
          style={styles.button}
          onPress={() => console.log("Chat Support")}
        >
          Live Chat
        </Button>
        <Button
          icon="phone-outline"
          mode="outlined"
          style={styles.button}
          onPress={() => console.log("Call Support")}
        >
          Call Support
        </Button>
      </View>

      {/* Feedback */}
      <View style={styles.section}>
        <Text style={styles.subheading}>Feedback</Text>
        <Text style={styles.smallText}>
          Have a suggestion or issue? Let us know.
        </Text>
        <Button
          mode="contained-tonal"
          onPress={() => router.push("/profile/support/feedback")}
        >
          Submit Feedback
        </Button>
      </View>

      {/* AI Chat Assistant */}
      <View style={styles.section}>
        <Text style={styles.subheading}>Ask Our AI Assistant 🤖</Text>

        <View style={styles.chatContainer}>
          <ScrollView style={styles.chatBox}>
            {botMessages.map((msg, index) => (
              <View
                key={index}
                style={[
                  styles.chatBubble,
                  msg.from === "user"
                    ? styles.userBubble
                    : styles.botBubble,
                ]}
              >
                <Text
                  style={{
                    color: msg.from === "user" ? "#fff" : "#000",
                    fontSize: 15,
                  }}
                >
                  {msg.text}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.chatInputContainer}>
            <TextInput
              value={userInput}
              onChangeText={setUserInput}
              placeholder="Type your question..."
              style={styles.chatInput}
            />
            <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
              <Ionicons name="send" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Legal Links */}
      <View style={[styles.section, { marginBottom: 40 }]}>
        <Text style={styles.subheading}>Legal</Text>
        <TouchableOpacity>
          <Text style={styles.link}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.link}>Terms of Service</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  heading: { fontSize: 26, fontWeight: "bold", marginBottom: 6 },
  subtext: { fontSize: 15, color: "#555", marginBottom: 20 },
  section: { marginBottom: 28 },
  subheading: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  topicCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  topicTitle: { fontSize: 16, fontWeight: "500" },
  topicDesc: { fontSize: 13, color: "#666" },
  button: { marginVertical: 6 },
  smallText: { fontSize: 14, color: "#666", marginBottom: 10 },
  chatContainer: {
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    padding: 10,
  },
  chatBox: {
    maxHeight: 220,
    marginBottom: 8,
  },
  chatBubble: {
    marginVertical: 4,
    padding: 10,
    borderRadius: 10,
    maxWidth: "85%",
  },
  userBubble: {
    backgroundColor: "#007bff",
    alignSelf: "flex-end",
  },
  botBubble: {
    backgroundColor: "#e0e0e0",
    alignSelf: "flex-start",
  },
  chatInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  chatInput: { flex: 1, fontSize: 15, paddingVertical: 8 },
  sendButton: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    padding: 8,
    marginLeft: 6,
  },
  link: {
    fontSize: 15,
    color: "#007bff",
    marginBottom: 6,
  },
});
