import { useState, useEffect } from 'react';
import { FlatList, Text, StyleSheet, View, Pressable } from 'react-native';
import ActivitiesReceivedItem from './ActivitiesReceivedItem';
import LoadingOverlay from '../ui/LoadingOverlay';

function renderActivityItem(itemData, eventId, sectorTags, gradeTags) {
  return (
    <ActivitiesReceivedItem {...itemData.item} eventId={eventId} sectorTags={sectorTags} gradeTags={gradeTags} />
  );
};

function ActivitiesReceivedList({ applications, isFetchingApplications, eventId, sectorTags, gradeTags }) {
  if (isFetchingApplications) {
    return (
      <LoadingOverlay />
    )
  };

  if ((!applications || applications.length === 0) && !isFetchingApplications) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallback}>No requests yet.</Text>
      </View>
    )
  };

  return (
    <FlatList 
      data={applications} 
      renderItem={(item) => renderActivityItem(item, eventId, sectorTags, gradeTags)} 
      keyExtractor={(item) => item.user.id}
    />
  );
}

export default ActivitiesReceivedList;

const styles = StyleSheet.create({
  fallbackContainer: {
    marginHorizontal: 40,
    marginVertical: 35
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
    lineHeight: 20
  }
});