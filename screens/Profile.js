import { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CircularImage from "../components/CircularImage";
import CustomTextField from "../components/CustomTextField";
import CustomCheckbox from "../components/CustomCheckbox";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../components/CustomButton";

export default function ProfileScreen({ navigation }) {
  const [isOrderStatusesChecked, setIsOrderStatusesChecked] = useState(false);
  const [isPasswordChangesChecked, setIsPasswordChangesChecked] =
    useState(false);
  const [isSpecialOffersChecked, setIsSpecialOffersChecked] = useState(false);
  const [isNewsletterChecked, setIsNewsletterChecked] = useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    emailNotifications: {
      orderStatuses: false,
      passwordChanges: false,
      specialOffers: false,
      newsletter: false,
    },
    profileImage: null,
  });

  // Add a state variable for the profile image
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    // Fetch user data from AsyncStorage when the Profile screen mounts
    const fetchUserData = async () => {
      try {
        const userDataFromStorage = await AsyncStorage.getItem("userData");
        if (userDataFromStorage) {
          // Parse the stored JSON data
          const parsedUserData = JSON.parse(userDataFromStorage);
          setUserData(parsedUserData);

          // Initialize form fields values
          setFirstName(parsedUserData.firstName);
          setLastName(parsedUserData.lastName);
          setEmail(parsedUserData.email);
          setPhoneNumber(parsedUserData.phoneNumber);

          if (parsedUserData.emailNotifications) {
            // Initialize checkboxes values
            handleOrderStatusesChange(
              parsedUserData.emailNotifications.orderStatuses
            );
            handlePasswordChangesChange(
              parsedUserData.emailNotifications.passwordChanges
            );
            handleSpecialOffersChange(
              parsedUserData.emailNotifications.specialOffers
            );
            handleNewsletterChange(
              parsedUserData.emailNotifications.newsletter
            );
          }
        }
      } catch (error) {
        console.error("Error reading user data from AsyncStorage:", error);
      }
    };

    fetchUserData();
  }, []);

  // Function to clear all data in AsyncStorage
  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage data cleared successfully.");

      // Navigate to the Onboarding screen or any other screen you want
      navigation.push("Onboarding");
    } catch (error) {
      console.error("Error clearing AsyncStorage data:", error);
    }
  };

  const handleChangeButtonPress = () => {
    pickProfileImage();
  };

  const handleRemoveButtonPress = () => {
    setProfileImage(null);
  };

  const handleDiscardChangesBtnPress = () => {
    // Reset form fields to their original values from 'userData'
    setFirstName(userData.firstName);
    setLastName(userData.lastName);
    setEmail(userData.email);
    setPhoneNumber(userData.phoneNumber);

    // Reset the checkboxes values
    setIsOrderStatusesChecked(userData.emailNotifications.orderStatuses);
    setIsPasswordChangesChecked(userData.emailNotifications.passwordChanges);
    setIsSpecialOffersChecked(userData.emailNotifications.specialOffers);
    setIsNewsletterChecked(userData.emailNotifications.newsletter);

    // Clear profileImage if no changes were saved
    if (!profileImage) {
      setProfileImage(null);
    }
  };

  const handleSaveChangesButtonPress = async () => {
    try {
      // Create a new object with all the updated user data
      const updatedUserData = {
        ...userData,
        firstName,
        lastName,
        email,
        phoneNumber,
        emailNotifications: {
          ...userData.emailNotifications,
          orderStatuses: isOrderStatusesChecked,
          passwordChanges: isPasswordChangesChecked,
          specialOffers: isSpecialOffersChecked,
          newsletter: isNewsletterChecked,
        },
        profileImage: profileImage,
      };

      // Save 'userData' to AsyncStorage
      const jsonData = JSON.stringify(updatedUserData);
      await AsyncStorage.setItem("userData", jsonData);

      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleOrderStatusesChange = (value) => {
    setIsOrderStatusesChecked(value);
  };

  const handlePasswordChangesChange = (value) => {
    setIsPasswordChangesChecked(value);
  };

  const handleSpecialOffersChange = (value) => {
    setIsSpecialOffersChecked(value);
  };

  const handleNewsletterChange = (value) => {
    setIsNewsletterChecked(value);
  };

  const handleLogoutButtonPress = async () => {
    clearAllData();
  };

  const pickProfileImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        // Set the selected image URI to the profileImage state
        setProfileImage(result.uri);
      }
    } catch (error) {
      console.error("Error picking profile image:", error);
    }
  };

  // Function to render the profile image or initials as a placeholder
  const renderProfileImage = () => {
    if (profileImage) {
      return <CircularImage source={profileImage} width={70} height={70} />;
    } else {
      // Generate user initials
      const initials = `${userData.firstName[0]}${
        typeof userData.lastName !== "undefined" ? userData.lastName[0] : ""
      }`.toUpperCase();

      return (
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: "lightgray",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, color: "black" }}>{initials}</Text>
        </View>
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Personal information</Text>

      {/* SubHeader */}
      <Text style={styles.subHeader}>Avatar</Text>

      {/* User profil picture section */}
      <View style={styles.topRowContainer}>
        {renderProfileImage()}
        <CustomButton
          text={"Change"}
          onPress={handleChangeButtonPress}
          buttonStyle={styles.changePhotoButton}
          textStyle={styles.changePhotoButtonText}
        />
        <CustomButton
          text={"Remove"}
          onPress={handleRemoveButtonPress}
          buttonStyle={styles.removePhotoButton}
          textStyle={[styles.changePhotoButtonText, { color: "#000" }]}
        />
      </View>

      {/* Fields section */}
      <View style={styles.fieldsContainer}>
        <CustomTextField
          label={"First name"}
          placeholder={"Enter your first name here."}
          onChangeTextCallback={(input) => {
            setFirstName(input);
          }}
          // Pass the 'firstName' value from 'userData' as the initial value
          value={firstName}
        />
        <CustomTextField
          label={"Last name"}
          placeholder={"Enter your last name here."}
          onChangeTextCallback={(lastName) => {
            setLastName(lastName);
          }}
          // Pass the 'lastName' value from 'userData' as the initial value
          value={lastName}
        />
        <CustomTextField
          label={"Email"}
          placeholder={"Enter your email here."}
          onChangeTextCallback={(email) => {
            setEmail(email);
          }}
          // Pass the 'email' value from 'userData' as the initial value
          value={email}
        />
        <CustomTextField
          label={"Phone number"}
          placeholder={"Ex: (000)00-00-00-00"}
          onChangeTextCallback={(text) => {
            // setPhoneNumber(text);
            // Define a regular expression pattern for a valid USA phone number
            const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;

            // Check if the input text matches the pattern
            const isValid = phonePattern.test(text);

            // Update the phone number validity state
            setIsPhoneNumberValid(isValid);

            // Set the phone number value if it's valid or an empty string otherwise
            setPhoneNumber(isValid ? text : "");
          }}
          // Pass the 'phoneNumber' value from 'userData' as the initial value
          value={phoneNumber}
          error={!isPhoneNumberValid}
          errorMessage="Invalid phone number. Please use the format (000) 000-0000."
          inputType="numeric"
        />
      </View>

      {/* Checkbox section */}
      <View style={styles.checkboxesContainer}>
        <Text style={styles.checkHeader}>Email notifications</Text>
        <CustomCheckbox
          label={"Order statuses"}
          checked={isOrderStatusesChecked}
          onChange={handleOrderStatusesChange}
        />
        <CustomCheckbox
          label={"Password changes"}
          checked={isPasswordChangesChecked}
          onChange={handlePasswordChangesChange}
        />
        <CustomCheckbox
          label={"Special offers"}
          checked={isSpecialOffersChecked}
          onChange={handleSpecialOffersChange}
        />
        <CustomCheckbox
          label={"Newsletter"}
          checked={isNewsletterChecked}
          onChange={handleNewsletterChange}
        />
      </View>

      {/* Logout button */}
      <CustomButton
        text={"Log out"}
        onPress={handleLogoutButtonPress}
        buttonStyle={styles.logoutButton}
        textStyle={styles.logoutButtonText}
      />

      {/* Footer section */}
      <View style={styles.footerContainer}>
        <CustomButton
          text={"Discard changes"}
          onPress={handleDiscardChangesBtnPress}
          buttonStyle={styles.discardChangesBtn}
          textStyle={styles.discardChangesBtnText}
        />
        <CustomButton
          text={"Save changes"}
          onPress={handleSaveChangesButtonPress}
          buttonStyle={styles.saveChangesButton}
          textStyle={styles.saveChangesButtonText}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  subHeader: {
    color: "gray",
    fontSize: 14,
    marginTop: 15,
  },
  topRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  changePhotoButton: {
    height: 50,
    backgroundColor: "#004030",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginStart: 25,
  },
  changePhotoButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    paddingStart: 20,
    paddingEnd: 20,
  },
  removePhotoButton: {
    height: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 2,
    marginStart: 25,
  },
  fieldsContainer: {
    flexDirection: "column",
  },
  footerContainer: {
    flexDirection: "row",
    marginTop: 35,
    marginBottom: 25,
  },
  discardChangesBtn: {
    height: 45,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 2,
    marginEnd: 10,
  },
  discardChangesBtnText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    paddingStart: 20,
    paddingEnd: 20,
  },
  saveChangesButton: {
    height: 45,
    backgroundColor: "#004030",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginStart: 10,
  },
  saveChangesButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    paddingStart: 20,
    paddingEnd: 20,
  },
  checkboxesContainer: {
    marginTop: 25,
  },
  checkHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  logoutButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    backgroundColor: "#FFC400",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#FFAB00",
    marginTop: 35,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
