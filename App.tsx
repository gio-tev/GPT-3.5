import {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {Provider} from 'react-native-paper';
import {lightTheme, darkTheme} from './src/theme';
import {init, fetchChatHistory} from './src/database/sqlite';
import useChatHistoryStore from './src/store/useChatHistoryStore';
import DrawerNavigator from './src/navigators/DrawerNavigator';

const App = () => {
  const theme = useColorScheme() === 'light' ? lightTheme : darkTheme;

  const {setChatHistory} = useChatHistoryStore(state => state);

  useEffect(() => {
    (async () => {
      await init();
      setChatHistory(await fetchChatHistory());
    })();
  }, []);

  return (
    <Provider theme={theme}>
      <DrawerNavigator />
    </Provider>
  );
};

export default App;
