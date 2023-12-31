import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Colors } from "../assets/Colors";

const CategoryList = ({ categories, onCategoryToggle }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Function to toggle category selection
  const toggleCategory = (category) => {
    let updatedCategories;
    if (selectedCategories.includes(category)) {
      updatedCategories = selectedCategories.filter((c) => c !== category);
    } else {
      updatedCategories = [...selectedCategories, category];
    }

    setSelectedCategories(updatedCategories);

    // Call the callback function with the updated selected categories
    onCategoryToggle(updatedCategories);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.categoryButton,
            selectedCategories.includes(category) && styles.selectedCategory,
          ]}
          onPress={() => toggleCategory(category)}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategories.includes(category) && styles.selectedText,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  categoryButton: {
    backgroundColor: Colors.light,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    color: Colors.dark,
    fontWeight: "bold",
  },
  selectedText: {
    color: Colors.white,
  },
});

export default CategoryList;
