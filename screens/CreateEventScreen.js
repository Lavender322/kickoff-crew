import { StyleSheet, View, Pressable, Text } from 'react-native';
import CreateEventForm from '../components/CreateEvent/CreateEventForm';

function CreateEventScreen({ navigation }) {
  function previousStepHandler() {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable onPress={previousStepHandler} style={({pressed}) => [pressed && styles.pressed, styles.placeholder]}>
          <Text style={styles.cancelBtn}>Cancel</Text>
        </Pressable>
        <Text style={styles.title}>New Event</Text>
        <View style={styles.placeholder}></View>
      </View>

      <CreateEventForm />
    </View>
  )
}

export default CreateEventScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },  
  headerContainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 26,
    alignItems: 'center'
  },
  cancelBtn: {
    color: '#474747',
    fontSize: 20,
    paddingVertical: 9,
    paddingHorizontal: 18
  },
  title: {
    fontFamily: 'roboto-bold',
    fontSize: 20,
    color: '#191919',
  },
  placeholder: {
    flex: 1
  },
  pressed: {
    opacity: 0.75
  },
  form: {
    flex: 1
  }
});