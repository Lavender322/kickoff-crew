import { FlatList, Text, StyleSheet, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoadingOverlay from "../ui/LoadingOverlay";
import EventItem from "./EventItem";

function renderEventItem(itemData, sectorTags, gradeTags) {
  return (
    <EventItem
      {...itemData.item}
      sectorTags={sectorTags}
      gradeTags={gradeTags}
    />
  );
}

function EventsList({ events, isFetchingEvents, sectorTags, gradeTags }) {
  const navigation = useNavigation();

  const eventsDisplayed =
    events;

  function redirectHandler() {
    navigation.navigate("CreateEvent");
  }

  if (isFetchingEvents) {
    return <LoadingOverlay />;
  }

  if ((!eventsDisplayed || eventsDisplayed.length === 0) && !isFetchingEvents) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallback}>
          There are no upcoming events around you.{" "}
        </Text>
        <Pressable
          onPress={redirectHandler}
          style={styles.fallbackHighlightContainer}
        >
          <View style={styles.fallbackHighlightContainer}>
            <Text style={styles.fallbackHighlight}>Host one!</Text>
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={eventsDisplayed}
      renderItem={(item) => renderEventItem(item, sectorTags, gradeTags)}
      keyExtractor={(item) => item.event_id}
    />
  );
}

export default EventsList;

const styles = StyleSheet.create({
  fallbackContainer: {
    marginHorizontal: 40,
    marginTop: 35,
  },
  fallback: {
    color: "#3B4852",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "roboto",
    lineHeight: 20,
  },
  fallbackHighlight: {
    fontFamily: "roboto-bold",
    fontSize: 16,
    color: "#3C8722",
    textDecorationLine: "underline",
    lineHeight: 20,
    textAlign: "center",
  },
  fallbackHighlightContainer: {
    alignSelf: "center",
  },
});
