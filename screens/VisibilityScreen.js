import { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, KeyboardAvoidingView, TextInput, Text, Switch, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { fetchTags } from '../utils/http';
import VisibilityFilter from '../components/CreateEvent/VisibilityFilter';

function VisibilityScreen({ navigation, route }) {
  const grade = route.params && route.params.selectedGrade;
  const industry = route.params && route.params.selectedIndustry;
  const allGrade = route.params && route.params.allGrade;
  const allIndustry = route.params && route.params.allIndustry;

  // console.log('selected', grade.length, industry.length, allGrade.length, allIndustry.length);

  const [flag, setFlag] = useState(true);
  const [isEnabled, setIsEnabled] = useState((!!grade && !!industry && (grade.length !== 6 || industry.length !== 7)) ? false : true);
  const [showGrade, setShowGrade] = useState(false);
  const [showSector, setShowSector] = useState(false);
  const [sectorTags, setSectorTags] = useState([]);
  const [gradeTags, setGradeTags] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(grade);
  const [selectedIndustry, setSelectedIndustry] = useState(industry);
  const [numSelectedGrade, setNumSelectedGrade] = useState();
  const [numSelectedIndustry, setNumSelectedIndustry] = useState();
  const [gradeFilterApplied, setGradeFilterApplied] = useState(false);
  const [industryFilterApplied, setIndustryFilterApplied] = useState(false);
  const [showSelectedGrade, setShowSelectedGrade] = useState(false);
  const [showSelectedIndustry, setShowSelectedIndustry] = useState(false);

  // console.log('numSelectedGrade', numSelectedGrade);
  // console.log('numSelectedIndustry', numSelectedIndustry);

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

  useEffect(() => {
    if (isEnabled) {
      setFlag(true);
      setSelectedGrade(allGrade);
      setSelectedIndustry(allIndustry);
    } else {
      if (selectedGrade && selectedGrade.length && selectedIndustry && selectedIndustry.length) {
        setFlag(true);
      } else {
        setFlag(false);
      }
    };
  }, [isEnabled, selectedGrade, selectedIndustry]);

  function previousStepHandler() {
    navigation.goBack();
  };

  function comfirmVisibilityHandler() {
    if (flag) {
      // console.log('selectedGrade', selectedGrade)
      // console.log('selectedIndustry', selectedIndustry)
      navigation.navigate('CreateEvent', {
        gradeVisibility: selectedGrade,
        sectorVisibility: selectedIndustry,
        previewVisibility: (selectedGrade.length + selectedIndustry.length !== 0 && selectedGrade.length + selectedIndustry.length !== 13) && selectedGrade.length + selectedIndustry.length + ' criteria applied'
      });
    };
  };

  function toggleGradeAccordionHandler() {
    if (!showGrade) {
      setShowSector(false);
    };
    setShowGrade(!showGrade);
  };

  function toggleSectorAccordionHandler() {
    if (!showSector) {
      setShowGrade(false);
    };
    setShowSector(!showSector);
  };

  function selectGradeFilterHandler(numFilters) {
    // console.log('grade', numFilters);
    // setNumSelectedGrade(numFilters);
    // if (numFilters > 0) {
    //   setGradeFilterApplied(true);
    // } else {
    //   setGradeFilterApplied(false);
    // };
    // setShowSelectedGrade(false);
  };

  function selectIndustryFilterHandler(numFilters) {
    // setNumSelectedIndustry(numFilters);
    // if (numFilters > 0) {
    //   setIndustryFilterApplied(true);
    // } else {
    //   setIndustryFilterApplied(false);
    // };
    // setShowSelectedIndustry(false);
  };

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.headerContainer}>
          <View style={styles.placeholder}></View>
          <View style={styles.innerContainer}>
            <Feather name='eye' size={18} color="#000000" />
            <Text style={styles.title}>Visibility</Text>
          </View>
          <Pressable onPress={previousStepHandler} style={({pressed}) => [pressed && styles.pressed, styles.placeholder, styles.closeBtnContainer]}>
            <View style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="black" />
            </View>
          </Pressable>
        </View>

        <ScrollView>
          <View style={styles.noteContainer}>
            <Text style={styles.note}>Select visibility preferences for your event using grade and industry filters.</Text>
          </View> 

          <View style={styles.switchContainer}>
            <Switch 
              trackColor={{false: '#919191', true: '#3C8722'}}
              thumbColor={isEnabled ? '#FFFFFF' : '#FFFFFF'}
              ios_backgroundColor="#919191"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={styles.switchText}>Public for all grades & industries users</Text>
          </View>

          <View style={[isEnabled && styles.hide, styles.accordionContainer]}>
            <Pressable onPress={toggleGradeAccordionHandler}>
              <View style={styles.accordionHeader}>
                <Text style={styles.accordionHeaderTitle}>Grade</Text>
                <Feather name="chevron-down" size={24} color="#1A1A1A" />
              </View>
            </Pressable>
            <View style={styles.filtersOuterContainer}>
              <View style={[!showGrade && styles.hide, styles.filtersContainer]}>
                <VisibilityFilter
                  style={styles.filters}
                  filters={gradeTags}
                  selectFilter={selectGradeFilterHandler}
                  selectedFilter={selectedGrade}
                  setSelectedFilter={setSelectedGrade}
                  // setUpdateEventList 
                /> 
              </View>
            </View>
          </View>

          <View style={[isEnabled && styles.hide, styles.accordionContainer]}>
            <Pressable onPress={toggleSectorAccordionHandler}>
              <View style={styles.accordionHeader}>
                <Text style={styles.accordionHeaderTitle}>Industry</Text>
                <Feather name="chevron-down" size={24} color="#1A1A1A" />
              </View>
            </Pressable>
            <View style={styles.filtersOuterContainer}>
              <View style={[!showSector && styles.hide, styles.filtersContainer]}>
                <VisibilityFilter
                  style={styles.filters}
                  filters={sectorTags}
                  selectFilter={selectIndustryFilterHandler}
                  selectedFilter={selectedIndustry}
                  setSelectedFilter={setSelectedIndustry}
                  // setUpdateEventList 
                /> 
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.submitFormContainer}>
          <Pressable onPress={(comfirmVisibilityHandler)} style={({pressed}) => pressed && flag && styles.pressed}>
            <View style={[styles.submitFormBtnContainer, flag && styles.enabledContainer]}>
              <Text style={[styles.submitFormBtnText, flag && styles.enabledText]}>Done</Text>
            </View>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default VisibilityScreen;

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
    marginBottom: 80,
    paddingHorizontal: 12,
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
    position: 'relative',
    zIndex: 100,
  },
  filtersContainer: {
    position: 'relative',
    width: '100%'
  },
  filtersOuterContainer: {
  }
});