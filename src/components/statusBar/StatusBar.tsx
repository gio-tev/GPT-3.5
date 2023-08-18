import {StatusBar, useColorScheme} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {useTheme} from 'react-native-paper';
import useColorSchemeStore from '../../store/useColorSchemeStore';
import {getScheme} from '../../utils/helpers';

const AppStatusBar = () => {
  const {scheme} = useColorSchemeStore(state => state);

  const deviceScheme = useColorScheme();

  const {
    colors: {background},
  } = useTheme();

  changeNavigationBarColor(background);

  const barStyle =
    getScheme(scheme, deviceScheme) === 'light'
      ? 'dark-content'
      : 'light-content';

  return <StatusBar backgroundColor={background} barStyle={barStyle} />;
};

export default AppStatusBar;
