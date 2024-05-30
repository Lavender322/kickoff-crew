import { FlatList, Text, StyleSheet, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../ui/LoadingOverlay';
import ActivitiesReceivedCard from './ActivitiesReceivedCard';
import ActivitiesConfirmedCards from './ActivitiesConfirmedCards';
import ActivitiesSentCards from './ActivitiesSentCards';

function renderActivityItem(itemData, sectorTags, gradeTags) {
  return (
    <ActivitiesReceivedCard {...itemData.item} sectorTags={sectorTags} gradeTags={gradeTags} />
  );
};

function ActivitiesReceivedCards({ activities, isFetchingActivities, loadedConfirmedActivities, isFetchingConfirmedActivities, loadedSentActivities, isFetchingSentActivities, sectorTags, gradeTags }) {
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
      <>
        <View style={styles.firstInnerContainer}>
          <Text style={styles.title}>Upcoming activities</Text>
          <ActivitiesConfirmedCards 
            activities={loadedConfirmedActivities} 
            isFetchingActivities={isFetchingConfirmedActivities} 
            sectorTags={sectorTags} 
            gradeTags={gradeTags} 
          />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Received requests</Text>
        </View>
      
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallback}>You don't have any upcoming events.</Text>
          <Pressable onPress={redirectHandler} style={styles.fallbackHighlightContainer}>
            <View style={styles.fallbackHighlightContainer}>
              <Text style={styles.fallbackHighlight}>Host one!</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.footerContainer}></View>
          <View style={styles.secondInnerContainer}>
            <View style={styles.sentTitleContainer}>
              <Text style={styles.title}>Sent requests</Text>
            </View>
            <ActivitiesSentCards 
              activities={loadedSentActivities} 
              isFetchingActivities={isFetchingSentActivities} 
              sectorTags={sectorTags} 
              gradeTags={gradeTags} 
            />
          </View>
      </>
    )
  };

  return (
    <FlatList 
      data={activities} 
      renderItem={(item) => renderActivityItem(item, sectorTags, gradeTags)} 
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <>
          <View style={styles.firstInnerContainer}>
            <Text style={styles.title}>Upcoming activities</Text>
            <ActivitiesConfirmedCards 
              activities={loadedConfirmedActivities} 
              isFetchingActivities={isFetchingConfirmedActivities} 
              sectorTags={sectorTags} 
              gradeTags={gradeTags} 
            />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Received requests</Text>
          </View>
        </>
      }
      ListFooterComponent={
        <>
          <View style={styles.footerContainer}></View>
          <View style={styles.secondInnerContainer}>
            <View style={styles.sentTitleContainer}>
              <Text style={styles.title}>Sent requests</Text>
            </View>
            <ActivitiesSentCards 
              activities={loadedSentActivities} 
              isFetchingActivities={isFetchingSentActivities} 
              sectorTags={sectorTags} 
              gradeTags={gradeTags} 
            />
          </View>
        </>
      }
    />
  );
};

export default ActivitiesReceivedCards;

const styles = StyleSheet.create({
  fallbackContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 40,
    // marginTop: 35
    paddingVertical: 24
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
  },
  firstInnerContainer: {
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingBottom: 16,
    shadowColor: '#0000001A',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    marginBottom: 36
  },
  title: {
    fontFamily: 'roboto-bold',
    color: '#1A1A1A',
    fontSize: 17,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  titleContainer: {
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  sentTitleContainer: {
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 1,
  },
  footerContainer: {
    height: 36,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    shadowColor: '#0000001A',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    marginBottom: 36,
  },
  secondInnerContainer: {
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingBottom: 36,
    shadowColor: '#0000001A',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    marginBottom: 36
  }
});