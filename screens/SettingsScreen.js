import { useContext } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import IconButton from "../components/ui/IconButton";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../store/context/auth-context";

function SettingsScreen({ navigation }) {
  const { logout } = useContext(AuthContext);

  function previousStepHandler() {
    navigation.goBack();
  }

  function directToFeedbackHandler() {
    navigation.navigate("Feedback");
  }

  function directToCustomerSupportHandler() {
    navigation.navigate("CustomerSupport");
  }

  function logoutHandler() {
    FIREBASE_AUTH.signOut();
  }

  async function openTermsHandler() {
    navigation.navigate("TermsAndConditions");
  }

  async function openPrivacyHandler() {
    navigation.navigate("PrivacyPolicy");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          color="black"
          style={styles.goBackButton}
          onPress={previousStepHandler}
        />
        <Text style={styles.headerText}>Settings</Text>
        <View style={styles.placeholder}></View>
      </View>
      <View style={styles.menu}>
        <Pressable onPress={directToFeedbackHandler}>
          <View style={[styles.menuItem, styles.border, styles.spaceBetween]}>
            <View style={styles.menuInnerContainer}>
              <Feather name="send" size={18} color="black" />
              <Text style={styles.menuText}>Leave a feedback</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#6A6A6A" />
          </View>
        </Pressable>
        <Pressable onPress={directToCustomerSupportHandler}>
          <View style={[styles.menuItem, styles.spaceBetween]}>
            <View style={styles.menuInnerContainer}>
              <Feather name="coffee" size={18} color="black" />
              <Text style={styles.menuText}>Customer Support</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#6A6A6A" />
          </View>
        </Pressable>
      </View>
      <Pressable onPress={logoutHandler} style={styles.logoutContainer}>
        <View style={styles.logoutContainer}>
          <Text style={styles.logout}>Log out</Text>
        </View>
      </Pressable>

      <View style={styles.linksContainer}>
        <Pressable onPress={openTermsHandler}>
          <View style={styles.linkContainer}>
            <Text style={styles.link}>Terms and Conditions</Text>
          </View>
        </Pressable>
        <Pressable onPress={openPrivacyHandler}>
          <View style={styles.linkContainer}>
            <Text style={styles.link}>Privacy Policy</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    marginTop: 56,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 36,
    marginHorizontal: 16,
  },
  headerText: {
    fontFamily: "roboto-bold",
    fontSize: 24,
    color: "#000000E5",
  },
  placeholder: {
    marginRight: 16,
  },
  menu: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 170,
  },
  menuInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  menuText: {
    fontFamily: "roboto-medium",
    fontSize: 16,
    lineHeight: 20.8,
    color: "#1A1A1A",
    paddingVertical: 16,
    marginLeft: 8,
  },
  border: {
    borderBottomColor: "#EAE6E6",
    borderBottomWidth: 1,
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  logoutContainer: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    borderRadius: 8,
  },
  logout: {
    paddingVertical: 10,
    fontFamily: "roboto-medium",
    fontSize: 16,
    lineHeight: 22,
    color: "#1A1A1A",
    textAlign: "center",
  },
  linksContainer: {
    marginTop: 190,
  },
  linkContainer: {
    paddingVertical: 10,
  },
  link: {
    textAlign: "center",
    textDecorationLine: "underline",
    fontFamily: "roboto-medium",
    fontSize: 16,
    lineHeight: 22,
    color: "#1A1A1A",
  },
});
