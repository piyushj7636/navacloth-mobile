import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const FeedbackPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("feedback");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    Alert.alert("Thank you!", "Your response has been submitted.");
    setName("");
    setEmail("");
    setMessage("");
    setCategory("feedback");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>We value your feedback 💬</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Your Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Feedback" value="feedback" />
          <Picker.Item label="Query" value="query" />
          <Picker.Item label="Suggestion" value="suggestion" />
        </Picker>
      </View>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Write your message..."
        multiline
        numberOfLines={5}
        value={message}
        onChangeText={setMessage}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedbackPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  pickerContainer: {
    borderRadius: 10,
    backgroundColor: "#f3f3f3",
    marginBottom: 15,
  },
  picker: {
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
