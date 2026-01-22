import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ChatBubbleProps {
  message: string;
  isUser?: boolean; // true if it's the user's message
}

export default function ChatBubble({ message, isUser = false }: ChatBubbleProps) {
  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.botContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.botBubble,
        ]}
      >
        <Text style={isUser ? styles.userText : styles.botText}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 4,
    paddingHorizontal: 8,
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  botContainer: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#1e90ff',
    borderTopRightRadius: 0,
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#e9ecef',
    borderTopLeftRadius: 0,
    alignSelf: 'flex-start',
  },
  userText: {
    color: '#fff',
    fontSize: 15,
  },
  botText: {
    color: '#111',
    fontSize: 15,
  },
});
