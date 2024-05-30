import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import IconButton from '../components/ui/IconButton';
import ActivitiesSentCards from '../components/Activities/ActivitiesSentCards';
import { fetchActivities, fetchTags } from '../utils/http';
import { AuthContext } from '../store/context/auth-context';

function ActivitiesPastScreen({ navigation }) {
  const [isFetchingActivities, setIsFetchingActivities] = useState(true);
  const [loadedActivities, setLoadedActivities] = useState([]);
  const [sectorTags, setSectorTags] = useState([]);
  const [gradeTags, setGradeTags] = useState([]);

  // TO COMMENT OUT
  const { token } = useContext(AuthContext);
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';

  useEffect(() => {
    async function getActivityList() {
      setIsFetchingActivities(true);
      try {
        const activitiesList = await fetchActivities('past', token);
        const displayedActivitiesList = activitiesList.filter(activity =>
          activity.myStateInTheEvent === "APPROVED"
        );
        setLoadedActivities(displayedActivitiesList);
        // console.log('activitiesList', displayedActivitiesList);
      } catch (error) {
        console.log('fetchActivities', error);
        console.log(error.response.data);
      };
      setIsFetchingActivities(false);
    };
    
    getActivityList();
  }, []);

  useEffect(() => {
    async function getTags() {
      // setIsFetching(true);
      try {
        const tags = await fetchTags();
        const fetchedSectorTags = tags.filter(
          tag => tag.tagType === 'team'
        );
        const fetchedGradeTags = tags.filter(
          tag => tag.tagType === 'grade'
        );
        setSectorTags(fetchedSectorTags);
        setGradeTags(fetchedGradeTags);
      } catch (error) {
        console.log('fetchTags', error);
        console.log(error.response.data);
      };
      // setIsFetching(false);
    };

    getTags();
  }, []);

  function previousStepHandler() {
    navigation.navigate('Profile');
  };

  function directToCancelledHandler() {
    navigation.navigate('ActivitiesCancelled');
  };

  return (
    <View style={styles.container}>
      <IconButton icon="arrow-left" size={24} color="black" style={styles.goBackButton} onPress={previousStepHandler}/>
      <Text style={styles.headerText}>Past Activities</Text>
      <View style={styles.menu}>
        <Pressable style={[styles.categoryItemContainer, styles.categoryItemActiveContainer]}>
          <View style={styles.menuItem}>
            <Text style={[styles.categoryText, styles.categoryActiveText]}>Past</Text>
          </View>
        </Pressable>
        <Pressable style={[styles.categoryItemContainer,styles.categoryItemInactiveContainer]} onPress={directToCancelledHandler}>
          <View style={styles.menuItem}>
            <Text style={[styles.categoryText, styles.categoryInactiveText]}>Cancelled</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.mainContainer}>
        <ActivitiesSentCards 
          activities={loadedActivities} 
          isFetchingActivities={isFetchingActivities} 
          sectorTags={sectorTags} 
          gradeTags={gradeTags} 
          isPast={true}
        />
      </View>
    </View>
  );
};

export default ActivitiesPastScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  goBackButton: {
    marginTop: 56,
    marginLeft: 16
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'roboto-bold',
    marginTop: 24,
    marginLeft: 20,
    marginBottom: 16,
    color: '#000000E5'
  },
  menu: {
    flexDirection: 'row'
  },
  categoryItemContainer: {
    height: 48,
    width: '50%',
    borderBottomWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryItemActiveContainer: {
    borderBottomColor: '#3C8722'
  },
  categoryItemInactiveContainer: {
    borderBottomColor: '#C6C6C6'
  },
  categoryText: {
    fontFamily: 'roboto-medium',
    fontSize: 15,
    lineHeight: 21
  },
  categoryInactiveText: {
    color: '#6A6A6A'
  },
  categoryActiveText: {
    color: '#3C8722'
  },
  mainContainer: {
    flex: 1
  }
});