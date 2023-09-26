import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

const CircularImage = ({ uri, width = 40, height = 40, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.circularImageContainer,
          { width, height, borderRadius: width / 2 },
        ]}
      >
        <Image
          source={uri ? { uri } : require("../images/user_avatar.png")}
          style={styles.circularImage}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circularImageContainer: {
    overflow: "hidden", // Ensure the image stays within the circular container
  },
  circularImage: {
    width: "100%",
    height: "100%",
  },
});

export default CircularImage;
