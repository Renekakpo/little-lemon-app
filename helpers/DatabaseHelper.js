import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon.db");

// Create the 'menu' table if it doesn't exist
db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS menu (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, description TEXT, image TEXT, category TEXT)"
  );
});

export { db };

// Function to get menu items filtered by selected categories
export const getMenuItemsByCategories = (selectedCategories, callback) => {
  db.transaction((tx) => {
    let query = "SELECT * FROM menu";

    if (selectedCategories && selectedCategories.length > 0) {
      const categoriesInCondition = selectedCategories
        .map((category) => `'${category.toLowerCase()}'`)
        .join(",");
      query += ` WHERE category IN (${categoriesInCondition})`;
    } else {
      console.log("SelectedCategories is empty");
    }

    tx.executeSql(
      query,
      [],
      (_, { rows }) => {
        const menuItems = rows._array;
        callback(menuItems);
      },
      (_, error) => {
        console.error("Error fetching menu items by categories:", error);
        callback([]);
      }
    );
  });
};

export const searchDishes = (text, selectedCategories, callback) => {
  // Define a debounce delay (e.g., 500ms)
  const debounceDelay = 500;
  let debounceTimer;

  // Clear any previous timers
  clearTimeout(debounceTimer);

  // Start a new timer to execute the query after debounceDelay
  debounceTimer = setTimeout(() => {
    const categoryCondition =
      selectedCategories.length > 0
        ? `AND category IN (${selectedCategories
            .map((category) => `'${category}'`)
            .join(",")})`
        : "";

    const query = `
      SELECT * FROM menu
      WHERE name LIKE ? ${categoryCondition}
    `;

    const searchText = `%${text}%`;

    db.transaction((tx) => {
      tx.executeSql(
        query,
        [searchText],
        (_, { rows }) => {
          const dishes = rows._array;
          callback(dishes);
        },
        (_, error) => {
          console.error("Error searching dishes:", error);
          callback([]);
        }
      );
    });
  }, debounceDelay);
};
