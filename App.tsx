import {useColorScheme} from 'react-native';
import {Provider} from 'react-native-paper';
import {lightTheme, darkTheme} from './src/theme';
import Content from './src/components/Content';

const App = () => {
  const colorScheme = useColorScheme();

  const theme = colorScheme === 'light' ? lightTheme : darkTheme;

  return (
    <Provider theme={theme}>
      <Content />
    </Provider>
  );
};

export default App;
