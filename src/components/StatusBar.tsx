import {StatusBar, useColorScheme} from 'react-native';
import {useTheme} from 'react-native-paper';

const AppStatusBar = () => {
  const {
    colors: {background},
  } = useTheme();

  const barStyle =
    useColorScheme() === 'light' ? 'dark-content' : 'light-content';

  return <StatusBar backgroundColor={background} barStyle={barStyle} />;
};

export default AppStatusBar;
