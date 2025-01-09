import React, { useState } from "react";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";

export default function App() {
  const [message, setMessage] = useState(""); // For user input
  const [response, setResponse] = useState(""); // For AI response

  const fetchAIResponse = async () => {
    try {
      const res = await fetch("http://192.168.8.191:5000/data", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (data.success) {
        setResponse(data.data);
      } else {
        setResponse("Error: " + (data.error || "Failed to fetch response."));
      }
    } catch (error) {
      setResponse("Error: Unable to connect to the backend.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the AI Chat App!</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send to AI" onPress={fetchAIResponse} />
      <Text style={styles.response}>{response}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
  },
  response: {
    marginTop: 16,
    fontSize: 18,
    fontStyle: "italic",
  },
});
