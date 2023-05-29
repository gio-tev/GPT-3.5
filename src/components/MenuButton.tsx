import {IconButton, useTheme} from 'react-native-paper';
import {MenuButtonProps} from '../types/index';

const MenuButton = ({navigation}: MenuButtonProps) => {
  const {
    colors: {
      elevation: {level5},
    },
  } = useTheme();

  return (
    <IconButton
      icon="menu"
      iconColor={level5}
      size={30}
      onPress={() => navigation.openDrawer()}
    />
  );
};

export default MenuButton;
