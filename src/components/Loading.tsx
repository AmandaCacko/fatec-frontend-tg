import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/Colors";

export interface LoadingProps {
  fullScreen?: boolean;
  color?: string;
  size?: "small" | "large";
  message?: string;
  backgroundColor?: string;
}

export const Loading: React.FC<LoadingProps> = ({ 
  fullScreen = true, 
  color = Colors.light.loading, 
  size = "large",
  message,
  backgroundColor = "rgba(255, 255, 255, 0.6)"
}) => {
  const loader = (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );

  if (fullScreen) {
    return (
      <View style={[styles.overlay, { backgroundColor }]}>
        {loader}
      </View>
    );
  }

  return loader;
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 999,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    marginTop: 10,
    color: Colors.light.text,
    fontSize: 16,
  }
});

export default Loading;
