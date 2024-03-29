import {DrawerContentComponentProps} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DrawerContent from '../components/drawer/DrawerContent';
import MenuButton from '../components/drawer/buttons/MenuButton';
import DeleteButton from '../components/drawer/buttons/DeleteButton';
import {
  ChatNavigationProp,
  DeleteButtonTypes,
  SendIconTypes,
} from '../types/index';
import {lightTheme, darkTheme} from '../theme';

export const drawerContent = (props: DrawerContentComponentProps) => (
  <DrawerContent {...props} />
);

export const menuButton = (navigation: ChatNavigationProp) => (
  <MenuButton navigation={navigation} />
);

export const deleteButton = (props: DeleteButtonTypes) => (
  <DeleteButton {...props} />
);

export const sendIcon = ({iconColor, iconBackgroundColor}: SendIconTypes) => (
  <Ionicons
    name="ios-send"
    size={18}
    color={iconColor}
    style={{
      backgroundColor: iconBackgroundColor,
      paddingVertical: 7,
      paddingRight: 7,
      paddingLeft: 8,
      borderRadius: 100,
    }}
  />
);

export const getScheme = (
  newScheme: string | null,
  deviceScheme: string | null | undefined,
) => {
  let scheme = newScheme === 'light' ? 'light' : 'dark';

  if (newScheme === 'default') {
    scheme = deviceScheme === 'light' ? 'light' : 'dark';
  }

  return scheme;
};

export const getTheme = (scheme: string | null | undefined) => {
  return scheme === 'light' ? lightTheme : darkTheme;
};
