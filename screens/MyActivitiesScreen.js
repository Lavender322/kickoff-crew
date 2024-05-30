import { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import IconButton from "../components/ui/IconButton";
import { fetchMyActivities, fetchTags } from "../utils/http";
import { AuthContext } from "../store/context/auth-context";
import MyActivitiesCards from "../components/Activities/MyActivitiesCards";

function MyActivitiesScreen({ navigation }) {
  const [isFetchingActivities, setIsFetchingActivities] = useState(true);
  const [myActivities, setMyActivities] = useState();
  const [sectorTags, setSectorTags] = useState();
  const [gradeTags, setGradeTags] = useState();

  const { token } = useContext(AuthContext);

  useEffect(() => {
    async function getMyActivities() {
      setIsFetchingActivities(true);
      try {
        const activities = await fetchMyActivities(token);
        setMyActivities(activities);
        // console.log('activities', activities);
      } catch (error) {
        console.log("fetchMyActivities", error);
        console.log(error.response.data);
      }
      setIsFetchingActivities(false);
    }

    getMyActivities();
  }, []);

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

  function previousStepHandler() {
    navigation.goBack();
  }

  return <View style={styles.container}></View>;
}

export default MyActivitiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  goBackButton: {
    marginTop: 56,
    marginLeft: 16,
  },
  headerText: {
    marginTop: 24,
    marginLeft: 20,
    marginBottom: 24,
    fontSize: 24,
    fontFamily: "roboto-bold",
    color: "#000000E5",
  },
});
