import {StyleSheet} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {InputPropTypes} from '../types';

const Input = ({inputValue, handleInput, handleSubmit}: InputPropTypes) => {
  const {
    colors: {
      primary,
      onSurface,
      elevation: {level0, level1, level2, level3},
    },
  } = useTheme();

  const iconBackgroundColor = inputValue ? onSurface : 'transparent';

  return (
    <TextInput
      mode="outlined"
      activeOutlineColor={level0}
      outlineColor={level0}
      selectionColor={primary}
      textColor={primary}
      placeholderTextColor={level1}
      placeholder="Send a message..."
      outlineStyle={styles.outline}
      style={{...styles.input, backgroundColor: level3}}
      onChangeText={handleInput}
      value={inputValue}
      right={
        <TextInput.Icon
          disabled={!inputValue}
          onPress={handleSubmit}
          icon={() => (
            <Ionicons
              name="ios-send"
              size={18}
              color={inputValue ? 'white' : level2}
              style={[styles.icon, {backgroundColor: iconBackgroundColor}]}
            />
          )}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  input: {
    minWidth: '90%',
    alignSelf: 'center',
    marginBottom: 15,
  },
  outline: {
    borderRadius: 10,
  },
  icon: {
    paddingVertical: 7,
    paddingRight: 7,
    paddingLeft: 8,
    borderRadius: 100,
  },
});

export default Input;
