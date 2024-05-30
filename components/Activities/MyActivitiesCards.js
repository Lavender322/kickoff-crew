import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, Pressable, FlatList } from 'react-native';
import MyActivitiesCard from './MyActivitiesCard';
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../ui/LoadingOverlay';

function renderActivityItem(itemData, sectorTags, gradeTags) {
  return (
    <MyActivitiesCard {...itemData.item} sectorTags={sectorTags} gradeTags={gradeTags} />
  );
};

function MyActivitiesCards({ isFetchingActivities, activities, sectorTags, gradeTags }) {
  const navigation = useNavigation();
  
  function redirectHandler() {
    navigation.navigate('CreateEvent');
  };

  if (isFetchingActivities) {
    return (
      <LoadingOverlay />
    )
  };

  if ((!activities || activities.length === 0) && !isFetchingActivities) {
    return (
      <View style={styles.fallbackContainer}>
          <Text style={styles.fallback}>You don't have any activities.</Text>
          <Pressable onPress={redirectHandler} style={styles.fallbackHighlightContainer}>
          <View style={styles.fallbackHighlightContainer}>
            <Text style={styles.fallbackHighlight}>Host one!</Text>
          </View>
          </Pressable>
      </View>
    )
  };

  return (
    <FlatList 
      data={activities} 
      renderItem={(item) => renderActivityItem(item, sectorTags, gradeTags)} 
      keyExtractor={(item) => item.id}
    />
  );
};

export default MyActivitiesCards;

const styles = StyleSheet.create({
  fallbackContainer: {
    marginHorizontal: 40,
    marginTop: 35
  },
  fallback: {
    color: '#3B4852',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'roboto',
    lineHeight: 20,
  },
  fallbackHighlight: {
    fontFamily: 'roboto-bold',
    fontSize: 16,
    color: '#3C8722',
    textDecorationLine: 'underline',
    lineHeight: 20,
    textAlign: 'center'
  },
  fallbackHighlightContainer: {
    alignSelf: 'center'
  }
});