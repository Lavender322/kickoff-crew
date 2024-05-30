import { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, KeyboardAvoidingView, TextInput, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

function NotesScreen({ navigation, route }) {
  const notes = route.params && route.params.notes;

  const [flag, setFlag] = useState(false);
  const [enteredText, setEnteredText] = useState(notes);
  const [previewText, setPreviewText] = useState('');

  useEffect(() => {
    if (enteredText.length !== 0) {
      setFlag(true);
      if (enteredText.length <= 13) {
        setPreviewText(enteredText);
      } else {
        setPreviewText(enteredText.substring(0,13) + '...');
      };
    } else {
      setFlag(false);
    };
  }, [enteredText]);

  function textInputHandler(enteredText) {
    setEnteredText(enteredText);
  };

  function previousStepHandler() {
    navigation.goBack();
  };

  function comfirmNotesHandler() {
    if (flag) {
      navigation.navigate('CreateEvent', {
        previewNotes: previewText,
        notes: enteredText
      });
    };
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.headerContainer}>
          <View style={styles.placeholder}></View>
          <View style={styles.innerContainer}>
            <Feather name='file-text' size={18} color="#000000" />
            <Text style={styles.title}>Notes</Text>
          </View>
          <Pressable onPress={previousStepHandler} style={({pressed}) => [pressed && styles.pressed, styles.placeholder, styles.closeBtnContainer]}>
            <View style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="black" />
            </View>
          </Pressable>
        </View>

        <View style={styles.noteContainer}>
          <Text style={styles.note}>Please add details about the event or the topics that will be covered, The copy aims to encourage users to register for the event.</Text>
        </View> 

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
          <Pressable onPress={comfirmNotesHandler} style={({pressed}) => flag && pressed && styles.pressed}>
            <View style={[styles.submitFormBtnContainer, flag && styles.enabledContainer]}>
              <Text style={[styles.submitFormBtnText, flag && styles.enabledText]}>Done</Text>
            </View>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default NotesScreen;

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
  }
});