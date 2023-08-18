import {useColorScheme} from 'react-native';
import {useTheme} from 'react-native-paper';
import {getScheme} from '../../utils/helpers';
import useColorSchemeStore from '../../store/useColorSchemeStore';

const useDrawerStyles = () => {
  const {scheme} = useColorSchemeStore(state => state);

  const deviceScheme = useColorScheme();

  const {
    colors: {
      background,
      onSurface,
      primary,
      elevation: {level4},
    },
  } = useTheme();

  const backgroundColor =
    getScheme(scheme, deviceScheme) === 'light' ? 'white' : background;

  return {
    headerTitle: '',
    headerTransparent: true,
    drawerActiveBackgroundColor: level4,
    drawerActiveTintColor: onSurface,
    drawerInactiveTintColor: primary,
    drawerStyle: {backgroundColor},
    drawerLabelStyle: {marginLeft: '-10%'},
    drawerItemStyle: {
      marginHorizontal: 0,
      marginVertical: 0,
      borderBottomColor: level4,
      borderBottomWidth: 1,
      borderRadius: 0,
    },
  };
};

export default useDrawerStyles;
