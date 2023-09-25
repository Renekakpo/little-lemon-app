import react, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import OnboardingScreen from "./screens/Onboarding";
import ProfileScreen from "./screens/Profile"; // Import the Profile screen
import HomeScreen from "./screens/Home";
import SplashScreen from "./screens/SplashScreen";
import CircularBackButton from "./components/CircularBackButotn";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CircularImage from "./components/CircularImage";
import CustomTopBar from "./components/CustomTopBar";

const Stack = createNativeStackNavigator();

export default function App() {
  const [onboardingCompleted, setOnboardingCompleted] = useState(null);

  useEffect(() => {
    // Check AsyncStorage for onboarding completion status
    const checkOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem("onboardingCompleted");
        if (value !== null) {
          setOnboardingCompleted(true);
        } else {
          setOnboardingCompleted(false);
        }
      } catch (error) {
        console.error("Error reading onboarding status:", error);
        setOnboardingCompleted(false);
      }
    };

    // Simulate a delay using setTimeout
    const delay = 2000; // Adjust the delay time as needed (2 seconds in this example)
    const timer = setTimeout(() => {
      checkOnboardingStatus();
    }, delay);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (onboardingCompleted === null) {
    // Display SplashScreen while loading from AsyncStorage
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={onboardingCompleted ? "Home" : "Onboarding"}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerStyle: {
              alignItems: "center",
              justifyContent: "center",
            },
            headerRight: () => (
              <CircularImage onPress={() => navigation.navigate("Profile")} />
            ),
            headerTitle: (props) => <CustomTopBar />,
            headerTitleAlign: "center",
            headerBackVisible: false,
          })}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={({ navigation }) => ({
            headerStyle: {
              alignItems: "center",
              justifyContent: "center",
            },
            headerLeft: () => (
              <CircularBackButton onPress={() => navigation.goBack()} />
            ),
            headerRight: () => <CircularImage />,
            headerTitle: (props) => <CustomTopBar />,
            headerTitleAlign: "center",
            headerBackVisible: false,
          })}
        />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={({ navigation }) => ({ headerShown: false })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
