import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import DatePickerItem from './DatePickerItem';
import { getEventDates, getCurrentMonth } from '../../utils/date';

function DatePicker({ setSelectedDate, setPreviewDate, setSelectedIndex, selectedIndex }) {
  const [isSelectedDate, setIsSelectedDate] = useState([false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false]);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  useEffect(() => {
    let updatedIsSelectedDate = [...isSelectedDate];
    updatedIsSelectedDate[selectedIndex] = true;
    setIsSelectedDate(updatedIsSelectedDate);
  }, []);

  const eventDates = getEventDates();

  function selectDateHandler(idx) {
    let updatedIsSelectedDate = [...isSelectedDate];
    updatedIsSelectedDate[idx] = true;
    updatedIsSelectedDate.map((date, i) => {
      i !== idx && (updatedIsSelectedDate[i] = false);
    });
    setIsSelectedDate(updatedIsSelectedDate);
    setSelectedDate(eventDates[idx].fullDate);
    setPreviewDate(eventDates[idx].previewDate);
    setSelectedIndex(idx);
    setSelectedMonth(eventDates[idx].month + ', ' + eventDates[idx].year)
  };

  return (
    <View style={styles.outerContainer}>
      <Text style={styles.text}>{selectedMonth}</Text>
      <ScrollView horizontal style={styles.container}>
        {eventDates.map((date, idx) => (
          <DatePickerItem 
            key={idx}
            day={date.day}
            date={date.date}
            active={isSelectedDate[idx]}
            onPress={selectDateHandler.bind(this, idx)}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default DatePicker;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#F2F2F2',
    paddingVertical: 18
  },
  container: {
    paddingHorizontal: 16,
  },
  text: {
    color: '#1A1A1A',
    lineHeight: 20.8,
    fontFamily: 'roboto-medium',
    fontSize: 16,
    marginBottom: 8,
    paddingLeft: 16,
  },
});