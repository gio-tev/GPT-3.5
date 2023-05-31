import {useColorScheme} from 'react-native';
import {useTheme} from 'react-native-paper';

const useDrawerStyles = () => {
  const {
    colors: {
      background,
      onSurface,
      primary,
      elevation: {level4},
    },
  } = useTheme();

  const backgroundColor = useColorScheme() === 'light' ? 'white' : background;

  return {
    headerTitle: '',
    headerTransparent: true,
    drawerActiveBackgroundColor: level4,
    drawerActiveTintColor: onSurface,
    drawerInactiveTintColor: primary,
    drawerStyle: {backgroundColor},
    drawerLabelStyle: {marginLeft: '-15%'},
    drawerItemStyle: {
      marginHorizontal: 0,
      marginVertical: 0,
      paddingHorizontal: 5,
      borderBottomColor: level4,
      borderBottomWidth: 1,
      borderRadius: 0,
    },
  };
};

export default useDrawerStyles;
