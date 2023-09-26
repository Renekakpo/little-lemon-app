import { useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import CustomTextField from "../components/CustomTextField";
import CustomButton from "../components/CustomButton";
import { Colors } from "../assets/Colors";

export default function OnboardingScreen() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigation = useNavigation();

  const markOnboardingAsComplete = async () => {
    try {
      // Mark onboarding as completed in AsyncStorage and save user input
      await AsyncStorage.setItem("onboardingCompleted", "true");

      const userData = {
        firstName: firstName,
        email: email,
      };

      await AsyncStorage.setItem("userData", JSON.stringify(userData));

      navigation.navigate("Home");
    } catch (error) {
      console.error("Error marking onboarding as complete:", error);
    }
  };

  // Function to validate the first name
  const validateFirstName = () => {
    if (firstName.trim() === "") {
      setFirstNameError("First name is required");
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      setFirstNameError("First name should contain only letters");
    } else {
      setFirstNameError("");
    }
  };

  // Function to validate the email address
  const validateEmail = () => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailPattern.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  // Function to check if the button should be disabled
  const isButtonDisabled = () => {
    return (
      firstName.trim() === "" ||
      email.trim() === "" ||
      !!firstNameError ||
      !!emailError
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../images/little-lemon.png")}
        />
        <Text style={styles.headerText}>Little Lemon</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.bodyText}>Let us get to know you</Text>
        <View style={styles.inputsContainer}>
          <CustomTextField
            label={"First Name"}
            containerStyle={styles.inputContainerStyle}
            labelStyle={styles.labelStyle}
            textInputStyle={styles.input}
            placeholder={"Your first name here."}
            onChangeTextCallback={(text) => setFirstName(text)}
            value={""}
            onBlur={validateFirstName}
          />
          {firstNameError ? (
            <Text style={styles.error}>{firstNameError}</Text>
          ) : null}
          <CustomTextField
            label={"Email"}
            containerStyle={styles.inputContainerStyle}
            labelStyle={styles.labelStyle}
            textInputStyle={styles.input}
            placeholder={"Your email here."}
            onChangeTextCallback={(text) => setEmail(text)}
            value={""}
            onBlur={validateEmail}
          />
          {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
        </View>
      </View>

      <View style={styles.footer}>
        <CustomButton
          text={"Next"}
          onPress={markOnboardingAsComplete}
          buttonStyle={[
            styles.button,
            isButtonDisabled() ? styles.disabledButton : null,
          ]}
          textStyle={styles.buttonText}
          disabled={isButtonDisabled()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  body: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 45,
  },
  footer: {
    flex: 0.3,
    alignItems: "flex-end",
    justifyContent: "center",
    padding: 15,
  },
  logo: {
    width: 30,
    height: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginStart: 15,
    textTransform: "uppercase",
    letterSpacing: 3,
  },
  bodyText: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 25,
    color: "#fff",
  },
  inputsContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 25,
  },
  input: {
    width: 200,
    height: 45,
    borderColor: Colors.gray,
    borderWidth: 2,
    borderRadius: 8,
  },
  error: {
    color: Colors.secondary,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.primaryAlt,
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.dark,
    fontSize: 18,
    fontWeight: "bold",
    paddingStart: 30,
    paddingEnd: 30,
  },
  disabledButton: {
    backgroundColor: Colors.light,
    borderRadius: 8,
  },
  labelStyle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainerStyle: {
    paddingTop: 0,
    alignItems: "center",
  },
});
