import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

function TimePicker({
  setPreviewTime,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}) {
  useEffect(() => {
    if (startTime > endTime) {
      setEndTime(startTime);
    }
    var previewStartTime = startTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    var previewEndTime = endTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    setPreviewTime(previewStartTime);
  }, [startTime, endTime]);

  const onStartTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setStartTime(currentDate);
  };

  const onEndTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setEndTime(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <DateTimePicker
          testID="startTimePicker"
          value={startTime}
          mode="time"
          display="spinner"
          is24Hour={true}
          minuteInterval={15}
          onChange={onStartTimeChange}
          textColor="black"
        />
      </View>
      {/* <View style={styles.innerContainer}>
        <DateTimePicker
          testID="endTimePicker"
          value={endTime}
          mode="time"
          display="spinner"
          is24Hour={true}
          minuteInterval={15}
          onChange={onEndTimeChange}
          textColor='black'
        />
      </View> */}
    </View>
  );
}

export default TimePicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  innerContainer: {
    flex: 1,
  },
});
