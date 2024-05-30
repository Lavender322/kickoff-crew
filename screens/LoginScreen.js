import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import CustomButton from "../components/ui/CustomButton";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setEmailError("");
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError("valid email required");
    } else if (!password) {
      setPasswordError("password required");
    } else {
      try {
        setIsLoading(true);
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } catch (error) {
        alert("Sign in failed: " + error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/images/volleyball1.jpg")}
            style={{ width: "120%" }}
          />
        </View>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Login
        </Text>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          {
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          <TextInput
            value={email}
            style={{ flex: 1 }}
            placeholder="email-address"
            keyboardType="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          {emailError && <Text style={{ color: "red" }}>{emailError}</Text>}
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <AntDesign
            name="lock"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />

          <TextInput
            style={{ flex: 1 }}
            secureTextEntry={true}
            value={password}
            placeholder={"password"}
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
            inputType="password"
          />
          {passwordError && (
            <Text style={{ color: "red", marginRight: 2 }}>
              {passwordError}
            </Text>
          )}
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={{
                color: "#AD40AF",
                fontWeight: "700",
                textAlign: "right",
              }}
            >
              Forgot?
            </Text>
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <CustomButton label={"Login"} onPress={signIn} />
          </>
        )}
        <Text style={{ textAlign: "center", color: "#666", marginBottom: 30 }}>
          Or, Login with ...
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Image
              source={require("../assets/images/google-icon.png")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Image
              source={require("../assets/images/facebook-icon.png")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Image
              source={require("../assets/images/twitter-icon.png")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 80,
          }}
        >
          <Text
            style={{ textAlign: "center", color: "#666", marginBottom: 30 }}
          >
            Don't have an account yet?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegistrationScreen")}
          >
            <Text
              style={{
                color: "#AD40AF",
                fontWeight: "700",
                textAlign: "right",
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
