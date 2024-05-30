import { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Checkbox from 'expo-checkbox';

function VisibilityFilterItem({ filter, isFilterChecked, isAll, isAllChecked, isAllOptionsChecked }) {
  const [isChecked, setIsChecked] = useState(false);
  
  useEffect(() => {
    if (!isAll) {
      isFilterChecked(isChecked, filter.tagId);
    } else {
      isFilterChecked(isChecked, filter);
    };
  }, [isChecked]);

  useEffect(() => {
    if (isAllChecked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    };
  }, [isAllChecked]);

  return (
    <View style={styles.filterItemContainer}>
      <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setIsChecked} color={isChecked ? '#3C8722' : undefined} />
      <Text style={styles.text}>{isAll ? filter : filter.tagName}</Text>
    </View>
  )
}

export default VisibilityFilterItem;

const styles = StyleSheet.create({
  filterItemContainer: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    height: 40,
  },
  text: {
    color: '#1A1A1A',
    fontFamily: 'roboto-medium',
    marginLeft: 4
  }
});