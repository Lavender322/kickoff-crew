import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { AuthContext } from "../store/context/auth-context";
import IconButton from "../components/ui/IconButton";
import { fetchTags } from "../utils/http";
import { Feather } from "@expo/vector-icons";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function ProfileScreen({ navigation }) {
  const [sectorTags, setSectorTags] = useState([]);
  const [gradeTags, setGradeTags] = useState([]);
  const [userGradeTag, setUserGradeTag] = useState();
  const [userSectorTag, setUserSectorTag] = useState();
  const [isFetchingTags, setIsFetchingTags] = useState(false);

  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    async function getTags() {
      // setIsFetching(true);
      try {
        const tags = await fetchTags();
        const fetchedSectorTags = tags.filter((tag) => tag.tagType === "team");
        const fetchedGradeTags = tags.filter((tag) => tag.tagType === "grade");
        setSectorTags(fetchedSectorTags);
        setGradeTags(fetchedGradeTags);
      } catch (error) {
        console.log("fetchTags", error);
        console.log(error.response.data);
      }
      // setIsFetching(false);
    }

    getTags();
  }, []);

  function directToSettingsHandler() {
    navigation.navigate("Settings");
  }

  function directToCreateEventHandler() {
    navigation.navigate("CreateEvent");
  }

  function directToMyActivitiesHandler() {
    navigation.navigate("MyActivities");
  }

  function directToMPastActivitiesHandler() {
    navigation.navigate("ActivitiesPast");
  }

  if (isFetchingTags) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{userInfo.username}</Text>
        <IconButton
          icon="settings"
          size={24}
          color="#3B4852"
          style={styles.settingsButton}
          onPress={directToSettingsHandler}
        />
      </View>
      <View style={styles.mainContainer}>
        <Image source={{ uri: userInfo.avatar_url }} style={styles.avatar} />
        <Text style={styles.name}>
          {userInfo.first_name + " " + userInfo.last_name}
        </Text>
        <View style={styles.roleContainer}>
          {userGradeTag && userGradeTag !== "null" && (
            <Text style={styles.grade}>{userGradeTag}</Text>
          )}
          {userGradeTag && userGradeTag === "null" && (
            <Text style={styles.grade}>--</Text>
          )}
          <View style={styles.sectorContainer}>
            {userSectorTag && userSectorTag !== "null" && (
              <Text style={styles.sector}>{userSectorTag}</Text>
            )}
            {userSectorTag && userSectorTag === "null" && (
              <Text style={styles.sector}>--</Text>
            )}
          </View>
        </View>
        <View style={styles.activities}>
          <View style={styles.activitiesHeader}>
            <Text style={styles.activitiesTitle}>My activities</Text>
            <Pressable onPress={directToMyActivitiesHandler}>
              <View style={styles.viewContainer}>
                <Text style={styles.viewText}>View all</Text>
                <Feather name="chevron-right" size={24} color="#6A6A6A" />
              </View>
            </Pressable>
          </View>

          <View style={styles.submitFormContainer}>
            <Pressable
              onPress={directToCreateEventHandler}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <View style={styles.submitFormBtnContainer}>
                <Text style={[styles.submitFormBtnText, styles.enabledText]}>
                  Create event
                </Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* <View style={styles.pastActivities}>
          <View style={styles.pastActivitiesHeader}>
            <Text style={styles.activitiesTitle}>Past activities</Text>
            <Pressable onPress={directToMPastActivitiesHandler}>
              <View style={styles.viewContainer}>
                <Text style={styles.viewText}>View all</Text>
                <Feather name="chevron-right" size={24} color="#6A6A6A" />
              </View>
            </Pressable>
          </View>
        </View> */}
      </View>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  headerContainer: {
    flexDirection: "row",
    marginTop: 58,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 7,
  },
  headerText: {
    fontFamily: "roboto-bold",
    fontSize: 24,
    color: "#000000E5",
    marginLeft: 13,
  },
  settingsButton: {
    marginRight: 13,
  },
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    marginTop: 24,
    borderRadius: 66,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  name: {
    color: "#000000E5",
    fontFamily: "roboto-bold",
    fontSize: 21,
    marginTop: 24,
    marginBottom: 12,
  },
  roleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  grade: {
    fontFamily: "roboto-medium",
    fontSize: 17,
    color: "#000000E5",
    marginRight: 12,
  },
  sectorContainer: {
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: "#E6E6E6",
  },
  sector: {
    color: "#3B4852",
    fontFamily: "roboto-medium",
    fontSize: 15,
  },
  activities: {
    backgroundColor: "#ffffff",
    width: "100%",
  },
  pastActivities: {
    marginTop: 24,
    backgroundColor: "#ffffff",
    width: "100%",
  },
  activitiesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingLeft: 12,
  },
  pastActivitiesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 24,
    paddingLeft: 12,
  },
  activitiesTitle: {
    fontFamily: "roboto-bold",
    fontSize: 16,
    lineHeight: 20.8,
    color: "#1A1A1A",
  },
  viewContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewText: {
    fontFamily: "roboto",
    fontSize: 15,
    lineHeight: 18.2,
    color: "#6A6A6A",
    marginRight: 8,
  },
  submitFormContainer: {
    marginBottom: 24,
    paddingTop: 8,
    paddingHorizontal: 12,
  },
  submitFormBtnContainer: {
    backgroundColor: "#1A4821",
    borderRadius: 8,
    paddingVertical: 13,
  },
  submitFormBtnText: {
    color: "#6A6A6A",
    fontSize: 16,
    fontFamily: "roboto-medium",
    textAlign: "center",
  },
  enabledText: {
    color: "white",
  },
  pressed: {
    opacity: 0.75,
  },
});
