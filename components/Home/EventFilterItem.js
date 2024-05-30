import { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Checkbox from 'expo-checkbox';

function EventFilterItem({ filter, isGroupFilter, isFilterChecked }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    isFilterChecked(true);
  }, []);
  
  useEffect(() => {
    if (!isGroupFilter) {
      isFilterChecked(isChecked, filter.toString());
    } else {
      isFilterChecked(isChecked, filter.parameter);
    };
  }, [isChecked]);

  return (
    <View style={styles.filterItemContainer}>
      <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setIsChecked} color={isChecked ? '#3C8722' : undefined} />
      <Text style={styles.text}>{filter}</Text>
    </View>
  )
}

export default EventFilterItem;

const styles = StyleSheet.create({
  filterItemContainer: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center'
  },
  text: {
    color: '#1A1A1A',
    fontFamily: 'roboto-medium',
    marginLeft: 4
  }
});