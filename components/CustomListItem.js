import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Avatar, ListItem } from "@rneui/themed";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useLayoutEffect(() => {
    const q = query(
      collection(db, "chats", id, "messages"),
      orderBy("timestamp", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      const messageArr = [];
      querySnapshot.forEach((doc) => {
        messageArr.push(doc.data());
      });
      setChatMessages(messageArr);
    });
    console.log("wasting");
  }, []);
  return (
    <ListItem key={id} onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoURL ||
            "https://i.stack.imgur.com/SE2cv.jpg",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
