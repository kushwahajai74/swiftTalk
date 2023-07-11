import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Avatar, Icon } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri:
                messages[0]?.data.photoURL ||
                "https://i.stack.imgur.com/SE2cv.jpg",
            }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: 700 }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <TouchableOpacity>
            <Icon name="videocam" color="white" size={25} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="phone" color="white" size={25} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);

  const sendMessage = async () => {
    Keyboard.dismiss();

    const docData = {
      timestamp: serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    };
    await addDoc(collection(db, "chats", route.params.id, "messages"), docData);

    setInput("");
    // collection("cahts").
  };

  useLayoutEffect(() => {
    const q = query(
      collection(db, "chats", route.params.id, "messages"),
      orderBy("timestamp", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      const messageArr = [];
      querySnapshot.forEach((doc) => {
        messageArr.push({ id: doc.id, data: doc.data() });
      });
      setMessages(messageArr);
    });
    console.log("wastage");
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <>
          <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
            {messages.map(({ id, data }) =>
              data.email === auth.currentUser.email ? (
                <View key={id} style={styles.receiver}>
                  <Avatar
                    position="absolute"
                    bottom={-15}
                    right={-15}
                    rounded
                    //WEB
                    containerStyle={{
                      position: "absolute",
                      bottom: -15,
                      right: -5,
                    }}
                    size={30}
                    source={{ uri: data.photoURL }}
                  />
                  <Text style={styles.recieverText}>{data.message}</Text>
                </View>
              ) : (
                <View key={id} style={styles.sender}>
                  <Avatar
                    position="absolute"
                    bottom={-15}
                    left={-15}
                    rounded
                    //WEB
                    containerStyle={{
                      position: "absolute",
                      bottom: -15,
                      left: -5,
                    }}
                    size={30}
                    source={{
                      uri: data.photoURL,
                    }}
                  />
                  <Text style={styles.senderText}>{data.message}</Text>
                  <Text style={styles.senderName}>{data.displayName}</Text>
                </View>
              )
            )}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput
              style={styles.textInput}
              placeholder="Message"
              value={input}
              onChangeText={(text) => setInput(text)}
            />
            <TouchableOpacity activeOpacity={0.5}>
              <Icon
                name="send"
                size={25}
                color="#2B6BE6"
                onPress={sendMessage}
              />
            </TouchableOpacity>
          </View>
        </>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "100%",
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "gray",
    borderRadius: 30,
  },
  receiver: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#286BE6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  recieverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
});
