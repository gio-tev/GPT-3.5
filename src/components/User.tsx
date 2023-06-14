import {Text, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';

const User = ({content}: {content: string}) => {
  const {
    colors: {
      primary,
      elevation: {level2},
    },
  } = useTheme();

  return (
    <>
      <Feather name="user" size={28} color={level2} style={[styles.logo]} />
      <Text selectable style={[styles.text, {color: primary}]}>
        {content}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 5,
  },
  logo: {
    marginRight: 15,
  },
});

export default User;
