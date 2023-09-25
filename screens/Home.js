import react, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import truncateText, { HorizontalGrayLine } from "../utils/Utils";
import CategoryList from "../components/CategoryList";
import {
  db,
  getMenuItemsByCategories,
  searchDishes,
} from "../helpers/DatabaseHelper";
import HeroBanner from "../components/HeroBanner";

const categories = [
  "Starters",
  "Main",
  "Desserts",
  "Drinks",
  "Spec",
  "Salads",
  "Appetizers",
  "Side Dishes",
  "Cocktails",
  "Snacks",
];

export default function HomeScreen() {
  const [menuData, setMenuData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Callback function to handle category selection/deselection
  const handleCategoryToggle = (updatedCategories) => {
    setSelectedCategories(updatedCategories);
  };

  // Fetch menu items by selected categories when categories change
  useEffect(() => {
    getMenuItemsByCategories(selectedCategories, (menuItems) => {
      setMenuData(menuItems);
    });
  }, [selectedCategories]);

  // Handle search text change
  const handleSearchTextChange = (text) => {
    setSearchText(text);

    // Call searchDishes with the updated search text and selected categories
    searchDishes(text, selectedCategories, (searchResult) => {
      setMenuData(searchResult);
    });
  };

  useEffect(() => {
    // Check if there is data in the database
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM menu",
        [],
        (_, { rows }) => {
          if (rows.length > 0) {
            // If data exists in the database, load it
            const menuItems = rows._array;
            setMenuData(menuItems);
          } else {
            // If no data in the database, fetch from the remote server and store it
            fetchMenuFromServer();
          }
        },
        (_, error) => {
          console.error("Error fetching from database:", error);
        }
      );
    });
  }, []);

  const fetchMenuFromServer = () => {
    fetch(
      "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
    )
      .then((response) => response.json())
      .then((data) => {
        // Store fetched data in the database
        storeMenuInDatabase(data.menu);
        setMenuData(data.menu);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  };

  const storeMenuInDatabase = (menu) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS menu (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, description TEXT, image TEXT, category TEXT)"
      );

      menu.forEach((item) => {
        tx.executeSql(
          "INSERT INTO menu (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)",
          [item.name, item.price, item.description, item.image, item.category],
          (_, result) => {
            console.log("Inserted item:", item.name);
          },
          (_, error) => {
            console.error("Error inserting item:", item.name, error);
          }
        );
      });
    });
  };

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <View style={styles.menuItemInfo}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemDescription}>
          {truncateText(item.description, 50)}
        </Text>
        <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
      </View>

      <Image
        style={styles.menuItemImage}
        source={{
          uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
        }}
      />
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View>
        <HeroBanner onSearchTextChanged={handleSearchTextChange} />
        <Text style={styles.categoryHeader}>Order for delivery!</Text>
        <CategoryList
          categories={categories.sort()}
          onCategoryToggle={handleCategoryToggle}
        />
        <HorizontalGrayLine />
      </View>
      <FlatList
        data={menuData}
        renderItem={renderMenuItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  menuItem: {
    margin: 8,
    padding: 16,
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuItemImage: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  menuItemInfo: {
    flex: 1,
    marginEnd: 15,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  menuItemDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  categoryHeader: {
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#000",
  },
});
