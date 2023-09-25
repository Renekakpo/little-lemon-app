import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // You can use any icon library you prefer

const CircularBackButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Ionicons style={styles.backIcon} name="arrow-back" size={25} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#004030",
    elevation: 3, // For Android shadow
    shadowColor: "black", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginEnd: 10,
  },
  backIcon: {
    color: "white",
  },
});

export default CircularBackButton;
