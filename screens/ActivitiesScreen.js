import { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {
  fetchHostedEvents,
  fetchPendingEvents,
  fetchJoinedEvents,
} from "../utils/http";
import { AuthContext } from "../store/context/auth-context";
import ActivitiesReceivedCards from "../components/Activities/ActivitiesReceivedCards.js";

function ActivitiesScreen() {
  const [isFetchingReceivedActivities, setIsFetchingReceivedActivities] =
    useState(true);
  const [isFetchingConfirmedActivities, setIsFetchingConfirmedActivities] =
    useState(true);
  const [isFetchingSentActivities, setIsFetchingSentActivities] =
    useState(true);
  const [loadedReceivedActivities, setLoadedReceivedActivities] = useState([]);
  const [loadedConfirmedActivities, setLoadedConfirmedActivities] = useState(
    []
  );
  const [loadedSentActivities, setLoadedSentActivities] = useState([]);
  const [sectorTags, setSectorTags] = useState([]);
  const [gradeTags, setGradeTags] = useState([]);

  // TO COMMENT OUT
  const { token, userInfo } = useContext(AuthContext);
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';

  const isFocused = useIsFocused();

  useEffect(() => {
    setIsFetchingReceivedActivities(true);
    fetchHostedEvents(userInfo.username)
      .then((res) => {
        setIsFetchingReceivedActivities(false);
        setLoadedReceivedActivities(res.data.events);
      })
      .catch((err) => {
        // console.log("fetchEventList", error);
        // setIsError(true);
      });
  }, [isFocused]);

  useEffect(() => {
    setIsFetchingConfirmedActivities(true);
    fetchJoinedEvents(userInfo.username)
      .then((res) => {
        setIsFetchingConfirmedActivities(false);
        setLoadedConfirmedActivities(res.data.events);
      })
      .catch((err) => {
        // console.log("fetchEventList", error);
        // setIsError(true);
      });
  }, [isFocused]);

  useEffect(() => {
    setIsFetchingSentActivities;
    fetchPendingEvents(userInfo.username)
      .then((res) => {
        setIsFetchingSentActivities;
        setLoadedSentActivities(res.data.events);
      })
      .catch((err) => {
        // console.log("fetchEventList", error);
        // setIsError(true);
      });
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Events</Text>
      <ActivitiesReceivedCards
        activities={loadedReceivedActivities}
        isFetchingActivities={isFetchingReceivedActivities}
        loadedConfirmedActivities={loadedConfirmedActivities}
        isFetchingConfirmedActivities={isFetchingConfirmedActivities}
        loadedSentActivities={loadedSentActivities}
        isFetchingSentActivities={isFetchingSentActivities}
      />
    </View>
  );
}

export default ActivitiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  headerText: {
    fontSize: 24,
    fontFamily: "roboto-bold",
    marginTop: 58,
    marginLeft: 20,
    marginBottom: 16,
    color: "#000000E5",
  },
});
