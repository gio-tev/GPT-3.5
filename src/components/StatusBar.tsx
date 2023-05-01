import {StatusBar, useColorScheme} from 'react-native';
import {useTheme} from 'react-native-paper';

const AppStatusBar = () => {
  const colorScheme = useColorScheme();

  const {
    colors: {background},
  } = useTheme();

  const barStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';

  return <StatusBar backgroundColor={background} barStyle={barStyle} />;
};

export default AppStatusBar;
