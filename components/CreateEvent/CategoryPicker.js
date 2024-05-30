import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import DatePickerItem from "./DatePickerItem";
import { getEventDates, getCurrentMonth } from "../../utils/date";
import { fetchCategoryList } from "../../utils/http";
import CategoryPickerItem from "./CategoryPickerItem";

function CategoryPicker({
  categories,
  setSelectedCategory,
  setPreviewCategory,
  setSelectedCategoryIndex,
  selectedCategoryIndex,
  selectedCategory,
  selectedOtherCategory,
}) {
  const [isSelectedDate, setIsSelectedDate] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  useEffect(() => {
    let updatedIsSelectedDate = [...isSelectedDate];
    updatedIsSelectedDate[selectedCategoryIndex] = true;
    setIsSelectedDate(updatedIsSelectedDate);
  }, []);

  const eventDates = getEventDates();

  function selectCategoryHandler(idx) {
    let updatedIsSelectedDate = [...isSelectedDate];
    updatedIsSelectedDate[idx] = true;
    updatedIsSelectedDate.map((date, i) => {
      i !== idx && (updatedIsSelectedDate[i] = false);
    });
    setIsSelectedDate(updatedIsSelectedDate);
    setSelectedCategory(categories[idx]);
    // if (selectedOtherCategory)
    // setPreviewCategory(categories[idx]);
    setSelectedCategoryIndex(idx);
    setSelectedMonth(eventDates[idx].month + ", " + eventDates[idx].year);
  }

  useEffect(() => {
    if (selectedCategory === "other") {
      if (selectedOtherCategory) {
        setPreviewCategory(selectedOtherCategory);
      } else {
        setPreviewCategory("Please Enter");
      }
    } else {
      setPreviewCategory(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <View style={styles.outerContainer}>
      <ScrollView horizontal style={styles.container}>
        {categories.map((category, idx) => (
          <CategoryPickerItem
            key={idx}
            category={category}
            active={isSelectedDate[idx]}
            onPress={selectCategoryHandler.bind(this, idx)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default CategoryPicker;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#F2F2F2",
    paddingVertical: 18,
  },
  container: {
    paddingHorizontal: 16,
  },
  text: {
    color: "#1A1A1A",
    lineHeight: 20.8,
    fontFamily: "roboto-medium",
    fontSize: 16,
    marginBottom: 8,
    paddingLeft: 16,
  },
});
