import {StyleSheet} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import {InputPropTypes} from '../types';
import {sendIcon} from '../utils/helpers';

const Input = ({inputValue, handleInput, handleSubmit}: InputPropTypes) => {
  const {
    colors: {
      primary,
      onSurface,
      elevation: {level0, level1, level2, level3},
    },
  } = useTheme();

  const iconBackgroundColor = inputValue ? onSurface : 'transparent';
  const iconColor = inputValue ? 'white' : level2;

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
          icon={() =>
            sendIcon({
              iconColor,
              iconBackgroundColor,
            })
          }
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
});

export default Input;
