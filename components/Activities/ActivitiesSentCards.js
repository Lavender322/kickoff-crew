import { FlatList, Text, StyleSheet, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../ui/LoadingOverlay';
import ActivitiesSentCard from './ActivitiesSentCard';

function renderActivityItem(itemData, sectorTags, gradeTags, isCancelled, isPast) {
  return (
    <ActivitiesSentCard {...itemData.item} sectorTags={sectorTags} gradeTags={gradeTags} isCancelled={isCancelled} isPast={isPast} />
  );
};

function ActivitiesSentCards({ activities, isFetchingActivities, sectorTags, gradeTags, isCancelled, isPast }) {
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
      <View style={!isPast && !isCancelled ? styles.fallbackContainer : styles.fallbackPastContainer}>
        {(!isPast && !isCancelled) ? (
          <Text style={styles.fallback}>You don't have any upcoming events.</Text>
        ) : (
          <Text style={styles.fallback}>You don't have any events.</Text>
        )}
        <Pressable onPress={redirectHandler} style={styles.fallbackHighlightContainer}>
          <View style={styles.fallbackHighlightContainer}>
            <Text style={styles.fallbackHighlight}>Host one!</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <FlatList 
      data={activities} 
      renderItem={(item) => renderActivityItem(item, sectorTags, gradeTags, isCancelled, isPast)} 
      keyExtractor={(item) => item.id}
    />
  );
};

export default ActivitiesSentCards;

const styles = StyleSheet.create({
  fallbackContainer: {
    marginHorizontal: 40,
    paddingVertical: 24,
  },
  fallbackPastContainer: {
    marginHorizontal: 40,
    paddingTop: 35
  },
  fallback: {
    color: '#3B4852',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'roboto',
    lineHeight: 20
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