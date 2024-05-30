import { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { getFormattedDate, getFormattedChatTime } from "../../utils/date";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { fetchActivity } from "../../utils/http";
import { AuthContext } from "../../store/context/auth-context";
import ActivitiesReceivedList from "./ActivitiesReceivedList";

function ActivitiesReceivedCard({
  event_id,
  host,
  event_name,
  location,
  date,
  category,
  age_range,
  price,
  capacity,
  skill_level,
}) {
  const [isFetchingApplications, setIsFetchingApplications] = useState(true);
  const [loadedApplications, setLoadedApplications] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // TO COMMENT OUT
  const { token } = useContext(AuthContext);
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  // useEffect(() => {
  //   async function getActivity() {
  //     setIsFetchingApplications(true);
  //     try {
  //       const activity = await fetchActivity(eventId, token);
  //       // console.log('papa', activity);
  //       const applicants =
  //         activity.participants &&
  //         activity.participants.filter((applicant) => {
  //           return applicant.participantState === "REQUESTED";
  //         });
  //       if (applicants && applicants.length) {
  //         setLoadedApplications(applicants);
  //       }
  //     } catch (error) {
  //       console.log("fetchActivity", error);
  //       console.log(error.response.data);
  //     }
  //     setIsFetchingApplications(false);
  //   }

  //   getActivity();
  // }, [isFocused]);

  function cardToggleHandler() {
    setIsExpanded(!isExpanded);
  }

  function directToEventDetails() {
    navigation.navigate("EventDetail", {
      eventId: event_id,
      eventName: event_name,
      eventHost: host,
      eventDescription: description,
      eventDate: getFormattedDate(date),
      eventTime: getFormattedChatTime(date),
      eventLocation: location,
      eventCategory: category,
      eventSkillLevel: skill_level,
      previousScreen: "Received",
    });
  }

  return (
    <View>
      <Pressable onPress={cardToggleHandler}>
        <View style={styles.container}>
          <View>
            {/* <Text style={styles.title}>{eventType === 'ONE_TO_ONE' ? 'Your One to One session' : eventName}</Text> */}
            <View style={styles.detailInnerContainer}>
              <Feather name="calendar" size={18} color="#3C8722" />
              <Text style={styles.period}>{getFormattedChatTime(date)}</Text>
              <Text style={styles.date}>{getFormattedDate(date, true)}</Text>
            </View>

            <View style={[styles.detailInnerContainer, styles.topMargin]}>
              <TouchableWithoutFeedback>
                <Pressable onPress={directToEventDetails}>
                  <Text style={styles.details}>Details</Text>
                </Pressable>
              </TouchableWithoutFeedback>
              <Feather name="chevron-right" size={24} color="#6A6A6A" />
            </View>
          </View>

          <View style={styles.innerContainer}>
            {/* <View style={styles.numberContainer}>
              <Text style={styles.number}>1</Text>
            </View> */}
            <Feather
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={24}
              color="#6A6A6A"
            />
          </View>
        </View>
      </Pressable>

      {isExpanded && (
        <View>
          {loadedApplications &&
          loadedApplications.length &&
          !isFetchingApplications ? (
            <Text style={styles.note}>
              Here is a list of people who are keen to meet you at your proposed
              time slot!
            </Text>
          ) : null}
          <ActivitiesReceivedList
            applications={loadedApplications}
            isFetchingApplications={isFetchingApplications}
            eventId={event_id}
          />
        </View>
      )}
    </View>
  );
}

export default ActivitiesReceivedCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 16,
    paddingRight: 8,
    paddingLeft: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#E9E9E9",
    borderBottomWidth: 1,
  },
  title: {
    color: "#1A1A1A",
    fontSize: 16,
    fontFamily: "roboto-bold",
  },
  detailInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  topMargin: {
    marginTop: 4,
  },
  period: {
    color: "#3C8722",
    fontFamily: "roboto-medium",
    fontSize: 16,
    marginHorizontal: 8,
  },
  date: {
    color: "#3C8722",
    fontFamily: "roboto-medium",
    fontSize: 16,
  },
  details: {
    fontFamily: "roboto",
    fontSize: 15,
    lineHeight: 18.2,
    color: "#6A6A6A",
    marginRight: 4,
    textDecorationLine: "underline",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  numberContainer: {
    backgroundColor: "#EC2323",
    width: 24,
    height: 24,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  number: {
    color: "#FFFFFF",
    fontFamily: "roboto-medium",
    fontSize: 15,
  },
  note: {
    color: "#3B4852",
    fontFamily: "roboto",
    fontSize: 15,
    lineHeight: 20,
    padding: 8,
    backgroundColor: "#fff",
  },
});
