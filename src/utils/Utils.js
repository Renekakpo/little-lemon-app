import react from "react";
import { View } from "react-native";

// Function to truncate text and add ellipsis
export default truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + "...";
  }
  return text;
};

export const HorizontalGrayLine = () => (
  <View
    style={{
      borderBottomColor: "lightgray",
      borderBottomWidth: 1,
      width: "100%", // Adjust the width as needed
    }}
  />
);

export const validatePhoneNumber = (phoneNumber) => {
  const phoneNumberPattern = /^\(\d{3}\) \d{2}-\d{2}-\d{2}-\d{2}$/;
  if (!phoneNumberPattern.test(phoneNumber)) {
    setPhoneNumberError("Invalid phone number format");
  } else {
    setPhoneNumberError("");
  }
};
