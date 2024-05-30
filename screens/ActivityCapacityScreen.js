import { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, KeyboardAvoidingView, TextInput, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

function ActivityCapacityScreen({ navigation }) {
  const [flag, setFlag] = useState(false);
  const [enteredNumber, setEnteredNumber] = useState('');

  function previousStepHandler() {
    navigation.goBack();
  };

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  };

  useEffect(() => {
    if (!isNaN(enteredNumber) && enteredNumber > 1 && enteredNumber < 100) {
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, [enteredNumber]);

  function comfirmCapacityHandler() {
    if (flag) {
      navigation.navigate('CreateEvent', {
        activityCapacity: enteredNumber,
      });
    };
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.headerContainer}>
          <View style={styles.placeholder}></View>
          <View style={styles.innerContainer}>
            <Feather name='users' size={18} color="#000000" />
            <Text style={styles.title}>Activity capacity</Text>
          </View>
          <Pressable onPress={previousStepHandler} style={({pressed}) => [pressed && styles.pressed, styles.placeholder, styles.closeBtnContainer]}>
            <View style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="black" />
            </View>
          </Pressable>
        </View>

        <View style={styles.noteContainer}>
          <Text style={styles.note}>Please set a desired participant limit for your event. If left blank, it will default to unlimited participants.</Text>
        </View> 

        <View style={styles.capacityContainer}>
          <TextInput 
            style={styles.number} 
            maxLength={2}
            placeholder="∞"
            placeholderTextColor="#8F8F8F"
            keyboardType='number-pad'
            onChangeText={numberInputHandler}
            value={enteredNumber}
            autoFocus
          />
          <Text style={styles.capacityText}>participants</Text>
        </View> 

        <View style={styles.submitFormContainer}>
          <Pressable onPress={comfirmCapacityHandler} style={({pressed}) => flag && pressed && styles.pressed}>
            <View style={[styles.submitFormBtnContainer, flag && styles.enabledContainer]}>
              <Text style={[styles.submitFormBtnText, flag && styles.enabledText]}>Done</Text>
            </View>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default ActivityCapacityScreen;

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
    paddingHorizontal: 20
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
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
    fontFamily: 'roboto-bold',
    fontSize: 20,
    color: '#191919',
    marginLeft: 8
  },
  placeholder: {
    flex: 1
  },
  pressed: {
    opacity: 0.75
  },
  noteContainer: {
    marginHorizontal: 12
  },
  note: {
    color: '#4F4F4F',
    fontFamily: 'roboto',
    lineHeight: 20,
    fontSize: 15
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
  submitFormContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 80,
    paddingHorizontal: 12
  },
  submitFormText: {
    fontSize: 16,
    color: '#000000E5',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'roboto'
  },
  submitFormBtnContainer: {
    backgroundColor: '#E6E6E6',
    borderRadius: 8,
    paddingVertical: 13,
  },
  enabledContainer: {
    backgroundColor: '#1A4821'
  },
  submitFormBtnText: {
    color: '#6A6A6A',
    fontSize: 16,
    fontFamily: 'roboto-medium',
    textAlign: 'center'
  },
  enabledText: {
    color: 'white'
  }
});