import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import IconButton from '../components/ui/IconButton';
import { approveEvent, fetchEvent, joinEvent } from '../utils/http';
import { AuthContext } from '../store/context/auth-context';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { getFormattedDate } from '../utils/date';

function AcceptEventScreen({ navigation, route }) {
  const [isFetching, setIsFetching] = useState(true);
  const [eventDetails, setEventDetails] = useState();

  function previousStepHandler() {
    navigation.goBack();
  };

  const eventId = route.params?.eventId;
  const user = route.params?.user;

  // TO COMMENT OUT
  const { token, userInfo } = useContext(AuthContext);
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';

  useEffect(() => {
    async function acceptEvent() {
      setIsFetching(true);
      try {
        await approveEvent(eventId, user.userId, token);
        // console.log("eventDetails", eventId, eventDetails);
      } catch (error) {
        console.log('approveEvent', error);
        console.log(error.response.data);
      };
      setIsFetching(false);
    };

    acceptEvent();
  }, [eventId]);

  useEffect(() => {
    async function getEventDetails() {
      // setIsFetching(true);
      try {
        const eventDetails = await fetchEvent(token, eventId);
        setEventDetails(eventDetails);
      } catch (error) {
        console.log('fetchEvent', error);
        console.log(error.response.data);
      };
      // setIsFetching(false);
    };

    getEventDetails();
  }, [eventId]);

  if (isFetching) {
    return <LoadingOverlay />;
  };

  return (
    <View style={styles.container}>
      <IconButton icon="arrow-left" size={24} color="black" style={styles.goBackButton} onPress={previousStepHandler}/>
      <View style={styles.mainContainer}>
        <Text style={styles.headerText}>Your Event is booked in!</Text> 
        {eventDetails && eventDetails.eventType === 'ONE_TO_ONE' && (
          <View style={styles.avatarsContainer}>
            <Image source={{uri: userInfo.userImage[3]}} style={styles.avatar} />
            <Image source={{uri: user.userImage[3]}} style={[styles.avatar, styles.avatarRight]} />
          </View>
        )}
        {eventDetails && eventDetails.eventType === 'ONE_TO_ONE' && (
          <Text style={styles.name}>Meet
            <Text style={styles.match}>{' ' + user.localizedfirstname + ' ' + user.localizedlastname}</Text>
            <Text> at</Text>
          </Text>
        )}
        <View style={[styles.detailInnerContainer, styles.timeContainer]}>
          <Feather name="calendar" size={18} color="#3C8722" />
          <Text style={styles.period}>{eventDetails && eventDetails.eventStartTime.substring(11,16) + ' - ' + eventDetails.eventEndTime.substring(11,16)}</Text>
          <Text style={styles.date}>{eventDetails && getFormattedDate(eventDetails.eventStartTime, true)}</Text>
        </View>
        {eventDetails && eventDetails.eventLocation && eventDetails.eventLocation !== '' && (
          <View style={[styles.detailInnerContainer, styles.locationContainer]}>
            <Feather name="map-pin" size={18} color="black" />
            <Text style={styles.location}>{eventDetails && eventDetails.eventLocation}</Text>
          </View>
        )}
        <Text style={styles.note}>You can always reach out to your invitee and share a bit about yourself and your interests during the session.</Text>
        <View>
          <Text style={styles.noteListItem}>{'\u2022'}  Keep the tone positive and light.</Text>
          <Text style={styles.noteListItem}>{'\u2022'}  Be an active listener.</Text>
          <Text style={styles.noteListItem}>{'\u2022'}  Share anecdotes or experiences.</Text>
          <Text style={styles.noteListItem}>{'\u2022'}  Research the other's background.</Text>
        </View>
      </View>
    </View>
  )
}

export default AcceptEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  goBackButton: {
    marginTop: 56,
    marginLeft: 16
  },
  mainContainer: {
    padding: 16,
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 20,
    alignItems: 'center'
  },
  headerText: {
    fontFamily: 'product-sans-bold',
    fontSize: 24,
    color: '#1A4821'
  },
  avatarsContainer: {
    flexDirection: 'row'
  },  
  avatar: {
    width: 120,
    height: 120,
    marginVertical: 36,
    borderRadius: 66,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#ffffff'
  },
  avatarRight: {
    zIndex: 9,
    marginLeft: -40
  },
  match: {
    color: '#3C8722'
  },
  name: {
    fontFamily: 'roboto-bold',
    fontSize: 20,
    lineHeight: 26,
    color: '#000000E5',
  },
  detailInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },  
  roleContainer: {
    marginTop: 12,
  },
  timeContainer: {
    marginTop: 36
  },
  grade: {
    fontFamily: 'roboto-medium',
    fontSize: 16,
    color: '#000000E5',
    marginRight: 12
  },
  sectorContainer: {
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: '#E6E6E6'
  },
  sector: {
    color: '#3B4852',
    fontFamily: 'roboto-medium'
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
  locationContainer: {
    marginTop: 8
  },
  location: {
    fontFamily: 'roboto-medium',
    fontSize: 16,
    color: '#191919',
    marginLeft: 4
  },
  detail: {
    color: '#4F4F4F',
    fontFamily: 'roboto',
    lineHeight: 22,
    fontSize: 15,
    marginTop: 16
  },
  cancel: {
    color: '#1A4821',
    fontFamily: 'roboto',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 36
  }, 
  submitFormContainer: {
    paddingBottom: 80,
    paddingTop: 16,
    paddingHorizontal: 12,
    backgroundColor: 'white'
  },
  submitFormText: {
    fontSize: 16,
    color: '#000000E5',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'roboto'
  },
  submitBtnContainer: {
    backgroundColor: '#1A4821',
    borderRadius: 8,
    paddingVertical: 13,
  },
  submitBtnText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'roboto-medium',
    textAlign: 'center'
  },
  pressed: {
    opacity: 0.75
  },
  note: {
    color: '#1A4821',
    fontFamily: 'roboto-medium',
    fontSize: 15,
    marginTop: 36,
    textAlign: 'center',
    marginBottom: 16
  },
  noteListItem: {
    color: '#1A4821',
    fontFamily: 'roboto',
    fontSize: 15,
    lineHeight: 20
  }
});