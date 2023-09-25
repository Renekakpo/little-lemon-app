import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const CustomTextField = ({
  label,
  placeholder,
  onChangeTextCallback,
  value,
  containerStyle = {},
  labelStyle = {},
  textInputStyle = {},
  onBlur = () => {},
  error = false,
  errorMessage = "",
  inputType = "text",
}) => {
  const [userInput, setUserInput] = useState(`${value}`);

  useEffect(() => {
    setUserInput(value);
  }, [value]);

  const handleTextChange = (inputText) => {
    setUserInput(inputText);
    onChangeTextCallback(inputText);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          textInputStyle,
          error && styles.inputError,
          inputType === "numeric" && styles.inputNumeric,
        ]}
        placeholder={placeholder}
        onChangeText={handleTextChange}
        value={userInput}
        onBlur={onBlur}
        keyboardType={inputType === "numeric" ? "numeric" : "default"}
      />
      {error && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
  },
  label: {
    marginBottom: 10,
  },
  input: {
    height: 45,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
  },
  inputError: {
    borderColor: "#FF0000",
    borderWidth: 2,
  },
  errorMessage: {
    color: "#FF0000",
    fontSize: 15,
    marginTop: 5,
  },
  inputNumeric: {
    // Modify the style for numeric input
    borderWidth: 2,
    borderColor: "#004030",
  },
});

export default CustomTextField;
