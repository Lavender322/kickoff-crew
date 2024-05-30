import { useEffect, useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";

function LocationInput({ selectedLocation, setSelectedLocation, isCategory }) {
  const [enteredText, setEnteredText] = useState(selectedLocation);

  function textInputHandler(enteredText) {
    setEnteredText(enteredText);
    setSelectedLocation(enteredText);
  }

  return (
    <View style={[styles.container, !isCategory && styles.paddingTop]}>
      <TextInput
        style={styles.textInput}
        maxLength={30}
        placeholder="Please Enter"
        placeholderTextColor="#6A6A6A"
        onChangeText={textInputHandler}
        value={enteredText}
      />
    </View>
  );
}

export default LocationInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F2F2",
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  paddingTop: {
    paddingTop: 24,
  },
  textInput: {
    borderColor: "#0000001A",
    borderWidth: 1,
    borderRadius: 6,
    padding: 9,
    color: "#1A1A1A",
    backgroundColor: "white",
    fontSize: 15,
    fontFamily: "roboto",
  },
});
