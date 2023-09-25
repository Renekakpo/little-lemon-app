import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";

const CustomCheckbox = ({ label, checked, onChange }) => {
  return (
    <View style={styles.container}>
      <Checkbox value={checked} onValueChange={() => onChange(!checked)} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  label: {
    margin: 10,
    color: "#000",
    fontSize: 15,
    fontWeight: "500",
  },
});

export default CustomCheckbox;
