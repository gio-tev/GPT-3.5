import {View, Image, Text, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from 'react-native-paper';
import theme from '../theme';
import {FlatListItemPropTypes} from '../types';

const FlatListItem = ({
  item: {role, content},
  index,
  currentResponse,
  data,
}: FlatListItemPropTypes) => {
  const {
    colors: {
      elevation: {level0, level2, level4},
    },
  } = useTheme();

  const isRoleUSer = role === 'user';
  const isLastIndex = index === data.length - 1;
  const backgroundColor = isRoleUSer ? level0 : level4;

  return (
    <View style={[styles.containder, {backgroundColor}]}>
      {isRoleUSer ? (
        <>
          <Feather name="user" size={30} color={level2} style={styles.logo} />
          <Text style={styles.text}>{content}</Text>
        </>
      ) : (
        <>
          <Image
            source={require('../assets/ChatbotLogo.jpeg')}
            style={styles.chatbotLogo}
          />
          <Text style={styles.text}>
            {isLastIndex ? currentResponse : content}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containder: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 60,
    paddingVertical: 18,
  },
  logo: {
    marginRight: 15,
  },
  text: {
    marginTop: 5,
    color: theme.colors.primary,
  },
  chatbotLogo: {
    width: 30,
    height: 30,
    borderRadius: 3,
    marginRight: 15,
  },
});

export default FlatListItem;
