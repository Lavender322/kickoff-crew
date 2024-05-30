import { StyleSheet, Text, View } from 'react-native';

function TagItem({ tagText, isSelected }) {
  return (
    <View style={[styles.tagContainer, isSelected && styles.selectedContainer]}>
      <Text style={[styles.tagText, isSelected && styles.selectedText]}>{tagText}</Text>
    </View>
  )
}

export default TagItem

const styles = StyleSheet.create({
  tagContainer: {
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#E6E6E6'
  },
  tagText: {
    color: '#000000E5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontFamily: 'roboto'
  },
  selectedContainer: {
    backgroundColor: '#1A4821',
  },
  selectedText: {
    color: '#FFFFFFE5',
  }
  
});