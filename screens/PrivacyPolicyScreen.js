import { useEffect, useContext, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, ScrollView, Pressable } from 'react-native';
import IconButton from '../components/ui/IconButton';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { fetchPrivacyPolicy } from '../utils/http';

function PrivacyPolicyScreen({ navigation, route }) {
  const [privacyPolicy, setPrivacyPolicy] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // console.log('lala content', content);
  // const html = marked.parse(content);
  // console.log('html content', html);

  function previousStepHandler() {
    navigation.goBack();
  };

  useEffect(() => {
    async function getPrivacyPolicy() {
      setIsLoading(true);
      try {
        const content = await fetchPrivacyPolicy();
        setIsLoading(false);
        setPrivacyPolicy(content[0].content);
      } catch (error) {
        setIsLoading(false);
        console.log('fetchPrivacyPolicy', error);
        console.log(error.response.data);
      };
    };

    getPrivacyPolicy();
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} color="black" style={styles.goBackButton} onPress={previousStepHandler} />
        <Text style={styles.headerText}></Text>
        <View style={styles.placeholder}></View>
      </View>
      <ScrollView>
        <Text>{privacyPolicy}</Text>
        {/* <Text>{marked.parse(content)}</Text> */}
      </ScrollView>
    </View>
  )
}

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginTop: 56,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 36,
    marginHorizontal: 16
  }, 
  headerText: {
    fontFamily: 'roboto-bold',
    fontSize: 24,
    color: '#000000E5'
  },
  placeholder: {
    marginRight: 16
  },
  menu: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 170,
  },
  menuInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },  
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  menuText: {
    fontFamily: 'roboto-medium',
    fontSize: 16,
    lineHeight: 20.8,
    color: '#1A1A1A',
    paddingVertical: 16,
    marginLeft: 8
  },
  border: {
    borderBottomColor: '#EAE6E6',
    borderBottomWidth: 1
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  logoutContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 8,
  },
  logout: {
    paddingVertical: 10,
    fontFamily: 'roboto-medium',
    fontSize: 16,
    lineHeight: 22,
    color: '#1A1A1A',
    textAlign: 'center'
  },
  linksContainer: {
    marginTop: 190,
  },
  linkContainer: {
    paddingVertical: 10
  },
  link: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'roboto-medium',
    fontSize: 16,
    lineHeight: 22,
    color: '#1A1A1A'
  },
});