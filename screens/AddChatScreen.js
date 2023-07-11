import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Button, Input } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialIcons";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
    });
  }, [navigation]);

  const createChat = async () => {
    await addDoc(collection(db, "chats"), {
      chatName: input,
    })
      .then(() => navigation.navigate("Home"))
      .catch((error) => alert(error));
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={(text) => setInput(text)}
        leftIcon={<Icon name="forum" size={24} color="black" />}
      />
      <Button title="Create new Chat" onPress={createChat} />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});
