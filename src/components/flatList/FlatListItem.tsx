import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import User from '../chat/User';
import Bot from '../chat/Bot';
import {FlatListItemPropTypes} from '../../types';

const FlatListItem = ({
  item: {role, content},
  index,
  currentResponse,
  currentChat,
  response,
}: FlatListItemPropTypes) => {
  const {
    colors: {
      elevation: {level0, level4},
    },
  } = useTheme();

  const isRoleUSer = role === 'user';
  const isLastIndex = index === currentChat.length - 1;
  const backgroundColor = isRoleUSer ? level0 : level4;

  const styles = getStyles(backgroundColor);

  return (
    <View style={styles.containder}>
      {isRoleUSer ? (
        <User {...{content}} />
      ) : (
        <Bot {...{isLastIndex, currentResponse, response, content}} />
      )}
    </View>
  );
};

const getStyles = (backgroundColor: string) => {
  return StyleSheet.create({
    containder: {
      backgroundColor,
      flexDirection: 'row',
      paddingLeft: 20,
      paddingRight: 60,
      paddingVertical: 18,
    },
  });
};

export default FlatListItem;
