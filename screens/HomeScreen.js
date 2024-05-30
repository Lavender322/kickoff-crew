import { useEffect, useState, useContext, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { AuthContext } from "../store/context/auth-context";
import {
  fetchHostedEvents,
  fetchJoinedEvents,
  fetchPendingEvents,
  fetchEventList,
  fetchReceivedInvitations,
  fetchCategoryList,
  fetchTags,
  addPushToken,
} from "../utils/http";
import EventsList from "../components/Home/EventsList";
import EventFilters from "../components/Home/EventFilters";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import * as Notifications from "expo-notifications";

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  if (Device.isDevice) {
    const { status } = await Notifications.getPermissionsAsync();
    let finalStatus = status;

    if (finalStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert(
        "Permission required",
        "Push notifications need the appropriate permissions."
      );
      return;
    }

    // First time login call this
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    // console.log('pushTokenData', token);

    return token.data;
  }
}

function HomeScreen({ navigation }) {
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingEvents, setIsFetchingEvents] = useState(false);
  const [hostedEvents, setHostedEvents] = useState(null);
  const [pendingEvents, setPendingEvents] = useState(null);
  const [joinedEvents, setJoinedEvents] = useState(null);
  const [receivedInvitations, setReceivedInvitations] = useState(null);
  const [loadedEvents, setLoadedEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSkillLevel, setSelectedSkillLevel] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [updateEventList, setUpdateEventList] = useState(false);
  const [count, setCount] = useState(0);
  const [expoPushToken, setExpoPushToken] = useState();
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // TO COMMENT OUT
  const { token, userInfo, logout, setIsDevServer, isDevServer } =
    useContext(AuthContext);
  // const { userInfo } = useContext(AuthContext);
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';

  const isFocused = useIsFocused();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    if (expoPushToken) {
      async function addPushNotificationsToken() {
        try {
          await addPushToken(expoPushToken, token);
        } catch (error) {
          console.log("addPushToken", error);
          console.log(error.response.data);
        }
      }

      addPushNotificationsToken();
    }
  }, [expoPushToken]);

  // useEffect(() => {
  //   async function getOverallEventStatus() {
  //     setIsFetching(true);
  //     try {
  //       const eventStatus = await fetchOverallEventStatus(token);
  //       setConfirmedEvents(eventStatus.confirmedEvents);
  //       setPendingRequests(eventStatus.pendingEventRequests);
  //       setReceivedInvitations(eventStatus.invitationsReceived);
  //     } catch (error) {
  //       console.log("fetchOverallEventStatus", error);
  //       console.log(error.response.data);
  //     }
  //     setIsFetching(false);
  //   }

  //   getOverallEventStatus();
  // }, [isFocused]);

  // useEffect(() => {
  //   async function getTags() {
  //     // setIsFetching(true);
  //     try {
  //       const tags = await fetchTags();
  //       const fetchedSectorTags = tags.filter((tag) => tag.tagType === "team");
  //       const fetchedGradeTags = tags.filter((tag) => tag.tagType === "grade");
  //       setSectorTags(fetchedSectorTags);
  //       setGradeTags(fetchedGradeTags);
  //     } catch (error) {
  //       console.log("fetchTags", error);
  //       console.log(error.response.data);
  //     }
  //     // setIsFetching(false);
  //   }

  //   getTags();
  // }, []);

  useEffect(() => {
    setIsFetchingEvents(true);
    fetchEventList()
      .then((res) => {
        setIsFetchingEvents(false);
        setLoadedEvents(res.data.events);
      })
      .catch((err) => {
        console.log("fetchEventList", error);
        // setIsError(true);
      });
  }, [isFocused]);

  useEffect(() => {
    setIsFetching(true);
    fetchHostedEvents(userInfo.username)
      .then((res) => {
        setIsFetching(false);
        console.log("res1", res.data.events);
        setHostedEvents(res.data.events.length);
      })
      .catch((err) => {
        // console.log("fetchEventList", error);
        // setIsError(true);
      });
  }, [isFocused]);

  useEffect(() => {
    setIsFetching(true);
    fetchJoinedEvents(userInfo.username)
      .then((res) => {
        setIsFetching(false);
        setJoinedEvents(res.data.events.length);
        console.log("res2", res.data.events);
      })
      .catch((err) => {
        // console.log("fetchEventList", error);
        // setIsError(true);
      });
  }, [isFocused]);

  useEffect(() => {
    setIsFetching(true);
    fetchPendingEvents(userInfo.username)
      .then((res) => {
        setIsFetching(false);
        setPendingEvents(res.data.events.length);
        console.log("res3", res.data.events);
      })
      .catch((err) => {
        // console.log("fetchEventList", error);
        // setIsError(true);
      });
  }, [isFocused]);

  useEffect(() => {
    setIsFetching(true);
    fetchReceivedInvitations(userInfo.username)
      .then((res) => {
        setIsFetching(false);
        console.log("res1212121", res.data);
        setReceivedInvitations(res.data.events.length);
      })
      .catch((err) => {
        // console.log("fetchEventList", error);
        // setIsError(true);
      });
  }, [isFocused]);

  useEffect(() => {
    if (updateEventList) {
      setIsFetchingEvents(true);
      fetchEventList(selectedCategory, selectedSkillLevel)
        .then((res) => {
          setIsFetchingEvents(false);
          setLoadedEvents(res.data.events);
        })
        .catch((err) => {
          console.log("fetchEventList", error);
          // setIsError(true);
        });
    }
  }, [updateEventList]);

  // async function scheduleNotificationHandler() {
  //   Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: 'My first local Notification',
  //       body: 'This is the body of the notification.',
  //       data: { userName: 'Max' }
  //     },
  //     trigger: {
  //       seconds: 5
  //     }
  //   });
  // };

  function directToActivities() {
    navigation.navigate("Activities");
  }

  // function directToRequestedActivities() {
  //   navigation.navigate('Activities', {screen: 'ActivitiesSent'});
  // };

  // function directToReceivedActivities() {
  //   navigation.navigate('Activities', {screen: 'ActivitiesReceived'});
  // };

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <Text
          style={[
            styles.headerText,
            isDevServer ? styles.devServer : styles.prodServer,
          ]}
        >
          Hi, {userInfo.username}
        </Text>
      </TouchableWithoutFeedback>
      {/* <Button title='Schedule' onPress={scheduleNotificationHandler} /> */}
      <View style={styles.outerPanelContainer}>
        <View style={[styles.innerPanelContainer, styles.innerPanel]}>
          <Pressable onPress={directToActivities}>
            <Text style={styles.panelNumber}>
              {hostedEvents + joinedEvents}
            </Text>
          </Pressable>
          <Pressable onPress={directToActivities}>
            <Text style={styles.panelText}>
              {hostedEvents + joinedEvents === 1
                ? "Upcoming Activity"
                : "Upcoming Activities"}
            </Text>
          </Pressable>
        </View>
        <View style={[styles.innerPanelContainer, styles.innerPanel]}>
          <Pressable onPress={directToActivities}>
            <Text style={styles.panelNumber}>{pendingEvents}</Text>
          </Pressable>
          <Pressable onPress={directToActivities}>
            <Text style={styles.panelText}>
              {pendingEvents === 1 ? "Sent Request" : "Sent Requests"}
            </Text>
          </Pressable>
        </View>
        <View style={styles.innerPanelContainer}>
          <Pressable onPress={directToActivities}>
            <Text style={styles.panelNumber}>{receivedInvitations}</Text>
          </Pressable>
          <Pressable onPress={directToActivities}>
            <Text style={styles.panelText}>
              {receivedInvitations === 1
                ? "Received request"
                : "Received requests"}
            </Text>
          </Pressable>
        </View>
      </View>

      <EventFilters
        style={styles.eventFilters}
        setSelectedCategory={setSelectedCategory}
        setSelectedSkillLevel={setSelectedSkillLevel}
        setSelectedGroup={setSelectedGroup}
        selectedGroup={selectedGroup}
        setUpdateEventList={setUpdateEventList}
      />

      <EventsList events={loadedEvents} isFetchingEvents={isFetchingEvents} />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 7,
  },
  headerText: {
    fontSize: 24,
    fontFamily: "roboto-bold",
    marginTop: 58,
    marginLeft: 13,
  },
  devServer: {
    color: "#587505",
  },
  prodServer: {
    color: "#000000E5",
  },
  outerPanelContainer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    marginTop: 16,
    paddingVertical: 16,
  },
  innerPanelContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  innerPanel: {
    borderRightColor: "#D9D9D9",
    borderRightWidth: 1,
  },
  panelNumber: {
    fontSize: 24,
    fontFamily: "roboto-bold",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  panelText: {
    color: "#6F8698",
    fontSize: 13,
    fontFamily: "roboto-medium",
  },
  eventFilters: {
    zIndex: 100,
  },
});
