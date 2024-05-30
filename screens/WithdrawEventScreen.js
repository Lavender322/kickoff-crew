import { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Pressable, KeyboardAvoidingView, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { getFormattedDate } from '../utils/date';
import { withdrawEvent } from '../utils/http';
import { AuthContext } from '../store/context/auth-context';

function WithdrawEventScreen({ navigation, route }) {
  const [eventHostGradeTag, setEventHostGradeTag] = useState();
  const [eventHostSectorTag, setEventHostSectorTag] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TO COMMENT OUT
  const { token } = useContext(AuthContext);
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';  

  const sectorTags = route.params?.sectorTags;
  const gradeTags = route.params?.gradeTags;
  const eventId = route.params?.eventId;
  const eventHost = route.params?.eventHost;
  const eventStartTime = route.params?.eventStartTime;
  const eventEndTime = route.params?.eventEndTime;
  const eventLocation = route.params?.eventLocation;

  useEffect(() => {
    if (eventHost && eventHost.userTag && gradeTags.length && sectorTags.length) {
      const eventHostGradeTag = gradeTags.filter((gradeTag) => {
        return eventHost.userTag.includes(gradeTag.tagId);
      });
    
      const eventHostSectorTag = sectorTags.filter((sectorTag) => {
        return eventHost.userTag.includes(sectorTag.tagId);
      });
  
      setEventHostGradeTag(eventHostGradeTag[0] && eventHostGradeTag[0].tagName);
      setEventHostSectorTag(eventHostSectorTag[0] && eventHostSectorTag[0].tagName);
    };
  }, [eventHost, gradeTags, sectorTags]);

  function previousStepHandler() {
    navigation.goBack();
  };

  async function comfirmWithdrawalHandler(eventId, token) {
    setIsSubmitting(true);
    try {
      await withdrawEvent(eventId, token);
      navigation.navigate('Activities');
    } catch (error) {
      console.log("withdrawEvent", error);
      console.log(error.response.data);
      setIsSubmitting(false);
      // setError('Could not save data - please try again later!');
    };
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.headerContainer}>
          <Pressable onPress={previousStepHandler} style={({pressed}) => [pressed && styles.pressed, styles.placeholder, styles.closeBtnContainer]}>
            <View style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="black" />
            </View>
          </Pressable>
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Withdraw this request?</Text>
            <Image source={{uri: eventHost.userImage[3]}} style={styles.avatar} />
            <Text style={styles.name}>{eventHost.localizedfirstname + ' ' + eventHost.localizedlastname}</Text>
            <View style={[styles.detailInnerContainer, styles.roleContainer]}>
              <View style={styles.gradeContainer}>
                <Text style={styles.grade}>{eventHostGradeTag ? eventHostGradeTag : '--'}</Text> 
              </View>
              <View style={styles.sectorContainer}>
                <Text style={styles.sector}>{eventHostSectorTag ? eventHostSectorTag : '--'}</Text>
              </View>
            </View>
            <View style={[styles.detailInnerContainer, styles.timeContainer]}>
              <Feather name="calendar" size={18} color="#3C8722" />
              <Text style={styles.period}>{eventStartTime.substring(11,16) + ' - ' + eventEndTime.substring(11,16)}</Text>
              <Text style={styles.date}>{getFormattedDate(eventStartTime, true)}</Text>
            </View>
            {eventLocation && eventLocation !== '' && (
              <View style={[styles.detailInnerContainer, styles.locationContainer]}>
                <Feather name="map-pin" size={18} color="black" />
                <Text style={styles.location}>{eventLocation}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.submitFormContainer}>
          <Pressable onPress={(comfirmWithdrawalHandler.bind(this, eventId, token))} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.submitFormBtnContainer}>
              <Text style={[styles.submitFormBtnText, styles.enabledText]}>Yes, withdraw it</Text>
            </View>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default WithdrawEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },  
  headerContainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 26,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  closeBtnContainer: {
    alignItems: 'flex-end'
  },
  closeBtn: {
    width: 40,
    height: 40,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23
  },
  title: {
    fontFamily: 'product-sans-bold',
    fontSize: 24,
    color: '#1A4821',
    textAlign: 'center'
  },
  pressed: {
    opacity: 0.75
  },
  textInput: {
    color: '#191919',
    fontSize: 15,
    fontFamily: 'roboto',
    lineHeight: 20,
    height: 100,
    textAlignVertical: 'top',
    borderColor: '#0000001A',
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
  },
  note: {
    color: '#1A1A1A',
    fontFamily: 'roboto-bold',
    lineHeight: 16,
    fontSize: 16,
    marginBottom: 24
  },
  capacityContainer: {
    alignItems: 'center',
    marginTop: 36
  },
  number: {
    fontFamily: 'roboto-bold',
    fontSize: 48,
    color: '#1A1A1A'
  },
  capacityText: {
    fontFamily: 'roboto',
    color: '#4F4F4F',
    lineHeight: 20
  },
  infoContainer: {
    alignItems: 'center'
  },
  submitFormContainer: {
    marginBottom: 80,
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
  submitFormBtnContainer: {
    backgroundColor: '#1A4821',
    borderRadius: 8,
    paddingVertical: 13,
  },
  submitFormBtnText: {
    color: '#6A6A6A',
    fontSize: 16,
    fontFamily: 'roboto-medium',
    textAlign: 'center'
  },
  enabledText: {
    color: 'white'
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    marginTop: 36
  },
  switchText: {
    color: '#000000E5',
    fontFamily: 'roboto-medium',
    fontSize: 16,
    marginLeft: 8
  },
  accordionContainer: {
    marginTop: 50,
    marginHorizontal: 12
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F1F1F1',
    padding: 8,
    borderRadius: 6,
    zIndex: 2
  },
  accordionHeaderTitle: {
    color: '#1A1A1A',
    fontFamily: 'roboto-medium',
    fontSize: 15,
    lineHeight: 22
  },
  hide: {
    display: 'none'
  },
  filters: {
    zIndex: 100
  },
  filtersContainer: {
    position: 'absolute',
    width: '100%'
  },
  mainContainer: {
    flex: 1,
  },
  avatar: {
    width: 120,
    height: 120,
    marginVertical: 36,
    borderRadius: 66,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  detailInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },  
  timeContainer: {
    marginTop: 16
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
  name: {
    fontFamily: 'roboto-bold',
    fontSize: 16,
    color: '#1A1A1A',
  },
  roleContainer: {
    marginTop: 4,
  },
  grade: {
    fontFamily: 'roboto-medium',
    fontSize: 12,
    lineHeight: 14,
    color: '#3B4852',
    
  },
  sectorContainer: {
    borderRadius: 2,
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: '#E9E9E9'
  },
  gradeContainer: {
    borderRadius: 2,
    paddingVertical: 2,
    paddingRight: 6,
    backgroundColor: '#F8F8F8',
    marginRight: 4
  },
  sector: {
    color: '#3B4852',
    fontFamily: 'roboto-medium',
    fontSize: 12,
    lineHeight: 14
  },
  textInputOuterContainer: {
    marginHorizontal: 40,
    marginTop: 40,
  }
});