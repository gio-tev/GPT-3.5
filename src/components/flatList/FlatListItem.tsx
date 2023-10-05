// import {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import User from './User';
import Bot from './Bot';
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

  const message = isLastIndex && response ? currentResponse : content;

  return (
    <View style={styles.containder}>
      {isRoleUSer ? <User content={content} /> : <Bot message={message} />}
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
