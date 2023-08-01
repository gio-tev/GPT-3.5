import {StatusBar, useColorScheme} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {useTheme} from 'react-native-paper';

const AppStatusBar = () => {
  const {
    colors: {background},
  } = useTheme();

  changeNavigationBarColor(background);

  const barStyle =
    useColorScheme() === 'light' ? 'dark-content' : 'light-content';

  return <StatusBar backgroundColor={background} barStyle={barStyle} />;
};

export default AppStatusBar;
