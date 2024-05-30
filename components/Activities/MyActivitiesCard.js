import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, Pressable, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getFormattedDate } from '../../utils/date';
import { useNavigation } from '@react-navigation/native';
import { fetchActivity } from '../../utils/http';
import { AuthContext } from '../../store/context/auth-context';

function MyActivitiesCard({ eventId, eventHost, eventType, eventName, eventStartTime, eventEndTime, eventStatus, sectorTags, gradeTags }) {
  const [eventParticipants, setEventParticipants] = useState([]);

  const { token, userInfo } = useContext(AuthContext);
  
  const navigation = useNavigation();

  useEffect(() => {
    async function getActivity() {
      // setIsFetchingActivity(true);
      try {
        const activity = await fetchActivity(eventId, token);
        setEventParticipants(activity.participants);
      } catch (error) {
        console.log('fetchActivity', error);
        console.log(error.response.data);
      };
      // setIsFetchingActivity(false);
    };
    
    if (userInfo.userId === eventHost.userId) {
      getActivity();
    };
  }, []);
  
  function directToEventDetails() {
    navigation.navigate('EventDetail', {
      eventId: eventId,
      sectorTags: sectorTags,
      gradeTags: gradeTags,
      eventParticipants: eventParticipants,
      previousScreen: eventStatus === 'EVENT_CANCELLED' ? 'Cancelled' : eventStatus === 'EVENT_FINISHED' ? 'Past' : 'Confirmed'
    });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{eventType === 'ONE_TO_ONE' ? 'Your One to One session' : 'Your group session'}</Text>
      <View style={styles.detailInnerContainer}>
        <Feather name="calendar" size={18} color="#3C8722" />
        <Text style={styles.period}>{eventStartTime.substring(11,16) + ' - ' + eventEndTime.substring(11,16)}</Text>
        <Text style={styles.date}>{getFormattedDate(eventStartTime, true)}</Text>
      </View>
      
      <View style={styles.detailInnerContainer}>
          <Pressable onPress={directToEventDetails}>
            <Text style={styles.details}>Details</Text>
          </Pressable>
        <Feather name="chevron-right" size={24} color="#6A6A6A" />
      </View>
    </View>
  )
}

export default MyActivitiesCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 8,
    shadowColor: '#0000001A',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1
  },
  title: {
    color: '#1A1A1A',
    fontSize: 16,
    fontFamily: 'roboto-bold',
  },
  detailInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4
  }, 
  period: {
    color: '#3C8722',
    fontFamily: 'roboto-medium',
    fontSize: 16,
    marginHorizontal: 8
  },
  date: {
    color: '#3C8722',
    fontFamily: 'roboto-medium',
    fontSize: 16
  },
  details: {
    fontFamily: 'roboto',
    fontSize: 15,
    lineHeight: 18.2,
    color: '#6A6A6A',
    marginRight: 4,
    textDecorationLine: 'underline'
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberContainer: {
    backgroundColor: '#EC2323',
    width: 24,
    height: 24,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8
  },
  number: {
    color: '#FFFFFF',
    fontFamily: 'roboto-medium',
    fontSize: 15
  },
  note: {
    color: '#3B4852',
    fontFamily: 'roboto',
    fontSize: 15,
    lineHeight: 20,
    padding: 8
  }
});