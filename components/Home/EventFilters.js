import { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../../store/context/auth-context";
import { fetchCategoryList } from "../../utils/http";
import EventFilter from "./EventFilter";

function EventFilters({
  style,
  setSelectedCategory,
  setSelectedSkillLevel,
  setSelectedGroup,
  setUpdateEventList,
}) {
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [groupFilters, setGroupFilters] = useState([]);
  const [skillLevelFilters, setSkillLevelFilters] = useState([
    "beginner",
    "intermediate",
    "expert",
  ]);
  const [showCategory, setShowCategory] = useState(false);
  const [showSkillLevel, setShowSkillLevel] = useState(false);
  const [showGroup, setShowGroup] = useState(false);
  const [categoryFilterApplied, setCategoryFilterApplied] = useState(false);
  const [skillLevelFilterApplied, setSkillLevelFilterApplied] = useState(false);
  const [groupFilterApplied, setGroupFilterApplied] = useState(false);
  const [numSelectedCategory, setNumSelectedCategory] = useState();
  const [numSelectedSkillLevel, setNumSelectedSkillLevel] = useState();
  const [numSelectedGroup, setNumSelectedGroup] = useState();

  // TO COMMENT OUT
  const { token } = useContext(AuthContext);
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';

  useEffect(() => {
    fetchCategoryList()
      .then((res) => {
        // setIsLoading(false);
        console.log("res", res.data.categories);
        setCategoryFilters(
          res.data.categories.map((category) => category.name)
        );
      })
      .catch((err) => {
        // setIsError(true);
      });
  }, []);

  function onToggleCategoryFilters() {
    setShowCategory(!showCategory);
    setShowSkillLevel(false);
    setShowGroup(false);
  }

  function onToggleSkillLevelFilters() {
    setShowSkillLevel(!showSkillLevel);
    setShowCategory(false);
    setShowGroup(false);
  }

  function onToggleGroupFilters() {
    setShowGroup(!showGroup);
    setShowCategory(false);
    setShowSkillLevel(false);
  }

  function selectedCategoryFilterHandler(numFilters) {
    setNumSelectedCategory(numFilters);
    if (numFilters > 0) {
      setCategoryFilterApplied(true);
    } else {
      setCategoryFilterApplied(false);
    }
    setShowCategory(false);
  }

  function selectedSkillLevelFilterHandler(numFilters) {
    setNumSelectedSkillLevel(numFilters);
    if (numFilters > 0) {
      setSkillLevelFilterApplied(true);
    } else {
      setSkillLevelFilterApplied(false);
    }
    setShowSkillLevel(false);
  }

  function selectedGroupFilterHandler(numFilters) {
    setNumSelectedGroup(numFilters);
    if (numFilters > 0) {
      setGroupFilterApplied(true);
    } else {
      setGroupFilterApplied(false);
    }
    setShowGroup(false);
  }

  return (
    <View style={[styles.outerContainer, style]}>
      <View style={styles.container}>
        <Pressable
          onPress={onToggleCategoryFilters}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <View
            style={[
              styles.dropdownContainer,
              categoryFilterApplied && styles.colorContainer,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                categoryFilterApplied && styles.colorText,
              ]}
            >
              Category
            </Text>
            <View style={styles.numSelectedContainer}>
              {categoryFilterApplied && (
                <Text style={styles.numSelected}>{numSelectedCategory}</Text>
              )}
            </View>
            <Feather
              name="chevron-down"
              size={24}
              color={categoryFilterApplied ? "white" : "#1A1A1A"}
            />
          </View>
        </Pressable>
        <Pressable
          onPress={onToggleSkillLevelFilters}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <View
            style={[
              styles.dropdownContainer,
              skillLevelFilterApplied && styles.colorContainer,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                skillLevelFilterApplied && styles.colorText,
              ]}
            >
              Skill Level
            </Text>
            <View style={styles.numSelectedContainer}>
              {skillLevelFilterApplied && (
                <Text style={styles.numSelected}>{numSelectedSkillLevel}</Text>
              )}
            </View>
            <Feather
              name="chevron-down"
              size={24}
              color={skillLevelFilterApplied ? "white" : "#1A1A1A"}
            />
          </View>
        </Pressable>
        <Pressable
          onPress={onToggleGroupFilters}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <View
            style={[
              styles.dropdownContainer,
              groupFilterApplied && styles.colorContainer,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                groupFilterApplied && styles.colorText,
              ]}
            >
              Sort by
            </Text>
            <View style={styles.numSelectedContainer}>
              {groupFilterApplied && (
                <Text style={styles.numSelected}>{numSelectedGroup}</Text>
              )}
            </View>
            <Feather
              name="chevron-down"
              size={24}
              color={groupFilterApplied ? "white" : "#1A1A1A"}
            />
          </View>
        </Pressable>
      </View>
      {/* Category */}
      <View style={[!showCategory && styles.hide, styles.filtersContainer]}>
        <EventFilter
          filters={categoryFilters}
          selectFilters={selectedCategoryFilterHandler}
          setSelectedFilter={setSelectedCategory}
          setUpdateEventList={setUpdateEventList}
        />
      </View>
      {/* Skill Level */}
      <View
        style={[
          !showSkillLevel && styles.hide,
          styles.filtersContainer,
          styles.industryFiltersContainer,
        ]}
      >
        <EventFilter
          filters={skillLevelFilters}
          selectFilters={selectedSkillLevelFilterHandler}
          setSelectedFilter={setSelectedSkillLevel}
          setUpdateEventList={setUpdateEventList}
        />
      </View>
      {/* <View style={[!showGroup && styles.hide, styles.filtersContainer, styles.groupFiltersContainer]}> */}

      {/* Sort by */}
      <View style={[!showGroup && styles.hide, styles.filtersContainer]}>
        <EventFilter
          filters={groupFilters}
          isGroupFilters={true}
          selectFilters={selectedGroupFilterHandler}
          setSelectedFilter={setSelectedGroup}
          setUpdateEventList={setUpdateEventList}
        />
      </View>
    </View>
  );
}

export default EventFilters;

const styles = StyleSheet.create({
  outerContainer: {
    position: "relative",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 8,
    marginTop: 16,
    marginRight: 8,
  },
  colorContainer: {
    backgroundColor: "#3C8722",
  },
  filterText: {
    fontFamily: "roboto-medium",
    color: "#1A1A1A",
    marginRight: 4,
  },
  colorText: {
    color: "white",
  },
  filtersContainer: {
    position: "absolute",
    top: 60,
  },
  industryFiltersContainer: {
    // left: 90
    left: 107.5,
  },
  groupFiltersContainer: {
    // left: 192
    left: 229,
  },
  hide: {
    display: "none",
  },
  pressed: {
    opacity: 0.75,
  },
  numSelectedContainer: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  numSelected: {
    color: "#3C8722",
    fontFamily: "roboto-medium",
    fontSize: 12,
  },
});
