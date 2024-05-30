import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import VisibilityFilterItem from './VisibilityFilterItem';

function VisibilityFilter({ style, filters, selectFilter, selectedFilter, setSelectedFilter, setUpdateEventList }) {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isAllOptionsChecked, setIsAllOptionsChecked] = useState(false);

  useEffect(() => {
    // console.log("111", selectedFilter.length, filters.length)
    if (selectedFilter.length && filters.length && selectedFilter.length === filters.length) {
      // console.log("222");
      // setIsAllOptionsChecked(true);
      setIsAllChecked(true);
    } else {
      // 漏选一个的话uncheck all
      // setIsAllOptionsChecked(false);
    }
  }, [selectedFilter]);

  // console.log("setIsAllOptionsChecked", isAllOptionsChecked)

  function filterChangeHandler(isChecked, filterId) {
    if (filterId) {
      if (isChecked) {
        if (filterId === 'All') {
          setIsAllChecked(true);
          // setIsAllOptionsChecked(true);
        } else {
          setSelectedFilter(prev => [...prev, filterId]);
        }
      } else {
        if (filterId === 'All') {
          setIsAllChecked(false);
          setSelectedFilter([]);
        };
        setSelectedFilter(prev => prev.filter((filter) => filter !== filterId));
      };
    };
  };

  // console.log("selectFilters", selectFilter);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.filtersContainer}>
        <ScrollView>
          {filters.map((filter, idx) => (
            <VisibilityFilterItem 
              key={filter.id ? filter.id : 50+idx}
              filter={filter} 
              isFilterChecked={filterChangeHandler} 
              isAllChecked={isAllChecked}
              isAllOptionsChecked={isAllOptionsChecked}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.allFiltersContainer}>
        <VisibilityFilterItem 
          // key={filter.id ? filter.id : 50+idx}
          filter='All' 
          isFilterChecked={filterChangeHandler} 
          isAll={true}
          isAllChecked={isAllChecked}
          isAllOptionsChecked={isAllOptionsChecked}
        />
      </View>

      {/* <Pressable style={({pressed}) => pressed && styles.pressed} onPress={handleUpdateEvents}>
        
      </Pressable> */}
    </View>
  )
}

export default VisibilityFilter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    shadowColor: '#0000001A',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    width: '97%'

  },
  filtersContainer: {
    padding: 8,
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    height: 208,
  },
  allFiltersContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8
  },
  pressed: {
    opacity: 0.75
  }
});