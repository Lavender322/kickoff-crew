import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getFormattedDate } from '../../utils/date';
import { useNavigation } from '@react-navigation/native';
import { fetchActivity } from '../../utils/http';
import { AuthContext } from '../../store/context/auth-context';
import GroupProfilePictures from '../GroupProfilePictures';

function ActivitiesSentCard({ eventId, eventHost, eventType, alreadyParticipatedNumber, eventName, eventStartTime, eventEndTime, eventLocation, sectorTags, gradeTags, isCancelled, isPast}) {
  const [isFetchingActivity, setIsFetchingActivity] = useState(true);
  const [eventParticipants, setEventParticipants] = useState([]);

  // TO COMMENT OUT
  const { token, userInfo } = useContext(AuthContext);
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';
    
  const navigation = useNavigation();

  useEffect(() => {
    async function getActivity() {
      setIsFetchingActivity(true);
      try {
        const activity = await fetchActivity(eventId, token);
        // console.log("activity", activity);
        setEventParticipants(activity.participants);
      } catch (error) {
        console.log('fetchActivity', error);
        console.log(error.response.data);
      };
      setIsFetchingActivity(false);
    };
    
    if ((isCancelled || isPast) && (userInfo.userId === eventHost.userId || eventType !== 'ONE_TO_ONE')) {
      getActivity();
    } else {
      setIsFetchingActivity(false);
    };
  }, []);

  function directToEventDetails() {
    navigation.navigate('EventDetail', {
      eventId: eventId,
      sectorTags: sectorTags,
      gradeTags: gradeTags,
      previousScreen: isCancelled ? 'Cancelled' : isPast ? 'Past' : 'Sent',
      eventParticipants: eventParticipants
    });
  };

  function requestToWithdrawEventHandler() {
    navigation.navigate('WithdrawEvent', {
      eventId: eventId,
      sectorTags: sectorTags,
      gradeTags: gradeTags,
      eventHost: eventHost,
      eventStartTime: eventStartTime,
      eventEndTime: eventEndTime,
      eventLocation: eventLocation
    });
  };

  function directToMessageHandler() {
    navigation.navigate('ChatDetail', {
      eventHost: eventHost,
      eventParticipants: eventParticipants,
      eventId: eventId,
      eventType: eventType,
      eventName: eventName,
      alreadyParticipatedNumber: alreadyParticipatedNumber
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {!isFetchingActivity && eventType === 'ONE_TO_ONE' && (
          <>
            {!isCancelled && !isPast && (
              <Image source={{uri: eventHost.userImage[3]}} style={styles.avatar} />
            )}
            {(isCancelled || isPast) && userInfo.userId === eventHost.userId && !eventParticipants && (
              <Image source={{uri: userInfo.userImage[3]}} style={styles.avatar} />
            )}
            {(isCancelled || isPast) && eventParticipants && eventParticipants[0] && (
              <Image source={{uri: eventParticipants[0].user.userImage[3]}} style={styles.avatar} />
            )}
            {(isCancelled || isPast) && userInfo.userId !== eventHost.userId &&(
              <Image source={{uri: eventHost.userImage[3]}} style={styles.avatar} />
            )}
          </>
        )}
        {!isFetchingActivity && eventType !== 'ONE_TO_ONE' && (
          <GroupProfilePictures host={eventHost} participants={eventParticipants} isSeparate={true} />
          // <>
          //   {/* {!isCancelled && !isPast && (
          //     <Image source={{uri: eventHost.userImage[3]}} style={styles.avatar} />
          //   )} */}
          //   {(isCancelled || isPast) && eventParticipants && eventParticipants[0] && (
          //     <Image source={{uri: eventParticipants[0].user.userImage[3]}} style={styles.avatar} />
          //   )}
          //   {(isCancelled || isPast) && userInfo.userId !== eventHost.userId &&(
          //     <Image source={{uri: eventHost.userImage[3]}} style={styles.avatar} />
          //   )}
          // </>
        )}
      </View>
      <View style={styles.textContainer}>
        {!isCancelled && !isPast && (
          <Text style={styles.title}>{eventType === 'ONE_TO_ONE' ? 'One to One session with ' : eventName}
            {!isFetchingActivity && eventType === 'ONE_TO_ONE' && (
              <Text style={styles.match}>{eventHost.localizedfirstname + ' ' + eventHost.localizedlastname}</Text>
            )}
          </Text>
        )}
        {(isCancelled || isPast) && userInfo.userId === eventHost.userId && !eventParticipants && (
          <Text style={styles.title}>{eventType === 'ONE_TO_ONE' ? 'One to One session' : eventName}</Text>
        )}
        {(isCancelled || isPast) && userInfo.userId === eventHost.userId && eventParticipants && eventParticipants[0] && (
          <Text style={styles.title}>{eventType === 'ONE_TO_ONE' ? 'One to One session with ' : eventName}
            {!isFetchingActivity && eventType === 'ONE_TO_ONE' && (
              <Text style={styles.match}>
                {eventParticipants[0].user.localizedfirstname + ' ' + eventParticipants[0].user.localizedlastname}</Text>
            )}
          </Text>
        )}
        {(isCancelled || isPast) && userInfo.userId !== eventHost.userId && (
          <Text style={styles.title}>{eventType === 'ONE_TO_ONE' ? 'One to One session with ' : eventName}
            {!isFetchingActivity && eventType === 'ONE_TO_ONE' && (
              <Text style={styles.match}>
                {eventHost.localizedfirstname + ' ' + eventHost.localizedlastname}</Text>
            )}
          </Text>
        )}
        <View style={[styles.detailInnerContainer, !isCancelled && styles.wrap]}>
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
      {!isCancelled && !isPast && (
        <View style={styles.buttonsContainer}>
          <Pressable onPress={() => {}} style={({pressed}) => pressed && styles.pressed}>
            <View style={[styles.statusContainer, styles.pendingContainer]}>
              <Text style={[styles.text, styles.pendingText]}>Pending</Text>
            </View>
          </Pressable>
          <Pressable onPress={requestToWithdrawEventHandler}>
            <View style={styles.withdrawContainer}>
              <Text style={[styles.text, styles.underline]}>withdraw</Text>
            </View>
          </Pressable>
        </View>
      )}
      {isPast && !(userInfo.userId === eventHost.userId && !eventParticipants) && (
        <Pressable onPress={directToMessageHandler} style={({pressed}) => pressed && styles.pressed}>
          <View style={[styles.statusContainer, styles.requestContainer]}>
            <Text style={[styles.text, styles.requestText]}>Message</Text>
          </View>
      </Pressable>
      )}
    </View>
  )
}

export default ActivitiesSentCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 1
  },
  avatarContainer: {
    width: 60,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    flex: 1,
    padding: 4,
    marginHorizontal: 10,
  },
  title: {
    color: '#1A1A1A',
    fontSize: 16,
    fontFamily: 'roboto-bold',
    lineHeight: 21.8
  },
  match: {
    color: '#3C8722'
  },
  detailInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4
  }, 
  wrap: {
    flexWrap: 'wrap'
  },
  period: {
    color: '#3C8722',
    fontFamily: 'roboto-medium',
    fontSize: 16,
    lineHeight: 20.8,
    marginHorizontal: 8
  },
  date: {
    color: '#3C8722',
    fontFamily: 'roboto-medium',
    fontSize: 16,
    lineHeight: 20.8,
    width: '100%'
  },
  details: {
    fontFamily: 'roboto',
    fontSize: 15,
    lineHeight: 18.2,
    color: '#6A6A6A',
    marginRight: 4,
    textDecorationLine: 'underline'
  },
  statusContainer: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 23
  },
  requestContainer: {
    backgroundColor: '#1A4821'
  },
  pendingContainer: {
    backgroundColor: '#6AA173'
  },
  text: {
    fontSize: 16,
    fontFamily: 'roboto'
  },
  requestText: {
    color: '#A6E291'
  },
  pendingText: {
    color: '#1A4821'
  },
  withdrawContainer: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginTop: 10
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  underline: {
    textDecorationLine: 'underline'
  }
});

