import { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ActivitiesReceivedItem({ user, eventId, sectorTags, gradeTags }) {
  const [eventApplicantSectorTag, setEventApplicantSectorTag] = useState();
  const [eventApplicantGradeTag, setEventApplicantGradeTag] = useState();
  
  const navigation = useNavigation();
 
  useEffect(() => {
    if (user && user.userTag) {
      const eventApplicantGradeTag = gradeTags.filter((gradeTag) => {
        return user.userTag.includes(gradeTag.tagId);
      });
    
      const eventApplicantSectorTag = sectorTags.filter((sectorTag) => {
        return user.userTag.includes(sectorTag.tagId);
      });
  
      setEventApplicantGradeTag(eventApplicantGradeTag[0] && eventApplicantGradeTag[0].tagName);
      setEventApplicantSectorTag(eventApplicantSectorTag[0] && eventApplicantSectorTag[0].tagName);
    };
  }, [user]);

  function requestToApproveEventHandler() {
    navigation.navigate('AcceptEvent', {
      eventId: eventId,
      user: user
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.badgeOuterContainer}>
          {/* {eventHost.id === 6 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badge}>New</Text>
            </View>
          )} */}

          <View style={styles.inactiveBadgeContainer}>
          </View>
        </View>
        <Image source={{uri: user.userImage[3]}} style={styles.avatar} />
        <View style={styles.infoOuterContainer}>
          <Text style={styles.name}>{user.localizedfirstname + ' ' + user.localizedlastname}</Text>
          <View style={styles.infoInnerContainer}>
            <Text style={styles.grade}>{eventApplicantGradeTag ? eventApplicantGradeTag : '--'}</Text>
            <View style={styles.sectorContainer}>
              <Text style={styles.sector}>{eventApplicantSectorTag ? eventApplicantSectorTag : '--'}</Text>
            </View>
          </View>
        </View>
      </View>
      <Pressable onPress={requestToApproveEventHandler} style={({pressed}) => pressed && styles.pressed}>
      <View style={[styles.statusContainer, styles.requestContainer]}>
            <Text style={[styles.text, styles.requestText]}>Accept</Text>
          </View>
      </Pressable>
    </View>
  )
}

export default ActivitiesReceivedItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1, 
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  badgeOuterContainer: {
    width: 28
  },
  inactiveBadgeContainer: {
    backgroundColor: '#E9E9E9',
    width: 9,
    height: 9,
    borderRadius: 4.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeContainer: {
    backgroundColor: '#EC2323',
    width: 17,
    height: 17,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  badge: {
    fontFamily: 'roboto-medium',
    fontSize: 7,
    color: 'white'
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 30
  },
  infoOuterContainer: {
    padding: 4,
    marginRight: 30,
    justifyContent: 'space-between',
  },  
  name: {
    fontFamily: 'roboto-bold',
    fontSize: 16,
    color: '#1A1A1A',
  },
  infoInnerContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 1,
    marginTop: 4
  },
  grade: {
    color: '#3B4852',
    marginRight: 10,
    fontFamily: 'roboto-medium',
    fontSize: 13
  },
  sectorContainer: {
    backgroundColor: '#E9E9E9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2
  },
  sector: {
    color: '#3B4852',
    fontFamily: 'roboto-medium',
    fontSize: 13
  },
  period: {
    color: '#3C8722',
    fontSize: 16,
    fontFamily: 'roboto-medium',
    marginRight: 5
  },
  date: {
    color: '#3B4852',
    fontFamily: 'roboto-medium'
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
  pressed: {
    opacity: 0.75
  }
});