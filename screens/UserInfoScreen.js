import { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { AuthContext } from '../store/context/auth-context';
import { fetchUserInfo } from '../utils/http';
import IconButton from '../components/ui/IconButton';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import AsyncStorage from '@react-native-async-storage/async-storage';

function UserInfoScreen({ navigation }) {
  const [isFetching, setIsFetching] = useState(true);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  // TO COMMENT OUT
  const { tempToken, setUserInfo } = useContext(AuthContext);
  // const { setUserInfo } = useContext(AuthContext);
  // Mike
  // const tempToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';
  // Yining
  // const tempToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwM2I1ODQ5Yy02OGI2LTRkM2EtYjAyYi04YmZhN2RiZjQzMTAiLCJpYXQiOjE2OTQ3Nzg1MzgsImV4cCI6ODY1Njk0Nzc4NTM4fQ.McrptZP_Q3XuSq-p2FGcnK2NGRofm2TqBLJHfIqZYpy8CPYXSe0NkLDyNDei3Y1Q-dXEqo2BYUTRtHhBytAZfA';
  // Hai
  // const tempToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlZDU2ZTBiNi1jY2RhLTRjOGEtYjdjYi05OTY0MjY4NmI0NTgiLCJpYXQiOjE2OTQ3NzUwNDQsImV4cCI6ODY1Njk0Nzc1MDQ0fQ.RI4s3h6uWl39O0ffRpMEWvxBbUfSbpRAdtABcHMCs3dOXpv64_3Hzeu96TeWZD5B1I_0YC4zRM6V5BGXecDnIA';
  // George
  // const tempToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2NjhkYjJlYy1mZmU2LTQ1NDgtYjZjYi1mYzEzNzIwZDgxMGMiLCJpYXQiOjE2OTQ3NzUwODIsImV4cCI6ODY1Njk0Nzc1MDgyfQ.44xtrvzeVvRNrh0Y5PLYBeGm_dEGso2VwM70tY7Oa1rDAWTtP-LitCUah7RDJ7mkAwtGYBt_Ov1e-JG7Ql1EoQ';

  
  useEffect(() => {
    if (tempToken) {
      async function getUserInfo() {
        setIsFetching(true);
        try {
          const userInfo = await fetchUserInfo(tempToken);
          setEmail(userInfo.email);
          setName(userInfo.localizedfirstname + ' ' + userInfo.localizedlastname);
          setAvatarUrl(userInfo.userImage[3]);
          setUserInfo(userInfo);
          AsyncStorage.setItem('user-info', JSON.stringify(userInfo));
        } catch (error) {
          console.log('fetchUserInfo', error);
          console.log(error.response.data);
        };
        setIsFetching(false);
      };

      getUserInfo();
    };
  }, []);

  function previousStepHandler() {
    navigation.navigate('Landing');
  };

  function nextStepHandler() {
    navigation.navigate('UserTags');
  };

  if (isFetching) {
    return <LoadingOverlay />
  };

  return (
    <View style={styles.container}>
      <IconButton icon="arrow-left" size={24} color="black" style={styles.goBackButton} onPress={previousStepHandler} />
      <View style={styles.mainContainer}>
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Is this you?</Text>
            <Image source={{uri: avatarUrl}} style={styles.avatar} />
          </View>
          <View style={styles.userInfoName}>
            <Text style={styles.userInfoTitle}>Name</Text>
            <Text style={styles.userInfoText}>{name}</Text>
          </View>
          <View style={styles.userInfoEmail}>
            <Text style={styles.userInfoTitle}>Email</Text>
            <Text style={styles.userInfoText}>{email}</Text>
          </View>
          <Text style={styles.userInfoNote}>To ensure the authenticity of the account, we temporarily do not support editing personal information.</Text>
        </View>
        <View style={styles.goForwardBtnContainer}>
          <IconButton icon="arrow-right" size={60} color="white" style={styles.goForwardBtn} onPress={nextStepHandler} />
        </View>
      </View>
    </View>
  )
}

export default UserInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  goBackButton: {
    marginTop: 40,
  },
  mainContainer: {
    padding: 16,
    justifyContent: 'space-between',
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  headerText: {
    fontSize: 28,
    fontFamily: 'roboto-bold'
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  userInfoName: {
    marginTop: 36,
  },
  userInfoTitle: {
    marginBottom: 12,
    color: '#4F4F4F',
    fontFamily: 'roboto'
  },
  userInfoText: {
    fontSize: 16,
    fontFamily: 'roboto-medium',
    color: '#000000E5',
  },
  userInfoEmail: {
    marginTop: 20,
  },
  userInfoNote: {
    color: 'rgba(79, 79, 79, 1)',
    marginTop: 20,
    fontFamily: 'roboto'
  },
  goForwardBtnContainer: {
    alignItems: 'flex-end'
  },
  goForwardBtn: {
    backgroundColor: '#1A4821',
    borderRadius: 40,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0
  }
});