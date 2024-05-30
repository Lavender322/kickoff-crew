import { StyleSheet, View, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

function IconButton({ icon, size, color, onPress, style }) {
  return (
    <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
      <View style={style}>
        <Feather name={icon} size={size} color={color} />
      </View>
    </Pressable>
  )
}

export default IconButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75
  }
});