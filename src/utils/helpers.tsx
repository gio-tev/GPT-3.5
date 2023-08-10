import {StyleSheet} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DrawerContent from '../components/DrawerContent';
import MenuButton from '../components/MenuButton';
import DeleteButton from '../components/DeleteButton';
import {
  ChatNavigationProp,
  DeleteButtonTypes,
  SendIconTypes,
} from '../types/index';

export const drawerContent = (props: DrawerContentComponentProps) => (
  <DrawerContent {...props} />
);

export const menuButton = (navigation: ChatNavigationProp) => (
  <MenuButton navigation={navigation} />
);

export const deleteButton = ({color, navigation, id}: DeleteButtonTypes) => (
  <DeleteButton {...{color, navigation, id}} />
);

export const sendIcon = ({iconColor, iconBackgroundColor}: SendIconTypes) => (
  <Ionicons
    name="ios-send"
    size={18}
    color={iconColor}
    style={[styles.icon, {backgroundColor: iconBackgroundColor}]}
  />
);

const styles = StyleSheet.create({
  icon: {
    paddingVertical: 7,
    paddingRight: 7,
    paddingLeft: 8,
    borderRadius: 100,
  },
});
