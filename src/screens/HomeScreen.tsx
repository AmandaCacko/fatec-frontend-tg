import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LogoutButton from "../components/LogoutButton";
import { Colors } from "../constants/Colors"; 

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Home!</Text>
      <LogoutButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors?.light?.background || "#FFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors?.light?.text || "#000",
  },
});

export default HomeScreen;
