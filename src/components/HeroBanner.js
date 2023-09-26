import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { Colors } from "../assets/Colors";

export default function HeroBanner({ onSearchTextChanged }) {
  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    // Call the callback function to handle text changes
    onSearchTextChanged(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Little lemon</Text>
      <Text style={styles.subtitle}>Benin</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Welcome to our restaurant! We are family owned african restaurant,
          focused on traditional receipes served with a modern twist.
        </Text>
        <Image
          source={require("../images/home-dish.png")}
          style={styles.restaurantImage}
        />
      </View>

      <View style={styles.searchContainer}>
        <Image
          source={require("../images/search-icon.png")}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Search for dishes..."
          value={searchText}
          onChangeText={handleSearchTextChange}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.primary,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primaryAlt,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.white,
    marginTop: 10,
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  description: {
    flex: 1,
    fontSize: 14,
    color: Colors.white,
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 16,
    resizeMode: "contain",
  },
  searchContainer: {
    height: 40,
    flexDirection: "row",
    backgroundColor: Colors.white,
    alignItems: "center",
    marginTop: 16,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  searchBar: {
    flex: 1,
    paddingVertical: 10,
    marginStart: 5,
  },
  searchIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain", // Adjust the image size and position as needed
    margin: 4, // Adjust the margin to position the icon
  },
});
