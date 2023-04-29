import {Text, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import theme from '../theme';

const User = ({content}: {content: string}) => (
  <>
    <Feather
      name="user"
      size={30}
      color={theme.colors.elevation.level2}
      style={styles.logo}
    />

    <Text style={styles.text}>{content}</Text>
  </>
);

const styles = StyleSheet.create({
  text: {
    marginTop: 5,
    color: theme.colors.primary,
  },
  logo: {
    marginRight: 15,
  },
});

export default User;
