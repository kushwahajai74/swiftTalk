import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView } from "react-native";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialIcons";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const signOutUser = () => {
    signOut(auth).then(() => {
      navigation.replace("Login");
    });
  };

  useLayoutEffect(() => {
    const q = query(collection(db, "chats"));
    onSnapshot(q, (querySnapshot) => {
      const chatsArr = [];
      querySnapshot.forEach((doc) => {
        chatsArr.push({ id: doc.id, data: doc.data() });
      });
      setChats(chatsArr);
    });
    console.log("wasting");
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View>
          <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
            <Avatar
              rounded
              size={40}
              source={{
                uri: auth?.currentUser?.photoURL,
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            // width: 80,
            gap: 12,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <Icon name="photo-camera" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("AddChat")}
          >
            <Icon name="edit" size={24} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", { id, chatName });
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats?.map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "100%",
    // backgroundColor: "red",
  },
});

export default HomeScreen;
