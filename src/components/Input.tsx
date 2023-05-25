import {StyleSheet} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import {InputPropTypes} from '../types';

const Input = ({
  inputValue,
  handleInput,
  handleSubmit,
  error,
}: InputPropTypes) => {
  const {
    colors: {
      primary,
      elevation: {level0, level1, level2, level3},
    },
  } = useTheme();

  return (
    <TextInput
      dense
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
          disabled={!inputValue && !!error}
          onPress={handleSubmit}
          icon={() => <Feather name="send" size={18} color={level2} />}
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
