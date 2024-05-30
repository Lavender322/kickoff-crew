import { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../store/context/auth-context";
import LoginButton from "../components/LoginButton";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { authenticateUser, fetchUserInfo } from "../utils/http";

function LandingScreen({ navigation, route }) {
  const state = route.params?.state;
  const code = route.params?.code;

  const [isFetching, setIsFetching] = useState(false);

  const { setTempToken, tempToken, setUserInfo, authenticate } =
    useContext(AuthContext);
  // const { setTempToken, setUserInfo, authenticate } = useContext(AuthContext);
  // const tempToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';

  useEffect(() => {
    if (state && code) {
      async function login() {
        setIsFetching(true);
        try {
          const token = await authenticateUser(state, code);
          setTempToken(token);
        } catch (error) {
          console.log("authenticateUser", error);
          console.log(error.response.data);
          setIsFetching(false);
        }
      }

      login();
    }
  }, [state, code]);

  useEffect(() => {
    if (tempToken) {
      async function getUserInfo() {
        setIsFetching(true);
        try {
          const userInfo = await fetchUserInfo(tempToken);
          if (userInfo && userInfo.userTag && userInfo.userTag.length === 2) {
            setUserInfo(userInfo);
            AsyncStorage.setItem("user-info", JSON.stringify(userInfo));
            authenticate(tempToken); // if user already exists
          } else {
            navigation.navigate("UserInfo"); // if user does not exist
          }
        } catch (error) {
          console.log("fetchUserInfo", error);
          console.log(error.response.data);
          setIsFetching(false);
        }
      }

      getUserInfo();
    }
  }, [tempToken]);

  function openTermsHandler() {
    navigation.navigate("TermsAndConditions");
  }

  function openPrivacyHandler() {
    navigation.navigate("PrivacyPolicy");
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/splash.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Sign in or sign up</Text>
          <Text style={styles.termsText}>
            By using our services you are agreeing to our{" "}
            <Pressable onPress={openTermsHandler}>
              <Text style={styles.link}>Terms</Text>
            </Pressable>{" "}
            and{" "}
            <Pressable onPress={openPrivacyHandler}>
              <Text style={styles.link}>Privacy Statement</Text>
            </Pressable>
            .
          </Text>
          <LoginButton />
        </View>
      </ImageBackground>
    </View>
  );
}

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  signInContainer: {
    padding: 16,
    marginBottom: 80,
  },
  signInText: {
    fontSize: 21,
    fontFamily: "roboto-bold",
    textAlign: "center",
    color: "#000000E5",
  },
  termsText: {
    color: "#4F4F4F",
    marginTop: 8,
    marginBottom: 36,
    fontFamily: "roboto",
    fontSize: 15,
    lineHeight: 22,
  },
  link: {
    textDecorationLine: "underline",
  },
});
