import * as React from "react";
import { useCallback } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

SplashScreen.preventAutoHideAsync();

function OnboardingScreen({ navigation }) {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Roboto-MediumItalic": require("../assets/fonts/Roboto-MediumItalic.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
      onLayout={onLayoutRootView}
    >
      <View style={{ marginTop: 50 }}>
        <Text
          style={{
            fontFamily: "Inter-Bold",
            fontWeight: "bold",
            fontSize: 30,
            color: "#20315f",
            zIndex: 1,
          }}
        >
          KickOff Crew
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../assets/images/basketball.jpg")}
          style={{ left: -48, bottom: 10 }}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#AD40AF",
          padding: 20,
          width: "90%",
          borderRadius: 10,
          marginBottom: 50,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: "Roboto-MediumItalic",
          }}
        >
          Let's Team Up ...
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default OnboardingScreen;
