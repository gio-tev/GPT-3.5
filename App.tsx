import {useState, useEffect} from 'react';
import {useColorScheme, LogBox} from 'react-native';
import {Provider} from 'react-native-paper';

import useChatHistoryStore from './src/store/useChatHistoryStore';
import useColorSchemeStore from './src/store/useColorSchemeStore';
import DrawerNavigator from './src/navigators/DrawerNavigator';
import {getScheme, getTheme} from './src/utils/helpers';
import {ThemeState} from './src/types';

// import {deleteAllChats} from './src/database/sqlite';

LogBox.ignoreLogs(['new NativeEventEmitter']);

const App = () => {
  const [theme, setTheme] = useState<ThemeState>();

  const {setChatHistory} = useChatHistoryStore(state => state);
  const {scheme, setInitialScheme} = useColorSchemeStore(state => state);

  const deviceScheme = useColorScheme();
  // deleteAllChats();
  useEffect(() => {
    setChatHistory();
  }, [setChatHistory]);

  useEffect(() => {
    setInitialScheme();
  }, [setInitialScheme]);

  useEffect(() => {
    if (scheme) {
      setTheme(getTheme(getScheme(scheme, deviceScheme)));
    }
  }, [scheme, deviceScheme]);

  if (!theme) return null;

  return (
    <Provider theme={theme}>
      <DrawerNavigator />
    </Provider>
  );
};

export default App;
