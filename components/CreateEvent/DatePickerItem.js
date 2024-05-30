import { StyleSheet, View, Pressable, Text } from 'react-native';

function DatePickerItem({ day, date, active, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.container, active ? styles.activeContainer : styles.inactiveContainer]}>
        <Text style={[active ? styles.activeText : styles.inactiveText, styles.day]}>{day}</Text>
        <Text style={active ? styles.activeText : styles.inactiveText}>{date}</Text>
      </View>
    </Pressable>
  )
}

export default DatePickerItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 8,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginRight: 16
  },
  activeContainer: {
    backgroundColor: '#3C8722',
    borderColor: '#3C8722',
  },
  inactiveContainer: {
    backgroundColor: 'white',
    borderColor: '#DCDCDC',
  },
  activeText: {
    color: 'white',
    lineHeight: 20,
    fontFamily: 'roboto'
  },
  inactiveText: {
    color: '#6A6A6A',
    lineHeight: 20,
    fontFamily: 'roboto'
  },
  day: {
    marginBottom: 4
  }
});