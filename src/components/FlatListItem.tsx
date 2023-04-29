import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {FlatListItemPropTypes} from '../types';
import User from './User';
import Bot from './Bot';

const FlatListItem = ({
  item: {role, content},
  index,
  currentResponse,
  data,
}: FlatListItemPropTypes) => {
  const {
    colors: {
      elevation: {level0, level4},
    },
  } = useTheme();

  const isRoleUSer = role === 'user';
  const isLastIndex = index === data.length - 1;
  const backgroundColor = isRoleUSer ? level0 : level4;

  return (
    <View style={[styles.containder, {backgroundColor}]}>
      {isRoleUSer ? (
        <User {...{content}} />
      ) : (
        <Bot {...{isLastIndex, currentResponse, content}} />
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
});

export default FlatListItem;
