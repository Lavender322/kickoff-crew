import { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, Image, Platform, Pressable, KeyboardAvoidingView } from 'react-native';
import { AuthContext } from '../store/context/auth-context';
import { addFeedback } from '../utils/http';

function CustomerSupportScreen({ navigation }) {
  const [flag, setFlag] = useState(false);
  const [enteredText, setEnteredText] = useState('');

  const { token, userInfo } = useContext(AuthContext);

  useEffect(() => {
    if (enteredText.length !== 0) {
      setFlag(true);
    } else {
      setFlag(false);
    };
  }, [enteredText]);

  function previousStepHandler() {
    navigation.goBack();
  };

  function textInputHandler(enteredText) {
    setEnteredText(enteredText);
  };

  async function submitCustomerSupportHandler(enteredText) {
    // setIsSubmitting(true);
    try {
      await addFeedback(enteredText, userInfo.email, token);
      navigation.goBack();
    } catch (error) {
      console.log('addFeedback', error);
      console.log(error.response.data);
      // setIsSubmitting(false);
    };  
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.headerContainer}>
          <Pressable onPress={previousStepHandler} style={({pressed}) => [pressed && styles.pressed, styles.placeholder]}>
            <Text style={styles.cancelBtn}>Cancel</Text>
          </Pressable>
          <Text style={styles.title}>Customer Support</Text>
          <View style={styles.placeholder}></View>
        </View>

        <Text style={styles.comment}>If you have any questions or encounter any issues, please feel free to send us a message. We greatly value your feedback, and we will do our best to respond within 24 hours. We are committed to providing you with the best support and service!"</Text>
        <View style={styles.textInputContainer}>
          <TextInput 
            multiline={true}
            style={styles.textInput} 
            placeholder="Please Enter"
            placeholderTextColor="#6A6A6A"
            maxLength={2500}
            onChangeText={textInputHandler}
            value={enteredText}
          />
        </View>

        <View style={styles.submitFormContainer}>
          <Pressable onPress={submitCustomerSupportHandler.bind(this, enteredText)} style={({pressed}) => pressed && flag && styles.pressed}>
            <View style={[styles.submitFormBtnContainer, flag && styles.enabledContainer]}>
              <Text style={[styles.submitFormBtnText, flag && styles.enabledText]}>Submit</Text>
            </View>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
};

export default CustomerSupportScreen;

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
  innerContainer: {
    marginHorizontal: 12,
  }, 
  comment: {
    fontFamily: 'roboto',
    fontSize: 15,
    lineHeight: 20,
    color: '#4F4F4F',
    marginHorizontal: 12
  },
  textInputContainer: {
    marginTop: 36,
    marginBottom: 12,
    marginHorizontal: 12
  },
  textInput: {
    borderColor: '#0000001A',
    borderWidth: 1,
    borderRadius: 6,
    padding: 9,
    color: '#191919',
    fontSize: 15,
    fontFamily: 'roboto',
    lineHeight: 20,
    height: 160,
    textAlignVertical: 'top'
  },
  submitFormContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 80,
    paddingHorizontal: 12
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
  },
});

