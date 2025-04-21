import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
const Input = (props: TextInputProps) => {
  return <TextInput style={styles.input} placeholderTextColor="#888" {...props} />;
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 250,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: "#FFFFFF"
    },
});

export default Input;