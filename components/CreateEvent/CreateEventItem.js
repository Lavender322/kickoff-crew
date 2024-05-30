import { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

function CreateEventItem({ icon, text, placeholder, onPress, expanded }) {
  return (
    <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.itemContainer}>
        <View style={styles.innerContainer}>
          <Feather name={icon} size={18} color="#000000" />
          <Text style={styles.text}>{text}</Text>
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.placeholderText}>{placeholder}</Text>
          <Feather name={expanded ? "chevron-down" : "chevron-right"} size={24} color="#6A6A6A" />
        </View>
      </View>
    </Pressable>
  )
}

export default CreateEventItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomColor:'#F2F2F2',
    borderBottomWidth: 1
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    marginLeft: 8,
    fontFamily: 'roboto-medium',
    fontSize: 17
  },
  placeholderText: {
    color: '#6A6A6A',
    fontSize: 15,
    marginRight: 8,
  },
  pressed: {
    opacity: 0.75
  }
});