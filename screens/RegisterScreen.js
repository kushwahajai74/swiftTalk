import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, Input, Text } from "@rneui/themed";
import { useState } from "react";
import { useLayoutEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to login",
    });
  });

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).catch((err) =>
        console.log(err)
      );
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: imageUrl || "https://i.stack.imgur.com/SE2cv.jpg",
      }).catch((err) => alert(err.message));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Swift Talk Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Profile Picture URL (optional)"
          type="text"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        onPress={register}
        containerStyle={styles.button}
        raised
        title="Register"
      />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
