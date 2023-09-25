import react from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function CustomTopBar() {
  return (
    <View style={styles.headerTitleContainer}>
      <Image
        style={styles.headerLogo}
        source={require("../images/little-lemon.png")}
      />
      <Text style={styles.headerTitleText}>Little Lemon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  headerLogo: {
    width: 24,
    height: 24,
    marginRight: 8,
    resizeMode: "contain",
  },
  headerTitleText: {
    fontSize: 16,
    fontWeight: "bold",
    marginStart: 10,
    textTransform: "uppercase",
    letterSpacing: 3,
  },
});
